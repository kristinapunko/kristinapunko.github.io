function fetchSuperheroData(language) {
    const requestURL =  'https://semegenkep.github.io/json/example.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const superHeroes = request.response;
        console.log(superHeroes)
        populateHeader(superHeroes);
        showHeroes(superHeroes);
    }
}

function populateHeader(superHeroes) {
    const header = document.querySelector('header');
    const h1 = document.createElement('h1');
    h1.textContent = superHeroes.squadName;
    header.appendChild(h1);
    console.log(superHeroes.homeTown)

    const p = document.createElement('p');
    p.textContent = `Hometown: ${superHeroes.homeTown} // Formed: ${superHeroes.formed}`;
    header.appendChild(p);
}

function showHeroes(superHeroes) {
    const section = document.querySelector('section');

    superHeroes.members.forEach(hero => {
        const article = document.createElement('article');

        const h2 = document.createElement('h2');
        h2.textContent = hero.name;

        const p = document.createElement('p');
        p.innerHTML = `Secret identity: ${hero.secretIdentity}<br>Age: ${hero.age}<br>Superpowers:`;

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
fetchSuperheroData();