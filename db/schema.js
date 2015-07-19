var db = {
    comments: {
        id: {type: 'increments', nullable: false, primary: true},
        text: {type: 'text', maxlength: 1000, nullable: false},
        forum: {type: 'string', maxlength: 50, nullable: false},
        username: {type: 'string', maxlength: 24, nullable: false, unique: true},
        parent: {type: 'integer', nullable: false},
        created_at: {type: 'dateTime', nullable: false}
    },
    posts: {
        id: {type: 'increments', nullable: false, primary: true},
        postKey: {type: 'string', maxlength: 10, nullable: false}, // TODO post_key
        title: {type: 'string', maxlength: 150, nullable: false},
        url: {type: 'string', maxlength: 250, nullable: false, unique: true},
        forum: {type: 'string', maxlength: 50, nullable: false},
        investors: {type: 'array'},
        investment: {type: 'integer', nullable: false},
        username: {type: 'string', maxlength: 24, nullable: false},
        timestamp: {type: 'dateTime', nullable: false},
    },
    forums: {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 150, nullable: false},
        description: {type: 'string', maxlength: 200, nullable: false},
        rules: {type: 'string', maxlength: 1000, nullable: false},
        administrator: {type: 'string', maxlength: 24, nullable: false}
        timestamp: {type: 'dateTime', nullable: false}
    },
    users: {
        id: {type: 'increments', nullable: false, primary: true},
        username: {type: 'string', maxlength: 24, nullable: false},
        email: {type: 'string', maxlength: 24, nullable: true},
        passwordHash: {type: 'string', maxlength: 44, nullable: false}, // nullable?
        salt: {type: 'string', maxlength: 24, nullable: false},
        key: {type: 'string', maxlength: 64, nullable: false}, // private_key ?
        address: {type: 'string', maxlength: 35, nullable: false} // bitcoin_address ?
        balance: {type: 'integer', nullable: false},
        joined: {type: 'dateTime', nullable: false}
    },
    votes: {
        id: {type: 'increments', nullable: false, primary: true},
        userId: {type: 'integer', nullable: false}, // user_id ?
        postId: {type: 'integer', nullable: false}, // post_id ?
        timestamp: {type: 'dateTime', nullable: false} // created_at ?
    },
    payment: { // payments ?
        id: {type: 'increments', nullable: false, primary: true},
        amount: {type: 'integer', nullable: false}, // user_id ?
        transactionHash: {type: 'string', maxlength: 64, nullable: false},
        username: {type: 'string', maxlength: 24}, // nullable? also user_id?
        kind: {type: 'string', maxlength: 24},
        timestamp: {type: 'dateTime', nullable: false}
    },
    wallet: { // payments ?
        id: {type: 'increments', nullable: false, primary: true},
        key: {type: 'string', maxlength: 64, nullable: false},
        address: {type: 'string', maxlength: 35, nullable: false},
        balance: {type: 'integer', nullable: false},
        username: {type: 'string', maxlength: 24} // user_id?
        // created_at?
    }
};

// function isPost(jsonData) {
//     return jsonData.hasOwnProperty('html') && jsonData.hasOwnProperty('markdown') &&
//            jsonData.hasOwnProperty('title') && jsonData.hasOwnProperty('slug');
// }
//
// function isTag(jsonData) {
//     return jsonData.hasOwnProperty('name') && jsonData.hasOwnProperty('slug') &&
//         jsonData.hasOwnProperty('description') && jsonData.hasOwnProperty('parent');
// }
//
// function isUser(jsonData) {
//     return jsonData.hasOwnProperty('bio') && jsonData.hasOwnProperty('website') &&
//         jsonData.hasOwnProperty('status') && jsonData.hasOwnProperty('location');
// }
//
// function isNav(jsonData) {
//     return jsonData.hasOwnProperty('label') && jsonData.hasOwnProperty('url') &&
//         jsonData.hasOwnProperty('slug') && jsonData.hasOwnProperty('current');
// }

module.exports.tables = db;
// module.exports.checks = {
//     isPost: isPost,
//     isTag: isTag,
//     isUser: isUser,
//     isNav: isNav
// };
