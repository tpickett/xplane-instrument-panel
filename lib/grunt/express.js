var path = require('path');
module.exports = {
  all: {
      options: {
          port: 8080,
          hostname: 'localhost',
          bases: ['public', 'server'],
          livereload: true,
          // serverreload: true,
          server: path.join(__dirname, '../../server/server')
          // open:true
      }
  }
};