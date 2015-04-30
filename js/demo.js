// instantiates carousel and contains plugins

(function() {

    const IMAGE_WIDTH = 200;

    $(function () {

        switch (getParameterByName('mode'))
        {

            case '3d':
                 $("#carousel").carousel({
                    initializer: initializer_3d,
                    update: update_3d,
                    controls: {
                        container: $('#controls'),
                        prev: '#prev',
                        next: '#next'
                    }
                });
                break;
            case 'basic':
            default:
                $("#carousel").carousel({
                    initializer: initializer_basic,
                    update: update_basic,
                    controls: {
                        container: $('#controls'),
                        prev: '#prev',
                        next: '#next'
                    },
                    imagesToShow: 3
                });
                break;
        };

        $("#carousel").show();

    });

    // plugins below

//
// expects structure like div > ul > li > img
//
    var initializer_basic = function (carousel) {

        var container = carousel.container;

        var width = IMAGE_WIDTH*carousel.options.imagesToShow;
        var style = "position: relative; overflow: hidden; width: "+ width+"px; height: 199px;",
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

    var update_basic = function (images, dir) {

        if (this.is_updating) return;

        var list_container = images.closest('ul'),
            direction_multiplier = dir == Direction.Prev ? -1 : 1,
            current_left = list_container.css('left'),
            self = this;

        var current_image = this.current_image = this.current_image || 0;

        if ((current_image == images.length - 1) && dir == Direction.Next) {
            // cycle to begin
        } else if (current_image == 0 && dir == Direction.Prev) {
            // cycle to end
        } else {

            this.is_updating = true;

            current_left = current_left == 'auto' ? 0 : parseInt(current_left);

            list_container
                .css({
                    position: 'relative'
                })
                .animate({
                    left: '' + (current_left - IMAGE_WIDTH * direction_multiplier) + 'px'
                }, function() {
                    self.is_updating = false;
                });

            this.current_image += (1*direction_multiplier);
        }


    };

    // uses css3 transforms w/classes
    // taken from
    // http://desandro.github.io/3dtransforms/examples/carousel-01.html
    var initializer_3d = function(carousel) {

        carousel.container.addClass('carousel3d');

        carousel.container.css({
            position: 'relative',
            height: '240px'
        });

        var container = carousel.controls.container;
        container.css('display', 'inline-block');
        container.parent('div').css('text-align', 'center');
    };

    var update_3d = function (images, dir) {
        var list_container = images.closest('ul');

        this.current_rotateY = this.current_rotateY || 0;

        var rotate_amount = dir == Direction.Next ? -40 : 40;

        this.current_rotateY = this.current_rotateY + rotate_amount;

        list_container.css('-webkit-transform', '');
        list_container.css('-webkit-transform', 'translateZ(-288px) rotateY('+this.current_rotateY+'deg)');
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}