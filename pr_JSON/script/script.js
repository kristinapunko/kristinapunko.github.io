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

// Initialize i18next
i18next.init({
    lng: 'en', // Default language
    debug: true,
    resources
}, function (err, t) {
    if (err) return console.error(err);
    fetchSuperheroData(i18next.language);
    updateContent();
});

// Fetch and display superhero data based on selected language
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

// Update text on the page
function updateContent() {
    document.getElementById('greeting').textContent = i18next.t('greeting');
}

// Populate header with translated superhero squad information
function populateHeader(superHeroes) {
    const header = document.querySelector('header');
    header.innerHTML = ''; // Clear header for language switching

    const h1 = document.createElement('h1');
    h1.textContent = i18next.t('squadName');
    header.appendChild(h1);

    const p = document.createElement('p');
    p.textContent = `${i18next.t('hometown')}: ${superHeroes.homeTown} // ${i18next.t('formed')}: ${superHeroes.formed}`;
    header.appendChild(p);
}

// Display superhero members
function showHeroes(superHeroes) {
    const section = document.querySelector('section');
    section.innerHTML = ''; // Clear section for language switching

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

// Language change handler
document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value;
    i18next.changeLanguage(selectedLanguage, function() {
        updateContent();
        fetchSuperheroData(selectedLanguage); // Refresh superhero data with new language
    });
});

// function populateHeader(jsonObj) {
//     var header = document.querySelector("header");
//     var myH1 = document.createElement("h1");
//     myH1.textContent = jsonObj["squadName"];
//     header.appendChild(myH1);

//     var myPara = document.createElement("p");
//     myPara.textContent =
//         "Hometown: " + jsonObj["homeTown"] + " // Formed: " + jsonObj["formed"];
//     header.appendChild(myPara);
//     }
//     function showHeroes(jsonObj) {
//         var section = document.querySelector("section");
//         var heroes = jsonObj["members"];

//         for (var i = 0; i < heroes.length; i++) {
//             var myArticle = document.createElement("article");
//             var myH2 = document.createElement("h2");
//             var myPara1 = document.createElement("p");
//             var myPara2 = document.createElement("p");
//             var myPara3 = document.createElement("p");
//             var myList = document.createElement("ul");

//             myH2.textContent = heroes[i].name;
//             myPara1.textContent = "Secret identity: " + heroes[i].secretIdentity;
//             myPara2.textContent = "Age: " + heroes[i].age;
//             myPara3.textContent = "Superpowers:";

//             var superPowers = heroes[i].powers;
//             for (var j = 0; j < superPowers.length; j++) {
//             var listItem = document.createElement("li");
//             listItem.textContent = superPowers[j];
//             myList.appendChild(listItem);
//             }

//             myArticle.appendChild(myH2);
//             myArticle.appendChild(myPara1);
//             myArticle.appendChild(myPara2);
//             myArticle.appendChild(myPara3);
//             myArticle.appendChild(myList);

//             section.appendChild(myArticle);
//         }
//         }