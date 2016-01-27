'use strict';

var express = require('express'),
    router = express.Router();


/**
 * Torch Express Application Router
 * @param  {Object} app Torch Express application
 */
function TorchExpressRouting (app) {
    this.app = app;
    // this.notFound = this.app.controllers.torch.notFound;
    // this.v1API = app.get('v1_api_path');
    this.sendToSPA();
    this.app.use(router);
}

/**
 * CatchAll Routing
 * @return {Object} default Nightwatch Routes
 */
TorchExpressRouting.prototype.sendToSPA = function() {
  // console.log(Object.keys(this.app.locals.controllers.frontend.app))
  router.route('/**/*.{css,png,jpg,jpeg}')
    .get((req, res, next)=>{
      var stripped = req.url.split('.')[0],
                requestedView = path.join('./', stripped);

            res.render(requestedView, function(err, html) {
                if (err) {
                    console.log(err)
                    // config.nightwatch.error('Error rendering partial', {
                    //     requestedView: requestedView,
                    //     error: err
                    // });
                    return res.sendStatus(404);
                } else {
                    // console.log(html)
                    return res.send(html);
                }
            });
    });

}

module.exports = exports = function(app){
    return new TorchExpressRouting(app);
}