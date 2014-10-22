/**
 * Created by tiny on 14-10-17.
 */
describe("cart_items filter test", function() {
    beforeEach(function() {


        
    });

    it("should return the filtered items 苹果", function() {
        var unit = {
            key : "name",
            value : "苹果",
            symbol : "="
        };
//        var rule = remove_no_use_symbols(Promotion_rule.loadPromotion());
        var item_list = Cart_items.load_cart_items();
        expect(search_items(unit, item_list)[0].properties[1].property_value == "苹果").toBe(true);
    });

    it("should return true with two equal product and false with different products", function() {
        var product1 = {
            properties : [
                {property_name : "type",property_value : "水果",isFixed : true},
                {property_name : "name",property_value : "苹果",isFixed : true},
                {property_name : "price",property_value : "3.00",isFixed : true},
                {property_name : "unit",property_value : "斤",isFixed : true},
                {property_name : "count",property_value : "4",isFixed : true},
                {property_name : "publish_time",property_value : "2014/09/18",isFixed : true}
            ]
        };
        var product2 = {
            properties : [
                {property_name : "type",property_value : "水果",isFixed : true},
                {property_name : "name",property_value : "苹果",isFixed : true},
                {property_name : "price",property_value : "3.00",isFixed : true},
                {property_name : "unit",property_value : "斤",isFixed : true},
                {property_name : "count",property_value : "4",isFixed : true},
                {property_name : "publish_time",property_value : "2014/09/18",isFixed : true}
            ]
        };
        var product3 = {
            properties : [
                {property_name : "type",property_value : "水果",isFixed : true},
                {property_name : "name",property_value : "橘子",isFixed : true},
                {property_name : "price",property_value : "5.00",isFixed : true},
                {property_name : "unit",property_value : "斤",isFixed : true},
                {property_name : "count",property_value : "10",isFixed : true},
                {property_name : "publish_time",property_value : "2014/05/15",isFixed : true}
            ]
        };
        expect(product_equals(product1, product2)).toBe(true);
        expect(product_equals(product1, product3)).toBe(false);
    })
});