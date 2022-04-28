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
        slidesPerView: 1,
        // slidesPerView: "auto",
        // centeredSlides: true,
        spaceBetween: 20,   
        grabCursor: true,
        pagination: {
            el: ".blog-slider__pagination"
          },
          breakpoints: {
            599: {
                slidesPerView: 2,
                spaceBetween: 40
              },
          }
    });
    $(window).scroll(function(){
        if($(this).scrollTop()){
            $('#up').fadeIn()
        }else{
            $('#up').fadeOut();
        }
    })
    $('#up').click(function(){
        ("html, body").animate({scrollTop: 0}, 1000)
    });

    var swiper = new Swiper(".mySwiperGallery1", {
        spaceBetween: 7,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        freeMode: true,
        breakpoints:{
            415:{
                spaceBetween: 7,
                slidesPerView: 4 ,
            },
            768:{
                spaceBetween: 7,
                slidesPerView: 8,
            },
      

        }
      });
      var swiper2 = new Swiper(".mySwiperGallery2", {
        spaceBetween: 10,
        thumbs: {
          swiper: swiper,
        },
      });


      $(".js-tabs-head-item").on('click', function () {
        if (!$(this).hasClass("active__show")) {
           let btns = $(this).closest(".js-tabs").find(".js-tabs-head-item");
           let count;
           $(btns).each(function () {
              $(this).removeClass("active__show");
           })
  
           $(this).addClass("active__show");
  
           $(btns).each(function (index) {
              if ($(this).hasClass("active__show")) {
                 count = index;
              }
           })
           let blocks = $('.js-tabs-body').find('.js-tabs-body-item');
           $(blocks).each(function (index) {
              if (index == count) {
                 $(this).addClass("active__show");
                 $(".feedback__bottom").addClass("active__show")
              } else {
                 $(this).removeClass("active__show");
                 $(".feedback__bottom").removeClass("active__show")
              }
           })
        }
  
     })



     $.getJSON('../data.json', function(data) {
        var item_service = [];
        $.each(data, function(key, value){
            item_service += "<div class='item__service'> <div class='item__text'>";
            item_service += "<span class='title'>" + value.name + "</span>";
            item_service += "<p>" + value.description + "</p>";
            item_service += "<div class='item__img'><img src='"+ value.description + "'></div>";
            item_service += "</div></div>";
        })
        $("#items__service").append(item_service)
     });


});

