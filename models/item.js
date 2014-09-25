var mongodb = require('./db');

function Item(type, barcode, name, total_number, unit, price) {
    this.type = type;
    this.barcode = barcode;
    this.name = name;
    this.total_number = total_number;
    this.unit = unit;
    this.price = price || 0.00;
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
    var item = {
        type : this.type,
        name : this.name,
        total_number : this.total_number,
        price : this.price,
        unit : this.unit,
        barcode : this.barcode
    };

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

var i = {type : "食品", name : "方便面", total_number : "300", barcode : "ITEM000005", unit : "袋", price : "4.50"};
var j = {type : "生活用品", name : "电池", total_number : "100", barcode : "ITEM000004", unit : "个", price : "2.00"};
var t = {type : "饮料", name : "雪碧", total_number : "200", barcode : "ITEM000001", unit : "瓶", price : "3.00"};
var m = {type : "饮料", name : "可乐", total_number : "200", barcode : "ITEM000000", unit : "瓶", price : "3.00"};
var k = {type : "水果", name : "荔枝", total_number : "80", barcode : "ITEM000003", unit : "斤", price : "15.00"};
var l = {type : "水果", name : "苹果", total_number : "150", barcode : "ITEM000002", unit : "斤", price : "5.50"};



