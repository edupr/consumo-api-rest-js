const API_KEY = "648a3f25-fd2f-41cc-be40-d17b46a00fd1";

const API_URL_RANDOM = [
  "https://api.thecatapi.com/v1/images/search",
  "?limit=2",
  // `&api_key=${API_KEY}`,
].join("");

const API_URL_FAVOURITES = [
  "https://api.thecatapi.com/v1/favourites",
  // `?api_key=${API_KEY}`,
].join("");

const API_URL_UPLOAD = [
  "https://api.thecatapi.com/v1/images/upload",
  // `?api_key=${API_KEY}`,
].join("");

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const spanError = document.getElementById("error");

querystring = ["?", "limit=2", "&order=Desc"].join("");

// const API_URL = `https://api.thecatapi.com/v1/images/search${querystring}`;

// LOAD RANDOM MICHIS-------------------------------------
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
  const res = await fetch(API_URL_FAVOURITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY
    }
  });
  const data = await res.json();
  console.log("Favorites: ", data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
    console.log("Hubo un error: ", res.status, data.message);
  } else {
    const section = document.getElementById('favouriteMichis');
    section.innerHTML = "";
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Favoritos:  ');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((michi) => {

      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('???');
      img.src = michi.image.url;
      img.width = 100;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id)
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}
// SAVE FAVOURITE GATO-----------------------------------
async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY
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
    loadFavouriteMichis();
  }
}
// DELETE FAVOURITE--------------------------------------
async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
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
    loadFavouriteMichis();
  }
}

// SUBIR FOTO GATO---------------------------------------
async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  console.log("formData: ", formData.get('file'));

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY': API_KEY,
    },
    body: formData,
  })
  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    console.log("Foto de michi subida:");
    console.log(data);
    console.log(data.url);
  } else {
    console.log("Foto de michi cargada: ", { data }, data.url);
    saveFavouriteMichi(data.id);
  }
}

  // preview
  const previewImage = () => {
    const file = document.getElementById("file").files;
    console.log(file);
    if (file.length > 0) {
      const fileReader = new FileReader();
  
      fileReader.onload = function(e) {
        document.getElementById("preview").setAttribute("src", e.target.result);
      };
      fileReader.readAsDataURL(file[0]);
    }
  }

loadRandomMichis();
loadFavouriteMichis();
