

    // hook into jquery

    $.fn.carousel = function (options) {

        var carousel = new Carousel($(this), options);

        this.data('carousel', carousel);
    }