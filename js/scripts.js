$(document).ready(function() {
  var title = "";
  var resultDIV = {};
  $(".search-button").click(function(){
    var searchText = $(".search-box").val();
    console.log(searchText);
    var uri = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch="+ searchText +"&srprop=snippet&callback=?"
      
    function openArticle(){
      var uri = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page="+ $(this>".title").text() +"&prop=text&callback=?"
      $.getJSON(uri, function(json){
        alert(uri);
      });
    }

    $.getJSON(uri, function(json){
      json.query.search.forEach(function(value,index,array){
        console.log(value);
        title = value.title
        $("<div class='result-div'></div>").appendTo(".results").click(function(){
          var uri = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page="+ $(this).children(".title").text() +"&prop=text&callback=?";
          $.getJSON(uri, function(json){
            alert(uri);
          });
        });
        $("<p class='title'>"+value.title+"</p>").appendTo(".result-div:last");
        $("<p>"+value.snippet+"...</p>").appendTo(".result-div:last");
      });
    });
    
  });

  
});

