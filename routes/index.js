
/*
 * GET home page.
 */

var item = require('../models/item.js');
var Processor = require('../models/Processor.js');
var Counting = require('../models/Counting.js');
var _ = require('underscore');
var Property = require('../models/product_property.js');


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
        var name = req.body.product_name;
        if (req.body.type == "add") {
            var add_number = 1;
        }
        else {
            add_number = -1;
        }
        Processor.process_add_item(name, add_number, function(cart_count, total_payments, counting) {
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
                current_time : Processor.current_time(0),
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
    });

    app.get('/admin', function(req, res) {
        item.get_item(null, function(err, products) {
            if(err) {
                products = {};
            }
            res.render('ad_products', {
                products : products
            })
        });
    });

    app.post('/direct_change_number', function(req, res) {
        var add_number = req.body.add_number;
        var product_name = req.body.product_name;
        item.get_item(product_name, function(err, product_item) {
            if (err) {
                return err;
            }
            add_number = parseInt(add_number);
            var changed_item = new item(product_item[0].type, product_item[0].name, product_item[0].unit, product_item[0].price, product_item[0].publish_time, parseInt(product_item[0].total_number)+add_number, product_item[0].extra_properties);
            changed_item._id = new Object(product_item[0]._id);
            item.update_item(changed_item, function(err) {
                if (err) {
                    return err;
                }
                res.json({message:"success"});
            })
        })
    });

    app.post('/delete_item_response', function(req, res) {
        var product_name = req.body.product_name;
        item.remove_item(product_name, function(err) {
            if (err) {
                return callback(err);
            }
            res.json({data:"success"});

        })
    });

    app.get('/ad_add_products', function(req, res) {
        Property.get_properties(null, function(err, properties) {
            if (err) {
                return err;
            }
            res.render('ad_add_products', {
                extra_attributes : properties
            })
        });

    });

    app.post('/ad_add_products', function(req, res) {
        var type = req.body.type;
        var name = req.body.name;
        var total_number = req.body.total_number;
        var unit = req.body.unit;
        var price = req.body.price;
        var publish_time = Processor.current_time(1);
        Property.get_properties(null, function(err, properties) {
            if (err) {
                properties=[];
            }
            var product_item = new item(type, name, unit, price, publish_time, total_number, properties);
            product_item.save(function(err) {
                if (err) {
                    console.log(err);
                }
                Property.clear_properties(function(err) {
                    if(err) {
                        return err;
                    }
                    res.redirect('/admin');
                });

            })
        });

    });

    app.get('/ad_add_property', function(req, res) {

        var product_name = req.query.product_name;
        if(product_name == undefined){
                res.render('ad_add_property', {
                    middle_path : "添加商品"
                })
        }
        else {
                res.render('ad_add_property', {
                    middle_path : product_name
            })
        }
    });

    app.post('/ad_add_property', function(req, res) {
        var product_name = req.body.product_name;
        var property_name = req.body.property_name;
        var property_value = req.body.property_value;

        if(product_name == "添加商品"){
            var property = new Property(property_name, property_value);
            property.save(function(err) {
                if(err) {
                    return err;
                }
                res.redirect('/ad_add_products');
            })
        }
        else{
            var property1 = new Property(property_name, property_value);
            item.get_item(product_name, function(err, product_item) {
                var extra_attrs = product_item[0].extra_properties;
                extra_attrs.push(property1);
                var changed_item = new item(product_item[0].type, product_item[0].name, product_item[0].unit, product_item[0].price, product_item[0].publish_time, parseInt(product_item[0].total_number), extra_attrs);
                changed_item._id = new Object(product_item[0]._id);
                item.update_item(changed_item, function(err) {
                    if (err) {
                        return err;
                    }
                    res.json({message:"success"});
                })
            })
        }
    });

    app.get('/ad_delete_property', function(req, res) {
        var product_name = req.query.product_name;
        if(product_name == undefined){
            Property.get_properties(null, function(err, properties){
                console.log("properties:"+properties);
                res.render('ad_delete_property', {
                    middle_path : "添加商品",
                    properties : properties
                })
            })
        }
        else {
            item.get_item(product_name, function(err, the_item) {
                res.render('ad_delete_property', {
                    middle_path : product_name,
                    properties : the_item[0].extra_properties
                })
            })
        }

    });

    app.post('/delete_property', function(req, res) {
        var property_name = req.body.property_name;
        var product_name = req.body.path_value;

        if(product_name == "添加商品") {
            Property.remove_property(property_name, function(err) {
                if (err) {
                    return err;
                }
                res.json({message:"delete success"});
            })
        }
        else {
            item.get_item(product_name, function(err, the_item) {
                var extra_properties = the_item[0].extra_properties;
                var i = 0;
                var delete_index = null;
                _.each(extra_properties, function(property) {
                    if (property.name == property_name) {
                        delete_index = i;

                    }
                    i += 1;
                });
                the_item[0].extra_properties.splice(delete_index, 1);
                var new_item = new item(the_item[0].type, the_item[0].name, the_item[0].unit, the_item[0].price, the_item[0].publish_time, the_item[0].total_number, the_item[0].extra_properties);
                new_item._id = new Object(the_item[0]._id);
                item.update_item(new_item, function(err) {
                    if (err) {
                        return err;
                    }
                    res.json({message:"success"});
                })
            })
        }
    });

    app.get('/ad_products_detail', function(req, res) {
        var got_name = req.query.product_name;
        item.get_item(got_name, function(err, product_item) {
            res.render('ad_products_detail',{
                product_item : product_item[0]
            })
        });
    });

    app.post('/ad_products_detail',function(req,res){
        var name = req.body.product_name;
        var total_number = req.body.total_number;
        var unit = req.body.unit;
        var price = req.body.price;
        var publish_time = req.body.publish_time;



        var product_item = {
            name : name,
            total_number : total_number,
            unit : unit,
            price : price,
            publish_time : publish_time
        };

        item.update_item(product_item, function(err) {
            if(err) {
                return err;
            }
            res.flash("success!");
        })
    })
};