const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
