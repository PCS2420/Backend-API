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

};


