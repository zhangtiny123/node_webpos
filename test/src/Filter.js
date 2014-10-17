/**
 * Created by tiny on 14-10-17.
 */
function Filter() {

}

Filter.filter_cart_items = function(promotion_rule, cart_items) {
    var processed_str = promotion_rule.replace(/[\s+]/g,"");
    console.log(processed_str);
    return processed_str;
};