/**
 * Created by tiny on 14-10-17.
 */

function filter_the_items(rule, item_list) {

    rule = remove_no_use_symbols(rule);
    console.log(rule);
    if(rule.indexOf("&") == -1) {
        this_rule = rule;
        left_rule = "";
    }
    else {
        var this_rule = rule.slice(0,rule.indexOf("&"));
        var left_rule = rule.slice(rule.indexOf("&") + 1);
    }
    this_rule = this_rule.replace(/[\(\)]/g,"");
    var processed_item_list = [];
    var temp = this_rule.split("|");
    for (var j=0; j<temp.length; j++) {
        (function () {
            temp[j] = temp[j].replace(/[\']/g,"");
            if(temp[j].indexOf("=") != -1) {
                _.each(item_list, function(item) {
                    _.each(item.properties, function(property) {
                        if(property.property_name == temp[j].split("=")[0] && property.property_value == temp[j].split("=")[1]) {
                            processed_item_list.push(item);
                        }
                    })
                })
            }
            else if(temp[j].indexOf("<") != -1) {
                _.each(item_list, function(item) {
                    _.each(item.properties, function(property) {
                        if(property.property_name == temp[j].split("<")[0] && property.property_value < temp[j].split("<")[1]) {
                            processed_item_list.push(item);
                        }
                    })
                })
            }
            else if(temp[j].indexOf(">") != -1) {
                _.each(item_list, function(item) {
                    _.each(item.properties, function(property) {
                        if(property.property_name == temp[j].split(">")[0] && property.property_value > temp[j].split(">")[1]) {
                            processed_item_list.push(item);
                        }
                    })
                })
            }
        })(j);
    }
    console.log(processed_item_list);
    return left_rule == "" ? processed_item_list :  filter_the_items(left_rule, processed_item_list);
}



function remove_no_use_symbols(rule_string) {
    rule_string = rule_string.replace(/['\s+]/g,"");
    rule_string = rule_string.replace(/[&]{2}/g,"&");
    rule_string = rule_string.replace(/[=]{2}/g,"=");
    return rule_string.replace(/[|]{2}/g,"|");
}

function stack_filter(rule, item_list) {
    rule = remove_no_use_symbols(rule);
    console.log(rule);

    var symbol_stack = [];
    var search_result_stack = [];
    var search_unit = {
        key : "",
        value : "",
        symbol : ""
    };
    rule = rule.split("");

    while(rule.length != 0 ) {
        console.log(rule);
        var char = rule.shift();
        console.log(search_unit.key);
        if (char.match(/[\(\)&|]/)) {
            if(search_unit.key != "") {
                search_result_stack.push(search_items(search_unit, item_list));

                search_unit = {
                    key : "",
                    value : "",
                    symbol : ""
                };
            }
            console.log("comes here");
            console.log(search_result_stack[0]);
//            if(get_in_coming_priority(char) > get_in_stack_priority(get_top(symbol_stack))) {
//                symbol_stack.push(char);
//            }
//            else if(get_in_coming_priority(char) == get_in_stack_priority(get_top(symbol_stack))) {
//                symbol_stack.pop();
//            }
//            while(get_in_coming_priority(char) < get_in_stack_priority(get_top(symbol_stack))) {
//                var current_compute_symbol = symbol_stack.pop();
//                if (current_compute_symbol == "&") {
//                    search_result_stack.push(and_compute(search_result_stack.pop() , search_result_stack.pop()));
//                }
//                else if (current_compute_symbol == "|") {
//                    search_result_stack.push(or_compute(search_result_stack.pop() , search_result_stack.pop()));
//                }
//                symbol_stack.push(char);
//            }
        }
        else {
            if(!char.match(/[=<>]/) && search_unit.symbol == ""){
                search_unit.key.concat(char);
            }
            else if(!char.match(/[=<>]/) && search_unit.symbol != "") {
                search_unit.value.concat(char);
            }
            else if(char.match(/[=<>]/)) {
                search_unit.symbol.concat(char);
            }
        }
    }
    while(symbol_stack.length != 0) {
        if (search_unit.key != "") {
            search_result_stack.push(search_items(search_unit, item_list));
            search_unit = {
                key : "",
                value : "",
                symbol : ""
            };
        }
        var current_symbol = symbol_stack.pop();
        if (current_symbol == "&") {
            search_result_stack.push(and_compute(search_result_stack.pop() , search_result_stack.pop()));
        }
        else if (current_symbol == "|") {
            search_result_stack.push(or_compute(search_result_stack.pop() , search_result_stack.pop()));
        }
    }
    return search_result_stack[0];
}

function get_in_coming_priority(symbol) {
    switch (symbol) {
        case ')' :
            return 1;break;
        case '|' :
            return 2;break;
        case '&' :
            return 4;break;
        case '(' :
            return 8;break;
        default :
            return 0;
    }
}

function get_in_stack_priority(symbol) {
    switch (symbol) {
        case '(' :
        return 1;break;
        case '|' :
            return 3;break;
        case '&' :
            return 5;break;
        case ')' :
            return 8;break;
        default :
            return 0;
    }
}

function get_top(stack_list) {
    if (stack_list.length == 0) {
        return -1;
    }
    return stack_list[stack_list.length-1];
}

function search_items(search_unit ,item_list) {
    var find_list = [];
    _.each(item_list, function(item) {
        _.each(item.properties, function(property) {
            if(search_unit.symbol == "=" && property.property_name == search_unit.key && property.property_value == search_unit.value) {
                find_list.push(item);
            }
            else if(search_unit.symbol == ">" && property.property_name == search_unit.key && property.property_value > search_unit.value) {
                find_list.push(item);
            }
            else if(search_unit.symbol == ">" && property.property_name == search_unit.key && property.property_value > search_unit.value) {
                find_list.push(item);
            }
        })
    });
    console.log(find_list);
    return find_list;
}

function and_compute(list1, list2) {
    var computed_list = [];
    for(var i=0; i<list1.length; i++) {
        for(var j=0; j<list2.length; j++) {
            if (product_equals(list1[i],list2[j])) {
                computed_list.push(list2[j]);
            }
        }
    }
    return computed_list;
}

function or_compute(list1, list2) {
    var computed_list = [];
    computed_list.concat(list1, list2);
    return computed_list;
}

function product_equals(product1, product2) {
    if (product1.properties.length != product2.properties.length) {
        return false;
    }
    else {
        for (var i=0; i<product1.properties.length; i++) {
            if (product1.properties[i].property_name != product2.properties[i].property_name
                ||product1.properties[i].property_value != product2.properties[i].property_value
                ){
                return false;
            }
        }
    }
    return true;
}




