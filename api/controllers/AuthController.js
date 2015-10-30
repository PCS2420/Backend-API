/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// var passport = require('passport');
module.exports = {

  login: function (req, res) {
    res.view();
  },
  authenticate: function(req, res) {
    var login = req.param('username');
    var password = req.param('password');


    if (!login || !password) {
      return res.json(401, {err: 'username and password required'});
    }
    Usuario.findOne({login: login}, function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      Usuario.validPassword(password, user, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({user: user, token: tokenAuth.issueToken({sid: user.id})});
        }
      });
    })
  },
  // process: function(req, res){
  //   passport.authenticate('local', function(err, user, info) {

  //     if ((err) || (!user)) {
  //       return res.send({
  //       message: 'login failed'
  //       });
  //       res.send(err);
  //     }
  //     req.logIn(user, function(err) {
  //       if (err) res.send(err);

  //       return res.json({user:user, token:tokenAuth.issueToken(user.id)});
  //       // return res.send(user);
  //     });
  //   })(req, res);
  // },
  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  }
};

/**
 * Sails controllers expose some logic automatically via blueprints.
 *
 * Blueprints are enabled for all controllers by default, and they can be turned on or off
 * app-wide in `config/controllers.js`. The settings below are overrides provided specifically
 * for AuthController.
 *
 * NOTE:
 * REST and CRUD shortcut blueprints are only enabled if a matching model file
 * (`models/Auth.js`) exists.
 *
 * NOTE:
 * You may also override the logic and leave the routes intact by creating your own
 * custom middleware for AuthController's `find`, `create`, `update`, and/or
 * `destroy` actions.
 */

module.exports.blueprints = {

  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,

  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,

  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true

};