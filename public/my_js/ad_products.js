/**
* Created by tiny on 14-9-27.
*/

$(".deleteProduce").on("click", function() {
    var THIS = this;
    var product_name = $(this).closest(".product_item").find(".product_name").text();
    var product_id = $(this).closest(".product_item").find(".hidden").text();
    if(confirm("确认删除"+product_name+"吗？")){
        $.post('/delete_item_response', {product_id : product_id}, function(data) {
            var tr_node = $(THIS).closest(".product_item");
            while (tr_node.next().length != 0) {
                var origin_num = tr_node.next().find(".number").text();
                tr_node.next().find(".number").text(origin_num-1);
                tr_node = tr_node.next();
            }
            $(THIS).closest(".product_item").remove();

            window.location.href="/admin"+location.search;
        })
    }
});

$(".minus_product").on("click", function() {
    var p_number = $(this).closest(".product_item").find(".p_number");
    var p_id = $(this).closest(".product_item").find(".hidden").text();
    $.post('/direct_change_number', {add_number:-1, product_id: p_id}, function(data) {
        p_number.val(parseInt(p_number.val())-1);
    })
});

$(".add_product").on("click", function() {
    var p_number = $(this).closest(".product_item").find(".p_number");
    var p_id = $(this).closest(".product_item").find(".hidden").text();
    $.post('/direct_change_number', {add_number:1, product_id: p_id}, function(data) {
        p_number.val(parseInt(p_number.val())+1);
    })
});