/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	index: function(req, res) {

		User.findAll(function(err, users) {
			if (err) return res.send(err, 500);

			res.view({
				model: users
			});
		});
	},

	'new': function(req, res) {
		res.view();
	},

	// a CREATE action  
	create: function(req, res, next) {

		var params = req.params.all();

		User.create(params, function(err, user) {

			if (err) return next(err);

			res.status(201);

			res.json(user);

		});

	},

	// a FIND action
	find: function(req, res, next) {

		var id = req.param('id');

		var idShortCut = isShortcut(id);

		if (idShortCut === true) {
			return next();
		}

		if (id) {

			User.findOne(id, function(err, user) {

				if (user === undefined) return res.notFound();

				if (err) return next(err);

				res.json(user);

			});

		} else {

			var where = req.param('where');

			if (_.isString(where)) {
				where = JSON.parse(where);
			}

			var options = {
				limit: req.param('limit') || undefined,
				skip: req.param('skip') || undefined,
				sort: req.param('sort') || undefined,
				where: where || undefined
			};

			User.find(options, function(err, user) {

				if (user === undefined) return res.notFound();

				if (err) return next(err);

				res.json(user);

			});

		}

		function isShortcut(id) {
			if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
				return true;
			}
		}

	},

	// an UPDATE action
	update: function(req, res, next) {

		var criteria = {};

		criteria = _.merge({}, req.params.all(), req.body);

		var id = req.param('id');

		if (!id) {
			return res.badRequest('No id provided.');
		}

		User.update(id, criteria, function(err, user) {

			if (user.length === 0) return res.notFound();

			if (err) return next(err);

			res.json(user);

		});

	},

	// a DESTROY action
	destroy: function(req, res, next) {

		var id = req.param('id');

		if (!id) {
			return res.badRequest('No id provided.');
		}

		User.findOne(id).done(function(err, result) {
			if (err) return res.serverError(err);

			if (!result) return res.notFound();

			User.destroy(id, function(err) {

				if (err) return next(err);

				return res.json(result);
			});

		});
	},
};