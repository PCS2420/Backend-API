/**
 * DescricaoController
 *
 * @description :: Server-side logic for managing descricaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

	//POST
	descreve: function (req, res) {
        var novaDescricao = req.params.all();
        //Body: descritor: usuario_id, texto: texto, imagem: imagem_id
        //      estado: "Espera", revisor: "" 

        novaDescricao.estado = "Espera"
        novaDescricao.revisor = ""

        //Cria descricao
        Descricao.create(novaDescricao, function(err, descricao) {
            if (err) { res.send(500, err); }
            //Atualiza imagem
            Imagem.update(descricao.imagem,{estado:'Pronto', descricao: descricao.id}).exec(function afterwards(err, imagemAtualizada){
                if (err) { res.send(500, err); }
                res.send(imagemAtualizada);
            });
        });
    },
	

    aceita: function (req, res) {

        var descricao_id = req.param('id');
        var revisor_id = req.param('revisor');


		//Atualiza descricao
        Descricao.update(descricao_id,{estado:'Aceita', revisor: revisor_id}).exec(function afterwards(err, descricao){
            if (err) {  res.send(500, err);  }

            //Atualiza imagem
	        Imagem.update(descricao[0].imagem,{estado:'Revisado'}).exec(function afterwards(err, imagem){
	            if (err) { res.send(500, err); }
	        });

	        //Recupera info do usuario
            Usuario.findOne(descricao[0].descritor).exec(function findOneCB(err, descritor){ 

                if (descritor.tipo != "Revisor"){
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
                        Usuario.update(descritor.id,{pontuacao: novaPontuacao, tipo: novoTipo}).exec(function afterwards(err, descritorAtualizado){
                            if (err) {
                                res.send(500, err);
                            }
                            res.send(descritorAtualizado);
                        });
                    });
                }
            });  
        });    
    },

    editada: function (req, res) {

        var descricao_id = req.param('id');
        var revisor_id = req.param('revisor');
        var texto = req.param('descricao')


		//Atualiza descricao
        Descricao.update(descricao_id,{estado:'Editada', revisor: revisor_id, texto: texto}).exec(function afterwards(err, descricao){
            if (err) {  res.send(500, err);  }

            //Atualiza imagem
	        Imagem.update(descricao[0].imagem,{estado:'Revisado'}).exec(function afterwards(err, imagem){
	            if (err) { res.send(500, err); }
	        });

	        //Recupera info do usuario
            Usuario.findOne(descricao[0].descritor).exec(function findOneCB(err, descritor){ 

                if (descritor.tipo != "Revisor"){
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
                        Usuario.update(descritor.id,{pontuacao: novaPontuacao, tipo: novoTipo}).exec(function afterwards(err, descritorAtualizado){
                            if (err) {
                                res.send(500, err);
                            }
                            res.send(descritorAtualizado);
                        });
                    });
                }
            });  
        });
    },

    rejeitada: function (req, res) {

        var descricao_id = req.param('id');
        var revisor_id = req.param('revisor');


		//Atualiza descricao
        Descricao.update(descricao_id,{estado:'Rejeitada', revisor: revisor_id}).exec(function afterwards(err, descricao){
            if (err) {  res.send(500, err);  }

            //Atualiza imagem
	        Imagem.update(descricao[0].imagem,{estado:'Aberto', descricao: ""}).exec(function afterwards(err, imagem){
	            if (err) { res.send(500, err); }
	        });


	        //Recupera info do usuario
            Usuario.findOne(descricao[0].descritor).exec(function findOneCB(err, descritor){ 
            	if (err) { res.send(500, err); }

                if (descritor.tipo != "Revisor"){
                    Pontuacao.findOne({nome: 'pontuacao_v1'}).exec(function findOneCB(err, pontuacao){ 
                        if (err) { res.send(500, err); }

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
                        Usuario.update(descritor.id,{pontuacao: novaPontuacao, tipo: novoTipo}).exec(function afterwards(err, descritorAtualizado){
                            if (err) {
                                res.send(500, err);
                            }
                            res.send(descritorAtualizado);
                        });
                    });
                }
                
            });  
        });
    },

};

