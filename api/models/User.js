/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

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

		/*Apenas Descritor e Revisor*/
		descricao: {
			model: 'Descricao'
		}

	}
};