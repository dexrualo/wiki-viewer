$(document).ready(function() {
  var title = "";
  $(".search-button").click(function(){
    var searchText = $(".search-box").val();
    var uri = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="+ searchText +"&srprop=snippet&callback=?"
      
    $.getJSON(uri, function(json){
      json.query.search.forEach(function(value,index,array){
        title = value.title
        $("<div class='result-div'></div>").appendTo(".results").click(function(){
          
        });
        $("<p class='title'>"+value.title+"</p>").appendTo(".result-div:last");
        $("<p>"+value.snippet+"...</p>").appendTo(".result-div:last");
      });
    });
  });
});
