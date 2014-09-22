/**
 * Created by tiny on 14-9-16.
 */
function add_to_cart(barcode) {
    $.post('/add_to_cart',{barcode : barcode, type:"add"}, function(data) {
        $("#cart_count").text(data.cart_count);
    })


}
$(".addGood").on("click", function() {
    var THIS =this;
    var barcode = $(this).closest("#item_body").find(".hidden").text();
    $.post('/add_to_cart',{barcode : barcode, type:"add"}, function(data) {
        $("#cart_count").text(data.cart_count);
        $(THIS).closest("#item_body").find(".count_value").text(data.counting.count);
        $(THIS).closest("#item_body").find("#total_price").text(get_total_price_string(data.counting));

    })
});

$(".minusGood").on("click", function() {
    var THIS =this;
    var barcode = $(this).closest("#item_body").find(".hidden").text();
    $.post('/add_to_cart',{barcode : barcode, type:"minus"}, function(data) {
        $("#cart_count").text(data.cart_count);
        $(THIS).closest("#item_body").find(".count_value").text(data.counting.count);
        $(THIS).closest("#item_body").find("#total_price").text(get_total_price_string(data.counting));
    })
});

function get_total_price_string(counting) {
    return counting.promotion_number == 0? counting.total_price.toFixed(2)+"元" :
        counting.total_price.toFixed(2)+"元（原价："+(counting.price * counting.count).toFixed(2)+"元）";
}