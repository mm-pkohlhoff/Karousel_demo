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

        list_container
            .css({
                position: 'relative'
            })
            .animate({
                left: '' + (current_left - IMAGE_WIDTH) + 'px'
            });
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