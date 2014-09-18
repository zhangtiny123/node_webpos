var mongodb = require('./db');

function Item(type, barcode, name, unit, price) {
    this.type = type;
    this.barcode = barcode;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
}

module.exports = Item;

//Item.find_by_barcode = function(barcode){
//    Item.loadAllItems(null, function(err, products){
//        if(err) {
//            products = []
//        }
//
//    });
//
//    console.log("items:"+items);
//    for (var i=0; i<items.length; i++) {
//        if (items[i].barcode == barcode) {
//            return items[i];
//        }
//    }
//    return null;
//};

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

Item.save = function() {
    var item = {
        type : this.type,
        name : this.name,
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



