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
                imagem.local = path.basename(file[0].fd);
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
                imagem.contexto = path.basename(file[0].fd);
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


    cadastro: function (req, res, next){
        res.view();
    },


    aceita: function (req, res) {

        var imagem_id = req.param('id');

        //Atualiza imagem
        Imagem.update(imagem_id,{estado:'Revisado'}).exec(function afterwards(err, updated){
            if (err) {
                res.send(500, err);
            }
        });

        Imagem.findOne(imagem_id).exec(function findOneCB(err, imagem){           
            var descritor_id =  imagem.descritor;

            Usuario.findOne(descritor_id).exec(function findOneCB(err, descritor){ 

                Pontuacao.findOne({nome: 'pontuacao_v1'}).exec(function findOneCB(err, pontuacao){ 

                    //Logica para atualizar pontuacao e tipo de usuario
                    var novaPontuacao = parseInt(descritor.pontuacao) + parseInt(pontuacao.descricaoAceita);
                    var novoTipo = descritor.tipo
                    if (novaPontuacao > pontuacao.limiarPositivo)
                    {
                        novoTipo = 'DescritorRevisor'
                    } else if (novaPontuacao < pontuacao.limiarNegativo)
                    {
                        novoTipo = 'Bloqueado'
                    } else 
                    {
                        novoTipo = 'Descritor'
                    }

                    //Atualiza descritor
                    Usuario.update(descritor_id,{pontuacao: novaPontuacao, tipo: novoTipo}).exec(function afterwards(err, descritorAtualizado){
                        if (err) {
                            res.send(500, err);
                        }
                        res.send(descritorAtualizado);
                    });
                });
            });  
        });
    },

    editada: function (req, res) {

        var imagem_id = req.param('id');
        var descricao = req.param('descricao')

        //Atualiza imagem
        Imagem.update(imagem_id,{estado:'Revisado', descricao: descricao}).exec(function afterwards(err, updated){
            if (err) {
                res.send(500, err);
            }
        });

        Imagem.findOne(imagem_id).exec(function findOneCB(err, imagem){           
            var descritor_id =  imagem.descritor;

            Usuario.findOne(descritor_id).exec(function findOneCB(err, descritor){ 

                Pontuacao.findOne({nome: 'pontuacao_v1'}).exec(function findOneCB(err, pontuacao){ 

                    //Logica para atualizar pontuacao e tipo de usuario
                    var novaPontuacao = parseInt(descritor.pontuacao) + parseInt(pontuacao.descricaoEditada);
                    var novoTipo = descritor.tipo
                    if (novaPontuacao > pontuacao.limiarPositivo)
                    {
                        novoTipo = 'DescritorRevisor'
                    } else if (novaPontuacao < pontuacao.limiarNegativo)
                    {
                        novoTipo = 'Bloqueado'
                    } else 
                    {
                        novoTipo = 'Descritor'
                    }

                    //Atualiza descritor
                    Usuario.update(descritor_id,{pontuacao: novaPontuacao, tipo: novoTipo}).exec(function afterwards(err, descritorAtualizado){
                        if (err) {
                            res.send(500, err);
                        }
                        res.send(descritorAtualizado);
                    });
                });
            });  
        });
    },

    rejeitada: function (req, res) {

        var imagem_id = req.param('id');

        //Atualiza imagem
        Imagem.update(imagem_id,{estado:'Aberto', descricao: ""}).exec(function afterwards(err, updated){
            if (err) {
                res.send(500, err);
            }
        });

        Imagem.findOne(imagem_id).exec(function findOneCB(err, imagem){           
            var descritor_id =  imagem.descritor;

            Usuario.findOne(descritor_id).exec(function findOneCB(err, descritor){ 

                Pontuacao.findOne({nome: 'pontuacao_v1'}).exec(function findOneCB(err, pontuacao){ 

                    //Logica para atualizar pontuacao e tipo de usuario
                    var novaPontuacao = parseInt(descritor.pontuacao) + parseInt(pontuacao.descricaoRejeitada);
                    var novoTipo = descritor.tipo
                    if (novaPontuacao > pontuacao.limiarPositivo)
                    {
                        novoTipo = 'DescritorRevisor'
                    } else if (novaPontuacao < pontuacao.limiarNegativo)
                    {
                        novoTipo = 'Bloqueado'
                    } else 
                    {
                        novoTipo = 'Descritor'
                    }
                    
                    //Atualiza descritor
                    Usuario.update(descritor_id,{pontuacao: novaPontuacao, tipo: novoTipo}).exec(function afterwards(err, descritorAtualizado){
                        if (err) {
                            res.send(500, err);
                        }
                        res.send(descritorAtualizado);
                    });
                });
            });  
        });
    },
};

