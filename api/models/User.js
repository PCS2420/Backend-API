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

		nusp: {
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
		},

		pontos: {
			type: 'INT'
		},

		nomePersonagem: {
			type: 'STRING'
		}

	}
};