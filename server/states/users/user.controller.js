'use strict';

class User {
	constructor(app){
		this.manager = app;
	}
	login(req, res, next){
		var email = req.body.username || 'undefined',
			password = req.body.password || 'undefined';

		req.app.locals.models.user.login(email, password)
			.then(function(user){
				console.info(`User Login: ${req.body.email}`);
				return res.status(200).json({user: user})
			})
			.catch(function(e){
				console.info(`Error Logging in User: ${email}`, e.message);
				return res.status(401).json({
					result: `Error logging in user: ${email}`
				});	
			})
	}
}

module.exports = exports = function(app){
	return new User(app);
}