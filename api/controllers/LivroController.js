/**
 * LivroController
 *
 * @description :: Server-side logic for managing livroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	
	'new': function(req,res){
		res.view();
	},
	
	create: function(req,res,next){
		Livro.create(req.params.all(), function livroCreated(err, livro){
			if(err){
				return next(err);
				return res.redirect('/livro/new');
			}
			
			res.redirect('/livro/show/');
			
		});
	},
	
	
	show: function(req, res, next){
		Livro.findOne(req.param('id'), function foundLivro(err,livro){
			if(err) return next(err);
			if(!livro) return next();
			res.view({
				livro: livro
			});
		});
	},
	
	edit: function(req, res){
			res.view();
		
	},
	
	up: function(req,res,next){
		Capitulo.create(req.params.all(), function capituloCreated(err, capitulo){
			if(err){
				return next(err);
				return res.redirect('/livro');
			}
			res.redirect('livro/up/'+livro.id)
		});
	},
	
	/*index: function(req,res,next){
		Livro.find(function foundLivros(err,livros){
			if(err) return next(err);
			res.view({
				livros:livros
			});
		});
	},*/
	
	'search': function(req,res){
		res.view();
	},
	
	after: function(req,res,next){
		res.view();
	},
	
	destroy: function(req,res,next){
		Livro.findOne(req.param('id'), function foundLivro(err, livro){
			if(err) return next(err);
			if(!livro) return next('Livro nao existe');
			
			Livro.destroy(req.param('id'), function livroDestroyed(err){
				if(err) return next(err);
				
			});
			res.redirect('/livro');
		});
	}
	
};

