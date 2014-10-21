$(document).on('page:change', function(evt) {
  
  // Set up the validation by attaching a click handler to our form 
  // This defines a function that will run when the button is clicked
  $('form.new_song input.button, form.edit_song input.button').click(function() {

    // Check if the form is valid
    var valid = doValidation();

    return valid;
  });

    
    $('#sc-search-bttn').click(function() {
      var sc_search_field = $('#sc-search').val();
      console.log(sc_search_field);
      SC.get("/tracks",
        {q: sc_search_field},
        function(sc_return) {
          console.log(sc_return);

          var container = $('#sc-results');
          container.empty();
          for (var i = 0; i < sc_return.length; i++) 
          {
            var sc = 
            {
              title: sc_return[i].title,
              id: sc_return[i].id,
              pl: sc_return[i].permalink,
              pl_url: sc_return[i].permalink_url,
              uri: sc_return[i].uri
            }
            var list_item = $('<div>');
            list_item.data("sc", sc);
            list_item.addClass("sc-track");
            list_item.text(sc.title);
            container.append(list_item);
            //access actual domElement from jQuery event with container[0]
          }
        });
  });

$("#sc-results").on("click", ".sc-track", function(event){
      var sc = $(this).data("sc");
      $("input#song_name").val(sc.title);
      $("input#song_sc_id").val(sc.id);
      $("input#song_sc_permalink").val(sc.pl);
      $("input#song_sc_permalink_url").val(sc.pl_url);
      $("input#song_sc_uri").val(sc.uri);
      console.log("clicked");
  });


});



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