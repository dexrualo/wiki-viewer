$(document).ready(function() {
  $(".search-button").click(function(){

    var searchText = $(".search-box").val();
    
    $(".results").html("");
    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&exsentences=1&exlimit=max&gsrsearch=" + searchText + "&callback=?", function(json){
      var data = {};
      for (page in json.query.pages){
        data = json.query.pages[page];
        $("<div class='result-div' data-pageid='"+ data.pageid +"'></div>").appendTo(".results").click(function(){
          var pageid = this.dataset.pageid;
          //window.open("https://en.wikipedia.org/?curid=" + this.dataset.pageid);
          $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=" + this.dataset.pageid + "&callback=?", function(json){
            $(".results").hide();
            $(".page").html("<h1>"+json.query.pages[pageid].title+"</h1>" + json.query.pages[pageid].extract);
          });
        });
        //$("<p class='title'>" + data.title + "</p>").appendTo(".result-div:last");
        $("<p>" + data.extract + "</p>").appendTo(".result-div:last");
      };
    });
  });
  $(".search-box").keypress(function(e){
    if (e.which == 13) {
      e.preventDefault();
      $(".search-button").click();
      $(".results").show();
    }
  });
});
