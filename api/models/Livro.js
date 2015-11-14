/**
* Livro.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	titulo: {
		type: 'string',
		required: true
	},

	editora: {
		type: 'string',
	},

	edicao: {
		type: 'string',
	},

	anodePublicacao: {
		type: 'integer'
	},

	autor: {
		type: 'string'
	},

	curso:{
		model: 'Curso'
	},

	imagens:{
		collection:'Imagem',
		via:'livro'
	},

	capa: {
		type: 'string'
	},

	prioridade: {
		type: 'integer'
	},

	estado: {
		type: 'string'
	}

  }
};

