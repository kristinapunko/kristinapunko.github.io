const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 4,   
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            760: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            1050: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            1324: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
        }
});

