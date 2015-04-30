(function() {

    const IMAGE_WIDTH = 200;

    $(function () {

        $("#carousel").carousel({
            initializer: initializer_basic,
            update: update_basic,
            controls: {
                container: $('#controls'),
                prev: '#prev',
                next: '#next'
            }
        });


    });

    // plugins

//
// expects structure like div > ul > li > img
//
    var initializer_basic = function (carousel) {

        var container = carousel.container;

        var style = "position: relative; overflow: hidden; width: "+IMAGE_WIDTH+"px; height: 199px;",
            clip = "<div class='jcarousel-clip' style='{style}'></div>"
                .supplant({style: style}),
            inner = container.children();

        inner.wrap(clip);

        // set the ul to a width that holds the lis
        inner
            .css({
                width: ''+(IMAGE_WIDTH*carousel.images.length)+'px'
            });
        // set the lis to float inline
        inner
            .find("li")
            .css({
                float: 'left'
            });
    };

    var update_basic = function (images) {
        var list_container = images.closest('ul');

        var current_left = list_container.css('left');

        current_left = current_left == 'auto' ? 0 : Number(current_left);

        list_container.css({
            position: 'relative',
            left: '' + (current_left - IMAGE_WIDTH) + 'px'
        });
    };

    // setup

    var defaults = {
        initializer: function () {
        },
        update: function () {
        },
        controls: {
            container: $(),
            prev: "",
            next: ""
        }
    };

    // hook into jquery

    $.fn.carousel = function (options) {

        var carousel = new Carousel($(this), options);

        this.data('carousel', carousel);
    }

    // class declaration

    var Carousel = function(container, options) {

        this.container = container;
        this.images = container.find("img");

        this.options = options = $.extend({}, defaults, options);

        options.initializer(this);

        this.initialize_controls();
    };

    // wire up events to controls
    Carousel.prototype.initialize_controls = function() {
        var controls = this.options.controls,
            control_container = controls.container,
            prev = controls.prev,
            next = controls.next,
            self = this;

        control_container.on('click', function(e) {
            var el = $(e.target);

            switch (true) {
                case el.is(prev):
                    self._prev(el);
                    break;
                case el.is(next):
                    self._next(el);
                    break;
                default:
            }
        });
    };


    Carousel.prototype._prev = function (el) {
        this.options.update(this.images);
    };


    Carousel.prototype._next = function (el) {
        this.options.update(this.images);
    };

})();

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