/**
 * Created by tiny on 14-9-27.
 */
$(document).ready(function() {
    $(".deleteProduce").on("click", function() {
        var THIS = this;
        var product_name = $(this).closest(".product_item").find(".product_name").text();
        if(confirm("确认删除"+product_name+"吗？")){
            $.post('/delete_item_response', {product_name : product_name}, function(data) {
                var tr_node = $(THIS).closest(".product_item");
                while (tr_node.next().length != 0) {
                    var origin_num = tr_node.next().find(".number").text();
                    tr_node.next().find(".number").text(origin_num-1);
                    tr_node = tr_node.next();
                }
                $(THIS).closest(".product_item").remove();
            })
        }
    });
});