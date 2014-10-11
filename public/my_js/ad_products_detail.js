/**
 * Created by tiny on 14-10-8.
 */

console.log($(".hidden").val());

$(".minus_product").on("click", function() {
    var p_number = $("#p_number");
    if(p_number.val() == "0"){
        return 0;
    }
    else{
        p_number.val(parseInt(p_number.val())-1)
    }
});

$(".add_product").on("click", function() {
    var p_number = $("#p_number");
    p_number.val(parseInt(p_number.val())+1);
});


$("#add_attr").on("click", function() {
    var p_name = $("#p_name").val();
    var p_id = $(".hidden").text();
    console.log(p_id);
    $.get("/ad_add_property", {product_name:p_name, id:p_id}, function(data) {

    })
});