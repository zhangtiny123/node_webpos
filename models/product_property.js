/**
 * Created by tiny on 14-9-25.
 */

var mongodb = require('./db.js');

function Product_property(name, value) {
    this.name = name;
    this.property_value = value;
}

module.exports = Product_property;

Product_property.get_properties = function(property_name, callback) {
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 properties 集合
            db.collection('properties', function(err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                var query = {};
                if (property_name) {
                    query.property_name = property_name;
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
        mongodb.collection('properties', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (property_name) {
                query.property_name = property_name;
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

Product_property.prototype.save = function(callback) {
    var property = {
        name : this.name,
        property_value : this.property_value
    };

    //打开数据库
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 properties 集合
            db.collection('properties', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                //将文档插入 properties 集合
                collection.save(property, {
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
            //将文档插入 properties 集合
            collection.save(property, {
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

Product_property.clear_properties = function(callback) {
    if(!mongodb.openCalled){
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 properties 集合
            db.collection('properties', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }

                //删除 properties 集合
                collection.remove({}, function (err) {
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
            collection.remove({}, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    }
};

Product_property.remove_property = function(_id, callback) {
    if(!mongodb.openCalled) {
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //读取 properties 集合
            db.collection('properties', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }


                collection.remove({_id: _id}, function (err) {
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
        //读取 properties 集合
        mongodb.collection('properties', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //根据 query 对象查询文章
            collection.remove({_id: _id}, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);
            });
        });
    }
};
