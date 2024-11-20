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
const resources = {
    en: {
        translation: {
            "greeting": "Be sure to add your order",
            "uan":"uan",
            "button": {
                "addToCart": "Add to Cart",
                "comingSoon": "Coming Soon"
            }
        }
    },
    uk: {
        translation: {
            "greeting": "Обов'язково додайте своє замовлення",
            "uan":"грн",
            "button": {
                "addToCart": "до кошика",
                "comingSoon": "незабаром у продажі"
            }
        }
    }
};
const storedLanguage = localStorage.getItem('language') || 'en';

    i18next.init({
        lng: storedLanguage,
        debug: true,
        resources
    }, function (err, t) {
        if (err) return console.error(err);
        fetchSuperheroData(i18next.language);
    });

    document.getElementById('language-selector').value = storedLanguage;

    function fetchSuperheroData(language) {
        const requestURL = language === 'uk' ? 
            'https://kristinapunko.github.io/JSON/uk.json' : 
            'https://kristinapunko.github.io/JSON/en.json';
        const request = new XMLHttpRequest()
        request.open('GET', requestURL)
        request.responseType = 'json' 
        request.send()
        request.onload = function() {
            const products = request.response
            showProducts(products)
}
    }

    function showProducts(products) {
        const container = document.getElementById('product-container');
        const slides = container.querySelectorAll('.swiper-slide'); 

        products.forEach((product, index) => {
            const slide = slides[index];

            slide.querySelector('#categoryhref').href = product.categoryhref;
            slide.querySelector('.category').textContent = product.category;
            slide.querySelector('.img').href = product.image;
            slide.querySelector('.img img').src = product.image;
            slide.querySelector('.img img').alt = product.name;
            slide.querySelector('.product-title').textContent = product.name;
            slide.querySelector('.product-title').href = product.link;
            slide.querySelector('.price small').textContent = product.oldPrice ? `${product.oldPrice} ${i18next.t('uan')}` : "";
            slide.querySelector('h4').textContent = `${product.price} ${i18next.t('uan')}`;

            if (product.badge) {
                const badge = document.createElement("div");

                if (i18next.language === 'uk') {
                    badge.classList.add("badge", product.badge === "топ продажів" ? "blue" : "green");
                    badge.textContent = product.badge === "топ продажів" ? "топ продажів" : "новинка";
                } else {
                    badge.classList.add("badge", product.badge === "best seller" ? "blue" : "green");
                    badge.textContent = product.badge === "best seller" ? "best seller" : "new";
                }

                slide.querySelector('.container').appendChild(badge);
            }

            const button = slide.querySelector('button');
            button.textContent = product.available ? i18next.t('button.addToCart') : i18next.t('button.comingSoon');
            if (!product.available) button.classList.add('coming-soon');

            container.appendChild(slide);
        });

        swiper.update(); 
    }

    document.getElementById('language-selector').addEventListener('change', function () {
        const selectedLanguage = this.value;
        i18next.changeLanguage(selectedLanguage, function() {
            localStorage.setItem('language', selectedLanguage);
            fetchSuperheroData(selectedLanguage);
        });
    });
