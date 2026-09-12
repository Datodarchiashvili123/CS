const web = document.getElementById("web");

function getDattebayoData() {

  const collections = [
    'characters',
    'clans',
    'villages',
    'kekkei-genkai',
    'tailed-beasts',
    'teams',
    'akatsuki',
    'kara'
  ];

  collections.forEach(name => {
    fetch(`https://dattebayo-api.onrender.com/${name}`)
    .then(response => response.json())
    .then(data => {
      web.innerHTML += `<h1>${name}</h1>`;

      data.[name].forEach(item => {
        web.innerHTML += `
          <p>${item.name}</p>
          ${item.images && item.images[0] ? `<img src = "${item.images[0]}" width = "200">` : ''}
        `; 
      });
    });
  });
}