const hero = document.querySelector(".hero");
const backgrounds = [
    "assets/images/backgrounds/5_dunes-and-ripples_pia24036-1041.webp",
    "assets/images/backgrounds/8407784802_12a4f83273_b.jpg",
    "assets/images/backgrounds/bernd-dittrich-oJ47mQoqc04-unsplash.jpg",
    "assets/images/backgrounds/cementeriofractal.jpg",
    "assets/images/backgrounds/ESP_042895_2495_RED.browse.jpg",
    "assets/images/backgrounds/My_fractal_life_0.jpg",
    "assets/images/backgrounds/Tail-1550px.jpg",
    "assets/images/backgrounds/the-fractal-forest.jpg"
];
const backgroundRotationMs = 20 * 60 * 1000;
let previousBackgroundIndex = -1;

function showRandomBackground() {
    let nextBackgroundIndex;

    do {
        nextBackgroundIndex = Math.floor(Math.random() * backgrounds.length);
    } while (backgrounds.length > 1 && nextBackgroundIndex === previousBackgroundIndex);

    hero.style.setProperty("--hero-background", `url("${backgrounds[nextBackgroundIndex]}")`);
    previousBackgroundIndex = nextBackgroundIndex;
}

showRandomBackground();
window.setInterval(showRandomBackground, backgroundRotationMs);
