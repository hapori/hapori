

var users = {
  default: {
    username: 'defaultUser',
    email: 'defaultUser@test.com',
    passwordHash: 'defaultUserPassword',
    salt: 'salt',
    balance: 100000,
    key: '9a9f0969e92eddce6c820ac2e1d7dd02c83020d1183f6310a01fb9e67d844d50',
    address: '15U4eEyfEET9GqTSF4JpFRHAD8YGpYLbCE',
    joined: '1827369128'
  },

  paymentUser: {
    username: 'depositUser',
    email: 'testemail@test.com',
    passwordHash: 'hXzmdHkRohbZBDFaB+hI2KdASAdRm8ATiNYeIyf1NhI=',
    salt: '7710c90feb77be0c596e4c23',
    balance: 100000,
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
  }, // testpassword123

  testUser1: { username: 'testUser1',
    passwordHash: 'TexLjIautM5yfz4H8bYOCUKWfT0ZasDex/TrG1+d9pc=',
    salt: '79083474348953b46b294f7a',
    email: 'testUser1@test.com',
    balance: 1000000,
    key: 'f08d2a666ac2c9929eb2458c95113c67a89d03313d405707542b1fe72a969442',
    address: 'muSi9BC8Ekyo1wD9yFTipTnZLLgQPWu86H',
    joined: 1440418101913,
    rank: 'newbie',
    status: 'user'
  }, // passwd: 12345678

  testUser2: { username: 'testUser2',
    passwordHash: 'zYIzDd5RIJDRlWwKMGw0UcNJFhTIU8kc567U7eb6M9w=',
    salt: '3456bd19b6e30df963923850',
    email: 'testUser2@test.com',
    balance: 1000000,
    key: '51996d7ea4a7110a326b2d1959170beb3a048c82ee2c78003d8f6304f2a4bcf5',
    address: 'mqwwxCFBC6BUEUQS8oWyox8JhbFWSsD1NJ',
    joined: 1440418193332,
    rank: 'newbie',
    status: 'user'
  },

  testUser3: { username: 'testUser3',
    passwordHash: '52CFTaecWfNqzr+Bzt/0Wz8L35GgSALVRmre04b0T7s=',
    salt: '6f3fdbda0e81eacdc6d07459',
    email: 'testUser3@test.com',
    balance: 1000000,
    key: 'cbde7ffa4e6fed3f6134442cdaf2424c0e7dde957bf8ca9732c78bde6127bd02',
    address: 'mvMF8EDpreamrkF6ADYJboos35wSmf1qvK',
    joined: 1440418242679,
    rank: 'newbie',
    status: 'user'
  },

  testUser4: { username: 'testUser4',
    passwordHash: '6UDsNge2z0NL0wCf/mjytophOj4mG5agI7Mm30G3Phk=',
    salt: '793fd96021156599c73e4a21',
    email: 'testUser4@test.com',
    balance: 1000000,
    key: '620d93347a95a0ecfd7502e1b5196387dd0e0dc187d08bf058c819f836d408a2',
    address: 'mjJQxVWShfm9xzUiE1iJ6TH56Za4PoNQL5',
    joined: 1440418297214,
    rank: 'newbie',
    status: 'user'
  }

};



