function openPopup(){

}

$(document).ready(function(){

    // Open popup form
    // ----------------- //
    $('.header__buttons a').on('click', function(){
        $.fancybox.open($('#popupEnter'), {
            touch: false
        });
    });
    // ----------------- //

    // Form Tabs
    // ----------------- //
    $('.popup-nav a').on('click', function(){
        $('.popup-nav a').removeClass('active');
        $('.popup-form').removeClass('active');
        $(this).addClass('active');
        $($(this).attr('href')).addClass('active');
        return false;
    });
    // ----------------- //

    // Forgot Password Tabs
    // ----------------- //
    $('#forgot-password').on('click', function(){
        $('.popup-form').removeClass('active');
        $('#form-password').addClass('active');
    });
    // ----------------- //

    // Remember Password Tabs
    // ----------------- //
    $('#remember-password').on('click', function(){
        $('.popup-form').removeClass('active');
        $('#form-login').addClass('active');
    });
    // ----------------- //

    // Show More Cart Item
    // ----------------- //
    $('.cart-link').on('click', function(){
        $(this).toggleClass('open');
        $(this).closest('.content').toggleClass('open');
    });
    // ----------------- //

    $('#open-promo').on('click', function(){
       $(this).closest('.total-promo').toggleClass('open')
    });




});
