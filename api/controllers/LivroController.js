/**
 * LivroController
 *
 * @description :: Server-side logic for managing livroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var path = require('path');
var mime = require('mime');
var fs = require('fs');

module.exports = {
    postCapa: function(req,res,next){
        var id = req.param('id');
        Livro.findOne({id:id}).exec(function findOneCB(err, livro){
            if (err){
                return res.send(401, err);
            }
            req.file("imagem").upload({
                dirname: path.resolve(__dirname, '../../assets/images')
            }, function (err, file){
                if (err) {
                    return res.send(500, err);
                }
                livro.capa = 'images/' +  path.basename(file[0].fd);
                livro.save(function (err, savedLivro){
                    if (err) {
                        return res.send(500, err);
                    }
                    res.json(savedLivro);
                })
            });
        });
    },
    getCapa: function(req,res){
        var id = req.param('id');
        Livro.findOne({id:id}).exec(function findOneCB(err, livro){
            var filePath = path.resolve(__dirname, '../../assets/images', livro.local);
            var mimetype = mime.lookup(livro.local);

            res.setHeader('Content-disposition', 'attachment; filename=' + livro.local);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(filePath);
            filestream.pipe(res);
        });
    },
	getNumImagens: function(req, res){
		id = req.param('id');
		Livro.contaImagens(id, function(err, response){
			if (err) {
				console.log(err);
				return res.send(err);
			}
			return res.send(response);
		});
	},
	buscaLivrosByTituloAreaConAutor: function(req, res) {
		var q = req.param('query');
		var reg = new RegExp(q, "i");
		Livro.find({$or: [{autor : reg}, {titulo : reg}, {areaConhecimento: reg}]}).exec(function afterwards(err, livros){
			if (err) {return res.send(500, err);}
			return res.json(livros);
        });
	},
	buscaLivrosRevisarByTituloAreaConAutor: function(req, res) {
		var q = req.param('query');
		var reg = new RegExp(q, "i");
		Livro.find({$and : [{$or: [{autor : reg}, {titulo : reg}, {areaConhecimento: reg}]}, {precisaRevisar : true}]}).exec(function afterwards(err, livros){
			if (err) {return res.send(500, err);}
			return res.json(livros);
        });
	}
};
