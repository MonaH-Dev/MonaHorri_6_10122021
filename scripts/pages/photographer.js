//Mettre le code JavaScript lié à la page photographer.html
function getPhotographerIdByURLParam() {
  const searchparams = new URLSearchParams(location.search);
  // location.href : http://127.0.0.1:5500/photographer.html?id=82
  // location.search => ?id=82
  return searchparams.get("id"); // => 82
}

function getPhotographer(id, photographers) {
  return photographers.filter((photographer) => photographer.id == id)[0];
}
function getPhotographerImgs(photographerId, imgs) {
  return imgs.filter((img) => img.photographerId == photographerId);
}

async function getPhotographerInfo(id) {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  const photographer = getPhotographer(id, data.photographers);
  const imgs = getPhotographerImgs(id, data.media);
  return { photographer, imgs };
}

async function init() {
  const id = getPhotographerIdByURLParam();
  const { photographer, imgs } = await getPhotographerInfo(id);
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer, displayModal);
  const userInfoDOM = photographerModel.getUserInfoDOM();
  photographerHeader.appendChild(userInfoDOM);
}
init();
