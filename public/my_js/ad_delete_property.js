/**
 * Created by tiny on 14-10-6.
 */
var middle_path = $("#middle_path");
var path_value = middle_path.text();
var id = $("#product_id").text();
if(path_value == "添加商品") {
    middle_path.attr('href','/ad_add_products')
}
else {
    middle_path.attr('href','/ad_products_detail?id='+id+'');
}

$(".delete_property").on("click", function() {
    var THIS = this;
    var property_id = $(this).closest(".property_item").find(".hidden").text();
    var property_name = $(this).closest(".property_item").find(".property_name").text();
    if(confirm("确认删除"+property_name+"吗？")){
        $.post('/delete_property', {property_id : property_id, product_id : id}, function(data) {
            $(THIS).closest(".property_item").remove();
        })
    }
});