/**
 * Created by tiny on 14-10-17.
 */
function Promotion_rule() {

}

Promotion_rule.get_rule = function() {
    return "(name == '苹果' || name == 'iMac') && publish_time < '08/01/2014'";
};