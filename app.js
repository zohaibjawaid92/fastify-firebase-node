//IMPORT 
const fastify = require('fastify')();
const firebase = require('firebase');
const config = require('./config/firebase');

//initialize
firebase.initializeApp(config.firebaseConfig);
fastify.register(require('fastify-formbody'));

//ROUTES DECLARATION
fastify.register(require('./routes/user'), {prefix: '/user'});
fastify.register(require('./routes/list'), {prefix: '/list'});

// Declare a route
fastify.get('/status' , (req,res) => {
    res.send('hello world!!');
})

// Listen the server!
fastify.listen(3000 , function(err){
    if(err){
        console.log('Error occured');
        process.exit(1);
    }
    console.log('Server is running on port 3000');
});