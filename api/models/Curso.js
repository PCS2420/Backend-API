/**
* Curso.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  
	  nome:{
		  type:'string',
		  required: true
	  }, 

	  livros:{
		  collection:'Livro',
		  via:'curso'
	  },

	  usuarios:{
	  	  collection:'Usuario',
		  via:'curso'
	  }
  }
};

