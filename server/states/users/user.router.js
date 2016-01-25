'use strict';

var express = require('express'),
    authRouter = express.Router(),
    userRouter = express.Router();


/**
 * Torch Express Application Router
 * @param  {Object} app Torch Express application
 */
class User {
    constructor(app){
      this.app = app;
      // this.notFound = this.app.controllers.torch.notFound;
      // this.v1API = app.get('v1_api_path');
      this.login();
      this.app.use(authRouter);
      // this.app.use(userRouter);
    }
    /**
     * CatchAll Routing
     * @return {Object} default Nightwatch Routes
     */
    login() {
      authRouter.route('/login')
        .post(this.app.locals.controllers.user.login)
    }
}


module.exports = exports = function(app){
    return new User(app);
}