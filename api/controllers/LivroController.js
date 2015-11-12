/**
 * LivroController
 *
 * @description :: Server-side logic for managing livroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    postCapa: function(req,res,next){
        var id = req.param('id');
        Livro.findOne({id:id}).exec(function findOneCB(err, livro){
            if (err){
                return res.send(401, err);
            }
            req.file("imagem").upload({
                dirname: path.resolve(__dirname, '../../assets/images')
            }, function (err, file){
                if (err) {
                    return res.send(500, err);
                }
                livro.capa = 'images/' +  path.basename(file[0].fd);
                livro.save(function (err, savedLivro){
                    if (err) {
                        return res.send(500, err);
                    }
                    res.json(savedLivro);
                })
            });
        });
    },
    getCapa: function(req,res){
        var id = req.param('id');
        Livro.findOne({id:id}).exec(function findOneCB(err, livro){
            var filePath = path.resolve(__dirname, '../../assets/images', livro.local);
            var mimetype = mime.lookup(livro.local);

            res.setHeader('Content-disposition', 'attachment; filename=' + livro.local);
            res.setHeader('Content-type', mimetype);

            var filestream = fs.createReadStream(filePath);
            filestream.pipe(res);
        });
    },
};
