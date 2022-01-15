function mediaFactory(
  data,
  index,
  imgs_copy,
  lightboxCtrSelector,
  onLikeIncrement = () => {} // à la place d'écrire "null" => Fn vide (il ne se passe rien)
) {
  const {
    photographerName,
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
  } = data;

  const picture = `img/${photographerName}/${image}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.addEventListener("click", (e) => {
      const lightBox = lightBoxFactory(index, imgs_copy);
      const lightBoxElt = lightBox.createDOMelt();
      document.querySelector(lightboxCtrSelector).appendChild(lightBoxElt);
    }); // exécuter lightboxCB (comme une Fn) ds une Fn, permet de lui donner un paramètre
    const div = document.createElement("div");
    div.className = "prez-img";
    const h3 = document.createElement("h3");
    h3.textContent = title;
    const divLike = document.createElement("div");
    divLike.className = "prez-img__like";
    const nLike = document.createElement("span");
    nLike.textContent = likes;
    const buttonLike = document.createElement("button");
    buttonLike.addEventListener("click", onLikeIncrement);
    const heartIcon = document.createElement("i");
    heartIcon.className = "fas fa-heart like-heart";

    article.appendChild(img);
    article.appendChild(div);
    div.appendChild(h3);
    div.appendChild(divLike);
    divLike.appendChild(nLike);
    divLike.appendChild(buttonLike);
    buttonLike.appendChild(heartIcon);
    return article;
  }
  return { getMediaCardDOM };
}

function lightBoxFactory(index, imgs) {
  let currentIndex = index;
  let currentImage = imgs[currentIndex];
  function setCurrentIndexNext(img) {
    if (currentIndex == imgs.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    // ou "currentIndex = currentIndex + 1"
    // ou "currentIndex += 1"
    // ou "currentIndex++" (le "++" ne marche qu'avec 1 => incrémenter)
    currentImage = imgs[currentIndex];
    img.src = `img/${currentImage.photographerName}/${currentImage.image}`;
  }
  function setCurrentIndexPrev(img) {
    if (currentIndex == 0) {
      currentIndex = imgs.length - 1;
    } else {
      currentIndex -= 1;
    }
    // ou "currentIndex--"
    currentImage = imgs[currentIndex];
    img.src = `img/${currentImage.photographerName}/${currentImage.image}`;
  }

  function createDOMelt() {
    const globalCtr = document.createElement("div");
    globalCtr.className = "lightbox-ctr";
    const closeBtn = document.createElement("button");
    closeBtn.addEventListener("click", () => {
      globalCtr.parentNode.removeChild(globalCtr); //pr fermer la lightbox, on se sert de son parent
    });
    const crossIcon = document.createElement("i");
    crossIcon.className = "fas fa-cross closing-LB";
    const img = document.createElement("img");
    img.src = `img/${currentImage.photographerName}/${currentImage.image}`;
    const chevronL = document.createElement("button");
    chevronL.addEventListener("click", () => {
      setCurrentIndexPrev(img);
    });
    const chevronLIcon = document.createElement("i");
    chevronLIcon.className = "fas fa-chevron-left chevron-left";
    const chevronR = document.createElement("button");
    chevronR.addEventListener("click", () => {
      setCurrentIndexNext(img);
    });
    const chevronRIcon = document.createElement("i");
    chevronRIcon.className = "fas fa-chevron-right chevron-right";
    const title = document.createElement("h3");
    title.textContent = title;

    globalCtr.appendChild(closeBtn);
    globalCtr.appendChild(chevronL);
    chevronL.appendChild(chevronLIcon);
    globalCtr.appendChild(chevronR);
    chevronR.appendChild(chevronRIcon);
    globalCtr.appendChild(img);
    globalCtr.appendChild(title);
    closeBtn.appendChild(crossIcon);

    return globalCtr;
  }
  return { createDOMelt };
}
