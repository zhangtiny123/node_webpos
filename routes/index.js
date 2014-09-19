
/*
 * GET home page.
 */

var item = require('../models/item.js');
var Processor = require('../models/Processor.js')


module.exports = function(app){
    app.get('/', function(req, res) {
       if(!req.session.cart_items){
            req.session.cart_items = [];
       }
        console.log(req.session.cart_items);
        res.render('index',{
            cart_count : 0
        });
    });

    app.get('/product_list', function(req, res) {
        item.get_item(null, function(err, products){

            if (err){
                products = [];
            }

            res.render('product_list',{
                product_list : products
            });
        });
    });
    app.post('/add_to_cart', function(req, res) {
        var barcode = req.body.barcode;
        var type = req.body.type;

        Processor.process_add_item(barcode);
        
        
    });



    app.get('/cart', function(req, res) {
        res.render('cart', {});
    })
};