/**
* Pontuacao.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

        limiarPositivo: {
            type: 'int'
        },
        limiarNegativo: {
            type: 'int'
        },
        descricaoAceita: {
            type: 'int'
        },
        descricaoEditada: {
            type: 'int'
        },
        descricaoRejeitada: {
            type: 'int'
        },
  }
};

