async function getPhotographers() {
  const response = await fetch("./data/photographers.json"); // Fn (asynchrone) pr faire d requêtes
  // await : ne pas passer aux autres lignes avant d'avoir le Rt de fetch (bon ou mauvais)
  const data = await response.json();
  return data;
}

async function displayData(photographers) {
  // le paramètre est un tableau d'objets
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer); // photographer a 3 propriétés : name + picture + la Fn de getUserCardDOM
    const userCardDOM = photographerModel.getUserCardDOM(); // -> un élt HTML "article" (ce que retourne la Fn)
    photographersSection.appendChild(userCardDOM); // ajout de l'élt "article" à la div
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers(); // objt entre accolades -> destructuration
  displayData(photographers);
  addKeyBoardNavListener(photographers);
}

init();

function addKeyBoardNavListener(photographers) {
  let index = 0; // le photographe sélectionné a l'index 0
  document.body.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
      if (index == 0) {
        index = photographers.length - 1;
      } else {
        index = index - 1;
      }
    } else if (e.key == "ArrowRight" || e.key == "Tab") {
      if (index == photographers.length - 1) {
        index = 0;
      } else {
        index = index + 1;
      }
    } else if (e.key == "Enter") {
      const id = photographers[index].id;
      location.href = `photographer.html?id=${id}`;
    }
    console.log(e.key);
  });
}
