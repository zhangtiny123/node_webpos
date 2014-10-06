/**
 * Created by tiny on 14-10-6.
 */
$(document).ready(function(){
    $("#attr_name").bind("input", function() {
        var attr_name = $(this).val();
        if(attr_name == ""){
            $("#save_btn").addClass("disabled");
        }
        console.log("attr_name:"+attr_name)
    });

    $("#attr_value").bind("input", function() {
        var attr_value = $(this).val();
        console.log("attr_name:"+attr_value)
    })
});