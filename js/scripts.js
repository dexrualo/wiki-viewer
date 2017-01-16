$(document).ready(function() {
  $(".search-button").click(function(){
    var searchText = $(".search-box").val();
    console.log(searchText);
    var uri = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="+ searchText +"&srprop=snippet"
    $.getJSON(uri, function(json){ json.query.search.forEach(function(value,index,array){
        console.log(value);
        $("<div class='result-div'></div>").appendTo(".container");
        $("<p>"+value.title+"</p>").appendTo(".result-div:last");
        $("<p>"+value.snippet+"...</p>").appendTo(".result-div:last");
      });
    });
  });
});
