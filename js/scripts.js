$(document).ready(function() {
  $(".search-button").click(function(){
    if ($(".search-box").val().length == 0)
      return;
    var searchText = $(".search-box").val();
    if ($(".results").css("display") == "block")
      $(".results").hide("fast");
    if ($(".page").css("display") == "block")
      $(".page").hide("fast");
    $(".results").html("").show("fast");

    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&exsentences=1&exlimit=max&gsrsearch=" + searchText + "&callback=?", function(json){
      var data = {};
      for (page in json.query.pages){
        data = json.query.pages[page];
        $("<div class='result-div' data-pageid='"+ data.pageid +"'></div>").appendTo(".results").click(function(){
          var pageid = this.dataset.pageid;
          $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=" + this.dataset.pageid + "&callback=?", function(json){
            $(".results").hide("fast", function(){
              $(".page").html("<h1>"+json.query.pages[pageid].title+"</h1>" + json.query.pages[pageid].extract).show("fast");
              $("<button class='back-button'>&lt;&lt;Back</button>").insertBefore("h1").click(function(e){
                e.preventDefault();
                $(".page").hide("fast", function(){
                  $(".results").show("fast");
                });
              });
            });
          });
        });
        if (data.thumbnail)
          $("<img class='thumbnail' src='" + data.thumbnail.source + "'/>").appendTo(".result-div:last");
        $("<div>" + data.extract + "</div>").appendTo(".result-div:last");
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
