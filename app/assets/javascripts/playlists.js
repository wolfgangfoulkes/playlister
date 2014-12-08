

$(document).on('page:change', function(evt) {
	// isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
 // 	isTablet = (/ipad/i.test(navigator.userAgent.toLowerCase()));

 // 	if (isMobile)
	// {
	// 	$(".right-page").addClass("hidden");
	// }

    visiblePage = 0;
    hiddenPage = 0;

	var w =
    {
        x: $(window).width(),
        y: $(window).height()
    };

    var callbacks = 
    {

    	windowSize: function() {
            //believe width is the same as outerWidth for the window.
            w.x = $(window).width();
            w.y = $(window).height();
        },

        columnsOrPages: function() {
        	var larger = (w.x >= 1100)
        	$(".pages").toggleClass("full-width", larger);
        	$(".pages").toggleClass("half-width", !larger);

            $(".change-page").toggleClass("selected", larger);
            $(".right-page").toggle(larger);
            visiblePage = 0;
            hiddenPage = 0;
            if (!larger) 
            {
                visiblePage = ".left-page";
                hiddenPage = ".right-page";
            } 
        },

        changePage: function() {

            if (!visiblePage)
            {
                return;
            }

            $(".change-page").toggleClass("selected");

            var $visible = $(visiblePage);
            var $hidden = $(hiddenPage);

            $visible.toggle(400, function() 
                {
                    $hidden.toggle(400);
                    var _hidden = hiddenPage;
                    var _visible = visiblePage
                    visiblePage = _hidden;
                    hiddenPage = _visible;
                }
            );

        }
    };

	$(".song-list").on("click", ".list-song .song-title", function (event) {
			var $song = $(this).parents(".list-song");
			var $methods = $song.find(".method");
			var $info = $song.find(".song-info");
			$song.toggleClass("selected");
			$methods.toggleClass("hidden");
			$info.toggleClass("hidden");
		}
	);

    $(".remove").on("click", 
        function(event)
        {
            $(this).toggleClass("selected");
            $(".destroy").toggleClass("hidden");
        }
    );

	$(window).resize(callbacks.windowSize);
	$(window).resize(callbacks.columnsOrPages);
	$(window).scroll(callbacks.scrollPageLeft);
	$(".change-page").click(callbacks.changePage);
	callbacks.windowSize();
	callbacks.columnsOrPages();

	//$(".top-bar-section .right").append("<li><%= link_to 'Playlists', playlists_path %></a></li> <li class='divider'></li>");
});