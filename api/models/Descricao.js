/**
* Descricao.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {


  	texto: {
		type: 'string',
	},
	feedback: {
		type: 'string',
	},
  	/*
	  Possíveis estados:
		Espera
		Aceita
		Editada
		Rejeitada
	 */
	estado: {
		type: 'string',
	},


	descritor:{
	  	model: 'Usuario'
	},

	revisor:{
	  	model: 'Usuario'
	},

	imagem: {
		model: 'Imagem',
	},


  }
};

