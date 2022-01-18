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
  imgs.forEach((img, index, imgs_copy) => {
    img.photographerName = photographerName;
    const imgModel = mediaFactory(
      img,
      index,
      imgs_copy,
      "#lightbox",
      incrementBottomLikes
    );
    const article = imgModel.getMediaCardDOM();
    photographGallery.appendChild(article);
  });
}

function incrementBottomLikes() {
  const bottomLikesCtr = document.querySelector(".bottom-likes-number");
  let likes = parseInt(bottomLikesCtr.textContent); // convertir le string en nbre
  likes += 1;
  bottomLikesCtr.textContent = likes;
}

function displayLikeNPricing(likes, price) {
  const resumeCtr = document.querySelector(".bottom-ctr");
  const divLike = document.createElement("div");
  divLike.className = "total-likes";
  const nLike = document.createElement("span");
  nLike.className = "bottom-likes-number";
  nLike.textContent = likes;
  const heartIcon = document.createElement("i");
  heartIcon.className = "fas fa-heart bottom-like-heart";

  const pricing = document.createElement("p");
  pricing.className = "pricing";
  pricing.textContent = `${price}€ / jour`;

  resumeCtr.appendChild(divLike);
  resumeCtr.appendChild(pricing);
  divLike.appendChild(nLike);
  divLike.appendChild(heartIcon);
}

let sortedImgs = []; // "sorted" => trié en anglais
let photographerFirstName;

function onUpdateFilterSelect() {
  //"on..." pr une Fn qui va s'exécuter lors d'un EventListerner
  const prop = document.querySelector("#filter-select").value; //prop = attribut du nom du media par lequel le tri sera fait
  sortedImgs = sortedImgs.sort((a, b) => {
    if (a[prop] < b[prop]) {
      if (prop == "title") {
        return -1;
      }
      return 1;
    } else {
      if (prop == "title") {
        return 1;
      }
      return -1;
    }
  });
  const photographerGallery = document.querySelector(".photograph-gallery");
  photographerGallery.innerHTML = "";
  displayMediaGallery(sortedImgs, photographerFirstName);
  // console.log(sortedImgs.map((img) => img[prop]));
}

function addFilterListener() {
  document
    .querySelector("#filter-select")
    .addEventListener("change", onUpdateFilterSelect);
}

async function init() {
  const id = getPhotographerIdByURLParam();
  const { photographer, imgs } = await getPhotographerInfo(id);
  const photographerHeader = document.querySelector(".photograph-header");
  sortedImgs = [...imgs]; // création d'une copie du table "imgs"
  const photographerModel = photographerFactory(photographer, displayModal);
  const userInfoDOM = photographerModel.getUserInfoDOM();
  photographerHeader.appendChild(userInfoDOM);

  // Afficher les media sur la page d'un photographe
  photographerFirstName = photographer.name.split(" ")[0];
  displayMediaGallery(sortedImgs, photographerFirstName);

  // Afficher le nombre de likes totaux en bas à droite
  displayLikeNPricing(
    imgs.map((img) => img.likes).reduce((a, b) => a + b),
    photographer.price
  );

  // Changement de valeur pour le select de tri
  addFilterListener();
}
init();
