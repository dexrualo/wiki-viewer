$(document).ready(function() {
  $(".search-button").click(function(){
    var searchText = $(".search-box").val();
    var uri = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + searchText + "&callback=?";
    $(".results").html("");
    $.getJSON(uri, function(json){
      var data = {};
      for (page in json.query.pages){
        data = json.query.pages[page];
        $("<div class='result-div' data-pageid='"+ data.pageid +"'></div>").appendTo(".results").click(function(){
          window.open("https://en.wikipedia.org/?curid=" + this.dataset.pageid);
        });
        $("<p class='title'>" + data.title + "</p>").appendTo(".result-div:last");
        $("<p>" + data.extract + "</p>").appendTo(".result-div:last");
      };
    });
  });
  $(".search-box").keypress(function(e){
    if (e.which == 13) {
      e.preventDefault();
      $(".search-button").click();
    }
  });
});
