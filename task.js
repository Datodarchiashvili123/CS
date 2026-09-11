const page = document.getElementById("page");

async function getDattebayoData() {
  const collections = ["characters", "clans", "villages", "kekkei-genkai", "tailed-beasts", "teams", "akatsuki", "kara"];

  for (const name of collections) {
    try {
      const response = await fetch(
        `https://dattebayo-api.onrender.com/${name}`
      );

      const data = await response.json();

      page.innerHTML += `<h1>${name.toUpperCase()}</h1> `;

      const items = data[name] || [];

      items.forEach((item) => {
        page.innerHTML += `<p>
            <b>${item.name}</b>
          </p>

          ${
            item.images && item.images[0]
              ? `<img src="${item.images[0]}" width="300">`
              : ""
          } <line>`;
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

getDattebayoData();
