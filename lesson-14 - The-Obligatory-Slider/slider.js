// the procedural method
(function($) {
	var sliderUL = $('div.slider').css('overflow', 'hidden').children('ul'), // chaining
		imgs = sliderUL.find('img'), // *array olmasına dikkat*
		imgWidth = imgs[0].width, // 600
		// alt: imgs.first().width() or imgs.width() returns 600
		// alt2: imgs.first().css('width') or imgs.css('width') returns 600px
		imgsLen = imgs.length, // 4
		current = 1, // img we are on
		totalImgsWidth = imgsLen * imgWidth; // 2400 (assuming they got same width)
		// *since we didn't hardcode the variables (imgWidth, imgsLen, totalImgsWidth) 
		// above we can add images however we want!*

	// we show the button which we hid through css
	// ***instead of using show(), we cud use css('display', 'block') 
	// or we cud add a class (addClass()) in which we modify display property. 
	// we cud also have created the button on jquery (as in 8th ex)***
	$('#slider-nav').show().find('button').on('click', function() { // *initializer*
		 direction = $(this).data('dir'), // alt: $(this).attr('data-dir'),
			loc = imgWidth; // 600

		// update current value
		// *current navigasyona yardımcı oluyor ve film şeridinde nerede 
		// olduğumuzu anlamamızı sağlıyor (sınırdan taşarsak önemli)*
		( direction === 'next' ) ? ++current : --current;

		// *ilk image'da prev yaparsak ve son img'da next yaparsak*
		if ( current === 0 ) { // === compares both value and data type
			current = imgsLen;
			loc = totalImgsWidth - imgWidth; // 2400 - 600 = 1800
			direction = 'next'; // *we change direction contrary to what user clicks*
		} else if ( current - 1 === imgsLen ) { // *in case current is > 4 we reset*
			current = 1;
			loc = 0; // **absolute pos. olduğundan direction var kullanmak gereksiz**
			// ***alt: resetlemeden
			// loc = totalImgsWidth - imgWidth;
			// direction = 'previous';***
		}

		transition(sliderUL, loc, direction); // transition() performs animation
		// sliderUL: we are animating sliderUL var (the ul that wraps our imgs)
		// loc: the location we are transitioning/moving to: 
		// either relative (600, 1800) or absolute (0)
		// by using direction variable (either next or prev), which looks like a film strip,
		// we wudn't need to write lots of functions; like one for moving forward, 
		// one for moving backward and one function for resetting imgs inside.
	});

	/* ***transition fonksiyonu sliderUL (container) variableını gördüğünden 
	pass edilmesine gerek yokmuş, 
	loc ve direction var'larını ise göremediğinden ya şimdiki gibi pass edilmeli 
	ya da global vara atanmalı*** */
	function transition( container, loc, direction ) {
		var unit; // -= +=

		// if not on the last image and if not we click next we use relative values
		// bc if location is 0 we immeditally wanna go back to 0 instead of using -=0
		if ( direction && loc !== 0 ) {
			unit = ( direction === 'next' ) ? '-=' : '+=';
		}

		// **container, img'ları tutan film şeridi gibi düşünülebilir**
		container.animate({
			'margin-left': unit ? (unit + loc) : loc // -=600, -=1800 or +=600 else 0
			// *** alt: loc ve direction variable'a gerek kalmadan çok daha pratik:
			// 'margin-left': -( (current-1) * imgWidth ) ***
		}, 600);
	}

})(jQuery);
// we import jQuery into a function and can us $ sign as jQuery "in the siaf" for sure*