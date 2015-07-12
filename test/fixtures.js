var user = {
  default: {
    username: 'usertestuser',
    email: 'usertestuser@test.com',
    passwordHash: 'testpassword',
    salt: 'salt',
    balance: 1000,
    key: 'some bitcoin key',
    address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1827369128'
  },
  paymentUser: {
    username: 'createPaymentUser',
    email: 'testemail@test.com',
    passwordHash: 'testpassword',
    salt: 'salt',
    balance: 1000,
    key: '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50',
    address: 'adfbeEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1234567'
  }
};

module.exports = {
  user: user
};
