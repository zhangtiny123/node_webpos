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

Item.get_item_test = function( _id, callback){
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
                if (_id) {
                    query._id = _id;
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
            if (_id) {
                query._id = _id;
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
    if(!mongodb.openCalled) {
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
                        skip: (page - 1) * 10,
                        limit: 10
                    }).sort({
                        publish_time: -1
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
    }
    else {
        mongodb.collection('pos', function (err, collection) {
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
                    skip: (page - 1) * 10,
                    limit: 10
                }).sort({
                    publish_time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }

                    callback(null, docs, total);
                });
            });
        });
    }
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

Item.remove_item = function(product_id, callback) {
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

                //根据 query 对象查询文章
                collection.remove({_id: product_id}, function (err) {
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
        //读取 pos 集合
        mongodb.collection('pos', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //根据 query 对象查询文章
            collection.remove({_id: product_id}, function (err) {
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
                query._id = item._id;

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
            query._id = item._id;

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