var tokens = {
//  testUserToken: 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoidGVzdFVzZXIxMjMiLCJlbWFpbCI6InRlc3R1c2VyMTIzQHRlc3QuY29tIiwicGFzc3dvcmRIYXNoIjoiWUw2UFJrcU9VbTl3ZmhkcTZBMk9LSVNUeHNDc25jTk5zRkd5NGNCcWM3cz0iLCJzYWx0IjoiYWFkNjk5MWM1YjFjZDRjYjllYjFlNDJiIiwia2V5IjoiOWE5ZjA5NjllOTJlZGRjZTZjODIwYWMyZTFkN2RkMDJjODMwMjBkMTE4M2Y2MzEwYTAxZmI5ZTY3ZDg0NGQ1MCIsImFkZHJlc3MiOiJuMXF1MkprUUY2THJNN2RBWHpmMllaOGRXblBiYWFhYWFhIiwiYmFsYW5jZSI6MTAwMCwiam9pbmVkIjoiMTIzNDU2NyIsInJhbmsiOm51bGwsInN0YXR1cyI6bnVsbCwiaWF0IjoxNDM5OTE4MTU5LCJleHAiOjE0NDAwOTA5NTl9.Ya7dujPSxbGG1MYsZXypGIY4CSAqCfgRlMlq_LIXqMg; Path=/',
  testUser1Token: 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyMSIsInBhc3N3b3JkSGFzaCI6IlRleExqSWF1dE01eWZ6NEg4YllPQ1VLV2ZUMFphc0RleC9UckcxK2Q5cGM9Iiwic2FsdCI6Ijc5MDgzNDc0MzQ4OTUzYjQ2YjI5NGY3YSIsImVtYWlsIjoidGVzdFVzZXIxQHRlc3QuY29tIiwiYmFsYW5jZSI6IjAiLCJrZXkiOiJmMDhkMmE2NjZhYzJjOTkyOWViMjQ1OGM5NTExM2M2N2E4OWQwMzMxM2Q0MDU3MDc1NDJiMWZlNzJhOTY5NDQyIiwiYWRkcmVzcyI6Im11U2k5QkM4RWt5bzF3RDl5RlRpcFRuWkxMZ1FQV3U4NkgiLCJqb2luZWQiOjE0NDA0MTgxMDE5MTMsInJhbmsiOiJuZXdiaWUiLCJzdGF0dXMiOiJ1c2VyIiwiaWQiOjEsImlhdCI6MTQ0MDQxODEwMSwiZXhwIjoxMDA4MDQxODEwMX0.soTddQJqtyc7fWcEyDokcGWdxVGzXtTrEfn6giuZlwU; Path=/',
  testUser2Token: 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyMiIsInBhc3N3b3JkSGFzaCI6InpZSXpEZDVSSUpEUmxXd0tNR3cwVWNOSkZoVElVOGtjNTY3VTdlYjZNOXc9Iiwic2FsdCI6IjM0NTZiZDE5YjZlMzBkZjk2MzkyMzg1MCIsImVtYWlsIjoidGVzdFVzZXIyQHRlc3QuY29tIiwiYmFsYW5jZSI6IjAiLCJrZXkiOiI1MTk5NmQ3ZWE0YTcxMTBhMzI2YjJkMTk1OTE3MGJlYjNhMDQ4YzgyZWUyYzc4MDAzZDhmNjMwNGYyYTRiY2Y1IiwiYWRkcmVzcyI6Im1xd3d4Q0ZCQzZCVUVVUVM4b1d5b3g4SmhiRldTc0QxTkoiLCJqb2luZWQiOjE0NDA0MTgxOTMzMzIsInJhbmsiOiJuZXdiaWUiLCJzdGF0dXMiOiJ1c2VyIiwiaWQiOjIsImlhdCI6MTQ0MDQxODE5MywiZXhwIjoxMDA4MDQxODE5M30.NPqRHqOod9Hd9_yfZeTRirUlqgaWmZgxc0V4d0cuxNc; Path=/',
  testUser3Token: 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyMyIsInBhc3N3b3JkSGFzaCI6IjUyQ0ZUYWVjV2ZOcXpyK0J6dC8wV3o4TDM1R2dTQUxWUm1yZTA0YjBUN3M9Iiwic2FsdCI6IjZmM2ZkYmRhMGU4MWVhY2RjNmQwNzQ1OSIsImVtYWlsIjoidGVzdFVzZXIzQHRlc3QuY29tIiwiYmFsYW5jZSI6IjAiLCJrZXkiOiJjYmRlN2ZmYTRlNmZlZDNmNjEzNDQ0MmNkYWYyNDI0YzBlN2RkZTk1N2JmOGNhOTczMmM3OGJkZTYxMjdiZDAyIiwiYWRkcmVzcyI6Im12TUY4RURwcmVhbXJrRjZBRFlKYm9vczM1d1NtZjFxdksiLCJqb2luZWQiOjE0NDA0MTgyNDI2NzksInJhbmsiOiJuZXdiaWUiLCJzdGF0dXMiOiJ1c2VyIiwiaWQiOjMsImlhdCI6MTQ0MDQxODI0MiwiZXhwIjoxMDA4MDQxODI0Mn0.Z0bFHBj-JoZH1f74r4nZ6DGtdeC4yv9tAN_gyd2-aEI; Path=/',
  testUser4Token: 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyNCIsInBhc3N3b3JkSGFzaCI6IjZVRHNOZ2UyejBOTDB3Q2YvbWp5dG9waE9qNG1HNWFnSTdNbTMwRzNQaGs9Iiwic2FsdCI6Ijc5M2ZkOTYwMjExNTY1OTljNzNlNGEyMSIsImVtYWlsIjoidGVzdFVzZXI0QHRlc3QuY29tIiwiYmFsYW5jZSI6IjAiLCJrZXkiOiI2MjBkOTMzNDdhOTVhMGVjZmQ3NTAyZTFiNTE5NjM4N2RkMGUwZGMxODdkMDhiZjA1OGM4MTlmODM2ZDQwOGEyIiwiYWRkcmVzcyI6Im1qSlF4VldTaGZtOXh6VWlFMWlKNlRINTZaYTRQb05RTDUiLCJqb2luZWQiOjE0NDA0MTgyOTcyMTQsInJhbmsiOiJuZXdiaWUiLCJzdGF0dXMiOiJ1c2VyIiwiaWQiOjQsImlhdCI6MTQ0MDQxODI5NywiZXhwIjoxMDA4MDQxODI5N30.cDuM381Q9PfK6c7Cc8GzLfG1HMXybyCtlXhVDBTjgBE; Path=/',
}





