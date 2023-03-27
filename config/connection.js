const { connect, connection } = require('mongoose');
// Establish connection to DB and create it, its name is Social Network

connect('mongodb://localhost/SocialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
