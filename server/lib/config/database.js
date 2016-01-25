'use strict';

var Promise = require('bluebird'),
	glob = Promise.promisify(require('glob')),
	path = require('path'),
	_ = require('lodash'),
	Waterline = require('waterline'),
	orm = new Waterline(),
    diskAdapter = require('sails-disk');
    // redisAdapter = require('sails-redis'),
    // mongoAdapter = require('sails-mongo');

class database {
	constructor(panel){
		this.panel = panel;
		this.modelPaths = [];
		this.config = {
	          adapters: {
	            'default': diskAdapter,
	            disk: diskAdapter
	            // mongo: mongoAdapter,
	            // redis: redisAdapter
	          },
	          connections: {
	            disk: {
	              adapter: 'disk'
	            }
	    //         mongo: {
					// adapter: 'mongo',
					// host: process.env.MONGO_HOST,
					// port: process.env.MONGO_PORT,
					// user: process.env.MONGO_USER,
					// password: process.env.MONGO_PASS,
					// database: "admin",
	    //         },
	    //         redis: {
	    //             adapter: 'redis',
	    //             port: process.env.REDIS_PORT,
	    //             host: process.env.REDIS_HOST,
	    //             password: process.env.REDIS_PASS,
	    //             database: 0,
	    //             options: {
	    //                 // low-level configuration
	    //                 // (redis driver options)
	    //                 parser: 'hiredis',
	    //                 return_buffers: false,
	    //                 detect_buffers: false,
	    //                 socket_nodelay: true,
	    //                 no_ready_check: false,
	    //                 enable_offline_queue: true
	    //             }
	    //         },
	        },
	        defaults: {
	            migrate: 'safe',
	        }
	    };
	}
	findModels(){
	// 	this.panel.app.locals.models = {};
		return new Promise((resolve, reject)=>{
			glob(path.join(__dirname, '../../', '/**/*.model.js'))
				.then((files)=>{
					if(files.length){
						this.modelPaths = files;
					};
					return;
				})
				.then(resolve)
				.catch(reject)
		})
	}
	connectAdapters(){
		return new Promise((resolve, reject) =>{
            // Load the Models into the ORM
			_.forEach(this.modelPaths, (filepath) => {
                orm.loadCollection(require(filepath));
            });
            // console.log('init db', this.config)
	        // Start Waterline passing adapters in
	        orm.initialize(this.config, function(err, models) {
				if(err) {
				    return reject(new Error(err));
				}else{
					return resolve(models);
				}
	        });
	    })
	}
}

module.exports = exports = (panel)=>{
	return new database(panel);
}