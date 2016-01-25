'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || "development";

var Promise = require('bluebird'),
	path = require('path'),
	_ = require('lodash'),
	glob = Promise.promisify(require('glob')),
	Express = require('express');

class instrumentPanel extends Express{
	constructor(){
		super();
		this.on('startup', (panel)=>{
			require(path.join(__dirname, 'lib', 'config', 'winston.js'))(panel.app)
			console.info('starting up...')
			return require(path.join(__dirname, 'lib', 'config', 'helpers.js'))(panel);
		});
	}
}

var Panel = new instrumentPanel()
if(process.env.NODE_ENV === 'production'){
	var server = Panel.listen(8080, ()=>{
		Panel.emit('startup', {server: server, app: Panel});
	});
}else{
	Panel.emit('startup', {server: server, app: Panel})
}

module.exports = exports = Panel;
