var mongodb = require('./db');
var _ = require('underscore');

function Item(type, name, unit, price, publish_time, total_number, properties) {
    this.type = type;
    this.name = name;
    this.unit = unit;
    this.price = price || 0.00;
    this.publish_time = publish_time;
    this.total_number = total_number;
    this.extra_properties = properties;
}

module.exports = Item;

Item.get_item = function( name, callback){
    if(!mongodb.openCalled) {
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 posts 集合
            db.collection('pos', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                var query = {};
                if (name) {
                    query.name = name;
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
    else{
        //读取 posts 集合
        mongodb.collection('pos', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
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

Item.get_ten_item = function(name, page, callback) {
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
                var query = {};
                if (name) {
                    query.name = name;
                }
                //使用 count 返回特定查询的文档数 total
                collection.count(query, function (err, total) {
                    //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
                    collection.find(query, {
                        skip: (page - 1)*10,
                        limit: 10
                    }).sort({
                        publish_time : -1
                    }).toArray(function (err, docs) {
                        mongodb.close();
                        if (err) {
                            return callback(err);
                        }

                        callback(null, docs, total);
                    });
                });
            });
        });
};

Item.prototype.save = function(callback) {
    var item = {};
    item.type = this.type;
    item.name = this.name;
    item.unit = this.unit;
    item.price = this.price;
    item.publish_time = this.publish_time;
    item.total_number = this.total_number;
    item.extra_properties = this.extra_properties;

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
    if(!mongodb.openCalled) {
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 posts 集合
            db.collection('pos', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                console.log("进入了删除函数！！！");

                //根据 query 对象查询文章
                collection.remove({name: product_name}, function (err) {
                    console.log("执行了删除函数！！！");
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }
                    callback(null);
                });
            });
        });
    }
    else {
        //读取 posts 集合
        mongodb.collection('pos', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            console.log("进入了删除函数！！！");

            //根据 query 对象查询文章
            collection.remove({name: product_name}, function (err) {
                console.log("执行了删除函数！！！");
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);
            });
        });
    }
};

Item.update_item = function(item, callback) {
    if(!mongodb.openCalled){
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

                var query = {};
                query.name = item.name;

                //将文档插入 pos 集合
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
            query.name = item.name;

            //将文档插入 pos 集合
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

//var i = {type : "食品", name : "方便面", total_number : "300", barcode : "ITEM000005", publish_time : "17/9/2014", unit : "袋", price : "4.50"};
//var j = {type : "生活用品", name : "电池", total_number : "100", barcode : "ITEM000004", publish_time : "12/9/2014", unit : "个", price : "2.00"};
//var t = {type : "饮料", name : "雪碧", total_number : "200", barcode : "ITEM000001", publish_time : "14/9/2014", unit : "瓶", price : "3.00"};
//var m = {type : "饮料", name : "可乐", total_number : "200", barcode : "ITEM000000", publish_time : "15/9/2014", unit : "瓶", price : "3.00"};
//var k = {type : "水果", name : "荔枝", total_number : "80", barcode : "ITEM000003", publish_time : "17/9/2014", unit : "斤", price : "15.00"};
//var l = {type : "水果", name : "苹果", total_number : "150", barcode : "ITEM000002", publish_time : "17/8/2014", unit : "斤", price : "5.50"};



