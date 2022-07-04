const API_KEY = "648a3f25-fd2f-41cc-be40-d17b46a00fd1";

const API_URL_RANDOM = [
  "https://api.thecatapi.com/v1/images/search",
  "?limit=2",
  `&api_key=${API_KEY}`,
].join("");

const API_URL_FAVOURITES = [
  "https://api.thecatapi.com/v1/favourites",
  `?api_key=${API_KEY}`,
].join("");

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const spanError = document.getElementById("error");

querystring = ["?", "limit=2", "&order=Desc"].join("");

// const API_URL = `https://api.thecatapi.com/v1/images/search${querystring}`;

// async function myCat() {
//   const res = await fetch(URL);
//   const data = await res.json();
//   const img = document.querySelector("img");
//   img.src = data[0].url;
// }
// const myButton = document.querySelector("button");
// myButton.onclick = myCat;
// Fetch data con async await

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random: ", data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    img1.src = data[0].url;
    img2.src = data[1].url;
    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}
// LOAD FAVORITES----------------------------------------
async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();
  console.log("Favorites: ", data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
    console.log("Hubo un error: ", res.status, data.message);
  } else {

    const section = document.getElementById('favouriteMichis');

    data.forEach((michi) => {

      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar gato de favoritos');
      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id)
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id
    }),
  });

  const data = await res.json();
  console.log("saveFavourite: ", res);
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
    console.log("Hubo un error: ", res.status, data.message);
  } else {
    console.log("Gato guardado en favoritos");
  }
}
// DELETE FAVOURITE--------------------------
async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
    console.log("Hubo un error: ", res.status, data.message);
  } else {
    console.log("Gato eliminado de favoritos");
  }
  console.log("saveFavourite: ", res);
}

loadRandomMichis();
loadFavouriteMichis();
