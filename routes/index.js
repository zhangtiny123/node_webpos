
/*
 * GET home page.
 */
//
//exports.index = function(req, res){
//  res.render('index', {  });
//};

var crypto = require('crypto')
module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index',{});
    });
    app.get('/product_list', function(req, res) {
        res.render('product_list',{});
    });
    app.get('/cart', function(req, res) {
        res.render('cart', {});
    })
};