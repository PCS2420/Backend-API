/**
 * CapituloController
 *
 * @description :: Server-side logic for managing Capituloes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req,res){
		res.view();
	},
	
	create: function(req,res,next){
		Capitulo.create(req.params.all(), function capituloCreated(err, capitulo){
			if(err){
				return next(err);
				return res.redirect('/capitulo/new');
			}
			
			res.redirect('/capitulo/show/'+capitulo.id);
			
		});
	},
	
	
	show: function(req, res, next){
		Capitulo.findOne(req.param('id'), function foundLivro(err,capitulo){
			if(err) return next(err);
			if(!capitulo) return next();
			res.view({
				capitulo: capitulo
			});
		});
	},
};

