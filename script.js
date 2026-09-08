let url = "https://dogapi.dog/api/v2/breeds";

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(body) {

        let breeds = body.data;
        let breedsDiv = document.getElementById("breeds");

        for (let i = 0; i < breeds.length; i++) {

            let breed = breeds[i];

            let name = breed.attributes.name;
            let description = breed.attributes.description;
            let image = breed.attributes.images[0].medium;

            breedsDiv.innerHTML += `
                <div class="card">
                    <img src="${image}" alt="${name}">
                    <h2>${name}</h2>
                    <p>${description}</p>
                </div>
            `;
        }
    })
    .catch(function(error) {
        console.log(error);
    });