document.addEventListener('DOMContentLoaded', function(){
    
    $('.home-slider__heading').each(function(){
        let text = $(this).text().split(' '),
        first = text.shift()
        $(this).html(`${first} <br><span>${text.join(' ')}</span`)
    })

    function toggleMenu(){
        $('.menu-toggle').toggleClass('menu-toggle_active');
        $('.top-menu').toggleClass('top-menu_active')
    }

    $('.menu-toggle').click(function(){ toggleMenu()});

    function closeMenu(){
        $('.menu-toggle').removeClass('menu-toggle_active');
        $('.top-menu').removeClass('top-menu_active')
    }

    $(document).click(function(e){
        if($(e.target).closest('.menu-container').length) return closeMenu;
    })
    
    const homeSlider = new Swiper('.home-slider', {
        speed: 800,
        effect: 'fade',
        centeredSlides: true,
        pagination: {
			el: '.home-slider__pagination',
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				let indT = total >= 10 ? total : `0${total}`
				let indC = current >= 10 ? current : `0${current}`
				return `<b>${indC}</b><span></span> ${indT}`
			}
		},
        scrollbar: {
            el: '.home-slider__scrollbar',
            draggable: true
        },
        navigation:{
            prevEl: '.home-slider__prev',
            nextEl: '.home-slider__next'
        },
        keyboard:{
            enabled: true,
            onlyViewport: false
        },
        runCallbacksOnInit: false
    })

});