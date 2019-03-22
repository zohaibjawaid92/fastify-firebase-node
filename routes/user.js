const firebase = require('firebase');
var db = firebase.database();
var ref = db.ref("users");

async function routes(fastify , options) {
     
    // Register with firebase.
    fastify.post('/register'  , async (req,res) => {
        const userInfo = req.body;
        console.log(req.body);
        // return { email : userInfo.email , password : userInfo.password}
        
        firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(data => {
          res.send({data : data})
          ref.push({
            id : data.user.uid,
            name : userInfo.name,
            email : userInfo.email,
            profile : 'hello profile dummy info',
              address : 'Gulshan-e-iqbal,Karachi'})
              .then((data) => {
              console.log('Succesfully Stored into database!');
              })
              .catch(error => {
             console.log('Firebase Message : ' + error.message);
              });
          console.log('Succesfully registered now you may login!', data);
          })
        .catch(error => {
          console.log('Firebase Message : ' + error.message);
        });
    });

    // Login with firebase.
    fastify.post('/login'  , async (req,res) => {
        const userInfo = req.body;
        console.log(req.body);
        // return { email : userInfo.email , password : userInfo.password}
        firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(data => {
            res.send({data : data});
            console.log('Firebase Data info', data);
            console.log('Sucessfully Login!!!');
        })
          .catch(error => {
            console.log('Firebase error message : ' + error.message);
        });
    });

    // Reset Password through Email
    fastify.post('/resetPassword'  , async (req,res) => {
        const userInfo = req.body;
        console.log(req.body);
        // return { email : userInfo.email , password : userInfo.password}
        firebase.auth().sendPasswordResetEmail(userInfo.email)
        .then(data => {
            console.log('Email sucessfully send on user email');
          })
          .catch(error => {
            console.log('Firebase error message : ' + error.message);
          });
    });
}

module.exports = routes;
 