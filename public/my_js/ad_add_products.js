/**
 * Created by tiny on 14-9-29.
 */
$(document).ready(function() {
    $(".minus_product").on("click", function() {
        var origin = $("#p_number");
        console.log("origin value:"+parseInt(origin.val()));
        if(parseInt(origin.val()) == 0){
            return 0;
        }
        origin.val(parseInt(origin.val())-1);
    });

    $(".add_product").on("click", function() {
        var origin = $("#p_number");
        console.log("origin value:"+parseInt(origin.val()));
        origin.val(parseInt(origin.val())+1);
    })
});