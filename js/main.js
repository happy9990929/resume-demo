(function ($) {
  'use strict';

  // loading
  var loader = function () {
    setTimeout(function () {
      if ($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show');
      }
    }, 1);
  };
  loader();

  // 選單動畫
  var onePageClick = function () {
    $(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top - 70,
        },
        500,
      );
    });
  };

  onePageClick();

  // 選單捲動
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $('.ftco_navbar'),
        sd = $('.js-scroll-wrap');

      if (st > 150) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled');
        }
      }
      if (st < 150) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep');
        }
      }
      if (st > 350) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake');
        }

        if (sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if (st < 350) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if (sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  // 輪播圖
  var carousel = function () {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  };
  carousel();

  // 動畫
  var contentWayPoint = function () {
    var i = 0;
    $('.ftco-animate').waypoint(
      function (direction) {
        if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function () {
            $('body .ftco-animate.item-animate').each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn ftco-animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft ftco-animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight ftco-animated');
                  } else {
                    el.addClass('fadeInUp ftco-animated');
                  }
                  el.removeClass('item-animate');
                },
                k * 50,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '95%' }
    );
  };
  contentWayPoint();

  // 作品排序、分類
  var portfolioMasonry = function () {
    $('.filters ul li').click(function () {
      $('.filters ul li').removeClass('active');
      $(this).addClass('active');

      var data = $(this).attr('data-filter');
      $grid.isotope({
        filter: data,
      });
    });

    if (document.getElementById('portfolio-section')) {
      var $grid = $('.grid').isotope({
        itemSelector: '.all',
        percentPosition: true,
        masonry: {
          columnWidth: '.all',
        },
      });

      $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
      });
    }
  };
  portfolioMasonry();
})(jQuery);
