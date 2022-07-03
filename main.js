console.log("Hello world");

const API_KEY = "648a3f25-fd2f-41cc-be40-d17b46a00fd1";

const API_URL = [
  "https://api.thecatapi.com/v1/images/search",
  "?limit=3",
  "&order=Asc",
  `&api_key=${API_KEY}`,
].join("");

querystring = ["?", "limit=3", "&order=Desc"].join("");

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

async function reload() {
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data);
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

reload();
