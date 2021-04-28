'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
		Isotope Filter
	--------------------*/
	var $container = $('.isotope_items');
	$container.isotope();

	$('.portfolio-filter li').on("click", function(){
		$(".portfolio-filter li").removeClass("active");
		$(this).addClass("active");
		var selector = $(this).attr('data-filter');
		$(".isotope_items").isotope({
				filter: selector,
				animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		return false;
	});
});



(function($){

	/*------------------
  		HEADER
  	--------------------*/
	var navMenu = $('.menu-list')
		navMenu.onePageNav();
	$(window).on('scroll resize',function(e) {
		if ($(this).scrollTop() > 70) {
			$('.header-section').addClass('sticky');
		}else{
			$('.header-section').removeClass('sticky');
		}
		e.preventDefault();
	});

	$('.responsive').on('click', function(event) {
		$('.menu-list').slideToggle(400);
		$('.header-section').toggleClass('bgc');
		event.preventDefault();
	});

	$('.menu-list li a').on('click', function(event) {
		if ($(window).width() < 768) {
			$('.menu-list').slideUp(400);
			$('.header-section').removeClass('bgc');
		}
	});



	/*------------------
		TYPED JS
	--------------------*/
	$(".element").typed({
		strings: ["Hi, I am Sinchan", "welcome to my personal website", "A place to know who I am", " n' what I do"],
		typeSpeed: 10,
		loop:true,
		backDelay: 2000
	});



	/*------------------
		FOOTER
	--------------------*/
	var fh = $('.footer-section').height();
		fh = fh + 140;
	$('.main-warp').css('margin-bottom', fh);



	/*------------------
		PROGRESS BAR
	--------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>100%</span></div>');
		}
	});



	/*------------------
		OWL CAROUSEL
	--------------------*/
	$('#review-carousel').owlCarousel({
		dots: false,
		nav: true,
		loop: true,
		margin:30,
		smartSpeed: 700,
		items:1,
		autoplay:true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
	});



	/*------------------
		MAGNIDIC POPUP
	--------------------*/
	$('.work-item').magnificPopup({
		type: 'image',
		gallery: { enabled: true },
		removalDelay: 400,
		zoom:{enabled: true, duration: 300}
	});


	/*------------------
		WOW JS
	--------------------*/
	new WOW().init();


	/*------------------
		CONTACT FORM
	--------------------*/
	var form = document.getElementById("contact-form");

	    async function handleSubmit(event) {
	      event.preventDefault();
	      var status = document.getElementById("my-form-status");
	      var data = new FormData(event.target);
	      fetch(event.target.action, {
	        method: form.method,
	        body: data,
	        headers: {
	            'Accept': 'application/json'
	        }
	      }).then(response => {
	        status.innerHTML = "Thanks for your submission!";
	        form.reset()
	      }).catch(error => {
	        status.innerHTML = "Oops! There was a problem submitting your form"
	      });
	    }
	    form.addEventListener("submit", handleSubmit)

})(jQuery);
