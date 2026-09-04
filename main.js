const API = " https://api.thecatapi.com/v1/images/search?limit=10";
const images = document.querySelectorAll(".card-image");

async function getCats() {
    const response = await fetch(API);
    const cats = await response.json();

    for (let i = 0; i < cats.length; i++) {
        images[i].src = cats[i].url;
    }
}

getCats();