/**
 * Created by tiny on 14-10-17.
 */
describe("cart_items filter test", function() {
    it("should return the filtered items 苹果 iMac", function() {

        var t = filter_the_items(Promotion_rule.get_rule(),Cart_items.load_cart_items());
        expect(t[0].properties[1].property_value).toBe("苹果");
        expect(t[1].properties[1].property_value).toBe("iMac");
    })
});