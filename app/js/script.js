$(function () {

  if ($(window).width() < 766) {
    $('.search-form__btn').on('click', function () {
      $('.burger-menu, .header__logo').fadeOut();
      setTimeout(function () {
        $('.search-form').addClass('show-form').css('padding', '0');
      }, 300);
    });
    $('.search-form__input').on('focus', function () {
      $('.search-form').addClass('show-form');
      $('.burger-menu, .header__logo').fadeOut();
    });
    $('.search-form__input').on('focusout', function () {
      $('.search-form').removeClass('show-form');
      $('.burger-menu, .header__logo').fadeIn();
    });
  }

  $('.burger-menu').on('click', function () {
    $('.header__nav').toggleClass('active');
    $('body').toggleClass('noscroll');
    if($('.header__nav').hasClass('active')) {
      $('.burger-menu > img').attr('src', '');
      $('.burger-menu').addClass('show');
    } else {
      $('.burger-menu').removeClass('show');
      $('.burger-menu > img').attr('src', '../images/burger-menu.svg');
    }
  });

  $('.blurb__layout-text').not(':first').hide();
  $('.blurb__layout-caption').on('click', function () {
    $('.blurb__layout-caption').removeClass('active').eq($(this).index()).addClass('active');
    $('.blurb__layout-text').hide().eq($(this).index()).fadeIn(1000);
  }).eq(0).addClass('active');


  let swiper = new Swiper('.shares__boxes', {
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    breakpoints: {
      575: {
        slidesPerView: 2
      },
      991: {
        slidesPerView: 3,
        slidesPerGroup: 1
      },
      1199: {
        slidesPerView: 4
      }
    }
  });

  new Swiper(".reviews__slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    }
  });

  new Swiper(".last-articles__cards", {
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    breakpoints: {
      400: {
        slidesPerView: 1
      },
      757: {
        slidesPerView: 2
      },
      991: {
        slidesPerView: 3
      }
    }
  });

  $('.subscribe__form').on('submit', function (form) {
    if ($('.subscribe__form-input').val() == '') {
      $('.input-error').fadeIn(300);
      form.preventDefault();
      $('.subscribe__form-input').on('focus', function () {
        $('.input-error').fadeOut(300);
      });
    }
  });

  $('.main__select').chosen({
    disable_search_threshold: 10
  });

  $(window).on("load", function () {
    $('.mediacatalog__list').mCustomScrollbar({
      theme: 'dark',
      scrollInertia: 200,
      autoHideScrollbar: true
    });
  });

  function triplets(str) {
    return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u202f');
  }

  let medNums = $('.mediacatalog__range-number');

  medNums.each(function () {
    let currVall = $(this).text(),
      currVallRes = triplets(currVall);
    $(this).text(currVallRes);
  });

  $('.range-slider').slider({
    animate: 'fast'
  });

  $(".mediacatalog__range-price").slider({
    range: 'min',
    min: 1500,
    max: 50000,
    step: 500,
    value: 25000,
    slide: function (event, ui) {
      $('.mediacatalog__price-output').text(ui.value);
      medNums.each(function () {
        let currVall = $(this).text(),
          currVallRes = triplets(currVall);
        $(this).text(currVallRes);
      });
    }
  });

  $(".mediacatalog__range-quantity").slider({
    range: 'min',
    min: 0,
    max: 100,
    step: 5,
    value: 50,
  });

  $(".mediacatalog__range-quantity.contacts").slider({
    range: 'min',
    min: 1500,
    max: 50000,
    step: 500,
    value: 25000,
    slide: function (event, ui) {
      $('.mediacatalog__quantity-output').text(ui.value);
      medNums.each(function () {
        let currVall = $(this).text(),
          currVallRes = triplets(currVall);
        $(this).text(currVallRes);
      });
    }
  });

  $(".mediacatalog__range-views").slider({
    range: 'min',
    min: 1500,
    max: 1000000,
    step: 500,
    value: 500000,
    slide: function (event, ui) {
      $('.mediacatalog__range-output').text(ui.value);
      medNums.each(function () {
        let currVall = $(this).text(),
          currVallRes = triplets(currVall);
        $(this).text(currVallRes);
      });
    }
  });

  $(".mediacatalog__range-folowers").slider({
    range: 'min',
    min: 1500,
    max: 1000000,
    step: 500,
    value: 500000,
    slide: function (event, ui) {
      $('.mediacatalog__folowers-output').text(ui.value);
      medNums.each(function () {
        let currVall = $(this).text(),
          currVallRes = triplets(currVall);
        $(this).text(currVallRes);
      });
    }
  });

  $(".range__dots").slider({
    animate: 'fast',
    range: 'min',
    min: 0,
    max: 5,
    step: 1,
    value: 2,
    create: function (event, dot) {
      let dots = $('.range__dots');
      dots.find(`.range__dots-item:nth-child(1)`).addClass('active');
    },
    slide: function (event, dot) {
      let dots = $('.range__dots');
      dots.find('.range__dots-item').removeClass('active');
      dots.find(`.range__dots-item:nth-child(-n + ${dot.value})`).addClass('active');
    }
  });

  $('.mediacatalog__filter-btn.filter').on('click', function () {
    $('.mediacatalog__aside').slideDown();
    $('body').addClass('noscroll darken');
  });

  $('.mediacatalog__aside-close').on('click', function () {
    $('.mediacatalog__aside').slideUp();
    $('body').removeClass('noscroll darken');
  });

  $('.mediacatalog__filter-btn.sort').on('click', function() {
    $('.mediacatalog__sort-content').slideDown();
    $('body').addClass('noscroll darken');
  })

  $('.mediacatalog__sort-close').on('click', function () {
    $('.mediacatalog__sort-content').slideUp();
    $('body').removeClass('noscroll darken');
  });

  $('.tooltip__icon-img').on('mouseover mouseleave', function () {
    $(this).next('.tooltip__content').fadeToggle();
  });

  $('.card__select').chosen({
    disable_search_threshold: 10
  });


});