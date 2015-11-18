var path = require('path');
var mime = require('mime');
var fs = require('fs');

/**
 * ImagemController
 *
 * @description :: Server-side logic for managing imagems
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    postImagem: function(req,res){
        var id = req.param('id');
        Imagem.findOne({id:id}).exec(function findOneCB(err, imagem){
            if (err){
                return res.send(401, err);
            }
            req.file("imagem").upload({
                dirname: path.resolve(__dirname, '../../assets/images')
            }, function (err, file){
                if (err) {
                    return res.send(500, err);
                }
                imagem.local = 'images/' + path.basename(file[0].fd);
                imagem.save(function (err, savedImagem){
                    if (err) {
                        return res.send(500, err);
                    }
                    res.json(savedImagem);
                })
            });
        });
    },

    postContexto: function(req,res,next){
        var id = req.param('id');
        Imagem.findOne({id:id}).exec(function findOneCB(err, imagem){
            if (err){
                return res.send(401, err);
            }
            if (imagem.contexto !== 'imagem') {
                return res.send(401, 'essa imagem possui contexto tipo texto');
            }
            req.file("imagem").upload({
                dirname: path.resolve(__dirname, '../../assets/images')
            }, function (err, file){
                if (err) {
                    return res.send(500, err);
                }
                imagem.contexto = 'images/' +  path.basename(file[0].fd);
                imagem.save(function (err, savedImagem){
                    if (err) {
                        return res.send(500, err);
                    }
                    res.json(savedImagem);
                })
            });
        });
    },

    getImagem: function(req,res){
        var id = req.param('id');
        Imagem.findOne({id:id}).exec(function findOneCB(err, imagem){
            var filePath = path.resolve(__dirname, '../../assets/images', imagem.local);
            var mimetype = mime.lookup(imagem.local);

            res.setHeader('Content-disposition', 'attachment; filename=' + imagem.local);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(filePath);
            filestream.pipe(res);
        });
    },

    getContexto: function(req,res){
        var id = req.param('id');
        Imagem.findOne({id:id}).exec(function findOneCB(err, imagem){
            if (contexto === 'imagem'){
                var filePath = path.resolve(__dirname, '../../assets/images', imagem.contexto);
                var mimetype = mime.lookup(imagem.contexto);

                res.setHeader('Content-disposition', 'attachment; filename=' + imagem.contexto);
                res.setHeader('Content-type', mimetype);

                var filestream = fs.createReadStream(filePath);
                filestream.pipe(res);
            }
        });
    },
	
	//PUT
	emAndamento: function (req, res) { //caso alguém a esteja descrevendo
        var imagem_id = req.param('id');
		var descritor_id = req.param('descritor');

        //Atualiza imagem
        Imagem.update(imagem_id,{estado:'EmAndamento', descritor: descritor_id}).exec(function afterwards(err, updated){
            if (err) {
                res.send(500, err);
            }
			res.send(200, "Ola!");
        });
	},
	
	intDescricao: function (req, res) { //caso descrição seja interrompida por mudança de rota
        var imagem_id = req.param('id');	
		var descricao = req.params.all();
		
        //Atualiza imagem
        Imagem.update(imagem_id,{estado:'Aberto', descritor:''}).exec(function afterwards(err, updated){
            if (err) {res.send(500, err);}
			// Deleta a descricao atrelada a ela
			Descricao.destroy(descricao.descId).exec(function afterwards(err, descricao) {
				if (err) {res.send(500, err);}
				res.send(200, "yey");
			});
        });
	},


    cadastro: function (req, res, next){
        res.view();
    },
	
	getImagemPorEstado: function(req,res){
        Imagem.find({estado:req.param('estado'), descritor : req.query.descritor}).exec(function findOneCB(err, imagens){
			res.json(imagens);
        });
    }

};

