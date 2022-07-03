const API_KEY = "648a3f25-fd2f-41cc-be40-d17b46a00fd1";

const API_URL_RANDOM = [
  "https://api.thecatapi.com/v1/images/search",
  "?limit=2",
  `&api_key=${API_KEY}`,
].join("");

const API_URL_FAVOURITES = [
  "https://api.thecatapi.com/v1/favourites",
  "?limit=2",
  "&order=Asc",
  // `&api_key=${API_KEY}`,
].join("");
// const API_URL_FAVOURITES = [
//   "https://api.thecatapi.com/v1/favourites",
//   "?limit=2",
//   "&order=Asc",
//   `&api_key=${API_KEY}`,
// ].join("");

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
  }
  {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavoritesMichis() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();
  console.log("Favorites: ", data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  }
}

loadRandomMichis();
loadFavoritesMichis();
