/**
* Created by tiny on 14-10-6.
*/

var middle_path = $("#middle_path");
var path_value = middle_path.text();
var id = $("#p_id").val();
console.log(id);
console.log(path_value);
if(path_value == "添加商品") {
    middle_path.attr('href','/ad_add_products');
    $("#cancel").attr('href','/ad_add_products');
}
else {
    middle_path.attr('href','/ad_products_detail?id='+id+'');
    $("#cancel").attr('href','/ad_products_detail?id='+id+'');
}



$("#save_btn").on("click", function() {
    var property_name = $("#attr_name").val();
    var property_value = $("#attr_value").val();
    if (property_name != "" && property_value != "") {
        $.post('/ad_add_property', {product_id:id, product_name:path_value, property_name:property_name, property_value:property_value}, function(data){
            console.log("the path value:" + path_value);
            if(path_value == "添加商品") {
                window.location.href="/ad_add_products";
            }
            else {
                window.location.href="/ad_products_detail?id="+id+"";
            }
        })
    }
    else{
        if(confirm("属性名称和属性值不能为空，请重新输入！")) {
            window.location.href="/ad_add_property?id="+id+"";
        }
    }
});

var check_null = function () {
    var check_flag = true;
    $("input").each(function() {
        if($(this).val() == "") {
            check_flag = false;
        }
    });
    if(check_flag) {
        $("#save_btn").attr("disabled", false);
    }
    else {
        $("#save_btn").attr("disabled", true)
    }
}


