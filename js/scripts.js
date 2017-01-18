$(document).ready(function() {
  $(".search-button").click(function(){
    var searchText = $(".search-box").val();
    var uri = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchText + "&callback=?";
    $.getJSON(uri, function(json){
      var data = {};
      for (page in json.query.pages){
        data = json.query.pages[page];
        $("<div class='result-div'></div>").appendTo(".results").click(function(){
          window.open("https://en.wikipedia.org/?curid=" + data.pageid);
        });
        $("<p class='title'>" + data.title + "</p>").appendTo(".result-div:last");
        $("<p>" + data.extract + "</p>").appendTo(".result-div:last");
      };
    });
  });
});
