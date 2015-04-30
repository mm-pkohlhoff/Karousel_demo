// exports the carousel class

var Carousel = (function() {

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

    // class declaration
    var Carousel = function (container, options) {

        this.container = container;
        this.images = container.find("img");

        this.options = options = $.extend({}, defaults, options);

        this.controls = options.controls;

        options.initializer(this);

        this.initialize_controls();
    };

    // wire up events to controls
    Carousel.prototype.initialize_controls = function () {
        var controls = this.options.controls,
            control_container = controls.container,
            prev = controls.prev,
            next = controls.next,
            self = this;

        control_container.on('click', function (e) {
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
        this.options.update(this.images, Direction.Prev, this);
    };


    Carousel.prototype._next = function (el) {
        this.options.update(this.images, Direction.Next, this);
    };


    return Carousel;
})();
