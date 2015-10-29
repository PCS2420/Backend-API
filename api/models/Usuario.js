/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
        login: {
			type: 'string',
			required: true
		},

		senha: {
			type: 'string',
			required: true
		},

		nome: {
			type: 'string',
			required: true
		},

		cpf: {
			type: 'int'
		},

		/*
		Tipos de usuarios:
			Administrador
			Revisor
			Descritor
			DescritorRevisor
		*/
		tipo: {
			type: 'string'
		},

		/* Apenas para Descritor*/
		pontuacao: {
			type: 'int'
		},

		/* Apenas para Descritor*/
		nomePersonagem: {
			type: 'string'
		},

		/*Apenas Descritor e Revisor*/
		curso: {
			model: 'Curso'
		},

		/*Apenas Descritor*/
		descricaoImagens: {
			collection:'Imagem',
		  	via:'descritor'
		},

		/*Apenas Revisor*/
		revisaoImagens: {
			collection:'Imagem',
		  	via:'revisor'
		},



		toJSON: function() {
			var obj = this.toObject();
			delete obj.senha;
			return obj;
	    }
  },

	beforeCreate: function(user, cb) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.senha, salt, function(err, hash) {
			if (err) {
				console.log(err);
				cb(err);
			}else{
				user.senha = hash;
				cb(null, user);
			}
        });
      });
    },

    validPassword: function(password, user, cb) {
      bcrypt.compare(password, user.senha, function(err, match) {

        if (err) cb(err);

        if (match) {
          cb(null, true);
        } else {
          cb(err);
        }
      });
    }
};

