/**
* Imagem.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		local:{
			type:'string',
		}, 

		/*
		Tipos de contexto:
			imagem
			texto
		*/
		tipoDeContexto:{
			type:'string',
		},

		contexto: {
			type:'string',
		},

		pagina: {
			type:'integer',
		},

		descricao: {
			model: 'Descricao',
		},

		/*
		  Possíveis estados:
			Aberto
			EmAndamento
			Pronto
			EmRevisao
			Revisado
		 */
		estado: {
			type: 'string',
		},

		livro:{
			model: 'Livro'
		},
		
		histDescricoes: {
			collection:'Descricao',
			via:'imagem'

		}
	},
	afterUpdate: function(updated, cb){
		Livro.atualizaEstadoLivro(updated.livro, cb);
	}

};

