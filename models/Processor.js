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
    var counting ;
    console.log("input_barcode:"+ input_barcode);
    Counting.get_cart_info(input_barcode,function(err, cart_item) {
        if(err) {
            console.log("get_cart_info has error!");
            console.log(err);
        }

        //数据库中存在相同的商品
        if (cart_item.length != 0){
            counting = new Counting(cart_item[0].type, cart_item[0].name, cart_item[0].barcode,
                cart_item[0].price, cart_item[0].unit);
            counting.count = cart_item[0].count;
            counting._id = new Object(cart_item[0]._id);
            console.log("id of cart_item :"+cart_item[0]._id);
            console.log("id of counting:"+counting._id);

            console.log("type of cart_item id:"+typeof (cart_item[0]._id));
            console.log("type of counting id:"+typeof (counting._id));


            console.log("the read item built counting."+counting.name);
            counting.count_plus(1);
            counting.calculate_total_price(function(calculated_counting){
                calculated_counting.update_item(calculated_counting, function(err) {
                    if (err) {
                        console.log("error:"+err);
                        console.log("read item built counting save error!");
                    }
                })
            });
        }

        //数据库中没有相同的商品
        else {
            Item.get_item(input_barcode, function(err, product) {
                var counting = new Counting(product[0].type, product[0].name, product[0].barcode, product[0].price, product[0].unit);
                console.log("the fresh counting item:"+counting.name);
                counting.count_plus(1);
                counting.calculate_total_price(function(calculated_counting){
                    calculated_counting.save(function(err) {
                        if (err) {
                            console.log("fresh counting item save error!");
                            console.log(err);
                        }
                    })
                });

            })
        }
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
