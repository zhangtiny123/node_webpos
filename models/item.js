var mongodb = require('./db');
var _ = require('underscore');

function Item(properties) {
    this.properties = properties;
}

module.exports = Item;

Item.get_item = function( barcode, callback){
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('pos', function(err, collection) {
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

Item.prototype.save = function(callback) {
    var item = {};
    _.each(this.properties, function(property) {
        item.property.name = property.property_value;
    });

    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 pos 集合
        db.collection('pos', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将文档插入 pos 集合
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

Item.remove_item = function(product_name, callback) {
    console.log(product_name.length);
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('pos', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            console.log("进入了删除函数！！！");

            //根据 query 对象查询文章
            collection.remove({name : product_name}, function (err) {
                console.log("执行了删除函数！！！");
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);
            });
        });
    });
};

//var i = {type : "食品", name : "方便面", total_number : "300", barcode : "ITEM000005", publish_time : 17/9/2014, unit : "袋", price : "4.50"};
//var j = {type : "生活用品", name : "电池", total_number : "100", barcode : "ITEM000004", publish_time : 12/9/2014, unit : "个", price : "2.00"};
//var t = {type : "饮料", name : "雪碧", total_number : "200", barcode : "ITEM000001", publish_time : 14/9/2014, unit : "瓶", price : "3.00"};
//var m = {type : "饮料", name : "可乐", total_number : "200", barcode : "ITEM000000", publish_time : 15/9/2014, unit : "瓶", price : "3.00"};
//var k = {type : "水果", name : "荔枝", total_number : "80", barcode : "ITEM000003", publish_time : 17/9/2014, unit : "斤", price : "15.00"};
//var l = {type : "水果", name : "苹果", total_number : "150", barcode : "ITEM000002", publish_time : 17/8/2014, unit : "斤", price : "5.50"};



