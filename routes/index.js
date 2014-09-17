
/*
 * GET home page.
 */

var item = require('../models/Item.js');


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
        item.loadAllItems(null, function(err, products){

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
        var items = req.session.cart_items;
        console.log(items);
        items.push(barcode);
        console.log(items);
        req.session.cart_items = items;
        console.log(req.session.cart_items);
        console.log(req.session);

//        var cart_items = req.session.cart_items;
//        console.log("cart_items_pre:"+cart_items);
//        cart_items.push(barcode);
//        console.log("cart_items_last:"+cart_items);
//        req.session.cart_items = barcode;
//        console.log(req.session.cart_items);

        
    });



    app.get('/cart', function(req, res) {
        res.render('cart', {});
    })
};