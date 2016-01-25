var winston = require('winston'),
    expressWinston = require('express-winston'),
    _ = require('lodash'),
    util = require('util'),
    consoleTransport = new winston.transports.Console({
        json: false,
        colorize: true
    });

/**
 * Logging instance for outside of Express
 * @return {Object} Winston Logger
 */
function winstonLogging(transports, app) {
    transports.push(consoleTransport);
    var logger = new(winston.Logger)({
        levels: {
            general: 0,
            info: 1,
            warn: 2,
            error: 3

        },
        colors: {
            general: 'yellow',
            info: 'blue',
            warn: 'green',
            error: 'red'
        },
        transports: transports,
        exitOnError: false
    });
    _.merge(console, logger);
    function formatArgs(args){
        return [util.format.apply(util.format, Array.prototype.slice.call(args))];
    }
    console.log = function(){
        logger.info.apply(logger, arguments);
    };
    app.use(expressWinston.logger({
      transports: transports,
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
      colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
      ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    }));
    return logger;
}

module.exports = exports = (app)=>{
    return winstonLogging([], app);
}