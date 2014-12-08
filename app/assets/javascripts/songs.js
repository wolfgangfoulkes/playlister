$(document).on('page:change', function(evt) {
  // Set up the validation by attaching a click handler to our form 
  // This defines a function that will run when the button is clicked
  $('form.new_song input.button, form.edit_song input.button').click(function() {

    // Check if the form is valid
    var valid = doValidation();

    return valid;
  });

    
    $('#wf-search-bttn').click(function() {
      var wf_search_field = $('#wf-search').val();

      searchSC(wf_search_field,
        function(sc_return) 
        {
          var container = $('#sc-results');
          container.empty();
          if (sc_return.length > 0)
          {
            container.append("<div class='search-results-source'> SoundCloud </div>");
          }
          for (var i = 0; i < sc_return.length; i++) 
          {
            var sc = 
            {
              src_type: "soundcloud",
              title: sc_return[i].title,
              id: sc_return[i].id,
              pl: sc_return[i].permalink,
              pl_url: sc_return[i].permalink_url,
              uri: sc_return[i].uri
            }
            var add_song_button = $('<div>');
            add_song_button.addClass("add-song");
            add_song_button.text("+");
            add_song_button.hide();

            var list_item_title = $('<div>');
            list_item_title.addClass("search-result-title");
            list_item_title.text(sc.title);

            var list_item = $('<div>');
            list_item.data("sc", sc);
            list_item.addClass("search-result");
            list_item.addClass("sc-track");
            if (i > 15)
            {
              var j = Math.floor(i/15);
              list_item.addClass("hidden");
              list_item.addClass("overflow" + String(j));
            }
            list_item.append(add_song_button);
            list_item.append(list_item_title);
            container.append(list_item);
            //access actual domElement from jQuery event with container[0]
          }
        }
      );

      searchYT(wf_search_field, 30,
        function(yt_return) 
        {
          var yt_items = yt_return.items;

          var container = $('#yt-results');
          container.empty();
          if (yt_items.length > 0)
          {
            container.append("<div class='search-results-source'> YouTube </div>");
          }
          for (var i = 0; i < yt_items.length; i++) 
          {
            var yt_item = yt_items[i];
            var yt = 
            {
              src_type: "youtube",
              title: yt_item.snippet.title,
              id: yt_item.id,
              etag: yt_item.etag,
              image_url: yt_item.snippet.thumbnails.default
            }
            var add_song_button = $('<div>');
            add_song_button.addClass("add-song");
            add_song_button.text("+");
            add_song_button.hide();

            var list_item_title = $('<div>');
            list_item_title.addClass("search-result-title");
            list_item_title.text(yt.title);

            var list_item = $('<div>');
            list_item.data("yt", yt);
            list_item.addClass("search-result");
            list_item.addClass("yt-track");
            
            if (i > 15)
            {
              var j = Math.floor(i/15);
              list_item.addClass("hidden");
              list_item.addClass("overflow" + String(j));
            }
            list_item.append(add_song_button);
            list_item.append(list_item_title);
            container.append(list_item);
            //access actual domElement from jQuery event with container[0]
          }
        }
      );
  });

$(".search-results").on("click", ".search-result", function(event){
      if ($(this).hasClass("sc-track"))
      {
        var sc = $(this).data("sc");
        $("input#song_src_type").val(sc.src_type);
        $("input#song_name").val(sc.title);
        $("input#song_sc_id").val(sc.id);
        $("input#song_sc_permalink").val(sc.pl);
        $("input#song_sc_permalink_url").val(sc.pl_url);
        $("input#song_sc_uri").val(sc.uri);
      }
      else if ($(this).hasClass("yt-track"))
      {
        var yt = $(this).data("yt");
        $("input#song_src_type").val(yt.src_type);
        $("input#song_name").val(yt.title);
        $("input#song_yt_id").val(yt.id);
        $("input#song_yt_etag").val(yt.etag);
        $("input#song_image_url_small").val(yt.image_url);
      }

      $(".search-result").removeClass("selected");
      $(".search-result").not(this).find(".add-song").hide(0);
      $(this).addClass("selected");
      $(this).find(".add-song").show(0);
  });

$(".search-results").on("click", ".selected .add-song", //cause at init, this doesn't exist yet as above
  function()
  {
    console.log("clicked!");
    $(".new_song").submit();
  }
);

  var searchSC = function (title_, callback_)
  {
    SC.get("/tracks",
        {q: title_},
        function(sc_return) 
        {
          console.log(sc_return);
          callback_(sc_return)
        }
      );
  };

  var searchYT = function (title_, max_, callback_)
  {

    var _return = {};
    var data_ = 
    {
          key: "AIzaSyBZsGQwmCWIUuiViOCed2ZjTTwiD4Pvqbk",
          part:"snippet",
          q: title_,
          maxResults: max_, //max-results is deprecated and different, this sets "results per page"
          strict: "true" //doesn't accept bad params
    }

    $.getJSON("https://www.googleapis.com/youtube/v3/search", data_,
      function(data) 
      {
        if (data.items.length === 0) {
          console.log("not found!");
          return 0;
        }
        else 
        {
          console.log("results!", data.items.length, "=", data.pageInfo.resultsPerPage, " of ", data.pageInfo.totalResults);
          callback_(data);
        }
      })
      .complete
      (
        function()
        {
          console.log("complete!");
        }
      )
      .error
      (
        function()
        {
          console.log("error!");
          return 0;
        }
    );
    
  };

});

var obj2Request = function (obj_)
{
  var _str = "";
  for (var key in obj_) {
    if (obj_.hasOwnProperty(key)) {
      _str = _str +  "&" + key + "=" + obj_[key];
    }
  }
  return _str;
}



/** TODO: Fill in these functions **/
function doValidation() {
  // If the form is valid, return true
  // Otherwise return false
  // We can get all the inputs in the form by doing the following:
  // $('input')
  // And loop through them using an each loop (http://api.jquery.com/each/)
  return true;
}

function showErrorMessages() {
  // Show the error messages in the page
  // You can show them all at once in a list
  // Or highlight the specific fields that are incorrect
  // Use the jQuery insert, attr, html, text, and/or css functions
  // i.e. http://api.jquery.com/append/
}