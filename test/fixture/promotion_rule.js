/**
 * Created by tiny on 14-10-17.
 */
function Promotion_rule() {

}

Promotion_rule.get_rule = function() {
    return "(name == '苹果' || name == 'iMac') && publish_time < '2014/10/13'";
//    return "count > 2";
//    return "publish_time > '2014/10/01";
};
