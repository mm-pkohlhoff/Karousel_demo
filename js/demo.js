
var CarouselWidth =

$(function() {

  $("#carousel").carousel({
    initializer: initializer_basic,
    update: update_basic,
    controls: {
        prev: $('#prev'),
        next: $('#next')
    }
  });


});

//
// expects structure like div > ul > li > img
//
var initializer_basic = function(container) {

  var style = "position: relative; overflow: hidden; width: 200px; height: 199px;",
  		clip = "<div class='jcarousel-clip' style='{style}'></div>"
  				.supplant({style: style}),
  		inner = container.children();

  inner.wrap(clip);

  inner
    .find("li")
  	.css({
    	float: 'left'
  	});
};

var update_basic = function() {

};

var defaults = {
	initializer: function() {},
    update: function() {}
};

$.fn.carousel = function(options) {

  var container = $(this);

  options = $.extend({}, defaults, options);

  options.initializer(container);
}

/**
* supplant() does variable substitution on the string. It scans through the string looking for
* expressions enclosed in { } braces. If an expression is found, use it as a key on the object,
* and if the key has a string value or number value, it is substituted for the bracket expression
* and it repeats.
*
* Written by Douglas Crockford
* http://www.crockford.com/
*/
String.prototype.supplant = function (o) {
	return this.replace(
		/{([^{}]*)}/g,
		function (a, b) {
			var r = o[b];
			return typeof r === 'string' || typeof r === 'number' ? r : a;
		}
	);
};