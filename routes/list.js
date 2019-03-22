const firebase = require('firebase');
var db = firebase.database();
var ref = db.ref("users");

async function routes(fastify , options) {

    // Getting user List..
    fastify.get('/getList', async () => {
        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              console.log("user-Info-Key : " +childKey);
              console.log(childData);
            });
          })
        });

    //Update According to the ChildSnapshot Key
    fastify.put('/updateItems'  , async (req,res) => {
        const userInfo = req.body;
        console.log(req.body);
        ref.once('value', function(snapshot) {
            var childKey = ref.child(userInfo.id).update({
                 name : userInfo.name
            });
            res.send(`Update Sucessfully into childKey ${userInfo.id}`);
            console.log('Update Sucessfully into childKey' , userInfo.id);
        });
    });
    
    //Delete According to the ChildSnapshot Key
    fastify.delete('/deleteItems'  , async (req,res) => {
        const userInfo = req.body;
        ref.once('value' , (snapshot) => {
            var childKey = ref.child(userInfo.id).remove();
            res.send(`user removed with this child Key ${userInfo.id}`);
            console.log('Removed' , childKey);
        });
    });
}
module.exports = routes;