/**
* Descricao.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  
	  /*
	  Possíveis estados:
		Aberto
		EmAndamento
		Encerrado
	  */
	  estado:{
		  type:'string',
	  }, 

	  texto:{
	  	  type:'string',
	  },

	  descritor:{
	  	  model: 'Usuario'
	  },

	  imagem:{
		  collection:'Imagem',
		  via:'descricao'
	  },
  }
};

