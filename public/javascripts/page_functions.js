/**
 * Created by tiny on 14-9-16.
 */
function add_to_cart(barcode){
    $.post('/add_to_cart',{barcode : barcode, type:"add"},function(data){
        $("#cart_count").text(data.cart_count);
    })
}