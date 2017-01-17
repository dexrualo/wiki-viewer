$(document).ready(function() {
  $(".search-button").click(function(){
    var searchText = $(".search-box").val();
    var uri = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&generator=search&callback=?&exsentences=1&exlimit=max&exintro=1&piprop=thumbnail&pilimit=max&gsrnamespace=0&gsrsearch=" + searchText;
    $.getJSON(uri, function(json){
      for (page in json.query.pages){
        console.log(page);
        $("<div class='result-div'></div>").appendTo(".results").click(function(){
          
        });
        $("<p class='title'>" + page.title + "</p>").appendTo(".result-div:last");
        $("<p>" + page.extract + "...</p>").appendTo(".result-div:last");
      };
    });
  });
});
