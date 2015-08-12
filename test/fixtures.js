

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
    passwordHash: 'testpassword',
    salt: 'salt',
    balance: 1000,
    key: '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50',
    address: 'n1qu2JkQF6LrM7dAXzf2YZ8dWnPbaaaaaa',
    joined: '1234567'
  }
};

var req = {
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
  }
}

module.exports = {
  users: users,
  req: req
};
