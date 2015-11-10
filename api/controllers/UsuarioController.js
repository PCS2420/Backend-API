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


  apagar: function (req, res) {

    var login = req.param('login');
    var status = 'Apagado'

    Usuario.update({login:login},{tipo:status}).exec(function CB(err, updated){
      if(err){
        res.send(500, {error: "DB Error"});
        console.log("fail");
      }else{
        console.log("success");
        console.log(updated);
        res.send(updated);
      }
    });

  },


  bloquear: function (req, res) {

    var login = req.param('login');
    var status = 'Bloqueado'

    Usuario.update({login:login},{tipo:status}).exec(function CB(err, updated){
      if(err){
        res.send(500, {error: "DB Error"});
        console.log("fail");
      }else{
        console.log("success");
        console.log(updated);
      }
    });

  },

    desbloquear: function (req, res) { //desapagar e mudar usuario tambem

    var login = req.param('login');
    var status = req.param('tipo')

    Usuario.update({login:login},{tipo:status}).exec(function CB(err, updated){
      if(err){
        res.send(500, {error: "DB Error"});
        console.log("fail");
      }else{
        console.log("success");
        console.log(updated);
      }
    });

  },

  mudarSenha: function(req, res){

    var login = req.param('login');
    var oldPassword = req.param('oldPassword');
    var newPassword = req.param('newPassword');

    Usuario.findOne({login: login}, function(err, user) { // find user with login 'login'

      Usuario.validPassword(oldPassword, user, function(err, valid){ // check if old password is ok
        if(err){
          return res.json(401, {err: 'forbidden'});
        }

         if (!valid) {
          return res.json(401, {err: 'Wrong password'});
        } else {

          // wrapper to use beforeCreate function
          var tempUser = {
            senha: newPassword
          };

          Usuario.beforeCreate(tempUser, function(err, returnUser){
            if(err){
                res.send(401, {error: "Error when trying to hash newPassword"});
            }

            Usuario.update({login:login},{senha:returnUser.senha}).exec(function(err, updated){
              if(err){
                res.send(500, {error: "DB Error"});
              }else{
                res.send(200);
              }
            });

          });
        }
      })


    })



  }



};


