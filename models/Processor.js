/**
 * Created by tiny on 14-9-5.
 */
//TODO: Please write code in this file.

var Counting = require("./Counting.js");
var Item = require("./item.js");

function Processor() {

}

module.exports = Processor;

Processor.process_add_item = function(input_barcode) {
    var counting = null;
    Counting.get_cart_info(input_barcode,function(err, cart_item) {
        if(err) {
            console.log(err);
        }

        //数据库中存在相同的物品
        if (cart_item.length != 0){
            counting = new Counting(cart_item.type, cart_item.name, cart_item.barcode, cart_item.price, cart_item.unit);
            counting.count_plus(1);
            counting.calculate_total_price();
        }

        //数据库中没有相同的物品
        else {
            Item.get_item(input_barcode, function(err, product) {
                var counting = new Counting(product.type, product.name, product.barcode, product.price, product.unit);
                counting.count_plus(1);
                counting.calculate_total_price();
            })
        }

        counting.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
    });

};

Processor.current_time = function(){
    var dateDigitToString = function (num) {
        return num < 10 ? '0' + num : num;
    };
    var currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),

        formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return formattedDateString;
};

Processor.get_pay_list = function(list){
    var pay_list = '';
    for (var k=0; k<list.length; k++){
        pay_list +=
            '名称：' + list[k].name + '，数量：' + list[k].count + list[k].unit +
            '，单价：' + list[k].price.toFixed(2) + '(元)，小计：' + list[k].total_price.toFixed(2) + '(元)\n'
    }
    return pay_list;
};

Processor.get_free_list = function(list){
    var free_list = '';
    for (var k1=0; k1<list.length; k1++){
        if(list[k1].promotion_number != 0){
            free_list +=
                '名称：' + list[k1].name + '，数量：' + list[k1].promotion_number + list[k1].unit + '\n'
        }
    }
    return free_list;
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
