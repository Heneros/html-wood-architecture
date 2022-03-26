document.addEventListener('DOMContentLoaded', function(){
    
    MicroModal.init({
        openTrigger: 'data-custom-open',
        closeTrigger: 'data-custom-close',
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
    });

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
    });

    $('[data-custom-open]').each(function(){
         $('.modal [name=form]').val($(this).data('form'));
    });

    $('[data-custom-close]').each(function(){
        $('.modal [name=form]').val('');
   })



    $('.home-callback__list li').each(function(){
        $(this).html($(this).text().replace(/([0-9.]+)/g, '<span>$1</span>'))
    });




    const advSlider = new Swiper('.advantages-slider', {
        effect: 'fade',
        speed: 800,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false
        }

    })

    const blogSlider = new Swiper('.slider__blog', {
        speed: 400,
        slidesPerView: 2,
        // slidesPerView: "auto",
        // centeredSlides: true,
        spaceBetween: 40,   
        grabCursor: true,
        pagination: {
            el: ".blog-slider__pagination"
          },
 
  
 
    });

});