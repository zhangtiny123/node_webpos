/**
 * Created by tiny on 14-9-29.
 */
$(document).ready(function() {
    $(".minus_product").on("click", function() {
        var origin = $(".p_number");
        if(parseInt(origin.val()) == 0){
            return 0;
        }
        origin.val(parseInt(origin.val())-1);
    });

    $(".add_product").on("click", function() {
        var origin = $(".p_number");
        origin.val(parseInt(origin.val())+1);
    });


    $(".p_elements").bind("input", function() {
        console.log("监视p_type:"+$(this).val());
        var type_value = $(this).val();
        if(type_value != "") {
            $("#save_btn").removeAttr('disabled','disabled');
        }
        else {
            $("#save_btn").attr('disabled','disabled');
        }
    })
});