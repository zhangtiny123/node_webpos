
/*
 * GET home page.
 */

var item = require('../models/item.js');
var Processor = require('../models/Processor.js');
var Counting = require('../models/Counting.js');


module.exports = function(app){
    app.get('/', function(req, res) {
        Counting.get_cart_counting(function(count) {
            res.render('index',{
                count_of_cart : count
            });
        })
    });

    app.get('/product_list', function(req, res) {
        item.get_item(null, function(err, products){
            if (err){
                products = [];
            }

            Counting.get_cart_counting(function(count) {
                res.render('product_list',{
                    product_list : products,
                    count_of_cart : count
                });

            });


        });
    });
    app.post('/add_to_cart', function(req, res) {
        var barcode = req.body.barcode;
        if (req.body.type == "add") {
            var add_number = 1;
        }
        else {
            add_number = -1;
        }

        Processor.process_add_item(barcode, add_number, function(cart_count, counting) {
//            console.log("return counting:"+counting.count);
            res.json({cart_count:cart_count, counting : counting});

        });


        
    });



    app.get('/cart', function(req, res) {
        res.render('cart', {});
    })
};