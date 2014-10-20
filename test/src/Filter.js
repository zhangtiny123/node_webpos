/**
 * Created by tiny on 14-10-17.
 */

function filter_the_items(rule, item_list) {
    rule = remove_space(rule);
    if(rule.indexOf("&&") == -1) {
        this_rule = rule;
        left_rule = "";
    }
    else {
        console.log("****"+rule.indexOf("&&"));
        var this_rule = rule.slice(0,rule.indexOf("&&"));
        var left_rule = rule.slice(rule.indexOf("&&") + 2);
    }

    this_rule = this_rule.replace(/[\(\)]/g,"");
    var processed_item_list = [];

    var temp = this_rule.split("||");
    for (var j=0; j<temp.length; j++) {
        (function () {
            var the_key = "";
            var the_value = "";
            temp[j] = temp[j].replace(/[\']/g,"");
            if(temp[j].indexOf("==") != -1) {
                the_key = temp[j].split("==")[0];
                the_value = temp[j].split("==")[1];
                _.each(item_list, function(item) {
                    _.each(item.properties, function(property) {
                        if(property.property_name == the_key && property.property_value == the_value) {
                            processed_item_list.push(item);
                        }
                    })
                })
            }
            else if(temp[j].indexOf("<") != -1) {
                the_key = temp[j].split("<")[0];
                the_value = temp[j].split("<")[1];
                _.each(item_list, function(item) {
                    _.each(item.properties, function(property) {
                        if(property.property_name == the_key && property.property_value < the_value) {
                            processed_item_list.push(item);
                        }
                    })
                })
            }
            else if(temp[j].indexOf(">") != -1) {
                the_key = temp[j].split(">")[0];
                the_value = temp[j].split(">")[1];
                _.each(item_list, function(item) {
                    _.each(item.properties, function(property) {
                        if(property.property_name == the_key && property.property_value > the_value) {
                            processed_item_list.push(item);
                        }
                    })
                })
            }
        })(j);
    }
    return left_rule == "" ? processed_item_list :  filter_the_items(left_rule, processed_item_list);
}

function remove_space(rule_string) {
    return rule_string.replace(/[\s+]/g,"");
}




