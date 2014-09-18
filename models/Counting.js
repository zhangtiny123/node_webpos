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
    this.count += plus_number;
};

Counting.prototype.calculate_total_price = function(){
    var counting = this;
    counting.total_price = 0;
    counting.promotion_number = 0;
    Promotion.loadPromotion("BUY_TWO_GET_ONE_FREE", counting.barcode, function(err, promotion){
        if(promotion.length != 0) {
            var left_count = count;
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
    });



};

Counting.prototype.is_promoted = function(){
    Promotion.loadPromotion("BUY_TWO_GET_ONE_FREE", function(err, promotion){

    });
    for(var i=0; i<promotions[0].barcodes.length; i++){
        if (this.barcode == promotions[0].barcodes[i]){
            return true;
        }
    }
    return false;
};

Counting.get_cart_info = function(barcode, callback) {
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
};

