/**
 * Created by tiny on 14-10-8.
 */
$(document).ready(function(){
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

});