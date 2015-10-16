/**
 * CursoController
 *
 * @description :: Server-side logic for managing Cursoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function(req,res){
		res.view();
	},
	
	create: function(req,res,next){
		Curso.create(req.params.all(), function cursoCreated(err, curso){
			if(err){
				return next(err);
				return res.redirect('/curso/new');
			}
			
			res.redirect('/curso/show/'+curso.id);
			
		});
	},
	
	/*
	show: function(req, res, next){
		Curso.findOne(req.param('id'), function foundCurso(err,curso){
			if(err) return next(err);
			if(!capitulo) return next();
			res.view({
				curso: curso
			});
		});
	},
	*/
	
};

