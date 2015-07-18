var errors = require('errors');

errors.create({
  name: 'AuthenticationError',
  success: false,
  status: 200
});


module.exports = errors;
