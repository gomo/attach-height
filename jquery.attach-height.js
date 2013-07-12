;(function(){

    $.fn.attachHeight = function(options){
        var op = $.extend({resizeTimeout: 200}, options);

        if(!op.ratio){
            throw 'Missing ratio parameter in options. usage: $(".selector").attachHeight({ratio:0.8})';
        }

        var elems = this;
        var attach = function(){
            setTimeout(function(){
                elems.height(elems.width() * op.ratio);
            }, 0);
        };

        elems.data('attachHeight', attach);

        attach();

        var timer = false;
        $(window).resize(function() {
            if (timer !== false) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
                attach();
            }, op.resizeTimeout);
        });

        window.onorientationchange = function() {
            attach();
        };
    };

})(jQuery);