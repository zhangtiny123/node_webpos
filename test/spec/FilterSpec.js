/**
 * Created by tiny on 14-10-17.
 */
describe("cart_items filter test", function() {
    var product1;
    var product2;
    var product3;
    var product4;
    beforeEach(function() {
        product1 = {
            properties : [
                {property_name : "type",property_value : "水果",isFixed : true},
                {property_name : "name",property_value : "苹果",isFixed : true},
                {property_name : "price",property_value : "3.00",isFixed : true},
                {property_name : "unit",property_value : "斤",isFixed : true},
                {property_name : "count",property_value : "4",isFixed : true},
                {property_name : "publish_time",property_value : "2014/09/18",isFixed : true}
            ]
        };
        product2 = {
            properties : [
                {property_name : "type",property_value : "水果",isFixed : true},
                {property_name : "name",property_value : "苹果",isFixed : true},
                {property_name : "price",property_value : "3.00",isFixed : true},
                {property_name : "unit",property_value : "斤",isFixed : true},
                {property_name : "count",property_value : "4",isFixed : true},
                {property_name : "publish_time",property_value : "2014/09/18",isFixed : true}
            ]
        };
        product3 = {
            properties : [
                {property_name : "type",property_value : "水果",isFixed : true},
                {property_name : "name",property_value : "橘子",isFixed : true},
                {property_name : "price",property_value : "5.00",isFixed : true},
                {property_name : "unit",property_value : "斤",isFixed : true},
                {property_name : "count",property_value : "10",isFixed : true},
                {property_name : "publish_time",property_value : "2014/05/15",isFixed : true}
            ]
        };
        product4 = {
            properties : [
                {property_name : "type",property_value : "零食",isFixed : true},
                {property_name : "name",property_value : "可比克",isFixed : true},
                {property_name : "price",property_value : "10.00",isFixed : true},
                {property_name : "unit",property_value : "盒",isFixed : true},
                {property_name : "count",property_value : "8",isFixed : true},
                {property_name : "publish_time",property_value : "2014/10/11",isFixed : true},
                {property_name : "保质期",property_value : "2年",isFixed : false},
                {property_name : "产地",property_value : "LA",isFixed : false}
            ]
        };
    });

    it("should return the filtered items 苹果", function() {
        var unit = {
            key : "name",
            value : "苹果",
            symbol : "="
        };

        var item_list = Cart_items.load_cart_items();
        expect(search_items(unit, item_list)[0].properties[1].property_value == "苹果").toBe(true);
    });

    it("should return true with two equal product and false with different products", function() {
        expect(product_equals(product1, product2)).toBe(true);
        expect(product_equals(product1, product3)).toBe(false);
    });

    it("should return the and computed list", function() {
        var list1 = [];
        var list2 = [];
        list1.push(product1);
        list2.push(product1);
        list2.push(product3);

        expect(and_compute(list1, list2).length).toBe(1);
        expect(and_compute(list1, list2)[0].properties[1].property_value).toBe("苹果");
    });

    it("should return the or computed list", function() {
        var list1 =[];
        var list2 = [];
        list1.push(product1);
        list2.push(product1);
        list2.push(product3);
        list2.push(product4);

        expect(or_compute(list1, list2).length).toBe(3);
    });

    it("should return the top element", function() {
        var test_stack = ["(","|","&"];
        expect(get_top(test_stack)).toBe("&");
    });

    it("should return 5 with symbol '&' in stack priority", function() {
        expect(get_in_stack_priority("&")).toBe(5);
    });

    it("should return 4 with symbol '&' in coming priority", function() {
        expect(get_in_coming_priority("&")).toBe(4);
    });

    it("should return true with the product in the list", function() {
        var list = [];
        list.push(product1);
        list.push(product3);
        list.push(product4);
        expect(is_product_in_list(list, product2)).toBe(true);
    });

    it("should filter out 苹果 and iMac", function () {
        var rule = remove_no_use_symbols(Promotion_rule.get_rule());
        var item_list = Cart_items.load_cart_items();
        expect(stack_filter(rule, item_list).length).toBe(3);
        expect(stack_filter(rule, item_list)[0].properties[1].property_value).toBe("苹果");
        expect(stack_filter(rule, item_list)[2].properties[1].property_value).toBe("iMac");
    });

    it("should filter out 苹果 iphone6 and iMac with color space gray", function() {
        var rule = "(name == '苹果' && publish_time < 2014/08/01) || ((name == 'iphone6' || name =='iMac') && color == 'space_gray')";
        var item_list = Cart_items.load_cart_items();
        expect(stack_filter(rule, item_list).length).toBe(3);
    });

    it("should filter out the products whose count > 9", function() {
        var rule = "count > 009";
        var item_list = Cart_items.load_cart_items();
        expect(stack_filter(rule, item_list).length).toBe(3);
    })
});