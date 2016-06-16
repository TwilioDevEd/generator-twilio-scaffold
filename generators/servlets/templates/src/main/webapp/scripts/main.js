//Query to the end point
$(document).ready(function(){
     var form = $("form").submit(function(e){
        e.preventDefault();
        $.post("/<%= model_name.toLowerCase() %>", form.serialize())
        .done(function(xml) {

        })
        .fail(function(){
            alert("Could not return a response. Check out the server code.");
        });
    });
});
