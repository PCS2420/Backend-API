/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

		nome: {
			type: 'STRING',
			required: true
		},

		designacao: {
			type: 'STRING'
		},

		cpf: {
			type: 'INT'
		},

		curso: {
			type: 'STRING'
		},

		departamento: {
			type: 'STRING'
		},

		senha: {
			type: 'STRING'
			required: true
		},

		pontos: {
			type: 'INT'
		},

		nomePersonagem: {
			type: 'STRING'
		}

	}
};