var posts = {
  default: {
    postKey: 'vids.123',
    title: 'Robin Schulz | Wenn Träume fliegen lernen | Summer Mix',
    text: 'Wenn Träume fliegen lernen mixed by Robin Schulz',
    url: 'https://www.youtube.com/watch?v=RIJcj8t7xDM',
    timestamp: '1439984014091',
    investors: ['testUser123'],
    investment: process.env.VOTE_COST,
    username: 'testUser123',
    html: '<div style="left: 0px; width: 100%; height: 0px; position: relative; padding-bottom: 56.2493%;"><iframe src="https://www.youtube.com/embed/IifStkAsemU?wmode=transparent&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;enablejsapi=1" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" style="top: 0px; left: 0px; width: 100%; height: 100%; position: absolute;"></iframe></div>',
    thumbnail: 'https://i.ytimg.com/vi/IifStkAsemU/mqdefault.jpg',
    commentCount: 0,
    sticky: false,
  },

  testUser1Post: { 
    postKey: 'vids.QpAik',
    title: 'Saving the drink',
    text: 'Do save the drink',
    url: 'http://i.imgur.com/ghGrGYE.gifv',
    timestamp: 1440084888118,
    investors: [ 'testUser1' ],
    investment: '10000',
    username: 'testUser1',
    html: '<blockquote class="imgur-embed-pub" lang="en" data-id="ghGrGYE"><a href="http://imgur.com/ghGrGYE">A bro does what a bro does.</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>',
    thumbnail: 'https://i.imgur.com/ghGrGYEh.jpg',
    commentCount: 0,
    sticky: false 
  }  
}




var votes = {
  vote1: { userId: 1, postId: '1', timestamp: '1440171440980' },
  vote2: { userId: 2, postId: '2', timestamp: '1440171442760' },
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
  },

  // create post
  createPost1Request: {
    url: 'https://www.youtube.com/watch?v=RIJcj8t7xDM',
    title: 'Robin Schulz | Wenn Träume fliegen lernen | Summer Mix',
    text: 'Wenn Träume fliegen lernen mixed by Robin Schulz',
    parentKey: 'vids'
  },

  createPost2Request: {
    url: 'http://youtu.be/jqveVcGryMA',
    title: 'Anyone know how she did the trick?',
    text: 'Something...',
    parentKey: 'vids'
  },

  // submit vote
  submitVote1Request: {
    postId: posts.testUser1Post.postKey
  },
  submitVote2Request: {
    postId: posts.testUser1Post.postKey
  }
}



module.exports = {
  users: users,
  posts: posts,
  votes: votes,
  tokens: tokens,
  req: req,
};
