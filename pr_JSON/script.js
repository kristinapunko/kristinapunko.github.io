const header = document.querySelector('header');
const section = document.querySelector('section');
const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json' 
request.send()
request.onload = function() {
    const superHeroes = request.response
    populateHeader (superHeroes)
    showHeroes (superHeroes)
}
function populateHeader(superHeroes){
    const h1 = document.createElement('h1'); 
    h1.textContent = superHeroes.squadName;   
    header.appendChild(h1);  

    const p=document.createElement("p");
    p.textContent = "Hometown: "+superHeroes.homeTown+"// Formed: "+superHeroes.formed;
    header.appendChild(p)
}

function showHeroes (superHeroes){
    const heros = superHeroes.members;
    for (var i = 0; i < heros.length; i++) {
        const article = document.createElement("article");
        const h2 = document.createElement('h2');
        h2.textContent = heros[i].name;

        const p = document.createElement('p');
        p.innerHTML = `Secret identity: ${heros[i].secretIdentity}<br>Age: ${heros[i].age}<br>Superpowers:`;
        const ul = document.createElement('ul');
        heros[i].powers.forEach(power => {
            const li = document.createElement('li');
            li.textContent = power; 
            ul.appendChild(li);
        });
        article.appendChild(h2)
        article.appendChild(p)
        article.appendChild(ul)
        section.appendChild(article)
    }
    
}
