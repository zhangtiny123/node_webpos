/**
* Created by tiny on 14-8-16.
*/

var mongodb = require('./db.js');
var Promotion = require('./promotion.js');

function Counting(type, name,barcode,price,unit){
    this.type = type;
    this.name = name;
    this.barcode = barcode;
    this.price = price;
    this.unit = unit;
    this.count = 0;
    this.promotion_number = 0;
    this.total_price = 0;
}

module.exports = Counting;

Counting.prototype.count_plus = function(plus_number){
    if (this.count == 0 && plus_number == -1){
        return;
    }
    this.count += plus_number;
};

Counting.prototype.calculate_total_price = function(callback){
    var counting = this;

    counting.total_price = 0;
    counting.promotion_number = 0;
    Promotion.loadPromotion("BUY_TWO_GET_ONE_FREE", counting.barcode, function(err, promotion){
        if(promotion.length == 1) {
            var left_count = counting.count;
            while(left_count-3 >= 0){
                counting.total_price += counting.price*2;
                left_count -= 3;
                counting.promotion_number += 1;
            }
            counting.total_price += counting.price*(left_count);
        }
        else {
            counting.total_price += counting.price*counting.count;
        }
       callback(counting);
    });
};

Counting.get_cart_counting = function(callback) {
    Counting.get_cart_info(null, function(err, cart_items){

        var count = 0;
        var total_payments = 0;
        for (var i=0; i<cart_items.length; i++) {
            count += cart_items[i].count;
            total_payments += cart_items[i].total_price;
        }
        callback(count , total_payments, cart_items);
    })
};

Counting.get_cart_info = function(barcode, callback) {
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 cart_items 集合
            db.collection('cart_items', function(err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                var query = {};
                if (barcode) {
                    query.barcode = barcode;
                }
                //根据 query 对象查询文章
                collection.find(query).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }
                    callback(null, docs);//成功！以数组形式返回查询的结果
                });
            });
        });
    }
    else {
        mongodb.collection('cart_items', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (barcode) {
                query.barcode = barcode;
            }
            //根据 query 对象查询文章
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    }

};

Counting.prototype.save = function(callback) {
    var item = {
        type : this.type,
        barcode : this.barcode,
        name : this.name,
        price : this.price,
        unit : this.unit,
        promotion_number : this.promotion_number,
        count : this.count,
        total_price : this.total_price
    };

    //打开数据库
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 cart_items 集合
            db.collection('cart_items', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                    //将文档插入 cart_items 集合
                collection.save(item, {
                    safe: true
                }, function (err) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }
                    callback(null);//返回 err 为 null
                });
            });
        });

    }
    else{
        mongodb.collection('cart_items', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将文档插入 cart_items 集合
            collection.save(item, {
                safe: true
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    }
};

Counting.prototype.update_item = function(item, callback) {
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 cart_items 集合
            db.collection('cart_items', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                var query = {};
                query.barcode = item.barcode;

                //将文档插入 cart_items 集合
                collection.update(query, item, function (err) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }
                    callback(null);//返回 err 为 null
                });
            });
        });
    }
    else{
        mongodb.collection('cart_items', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            var query = {};
            query.barcode = item.barcode;

            //将文档插入 cart_items 集合
            collection.update(query, item, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    }
};

Counting.clear_cart = function (callback) {
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 cart_items 集合
            db.collection('cart_items', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                //删除 cart_items 集合
                collection.drop( function (err) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }
                    callback(null);//返回 err 为 null
                });
            });
        });
    }
    else{
        mongodb.collection('cart_items', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //删除 cart_items 集合
            collection.drop( function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    }
};

