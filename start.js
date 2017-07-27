const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({
  path: 'variables.env'
});

// connect to database
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

// Require models
require('./models/Store');
require('./models/User');

// start
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express server running on PORT ${server.address().port}`);
});

// temporary
require('./handlers/mail');
