const web = document.getElementById("web");

async function getDattebayoData() {

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

  collections.forEach (async (name) => {
    try {
      const response = await fetch(`https://dattebayo-api.onrender.com/${name}`);
      const data = await response.json();

      web.innerHTML += `<h1>${name}</h1>`;

      data[name].forEach (item => {
        web.innerHTML += `
          <p>${item.name}</p>
          ${item.images && item.images[0] ? `<img src = "${item.images[0]}" width = "200">` : ''}
        `; 
      });

    } catch (error){
    console.error("შეცდომაა", error);
    }

  });

}

getDattebayoData();