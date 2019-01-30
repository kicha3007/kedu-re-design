$(document).ready(function()
{
    /* HEADER SLIDER */
    var $search_bg = $('.search-bg');

/*    if($search_bg.jquery) {
        var $i = 0,
            $i_max = 7;

        setIntervalAndExecute(function() {
            if($i < $i_max) {
                $i++;
            } else {
                $i = 1;
            }

            if($i == 1) {
                $search_bg.removeClass('search-bg__' + $i_max + '-active');
            } else {
                $search_bg.removeClass('search-bg__' + ($i-1) + '-active');
            }

            setTimeout(function(){
                $search_bg.removeClass('search-bg__animate');
                $search_bg.removeClass('search-bg__' + ($i-1));

                if($i == 1) {
                    $search_bg.removeClass('search-bg__' + $i_max);
                }

                $search_bg.addClass('search-bg__' + $i + ' search-bg__' + $i + '-active');
            },400);

            setTimeout(function(){
                if(!$search_bg.hasClass('search-bg__animate'))
                    $search_bg.addClass('search-bg__animate');
            },500);
        },6000);

        $search_bg.addClass('search-bg__animate');
    }*/

    /* TAB ACTIVE ACTION */
    $('.nav-tabs a').on('click', function () {
        $(this).parent('li').parent('ul').find('li.active').removeClass('active');
        $(this).parent('li').parent('ul').find('a.active').removeClass('active').removeClass('show');
        $(this).parent('li').addClass('active');
    });

    $('.btn-tab-next').click(function(e){
        e && e.preventDefault();
        $(this).parent().parent().parent().find('.nav-tabs > .active').next('li').find('a').trigger('click');
    });

    $('.btn-tab-prev').click(function(e){
        e && e.preventDefault();
        $(this).parent().parent().parent().find('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

    /* LOADERS */
/*    BX.showWait = function(node, msg) {
       $(node).addClass('action-load');
    };

    BX.closeWait = function(node, obMsg) {
        $(node).removeClass('action-load');
    };*/

    /* HIDE CONTENTS */
    $('.more-link-content').on('click', function(event){
        event && event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top - 45,
            toggleClass = 'short-content-s1';

        if( $(this).parent().hasClass(toggleClass) ) {

            $('body,html').animate({scrollTop: top}, 500);
            $(this).html('Скрыть<i class="zmdi zmdi-chevron-up"></i>');

        } else {
            $(this).html('Показать больше<i class="zmdi zmdi-chevron-down"></i>');
        }

        $(this).parent().toggleClass(toggleClass);
        $(this).toggleClass('active');
    });

    /* CLICKED BLOCKS */
    var $clickableBlock = $('.clickable-block');

    $clickableBlock.on('click', function() {
        window.location = $(this).find("a.clickable-link").attr("href");
    });

    /* SUBSCRIBE */
    $(".open-subscribe-modal").on("click", function(event){
        event && event.preventDefault();

        var $container = $('#subscribe_modal').eq(0);

        if(!$container.find('.auth-modal__auth-part-container').is(':visible'))
        {
            $container.find('.auth-modal__register-part-container').hide();
            $container.find('.auth-modal__forgotpasswd-part-container').hide();
            $container.find('.auth-modal__forgotpasswd-success-part-container').hide();
            $container.find('.kedu_auth_modal_register_email_confirmation_part_container').hide();
            $container.find('.auth-modal__auth-part-container').show();
            $container.find('.system-auth-services-container').show();

            $container.find('.system-auth-form .form-group').removeClass('has-error');
            $container.find('.system-auth-register-form .form-group').removeClass('has-error');
            $container.find('.system-auth-forgotpasswd-form .form-group').removeClass('has-error');
        }

        $container.removeClass('_is-register');

        if(!$container.is(':visible'))$container.modal('show');
    });

    /* BEFORE MENU */

    var $menuBeforeLink = $('[data-menu-link]'),
        $content = $('[data-it-menu-before-content]'),
        $contentWrap = $('[data-menu-content-wrap]'),
        $contentLinks = $('[data-menu-links]');

    function changeVisible () {
        $content.hide();
        $contentLinks.removeClass('active');
    }

    $menuBeforeLink.on('mouseenter', function() {
        var $contentBlockId = $(this).data('toggle'),
            $contentBlockOb = $('#'+$contentBlockId),
            $this = $(this);

        if($this.hasClass('dropdown__link')) {
            $contentLinks.removeClass('active');
            $contentBlockOb.addClass('active'); // show active links
            $contentBlockOb.closest($content).show();
        } else {
            changeVisible();
        }

    });

    $contentWrap.on('mouseleave', function(){
        changeVisible();
    });

    var menuWrap = document.querySelector('[data-it-menu]');
    document.onclick = function(event) {
        if(!menuWrap.contains(event.target)) {
            $content.css("display", "none");
        }
    }

    /* ------------------- dropdown-menu  ------------------- */

    var $trigger = $('[data-trigger]');
    var $nav = $('[data-it-nav]');
    var $modalClose = $("[data-modal-close]");

    function showMobileMenu() {
        $trigger.toggleClass('active');

        if ($("div").is("#modal-body-bg-shadow")) {
            $("#modal-body-bg-shadow").remove();

        } else {
            $("body").prepend("<div id=\"modal-body-bg-shadow\"></div>");
        }

        $nav.slideToggle(0, function () {
            if ($(this).css("display") === "none") {
                $(this).removeAttr("style");
            }
        });

        $("#modal-body-bg-shadow").on("click", showMobileMenu);
    }
    $modalClose.on("click", showMobileMenu);
    $trigger.on("click", showMobileMenu);



   /* var perfectScrollContainersX = $('[data-scroll-wrap-x]'),
        perfectScrollContainersY = $('[data-scroll-wrap-y]'),
        PerfectScrollbarElementY,
        PerfectScrollbarElementX,
        perfectScrollOuterWrap =  $("[data-scroll-outer-wrap]");

    function perfectScrollStart() {
        if (perfectScrollContainersX.length) {

            $.each(perfectScrollContainersX, function(indx, value){
                var $this = $(value);

                var perfectScrollContainersXwidtn = +$this.get(0).scrollWidth - +$this.get(0).clientWidth;
                console.log(perfectScrollContainersXwidtn);

                if (perfectScrollContainersXwidtn && !$this.hasClass("ps")) {

                    PerfectScrollbarElementX = new PerfectScrollbar($this.get(0), {
                        maxScrollbarLength: 50,
                        wheelPropagation: true,
                        suppressScrollY: true,
                        wheelSpeed: 0.2
                    });
                    perfectScrollOuterWrap.addClass("menu-mobile");
                }
                 else  if (typeof PerfectScrollbarElementX != "undefined" && !perfectScrollContainersXwidtn) {
                    PerfectScrollbarElementX.destroy();
                    perfectScrollOuterWrap.removeClass("menu-mobile");
                }

            });
        }

        if (perfectScrollContainersY.length) {
            $.each(perfectScrollContainersY, function(indx, value){
                var $this = $(value);
                var perfectScrollContainersYheight = +$this.get(0).scrollHeight - +$this.get(0).clientHeight;

                if (perfectScrollContainersYheight && !$this.hasClass("ps")) {

                    PerfectScrollbarElementY = new PerfectScrollbar($this.get(0), {
                        maxScrollbarLength: 40,
                        minScrollbarLength: 30,
                        wheelPropagation: true,
                        suppressScrollX: true,
                        useBothWheelAxes: true,
                        wheelSpeed: 0.2
                    });
                    perfectScrollOuterWrap.addClass("menu-mobile");
                } else if (typeof PerfectScrollbarElementY != "undefined" && !perfectScrollContainersYheight) {
                    PerfectScrollbarElementY.destroy();
                    perfectScrollOuterWrap.removeClass("menu-mobile");
                }

            });
        }
    }

    $(window).on('resize', function () {
        perfectScrollStart();
    });

    perfectScrollStart();*/


    (function(){

        var swiperContainersX = $('[data-scroll-wrap-x]');
        var swiper;

        function startSwiper() {

            $.each(swiperContainersX, function(indx, value){
                var $this = $(value);

                var swiperContainersXwidth = +$this.get(0).scrollWidth - +$this.get(0).clientWidth;

                if (swiperContainersXwidth && !$this.hasClass("swiper-container-horizontal") ) {

                    swiper = new Swiper('.swiper-container', {
                        scrollbar: {
                            el: '.swiper-scrollbar'
                        },
                        freeMode: true,
                        slidesPerView: 'auto',
                        // width: 60
                    });

                } else if ($this.hasClass("swiper-container-horizontal") && !swiperContainersXwidth) {
                    swiper.destroy();
                };
            });
        };

        $(window).on('load resize', function () {
            startSwiper();
        });

    })();


    $("[data-to-top-button]").on("click", function () {
        $("html, body").animate({scrollTop: 0}, 500);
    });


    function startCarousel() {

        $('[data-owl-carousel]').each(function () {
            var $this = $(this);
            var itemsCount = $this.data("owlItems");
            var itemsCountPad = $this.data("owlItemsPad");
            var itemsMargin = $this.data("owlItemsMargin");
            var itemsDots = $this.data("owlItemsDots");
            var itemsLoop = $this.data("owlItemsLoop");
            var itemsNav = $this.data("owlItemsNav");
            var itemsAutoplay = $this.data("owlItemsAutoplay");
            var itemsAutoplayTimeout = $this.data("owlItemsAutoplayTimeout");
            var itemsAutoplayHoverPause = $this.data("owlItemsAutoplayHoverPause");

            $this.owlCarousel({
                items: (itemsCount ? itemsCount : 1),
                margin: (itemsMargin ? itemsMargin : 20),
                nav: (itemsNav ? itemsNav : true),
                loop: (itemsLoop ? itemsLoop : true),
                autoplay: (itemsAutoplay ? itemsAutoplay : false),
                autoplayTimeout: (itemsAutoplayTimeout ? itemsAutoplayTimeout : 3000),
                autoplayHoverPause: (itemsAutoplayHoverPause ? itemsAutoplayHoverPause : false),
                dots: (itemsDots ? itemsDots : false),
                navSpeed: 1000,
                dotsSpeed: 1000,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: itemsCountPad ? itemsCountPad : (itemsCount ? itemsCount : 1)
                    },
                    1000: {
                        items: itemsCount ? itemsCount : 1
                    }
                }
            });
        });

    }

    startCarousel();

    $("[data-offer-close]").on("click", function () {
         $("[data-offer]").remove();
    });

});