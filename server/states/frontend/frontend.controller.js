'use strict';

var path = require('path');

class frontendController{
    constructor(app){
        this.app = app;
    }
    /**
     * Server Response with the partial that was requested
     * @param  {Object} req Express request Object
     * @param  {Object} res Express response Object
     * @return {Object}     Server Response
     */
    partials() {
        return (req, res)=>{
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
        }
    }
}


module.exports = exports = function(app){
    return new frontendController(app);
};