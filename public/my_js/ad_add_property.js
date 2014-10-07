/**
 * Created by tiny on 14-10-6.
 */
$(document).ready(function(){
//    $("#attr_name").bind("input", function() {
//        var attr_name = $(this).val();
//        if(attr_name == ""){
//            $("#save_btn").addClass("disabled");
//        }
//        console.log("attr_name:"+attr_name)
//    });
//
//    $("#attr_value").bind("input", function() {
//        var attr_value = $(this).val();
//        console.log("attr_name:"+attr_value)
//    });
    var i=0;
    var middle_path = $("#middle_path");
    var path_value = middle_path.text();
    if(path_value == "添加商品") {
        middle_path.attr('href','/ad_add_products')
        $("#cancel").attr('href','/ad_add_products')
    }
    else {
        middle_path.attr('href','/ad_products_detail?product_name='+path_value+'');
        $("#cancel").attr('href','/ad_products_detail?product_name='+path_value+'');
    }

    $("#save_btn").on("click", function() {
        i+=1;
        console.log("***"+i);
        var path_value = $("#middle_path").text();
        var property_name = $("#attr_name").val();
        var property_value = $("#attr_value").val();
        if (property_name != "" && property_value != "") {
            $.post('/ad_add_property', {product_name:path_value, property_name:property_name, property_value:property_value}, function(data){
                if(path_value == "添加商品") {
                    window.location.href="ad_add_products";
                }
                else {
                    window.location.href="ad_products_detail?product_name="+path_value+"";
                }
            })
        }
        else{
            confirm("属性名称和属性值不能为空，请重新输入！");
        }

    })

});