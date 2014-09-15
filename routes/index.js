
/*
 * GET home page.
 */
//
//exports.index = function(req, res){
//  res.render('index', {  });
//};
var Products = require('../models/Products.js');
//var crypto = require('crypto');


module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index',{});
    });

    app.get('/product_list', function(req, res) {
        Products.loadAllItems(null, function(err, products){

            if (err){
                products = [];
            }

            res.render('product_list',{
                product_list : products
            });
        });

    });
    app.get('/cart', function(req, res) {
        res.render('cart', {});
    })
};