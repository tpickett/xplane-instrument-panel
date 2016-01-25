'use strict';

var Promise = require('bluebird'),
	_ = require('lodash'),
	express = require('express'),
    router = express.Router(),	
	path = require('path'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	EventEmitter = require('events'),
	glob = Promise.promisify(require('glob'));


class helpers{
	constructor(panel){
		this.panel = panel;
		this.panel.db = require(path.join(__dirname, 'database.js'))(this.panel);
		//mostly, we'll be expecting json
        this.panel.app.use(bodyParser.json());
        this.panel.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.panel.app.use(methodOverride());
        this.panel.app.engine('html', require('ejs').renderFile);
    	this.panel.app.set('view engine', 'html');
    	this.panel.app.use(express.static(path.join(__dirname, '../../../', 'public')));
     	//    //set our public html directory
        this.panel.app.set('views', path.join(__dirname, '../../../', 'public'));
        console.general('finding the panel controllers...')
		this.findControllers()
			.then(()=>{
				console.general('finding the panel models...')
				return this.panel.db.findModels();
			})
			.then(()=>{
				// setTimeout(()=>{
					return this.panel.db.connectAdapters();
				// }, 5000);
			})
			.then((models)=>{
				// console.log('models: ', models)
        		return this.panel.app.locals.models = models.collections;
        	})
        	.then(()=>{
        		return this.panel.app.locals.models.user.destroy();
        	})
        	.then(()=>{
        		return this.panel.app.locals.models.user.findOrCreate({
        			username: 'admin',
        			password: 'Cl0udn9ne',
        			email: "test@test.com"
        		})
        	})
			.then((user)=>{
				console.general('finding the panel routes...', user)
				return this.findRoutes();
			})
			.then(()=>{
				//send everything else to the frontend
				router.route('/*')
				    .get((req, res, next)=>{
				    	return res.render('index')
				    });
				return this.panel.app.use(router);
			})
			.then(()=>{
				// this.panel.db.checkForAdmin();
				console.general('startup complete')
			})
			.catch((e)=>{
				return console.error(`Error setting up panel: ${e.message}`);
			})
	}
	findRoutes(){
		return new Promise((resolve, reject)=>{
			glob(path.join(__dirname, '../../', '/**/*.router.js'))
				.then((files)=>{
					if(files.length){
						_.forEach(files, (routesFile)=>{
							return require(routesFile)(this.panel.app);
						})
					};
				})
				.then(resolve)
				.catch(reject)
		})
	}
	findControllers(){
		this.panel.app.locals.controllers = {}
		return new Promise((resolve, reject)=>{
			glob(path.join(__dirname, '../../', '/**/*.controller.js'))
				.then((files)=>{
					if(files.length){
						_.forEach(files, (routesFile)=>{
							var name = _.first(_.last(routesFile.split("/")).split("."));
							return this.panel.app.locals.controllers[name] = require(routesFile)(this.panel.app);
						})
					};
				})
				.then(resolve)
				.catch(reject)
		})
	}
	findEvents(){
		return new Promise((resolve, reject)=>{
			glob(path.join(__dirname, '../../', '**/*.events.js'))
				.then((files)=>{
					if(files.length){
						_.forEach(files, (eventsFile)=>{
							return require(eventsFile);
						});
					}
					console.general('finished loading events.')
				})
				.then(resolve)
				.catch(reject);
		})
	}
}

module.exports = exports = (panel)=>{
	return new helpers(panel);
};