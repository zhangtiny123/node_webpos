/**
 * Created by tiny on 14-9-5.
 */
//TODO: Please write code in this file.

var Counting = require("./Counting.js");
var Item = require("./item.js");

function Processor() {
}

module.exports = Processor;

Processor.process_add_item = function(input_barcode ,add_num, callback) {
    var counting;
    Counting.get_cart_info(input_barcode, function(err, cart_item) {
        if(err) {
            console.log(err);
        }

        //数据库中存在相同的商品
        if (cart_item.length != 0){
            counting = new Counting(cart_item[0].type, cart_item[0].name, cart_item[0].barcode,
                cart_item[0].price, cart_item[0].unit);
            counting.count = cart_item[0].count;
            counting._id = new Object(cart_item[0]._id);
            counting.count_plus(add_num);
            counting.calculate_total_price(function(calculated_counting){
                calculated_counting.update_item(calculated_counting, function(err) {
                    if (err) {
                        console.log("error:"+err);
                    }
                    Counting.get_cart_counting(function (count, total_payments) {
                        callback(count, total_payments, calculated_counting);
                    })
                });
            });
        }

        //数据库中没有相同的商品
        else {
            Item.get_item(input_barcode, function(err, product) {
                var counting = new Counting(product[0].type, product[0].name, product[0].barcode,
                    product[0].price, product[0].unit);
                counting.count_plus(add_num);
                counting.calculate_total_price(function(calculated_counting){
                    calculated_counting.save(function(err) {
                        if (err) {
                            console.log(err);
                        }
                        Counting.get_cart_counting(function (count, total_payments) {
                            callback(count, total_payments, calculated_counting);
                        })
                    });
                });

            })
        }
    });
};

Processor.current_time = function(choice){
    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds());
    if(choice == 0){
        var formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    }
    else {
        formattedDateString = date+'/'+month+'/'+year+'  '+hour+':'+minute+':'+second;
    }


    return formattedDateString;
};

Processor.calculate_total_payments = function(counting_list) {
    var total_payments = 0;
    for(var i=0; i<counting_list.length; i++){
        total_payments += counting_list[i].total_price;
    }
    return total_payments.toFixed(2);
};

Processor.calculate_saved_money = function(counting_list) {
    var saved_money = 0;
    for(var i=0; i<counting_list.length; i++){
        if(counting_list[i].promotion_number != 0){
            saved_money += counting_list[i].price * counting_list[i].promotion_number;
        }
    }
    return saved_money.toFixed(2);
};
