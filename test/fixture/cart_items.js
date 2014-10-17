/**
 * Created by tiny on 14-10-17.
 */
function Cart_items () {

}

Cart_items.load_cart_items = function () {
    return [
        {
            type : "水果",
            name : "苹果",
            price : 3.00,
            unit : "斤",
            count : 4,
            publish_time : "09/18/2014",
            extra_information : []
        },
        {
            type : "水果",
            name : "橘子",
            price : 5.00,
            unit : "斤",
            count : 10,
            publish_time : "05/15/2014",
            extra_information : []
        },
        {
            type : "电子产品",
            name : "iphone6",
            price : 6000,
            unit : "部",
            count : 2,
            publish_time : "10/03/2014",
            extra_information : [
                {
                    property_name : "color",
                    property_value : "space gray"
                },
                {
                    property_name : "weight",
                    property_value : "300g"
                }
            ]
        },
        {
            type : "电子产品",
            name : "iMac",
            price : 20000,
            unit : "台",
            count : 3,
            publish_time : "10/17/2014",
            extra_information : [
                {
                    property_name : "color",
                    property_value : "space gray"
                },
                {
                    property_name : "size",
                    property_value : "29inch"
                },
                {
                    property_name : "tel",
                    property_value : "0839-6767899"
                }
            ]
        },
        {
            type : "零食",
            name : "可比克",
            price : 10.00,
            unit : "盒",
            count : 8,
            publish_time : "10/11/2014",
            extra_information : [
                {
                    property_name : "保质期",
                    property_value : "2年"
                },
                {
                    property_name : "产地",
                    property_value : "LA"
                }
            ]
        }
    ]
};