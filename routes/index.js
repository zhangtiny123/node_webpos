
/*
 * GET home page.
 */

var item = require('../models/item.js');
var Processor = require('../models/Processor.js');
var Counting = require('../models/Counting.js');
var _ = require('underscore');


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
        Processor.process_add_item(barcode, add_number, function(cart_count, total_payments, counting) {
            res.json({cart_count : cart_count, total_payments : total_payments, counting : counting});
            if (cart_count == 0) {
                Counting.clear_cart(function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        });
    });

    app.get('/cart', function(req, res) {
        Counting.get_cart_counting(function(count, total_payments, items) {
            res.render('cart', {
                total_payments : Processor.calculate_total_payments(items),
                cart_items : items,
                count_of_cart : count
            });
        });

    });

    app.get('/pay_page', function(req, res) {
        Counting.get_cart_counting(function(count, total_payments, items) {
            var promotion_list = _.filter(items, function(item) {
                return item.promotion_number != 0;
            });
            res.render('pay_page',{
                current_time : Processor.current_time(),
                bought_list : items,
                saved_list : promotion_list,
                count_of_cart : count,
                total_payments : Processor.calculate_total_payments(items),
                saved_money : Processor.calculate_saved_money(items)
            });
        })
    });

    app.get('/sure_pay', function(req, res) {
        Counting.clear_cart(function(err) {
            if (err) {
                console.log(err);
            }
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
        })
    })
};