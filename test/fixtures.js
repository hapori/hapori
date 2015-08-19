

var users = {
  default: {
    username: 'defaultUser',
    email: 'defaultUser@test.com',
    passwordHash: 'defaultUserPassword',
    salt: 'salt',
    balance: 1000,
    key: '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50',
    address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1827369128'
  },

  paymentUser: {
    username: 'depositUser',
    email: 'testemail@test.com',
    passwordHash: 'hXzmdHkRohbZBDFaB+hI2KdASAdRm8ATiNYeIyf1NhI=',
    salt: '7710c90feb77be0c596e4c23',
    balance: 1000,
    key: '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50',
    address: 'n1qu2JkQF6LrM7dAXzf2YZ8dWnPbaaaaaa',
    joined: '1234567'
  }, // testpassword

  testUser: {
    username: 'testUser123',
    email: 'testuser123@test.com',
    passwordHash: 'YL6PRkqOUm9wfhdq6A2OKISTxsCsncNNsFGy4cBqc7s=',
    salt: 'aad6991c5b1cd4cb9eb1e42b',
    balance: 1000000,
    key: '540a69412c8358fc0e2a1b53bed21c6cb22d1e4a77fe0ce4996843b84c29c748',
    address: 'mn7iK3HMp8U2nt4CQw3QTZHBvD8PjhrdmM',
    joined: '1234567'
  } // testpassword123

};

var tokens = {
  testUserToken: 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoidGVzdFVzZXIxMjMiLCJlbWFpbCI6InRlc3R1c2VyMTIzQHRlc3QuY29tIiwicGFzc3dvcmRIYXNoIjoiWUw2UFJrcU9VbTl3ZmhkcTZBMk9LSVNUeHNDc25jTk5zRkd5NGNCcWM3cz0iLCJzYWx0IjoiYWFkNjk5MWM1YjFjZDRjYjllYjFlNDJiIiwia2V5IjoiOWE5ZjA5NjllOTJlZGRjZTZjODIwYWMyZTFkN2RkMDJjODMwMjBkMTE4M2Y2MzEwYTAxZmI5ZTY3ZDg0NGQ1MCIsImFkZHJlc3MiOiJuMXF1MkprUUY2THJNN2RBWHpmMllaOGRXblBiYWFhYWFhIiwiYmFsYW5jZSI6MTAwMCwiam9pbmVkIjoiMTIzNDU2NyIsInJhbmsiOm51bGwsInN0YXR1cyI6bnVsbCwiaWF0IjoxNDM5OTE4MTU5LCJleHAiOjE0NDAwOTA5NTl9.Ya7dujPSxbGG1MYsZXypGIY4CSAqCfgRlMlq_LIXqMg; Path=/'
}

var req = {

  // the callback that the chain api issues on incoming transactions
  chainCallback: { id: 'nr02RZZHJE0033R',
    sequence: 0,
    created_at: '2015-08-11T15:13:12.669199825Z',
    delivery_attempt: 1,
    notification_id: '347574a3-bc73-4102-864c-762b85cf0185',
    payload: { 
      type: 'address',
      block_chain: 'bitcoin',
      address: 'n1qu2JkQF6LrM7dAXzf2YZ8dWnPbaaaaaa',
      sent: 0,
      received: 22,
      input_addresses: [ '1MxSoMmxfcfzpzoqxNofU3FC168XZNLn7h','15H16w72sYdhT5jQdaoWhKZthwFRGzzYHe' ],
      output_addresses: [ '1MXUmbGnrwKexFaA5Ct8fHjEMfbDo9n7SS', '1DCnLvFx8dWsqwQ81U8Fn4fjJACNE4uMTt' ],
      transaction_hash: '78eda6bda0e0a9f969c58d0ad39731f331647c6acb4079ed8551ad08a6729cf4',
      block_hash: '00000000000000001f268be92305a4ad575f92a740413bf96fa4dbe25f808c70',
      confirmations: 0
    } 
  },

  // withdraw
  withdrawRequest: {
    amount: 0.0003,
    address: 'mq1QTYxUukvk65F4rx9tuNrpkweFyM3Wbx'
  },

  // signin
  signinRequest: {
    email: users.testUser.email,
    password: 'testpassword123'
  }
}

module.exports = {
  users: users,
  tokens: tokens,
  req: req,
};
