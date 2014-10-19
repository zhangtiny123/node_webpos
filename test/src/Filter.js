/**
 * Created by tiny on 14-10-17.
 */

//var _ = require("underscore");
function Filter(promotion_rule, cart_items) {
    var processed_str = remove_space(promotion_rule);
    var rules_arr = processed_str.split("&&");

    var strin = "'goabsdle||fxxk'";
    var tt = strin.indexOf("b");
    console.log(strin);
    console.log(strin.replace(/[\']/g,""));
    console.log(strin.split("||")[1]);
    console.log(strin.slice(0,tt));



    var arr = [1,2,3,4,5,6,7,8,9];
    var brr = _.filter(arr, function(num) {
        return num*num > 10 && num*num<30;
    });
    console.log("brr:" + brr);



    for (var i=0; i<rules_arr.length; i++){
        rules_arr[i]= rules_arr[i].replace(/[\(\)]/g,"");
        console.log(rules_arr[i]);
        if(rules_arr[i].indexOf("||") != -1){
            var temp = rules_arr[i].split("||");
            for (var j=0; j<temp.length; j++) {
                if(str.indexOf("==") != -1) {

                }
                else if(str.indexOf("<") != -1) {

                }
                else if(str.indexOf(">") != -1) {

                }
            }
        }
    }

    console.log('09/18/2014'<'01/01/2015');

}

function filter_the_items(rule, item_list) {
    if(rule.indexOf("&&" != -1)) {
        var this_rule = rule.slice(0,rule.indexOf("&&"));
        var left_rule = rule.slice(rule.indexOf("&&") + 2);
    }
    else {
        this_rule = rule;
        left_rule = "";
    }

    this_rule = this_rule.replace(/[\(\)]/g,"");
    this_rule = remove_space(this_rule);
    var processed_item_list = [];

    var temp = this_rule.split("||");
    for (var j=0; j<temp.length; j++) {
        (function () {
            var the_key = "";
            var the_value = "";
            var selected = {};
            temp[j] = temp[j].replace(/[\']/g,"");
            console.log("temp j:"+temp[j]);
            if(temp[j].indexOf("==") != -1) {
                the_key = temp[j].split("==")[0];
                the_value = temp[j].split("==")[1];
                selected = _.filter(item_list, function(item) {
                    return has_the_property(item.properties, the_key, the_value)
                });
                console.log("selected :"+selected);
            }
            else if(temp[j].indexOf("<") != -1) {
                the_key = temp[j].split("<")[0];
                the_value = temp[j].split("<")[1];
                selected = _.filter(item_list, function(item) {
                    return has_less_the_property(item.properties, the_key, the_value)
                })
            }
            else if(temp[j].indexOf(">") != -1) {
                the_key = temp[j].split(">")[0];
                the_value = temp[j].split(">")[1];
                selected = _.filter(item_list, function(item) {
                    return has_more_the_property(item.properties, the_key, the_value)
                })
            }
            console.log(processed_item_list);
            processed_item_list.push(selected);
        })(j)
    }
    return left_rule == "" ? processed_item_list :  filter_the_items(left_rule, processed_item_list);
}

function has_the_property(properties, attr_name, attr_value) {
    var index = 0;
    console.log(properties);
    _.each(properties, function(property) {
//        console.log(property);
        if(property.property_name == attr_name && property.property_value == attr_value) {

//            console.log("find the item !" + index);
            return true;
        }
        index += 1;
    });
    return false;
}


function has_less_the_property(properties, attr_name, attr_value) {
    _.each(properties, function(property) {
        if(property.property_name == attr_name && property.property_value < attr_value) {

            return true;
        }
    });
    return false;
}

function has_more_the_property(properties, attr_name, attr_value) {
    _.each(properties, function(property) {
        if(property.property_name == attr_name && property.property_value > attr_value) {
            return true;
        }
    });
    return false;
}


function remove_space(rule_string) {
    return rule_string.replace(/[\s+]/g,"");
}

//Filter.filter_cart_items = function(promotion_rule, cart_items) {
//    var processed_str = Filter.remove_space(promotion_rule);
//    console.log(processed_str);
//    console.log("first character :" + (processed_str[0]=="("));
//    console.log("index of &:" + processed_str.indexOf("&"));
//    console.log("index of &&:" + processed_str.indexOf("&&"));
//    console.log("index of ||:" + processed_str.indexOf("=="));
//
//    var left_string = processed_str.slice(0,processed_str.indexOf("&"));
//    console.log("left string :"+left_string);
//    if (left_string.indexOf("(") != -1){
//        var left_string_without_bracket = left_string.slice(1,left_string.length-1);
//    }
//    console.log("left string without bracket:"+ left_string_without_bracket);
//    var key_value_string = left_string_without_bracket.split("||");
//    console.log("***"+key_value_string);
//    var right_string = processed_str.slice(processed_str.indexOf("&")+2,processed_str.length);
//    console.log("right string :"+right_string);


//};

//Filter.remove_space = function(rule_string) {
//    return rule_string.replace(/[\s+]/g,"");
//};




