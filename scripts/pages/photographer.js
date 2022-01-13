//Mettre le code JavaScript lié à la page photographer.html

// Récuperer l'ID du photographe via l'URL
function getPhotographerIdByURLParam() {
  const searchparams = new URLSearchParams(location.search);
  // location.href : http://127.0.0.1:5500/photographer.html?id=82
  // location.search => ?id=82
  return searchparams.get("id"); // => 82
}
// Va chercher dans le fichier json le photographer via son ID
// version filtrer du tableau : critère ID (ID unique par photographe)
function getPhotographer(id, photographers) {
  return photographers.filter((photographer) => photographer.id == id)[0];
}
// Tableau filtré qui récupére les photos d'un photographe
function getPhotographerImgs(photographerId, imgs) {
  return imgs.filter((img) => img.photographerId == photographerId);
}

// Requête dans le fichier json,
// Exécute les fonctions plus haut
async function getPhotographerInfo(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographer = getPhotographer(id, data.photographers);
  const imgs = getPhotographerImgs(id, data.media);
  return { photographer, imgs };
}

// Afficher la gallery de media
function displayMediaGallery(imgs, photographerName) {
  const photographGallery = document.querySelector(".photograph-gallery");
  imgs.forEach((img) => {
    img.photographerName = photographerName;
    const imgModel = mediaFactory(img);
    const article = imgModel.getMediaCardDOM();
    photographGallery.appendChild(article);
  });
}

function displayLikeNPricing(likes, price) {
  const resumeCtr = document.querySelector(".bottom-ctr");
  const divLike = document.createElement("div");
  divLike.className = "total-likes";
  const nLike = document.createElement("span");
  nLike.textContent = likes;
  const heartIcon = document.createElement("i");
  heartIcon.className = "fas fa-heart bottom-like-heart";

  const pricing = document.createElement("p");
  pricing.className = "pricing";
  pricing.textContent = `${price}€/jour`;

  resumeCtr.appendChild(divLike);
  resumeCtr.appendChild(pricing);
  divLike.appendChild(nLike);
  divLike.appendChild(heartIcon);
}

async function init() {
  const id = getPhotographerIdByURLParam();
  const { photographer, imgs } = await getPhotographerInfo(id);
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer, displayModal);
  const userInfoDOM = photographerModel.getUserInfoDOM();
  photographerHeader.appendChild(userInfoDOM);

  const photographerFirstName = photographer.name.split(" ")[0];
  displayMediaGallery(imgs, photographerFirstName);

  displayLikeNPricing(
    imgs.map((img) => img.likes).reduce((a, b) => a + b),
    photographer.price
  );
}
init();
