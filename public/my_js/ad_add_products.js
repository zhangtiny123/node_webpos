/**
* Created by tiny on 14-9-29.
*/
$(".minus_product").on("click", function() {
    var origin = $("#p_number");
    if(parseInt(origin.val()) == 0){
        return 0;
    }
    origin.val(parseInt(origin.val())-1);
});

$(".add_product").on("click", function() {
    var origin = $("#p_number");
    origin.val(parseInt(origin.val())+1);
});

$(".p_elements").bind("input", function() {

    var type_value = $("#p_unit").val();
    if(type_value != "") {
        $("#save_btn").removeAttr('disabled','disabled');
    }
    else {
        $("#save_btn").attr('disabled','disabled');
    }
});

$("#save_btn").on("click", function(){
    var p_type = $("#p_type").val();
    var p_name = $("#p_name").val();
    var p_number = $("#p_number").val();
    var p_price = $("#p_price").val();
    var p_unit = $("#p_unit").val();

    $.post("/ad_add_products",
        {type : p_type, name : p_name, total_number : p_number, unit : p_unit, price : p_price},
        function(data) {
            if(confirm(data.message)){
                window.location.href="/admin";
            }
    })
});

var check_null = function() {
    var control_btn = true;
    $("input").each( function() {
        if($(this).val() == "") {
            control_btn = false;
        }
    });
    if($('#p_number').val() == 0) {
        control_btn = false;
    }
    if(control_btn) {
        $("#save_btn").attr("disabled", false);
    }
    else {
        $("#save_btn").attr("disabled", true)
    }
};