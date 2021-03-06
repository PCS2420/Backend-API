/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  '/home': {
    controller: 'AuthController',
    action: 'authenticate'
  },
  // ,
  // '/login': {
  //   controller: 'AuthController',
  //   action: 'login'
  // },
  // '/logout': {
  //   controller: 'AuthController',
  //   action: 'logout'
  // }
  'GET /imagem/:id/imagem': 'ImagemController.getImagem',
  'POST /imagem/:id/imagem': 'ImagemController.postImagem',
  'GET /imagem/:id/contexto': 'ImagemController.getContexto',
  'POST /imagem/:id/contexto': 'ImagemController.postContexto',
  'PUT /imagem/:id/emAndamento': 'ImagemController.emAndamento',
  'PUT /imagem/:id/intDescricao': 'ImagemController.intDescricao',
  'PUT /imagem/:id/emRevisao': 'ImagemController.emRevisao',
  'PUT /imagem/:id/intRevisao': 'ImagemController.intRevisao',
  'GET /imagem/estado/:estado': 'ImagemController.getImagemPorEstado',
  'GET /imagem/emRevisao/:estado': 'ImagemController.getImagemEmRevisao',
  'GET /imagem/limpaTudo': 'ImagemController.limpaTudo',
  'GET /livro/busca': 'LivroController.buscaLivrosByTituloAreaConAutor',
  'GET /livro/buscaRevisor': 'LivroController.buscaLivrosRevisarByTituloAreaConAutor',
  
  'PUT /descricao/:id/aceita': 'DescricaoController.aceita',
  'PUT /descricao/:id/editada': 'DescricaoController.editada',
  'PUT /descricao/:id/rejeitada': 'DescricaoController.rejeitada',

  'GET /livro/:id/capa': 'LivroController.getCapa',
  'POST /livro/:id/capa': 'LivroController.postCapa',
  'GET /livro/:id/numeroImagens': 'LivroController.getNumImagens'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
