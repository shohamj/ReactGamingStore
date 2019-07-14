//<!--===============================================================================================-->
import "./vendor/jquery/jquery-3.2.1.min.js";
//<!--===============================================================================================-->
import "./vendor/animsition/js/animsition.min.js";
//<!--===============================================================================================-->
import "./vendor/bootstrap/js/popper.js";
import "./vendor/bootstrap/js/bootstrap.min.js";
//<!--===============================================================================================-->
import "./vendor/select2/select2.min.js";

$(".js-select2").each(function(){
$(this).select2({
minimumResultsForSearch: 20,
dropdownParent: $(this).next('.dropDownSelect2')
});
})

//<!--===============================================================================================-->

//<!--===============================================================================================-->
import "./vendor/slick/slick.min.js";
import "./js/slick-custom.js";
//<!--===============================================================================================-->
import "./vendor/parallax100/parallax100.js";

        $('.parallax100').parallax100();

//<!--===============================================================================================-->
import "./vendor/MagnificPopup/jquery.magnific-popup.min.js";

$('.gallery-lb').each(function() { // the containers for all your galleries
$(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
        enabled:true
        },
        mainClass: 'mfp-fade'
    });
});

//<!--===============================================================================================-->
import "./vendor/isotope/isotope.pkgd.min.js";
//<!--===============================================================================================-->
import "./vendor/sweetalert/sweetalert.min.js";

$('.js-addwish-b2').on('click', function(e){
e.preventDefault();
});

$('.js-addwish-b2').each(function(){
var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
$(this).on('click', function(){
swal(nameProduct, "is added to wishlist !", "success");

$(this).addClass('js-addedwish-b2');
$(this).off('click');
});
});

$('.js-addwish-detail').each(function(){
var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

$(this).on('click', function(){
swal(nameProduct, "is added to wishlist !", "success");

$(this).addClass('js-addedwish-detail');
$(this).off('click');
});
});

/*---------------------------------------------*/

$('.js-addcart-detail').each(function(){
var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
$(this).on('click', function(){
swal(nameProduct, "is added to cart !", "success");
});
});

//<!--===============================================================================================-->
import "./vendor/perfect-scrollbar/perfect-scrollbar.min.js";

$('.js-pscroll').each(function(){
$(this).css('position','relative');
$(this).css('overflow','hidden');
var ps = new PerfectScrollbar(this, {
wheelSpeed: 1,
scrollingThreshold: 1000,
wheelPropagation: false,
});

$(window).on('resize', function(){
ps.update();
})
});

//<!--===============================================================================================-->
import "./js/main.js";