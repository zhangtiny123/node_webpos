var mongodb = require('./db.js');

function Promotion(type, barcode) {
    this.type = type;
    this.barcode = barcode;
}

module.exports = Promotion;

Promotion.loadPromotion = function(type, barcode, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 promotions 集合
        db.collection('promotions', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (type) {
                query.type = type;
                query.barcode = barcode;
            }
            //根据 query 对象查询促销活动
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

Promotion.save = function(callback) {
    var promotion = {
        type : this.type,
        barcode : this.barcode
    };

    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 promotions 集合
        db.collection('promotions', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将文档插入 pos 集合
            collection.save(promotion, {
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

