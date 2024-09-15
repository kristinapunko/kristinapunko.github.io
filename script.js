const iconWrap = document.getElementById('iconWrap')
const iconOpen = document.getElementById('iconOpen')
const iconClose = document.getElementById('iconClose')
const mainMenu = document.getElementById('mainMenu')



iconWrap.addEventListener('click',() => {
	mainMenu.classList.toggle('hide-menu')
	iconOpen.classList.toggle('hide')
	iconClose.classList.toggle('hide')
})

document.addEventListener("DOMContentLoaded", function() {
    // Отримуємо елементи за їхніми ID
    const Home = document.getElementById("Home");
    const About = document.getElementById("About");
    const Skills = document.getElementById("Skills");
    const Portfolio = document.getElementById("Portfolio");
    const Contact = document.getElementById("Contact");

    // Додаємо обробники подій для кожної секції
    Home.addEventListener("click", function() {
        document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    });

    About.addEventListener("click", function() {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    });

    Skills.addEventListener("click", function() {
        document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
    });

    Portfolio.addEventListener("click", function() {
        document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
    });

    Contact.addEventListener("click", function() {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    });
});
