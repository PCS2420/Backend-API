/**
 * PontuacaoController
 *
 * @description :: Server-side logic for managing pontuacaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 
  mudarLimiarPositivo: function(req, res){

    var newLimiarPositivo1 = req.param('newLimiarPositivo1');
    var newLimiarPositivo2 = req.param('newLimiarPositivo2');
	
	if(newLimiarPositivo1 == newLimiarPositivo2){
		Pontuacao.update({nome:"pontuacao_v1"},{limiarPositivo:newLimiarPositivo2}).exec(function(err, updated){
		  if(err){
			res.send(500, {error: "DB Error"});
		  }else{
			res.send(200);
		  }
		});
	} else{
        return res.send(401, {err: 'valores distintos!!'});
	}
  },
  
  mudarLimiarNegativo: function(req, res){

    var newLimiarNegativo1 = req.param('newLimiarNegativo1');
    var newLimiarNegativo2 = req.param('newLimiarNegativo2');
	
	if(newLimiarNegativo1 == newLimiarNegativo2){
		Pontuacao.update({nome:"pontuacao_v1"},{limiarNegativo:newLimiarNegativo2}).exec(function(err, updated){
		  if(err){
			res.send(500, {error: "DB Error"});
		  }else{
			res.send(200);
		  }
		});
	} else{
        return res.send(401, {err: 'valores distintos!!'});
	}
  },
  
  mudarDescricaoAceita: function(req, res){

    var newDescricaoAceita1 = req.param('newDescricaoAceita1');
    var newDescricaoAceita2 = req.param('newDescricaoAceita2');
	
	if(newDescricaoAceita1 == newDescricaoAceita2){
		Pontuacao.update({nome:"pontuacao_v1"},{descricaoAceita:newDescricaoAceita2}).exec(function(err, updated){
		  if(err){
			res.send(500, {error: "DB Error"});
		  }else{
			res.send(200);
		  }
		});
	} else{
        return res.send(401, {err: 'valores distintos!!'});
	}
  },

  mudarDescricaoEditada: function(req, res){

    var newDescricaoEditada1 = req.param('newDescricaoEditada1');
    var newDescricaoEditada2 = req.param('newDescricaoEditada2');
	
	if(newDescricaoEditada1 == newDescricaoEditada2){
		Pontuacao.update({nome:"pontuacao_v1"},{descricaoEditada:newDescricaoEditada2}).exec(function(err, updated){
		  if(err){
			res.send(500, {error: "DB Error"});
		  }else{
			res.send(200);
		  }
		});
	} else{
        return res.send(401, {err: 'valores distintos!!'});
	}
  },
  
  mudarDescricaoRejeitada: function(req, res){

    var newDescricaoRejeitada1 = req.param('newDescricaoRejeitada1');
    var newDescricaoRejeitada2 = req.param('newDescricaoRejeitada2');
	
	if(newDescricaoRejeitada1 == newDescricaoRejeitada2){
		Pontuacao.update({nome:"pontuacao_v1"},{descricaoRejeitada:newDescricaoRejeitada2}).exec(function(err, updated){
		  if(err){
			res.send(500, {error: "DB Error"});
		  }else{
			res.send(200);
		  }
		});
	} else{
        return res.send(401, {err: 'valores distintos!!'});
	}
  }
  
};

