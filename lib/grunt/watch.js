module.exports = {
	options:{
    livereload:true
  },
  frontend: {
    files: [ "public/assets/**/*.{html,js}"],
    tasks: [ 'browserify'],
  },
  less: {
  	files: ["public/**/*.less"],
    tasks: ['less']
  },
  backend: {
		files:  [ 'server/**/*.js' ],
		tasks:  [],
		options: {
			spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
		}
  }
};