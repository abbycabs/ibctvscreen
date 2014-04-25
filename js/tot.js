//Read in the tip of the week - using Shane's API
$.getJSON("http://tipsont.herokuapp.com/api/current?callback=yes?", null, function(results){
    $("#tot").html(results.tip);
});
