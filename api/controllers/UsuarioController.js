/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  cadastro: function (req, res) {

    var novoUsuario = req.params.all()
    novoUsuario.pontuacao = 0

    Curso.find({ nome: novoUsuario.curso }, function(err1,cursos){
      if (err1) { res.send(500, err1); }
      novoUsuario.curso = cursos[0]

      Usuario.create(novoUsuario, function(err2, usuario) {
        if (err2) { res.send(500, err2); }
        res.send(usuario);
      });
    })
  },

  mudarSenha: function(req, res){
    var login = req.param('login');
    var novoSenha = req.param('senha');

    Usuario.update({login:login},{senha:novoSenha}).exec(function CB(err, updated){
      if(err){
        res.send(500, {error: "DB Error"});
        console.log("fail");
      }else{
        console.log("success");
        console.log(updated);
        res.send(updated);
      }
    });

  }


};


