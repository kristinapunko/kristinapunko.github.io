// Translation resources
const resources = {
    en: {
        translation: {
            "greeting": "Hello",
            "squadName": "Superhero Squad",
            "hometown": "Hometown",
            "formed": "Formed",
            "secretIdentity": "Secret identity",
            "age": "Age",
            "superpowers": "Superpowers"
        }
    },
    uk: {
        translation: {
            "greeting": "Привіт",
            "squadName": "Загін супергероїв",
            "hometown": "Рідне місто",
            "formed": "Утворений",
            "secretIdentity": "Таємна особа",
            "age": "Вік",
            "superpowers": "Суперсили"
        }
    }
};

i18next.init({
    lng: 'en', 
    debug: true,
    resources
}, function (err, t) {
    if (err) return console.error(err);
    fetchSuperheroData(i18next.language);
});

function fetchSuperheroData(language) {
    const requestURL = (language == 'uk') ? 'json/ukr.json' : 'https://semegenkep.github.io/json/example.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const superHeroes = request.response;
        populateHeader(superHeroes);
        showHeroes(superHeroes);
    }
}

function populateHeader(superHeroes) {
    const header = document.querySelector('header');
    header.innerHTML = ''; 

    const h1 = document.createElement('h1');
    h1.textContent = i18next.t('squadName');
    header.appendChild(h1);

    const p = document.createElement('p');
    p.textContent = `${i18next.t('hometown')}: ${superHeroes.homeTown} // ${i18next.t('formed')}: ${superHeroes.formed}`;
    header.appendChild(p);
}

function showHeroes(superHeroes) {
    const section = document.querySelector('section');
    section.innerHTML = ''; 
    superHeroes.members.forEach(hero => {
        const article = document.createElement('article');

        const h2 = document.createElement('h2');
        h2.textContent = hero.name;

        const p = document.createElement('p');
        p.innerHTML = `${i18next.t('secretIdentity')}: ${hero.secretIdentity}<br>${i18next.t('age')}: ${hero.age}<br>${i18next.t('superpowers')}:`;

        const ul = document.createElement('ul');
        hero.powers.forEach(power => {
            const li = document.createElement('li');
            li.textContent = power;
            ul.appendChild(li);
        });

        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(ul);
        section.appendChild(article);
    });
}

document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, function() {
        fetchSuperheroData(selectedLanguage); 
    });
});
