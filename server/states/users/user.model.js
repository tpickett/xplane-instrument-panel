var Waterline = require('waterline'),
	Promise = require('bluebird'),
	URL = require('url'),
	bcrypt = Promise.promisifyAll(require('bcrypt')),
	jwt = require('jwt-simple'),
	moment = require('moment'),
	_ = require('lodash');

var modelOptions = {
		// tableName: 'users',
		identity: 'user',
		// migrate: 'safe',
		connection: 'disk',
		attributes: {
			username: {
				type: 'string',
				required: true
			},
			password: {
				type: 'string',
				required: true
			},
			email: {
				type: 'email',
				required: true,
				unique: true
			},
			roles: {
				type: 'array',
				defaultsTo: ['user']
			}
		},
		comparePassword: function(user, checkingPassword){
				return new Promise(function(resolve, reject){
						bcrypt.compareAsync(checkingPassword, user.password)
								.then(resolve)
								.catch(reject);
				});
		},
		login: function(email, password){
			var foundUser;
			return new Promise((resolve, reject)=>{
				if (email == '' || password == '') {
					return reject(new Error('you must enter something...'));
				}

				this.findOne({email: email})
					.then((user)=>{
						if(!user){
							return reject(new Error('Incorrect username or password'));
						}
						return foundUser = user;
					})
					.then(()=>{
						return this.comparePassword(foundUser, password);
					})
					.then((passwordsMatch)=>{
						if(passwordsMatch){
							var token = jwt.encode(foundUser, 'dockerManager');
							var expires = moment().add(10, 'minutes').valueOf();
							var token = jwt.encode({
								iss: foundUser.id,
								exp: expires,
								user: foundUser
							}, 'manager');
							return resolve({
								token: token,
								expires: expires,
								user: foundUser
							});
						}else{
							return reject(new Error('Attempt failed to login with ' + email));
						}
					})
					.catch(reject)
			})
		},
		beforeCreate: function(values, next) {
			var hash = Promise.promisify(require('bcrypt').hash);
			//hash the user plain text password. we don't want that in our DB.
			hash(values.password, 10)
				.then(function(generatedPasswordHash){
					values.password = generatedPasswordHash;
					console.log(values)
					return next();
				})
				.catch(next)
		},
	};


module.exports = Waterline.Collection.extend(modelOptions);
