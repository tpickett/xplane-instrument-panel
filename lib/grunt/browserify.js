module.exports = {
	tmp:{
		files:{
	    	'public/instrument-panel.js': ['public/assets/**/*.js']
		},
	    options: {
	      	browserfyOptions: {
	            debug: true
	        },
	        transform: [["babelify",{presets: ["es2015"], plugins: ["angular2-annotations","transform-decorators-legacy","transform-class-properties","transform-flow-strip-types"]}],  "brfs", "browserify-shim"]
	    }
	}
}