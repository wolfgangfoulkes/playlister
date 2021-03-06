// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require foundation
//= require_tree .



$(document).on('ready', function() {
    $(document).foundation();
    console.log("document ready!");
});

$(document).on('page:change', function(evt) {
    init();
});

function init() {
	console.log('page change!');
    console.log('ready!');
}

$(function(){ $(document).foundation(); });

SC.initialize({
    client_id: "a75a2c80d1ea64e4704553a641f17500", /*from the registered app on my user on soundcloud*/
  });