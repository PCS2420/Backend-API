/**
* Usuario.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var crypto = require('crypto');

module.exports = {

  attributes: {
        login: {
			type: 'string',
			required: true,
            unique: true
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
			Publicador
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
		
		notificacaoRebaixado: {
			type: 'boolean'
		},
		/* Apenas para Descritor*/
		notificacaoPromovido: {
			type: 'boolean'
		},
		/* Apenas para Descritor*/
		notificacaoBloqueio: {
			type: 'boolean'
		},
		/* Apenas para Descritor*/
		notificacaoDescricaoAceita: {
			type: 'boolean'
		},
		/* Apenas para Descritor*/
		notificacaoDescricaoEditada: {
			type: 'boolean'
		},
		/* Apenas para Descritor*/
		notificacaoDescricaoRejeitada: {
			type: 'boolean'
		},

		/*Apenas Descritor e Revisor*/
		curso: {
			model: 'Curso'
		},

		/*Apenas Descritor*/
		descricaoImagens: {
			collection:'Descricao',
		  	via:'descritor'
		},

		/*Apenas Revisor*/
		revisaoImagens: {
			collection:'Descricao',
		  	via:'revisor'
		},



		toJSON: function() {
			var obj = this.toObject();
			delete obj.senha;
			return obj;
	    }
  },

	beforeCreate: function(user, cb) {
        var salt = genSalt();
        encrypt(user.senha, salt, function(err, hash) {
			if (err) {
				cb(err);
			}else{
				user.senha = hash;
				cb(null, user);
			}
        });
    },

    validPassword: function(password, user, cb) {
      compare(password, user.senha, cb);
    }                   
};

function encrypt (password, salt, next) {
    crypto.pbkdf2(password, salt, 2048, 512, "sha256", function (err, hash) {
        return next(err, salt + hash.toString('hex'));
    });
}

function compare (password, saved, next) {
    salt = saved.substring(0, 20);
    hash = saved.substring(20);
    crypto.pbkdf2(password, salt, 2048, 512, "sha256", function (err, newHash){
        if (err){
            return next(err);
        }
        return next(null, hash === newHash.toString('hex'))
    });
}

function genSalt () {
    return crypto.randomBytes(10).toString('hex');
}
