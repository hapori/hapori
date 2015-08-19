module.exports = {
	payment: {
		minWithdraw: 20000
	},
	env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',  // 'production' or 'development'
}

