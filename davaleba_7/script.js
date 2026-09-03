const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=9';

function getCatImages(){
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const images = document.querySelectorAll('.cat-card img');
        for(let i = 0; i < images.length && i < data.length; i++){
            images[i].src = data[i].url;
        }
    });
} 

getCatImages();