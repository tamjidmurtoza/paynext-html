(function ($) {
  "use strict";

  /*
  |========================================================------------
  | Template Name: Paynext
  | Author: Peterdraw
  | Version: 1.0.0
  |========================================================------------
  |========================================================------------
  | TABLE OF CONTENTS:
  |========================================================------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Dynamic contact form
  | 7. Counter Animation
  | 8. Tabs
  | 9. Workflow
  | 10. Hero Parallax
  | 11. CTA Scroll Zoom
  |
  */

  /*========================================================
    Scripts initialization
  ========================================================*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on("load", function () {
    preloader();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    counterInit();
    slickInit();
    tabs();
    workflowAnimation();
    heroParallax();
    ctaScrollZoom();
    if ($.exists(".wow")) {
      new WOW().init();
    }
  });

  $(window).on("scroll", function () {
    stickyHeader();
  });

  /*======================================================
    1. Preloader
  ========================================================*/
  function preloader() {
    $(".cs_preloader").fadeOut();
    $(".cs_preloader_in").delay(150).fadeOut("slow");
  }
  /*======================================================
    2. Mobile Menu
  ========================================================*/
  function mainNav() {
    $(".cs_nav").append('<span class="cs_menu_toggle"><span></span></span>');
    $(".menu-item-has-children").append(
      '<span class="cs_munu_dropdown_toggle"><span></span></span>',
    );
    $(".cs_menu_toggle").on("click", function () {
      $(this)
        .toggleClass("cs_toggle_active")
        .siblings(".cs_nav_list_wrap")
        .toggleClass("cs_active");
    });
    $(".cs_munu_dropdown_toggle").on("click", function () {
      $(this).toggleClass("active").siblings("ul").slideToggle();
      $(this).parent().toggleClass("active");
    });
    // Search Toggle
    $(".cs_search_tobble_btn").on("click", function () {
      $(".cs_header_form_wrap").toggleClass("active");
    });
    $(".cs_header_form_overlay").on("click", function () {
      $(".cs_header_form_wrap").removeClass("active");
    });
  }
  /*======================================================
    3. Sticky Header
  ========================================================*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".cs_sticky_header").addClass("cs_sticky_active");
    } else {
      $(".cs_sticky_header").removeClass("cs_sticky_active");
    }
  }
  /*======================================================
    4. Dynamic Background
  ========================================================*/
  function dynamicBackground() {
    $("[data-src]").each(function () {
      var src = $(this).attr("data-src");
      $(this).css({
        "background-image": "url(" + src + ")",
      });
    });
  }
  /*======================================================
    5. Slick Slider
  ========================================================*/
  function slickInit() {
    if ($.exists(".cs_slider")) {
      $(".cs_slider").each(function () {
        // Slick Variable
        var $ts = $(this).find(".cs_slider_container");
        var $slickActive = $(this).find(".cs_slider_wrapper");
        var $status = $(this).find(".cs_slider_number");
        // Auto Play
        var autoPlayVar = parseInt($ts.attr("data-autoplay"), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr("data-speed"), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr("data-loop"), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr("data-center"), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr("data-variable-width"), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find(".cs_pagination")
          .hasClass("cs_pagination");
        // Slide Per View
        var slidesPerView = $ts.attr("data-slides-per-view");
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == "responsive") {
          var slidesPerView = parseInt($ts.attr("data-add-slides"), 10);
          var lgPoint = parseInt($ts.attr("data-lg-slides"), 10);
          var mdPoint = parseInt($ts.attr("data-md-slides"), 10);
          var smPoint = parseInt($ts.attr("data-sm-slides"), 10);
          var xsPoing = parseInt($ts.attr("data-xs-slides"), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr("data-fade-slide"));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);
        /* Start Count Slide Number */
        $slickActive.on(
          "init reInit afterChange",
          function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html(
              `<span class="cs_current_number" data-number="${i}"><span>${i}</span></span> <span class="cs_slider_number_seperator"></span> <span class="cs_total_numbers"  data-number="${slick.slideCount}"><span>${slick.slideCount}</span></span>`,
            );
          },
        );
        /* End Count Slide Number */
        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: "28%",
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find(".cs_left_arrow"),
          nextArrow: $(this).find(".cs_right_arrow"),
          appendDots: $(this).find(".cs_pagination"),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }
  }
  /*======================================================
    6. Dynamic contact form
  ========================================================*/
  if ($.exists("#cs_form")) {
    const form = document.getElementById("cs_form");
    const result = document.getElementById("cs_result");

    form.addEventListener("submit", function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = "Please wait...";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
    });
  }
  /*======================================================
    7. Counter Animation
  ========================================================*/
  function counterInit() {
    if (!$.exists(".odometer")) return;

    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = $(entry.target);
            el.html(el.data("count-to"));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    $(".odometer").each(function () {
      observer.observe(this);
    });
  }
  /*======================================================
    8. Tabs
  ========================================================*/
  function tabs() {
    $(".cs_tabs .cs_tab_links a").on("click", function (e) {
      var currentAttrValue = $(this).attr("href");
      $(".cs_tabs " + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents("li").addClass("active").siblings().removeClass("active");
      e.preventDefault();
    });
  }
  /*======================================================
    9. Workflow
  ========================================================*/
  function workflowAnimation() {
    var $items = $(".cs_workflow_wrap .cs_iconbox");
    if (!$items.length) return;

    var currentIndex = 0;
    var totalItems = $items.length;
    var interval = null;
    var timeout = null;
    var isActive = true;

    function activateNextItem() {
      if (!isActive) return;
      $items.eq(currentIndex).addClass("active");
      currentIndex++;

      if (currentIndex >= totalItems) {
        if (interval) clearInterval(interval);
        timeout = setTimeout(function () {
          $items.removeClass("active");
          currentIndex = 0;
          timeout = setTimeout(function () {
            if (isActive) startCycle();
          }, 2000);
        }, 2000);
      }
    }

    function startCycle() {
      if (interval) clearInterval(interval);
      currentIndex = 0;
      interval = setInterval(activateNextItem, 2000);
      activateNextItem();
    }

    startCycle();

    // Cleanup function if needed
    return function () {
      isActive = false;
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }
  /*======================================================
    10. Hero Parallax
  ========================================================*/
  function heroParallax() {
    var $hero = $(".cs_hero.cs_style_1");
    if (!$hero.length) return;

    var $sm1 = $hero.find(".cs_hero_thumb_sm_1");
    var $sm2 = $hero.find(".cs_hero_thumb_sm_2");
    if (!$sm1.length && !$sm2.length) return;

    var targetX1 = 0,
      targetY1 = 0,
      targetR1 = 0;
    var targetX2 = 0,
      targetY2 = 0,
      targetR2 = 0;
    var currentX1 = 0,
      currentY1 = 0,
      currentR1 = 0;
    var currentX2 = 0,
      currentY2 = 0,
      currentR2 = 0;
    var ease = 0.08;
    var rafId = null;
    var enabled = window.innerWidth > 991;

    function updateTargets() {
      if (!enabled) {
        targetX1 = targetY1 = targetR1 = 0;
        targetX2 = targetY2 = targetR2 = 0;
        return;
      }
      var scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;
      var heroHeight = $hero.outerHeight() || 1;
      // Progress clamped to [0, 1.2] so elements keep easing out past the hero
      var progress = Math.min(Math.max(scrollY / heroHeight, 0), 1.2);
      // Left card: slide up and further left
      targetX1 = -progress * 180;
      targetY1 = -progress * 260;
      targetR1 = -progress * 8;
      // Right card: slide up and further right
      targetX2 = progress * 180;
      targetY2 = -progress * 260;
      targetR2 = progress * 8;
    }

    function animate() {
      currentX1 += (targetX1 - currentX1) * ease;
      currentY1 += (targetY1 - currentY1) * ease;
      currentR1 += (targetR1 - currentR1) * ease;
      currentX2 += (targetX2 - currentX2) * ease;
      currentY2 += (targetY2 - currentY2) * ease;
      currentR2 += (targetR2 - currentR2) * ease;

      $sm1.css(
        "transform",
        "translate3d(" +
          currentX1.toFixed(2) +
          "px, " +
          currentY1.toFixed(2) +
          "px, 0) rotate(" +
          currentR1.toFixed(2) +
          "deg)",
      );
      $sm2.css(
        "transform",
        "translate3d(" +
          currentX2.toFixed(2) +
          "px, " +
          currentY2.toFixed(2) +
          "px, 0) rotate(" +
          currentR2.toFixed(2) +
          "deg)",
      );

      var settled =
        Math.abs(targetX1 - currentX1) < 0.05 &&
        Math.abs(targetY1 - currentY1) < 0.05 &&
        Math.abs(targetR1 - currentR1) < 0.05 &&
        Math.abs(targetX2 - currentX2) < 0.05 &&
        Math.abs(targetY2 - currentY2) < 0.05 &&
        Math.abs(targetR2 - currentR2) < 0.05;

      if (settled) {
        rafId = null;
      } else {
        rafId = requestAnimationFrame(animate);
      }
    }

    function kick() {
      updateTargets();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    }

    $(window).on("scroll", kick);
    $(window).on("resize", function () {
      enabled = window.innerWidth > 991;
      kick();
    });

    kick();
  }
  /*======================================================
    11. CTA Scroll Zoom
  ========================================================*/
  function ctaScrollZoom() {
    var $cta = $(".cs_cta_scroll");
    if (!$cta.length) return;

    // Initial "zoomed out" state: slightly wider than container.
    var startScale = 1.1;
    var rafId = null;
    var targetProgress = 0;
    var currentProgress = 0;
    var ease = 0.1;
    var enabled = window.innerWidth > 991;

    function computeProgress() {
      if (!enabled) return 1;
      var rect = $cta[0].getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var elCenter = rect.top + rect.height / 2;
      var viewportCenter = vh / 2;
      var dist = elCenter - viewportCenter;
      var p = 1 - dist / (vh / 2);
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      return p;
    }

    function apply() {
      if (!enabled) {
        $cta.css({ transform: "" });
        return;
      }
      var inv = 1 - currentProgress;
      var scale = 1 + (startScale - 1) * inv;
      $cta.css({
        transform: "scale(" + scale.toFixed(4) + ")",
      });
    }

    function animate() {
      currentProgress += (targetProgress - currentProgress) * ease;
      apply();
      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        rafId = requestAnimationFrame(animate);
      } else {
        currentProgress = targetProgress;
        apply();
        rafId = null;
      }
    }

    function kick() {
      targetProgress = computeProgress();
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    }

    $(window).on("scroll", kick);
    $(window).on("resize", function () {
      enabled = window.innerWidth > 991;
      kick();
    });
    kick();
  }
})(jQuery); // End of use strict
