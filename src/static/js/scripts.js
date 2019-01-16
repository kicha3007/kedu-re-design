BX(function(){
    initLazyLoad();
});
BX.addCustomEvent("onAjaxSuccess", function(){
    initLazyLoad();
});

function initLazyLoad(){
    if($(".lazy-load:not(.lazy-no-effect)").length){
        $(".lazy-load:not(.lazy-no-effect)").lazy({
            effect: "fadeIn",
            effectTime: 200,
            afterLoad: function(el){
                if(el.closest(".lazy-wrapper").length){
                    el.closest(".lazy-wrapper").find(".lazy-preloader").fadeOut(200, function(){
                        $(this).remove();
                    });
                }
            },
            onError: function(el) {
                var imageSrc = el.data('src');
                console.log('image "' + imageSrc + '" could not be loaded');
            },
            onFinishedAll: function() {
                $(".lazy-load:not(.lazy-no-effect)[data-src]").each(function(index, el){
                    el = $(el);
                    if(el.closest(".lazy-wrapper").length && el.data("src") === ""){
                        el.closest(".lazy-wrapper").find(".lazy-preloader").fadeOut(200, function(){
                            $(this).remove();
                        });
                    }
                });
            }
        });
    }
    if($(".lazy-load.lazy-no-effect").length){
        $(".lazy-load.lazy-no-effect").lazy({
            beforeLoad: function(el) {
                if(el.closest(".lazy-wrapper").length && el.data("src") === ""){
                    el.closest(".lazy-wrapper").find(".lazy-preloader").fadeOut(200, function(){
                        $(this).remove();
                    });
                }
            },
            afterLoad: function(el){
                if(el.closest(".lazy-wrapper").length){
                    el.closest(".lazy-wrapper").find(".lazy-preloader").fadeOut(200, function(){
                        $(this).remove();
                    });
                }
            },
            onError: function(element) {
                var imageSrc = element.data('src');
                console.log('image "' + imageSrc + '" could not be loaded');
            },
            onFinishedAll: function() {
                $(".lazy-load.lazy-no-effect").each(function(index, el){
                    el = $(el);
                    if(el.closest(".lazy-wrapper").length && el.data("src") === ""){
                        el.closest(".lazy-wrapper").find(".lazy-preloader").fadeOut(200, function(){
                            $(this).remove();
                        });
                    }
                });
            }
        });
    }
}