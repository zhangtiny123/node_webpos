/**
 * Created by tiny on 14-10-17.
 */
describe("cart_items filter test", function() {
    it("should give us string without backspace", function() {
        var t = filter_the_items(Promotion_rule.get_rule(),Cart_items.load_cart_items());
//        expect(str).toBe("(name=='苹果'||name=='iMac')&&publish_time<'08/01/2014'");
        console.log(t[0]);
    })
});