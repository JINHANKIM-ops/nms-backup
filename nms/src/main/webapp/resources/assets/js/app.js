
	$('.metismenu li>ul').hide();
	
	$('.has-arrow').click(function() {
		$(this).next().slideToggle();
	});

	$(".switcher-btn").on("click", function() {
		$(".switcher-wrapper").toggleClass("switcher-toggled")
		}), $(".close-switcher").on("click", function() {
		$(".switcher-wrapper").removeClass("switcher-toggled")
	});

