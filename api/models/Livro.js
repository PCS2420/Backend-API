/**
* Livro.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var ObjectId = require('mongodb').ObjectID;

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

		areaConhecimento: {
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
		
		precisaDescrever: {
			type: 'boolean',
			defaultsTo: 'true',
			size: 1,
			boolean: true 
		}, 

		precisaRevisar: {
			type: 'boolean',
			defaultsTo: 'false',
			size: 1,
			boolean: true
		}, 

		completo: {
			type: 'boolean',
			defaultsTo: 'false',
			size: 1,
			boolean: true 
		},
	},
	contaImagens: function (id, cb){
		idObj = new ObjectId(id);
		Imagem.native(function(err, collection){
			if (err) return cb(err);
			collection.aggregate(
				[
					{
						$match: {livro: idObj} //Pegamos apenas imagens com id de livro igual ao id que queremos
					},{
						$group: { //Agrupamos dados, por livro
							_id:"$livro",
							aberto: { $sum: { $cond: [{$eq: ['$estado', 'Aberto']}, 1, 0]}},  //Criamos campo Aberto com quantas imagens em aberto temos
							emAndamento: { $sum: { $cond: [{$eq: ['$estado', 'EmAndamento']}, 1, 0]}},  //Criamos campo EmAndamento com quantas imagens sendo descritas
							pronto: { $sum: { $cond: [{$eq: ['$estado', 'Pronto']}, 1, 0]}},  //Criamos campo Aberto com quantas imagens prontas temos
							emRevisao: { $sum: { $cond: [{$eq: ['$estado', 'EmRevisao']}, 1, 0]}}, //Criamos campo Aberto com quantas imagens estao sendo revisadas
							revisado: { $sum: { $cond: [{$eq: ['$estado', 'Revisado']}, 1, 0]}}, //Criamos campo Aberto com quantas imagens revisadas temos
							total: { $sum: 1 } //Criamos campo Total com quantidade total de imagens
						}
					},{
						$sort: {_id:1}
					}
				],
				cb
			);
		});
	},
	atualizaEstadoLivro: function(id, cb){
		var dados = 0
		Livro.contaImagens(id, function(err, result){
			if (err) return cb(err);
			if (result.length === 0) return cb(new Error('Livro não encontrado.'));
			result = result[0];
			var precisaDescrever = false;
			var precisaRevisar = false;
			var completo = false;
			
			var total = result.total;
			var revisados = result.revisado;
			var descritos = result.pronto + result.emRevisao + revisados;

			if (descritos < total){
				precisaDescrever = true;
			}
			
			if (revisados < descritos){
				precisaRevisar = true;
			}
			completo = !(precisaDescrever || precisaRevisar);
			
			Livro.findOne(id).exec(function(err, oLivro){
				if (err) return cb(err);
				if (!oLivro) return cb(new Error('Livro não encontrado.'));
				oLivro.precisaDescrever = precisaDescrever;
				oLivro.precisaRevisar = precisaRevisar;
				oLivro.completo = completo;
				oLivro.save(cb);
			});
		});
	}
};
