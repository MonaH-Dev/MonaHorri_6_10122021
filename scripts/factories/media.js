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
    video,
  } = data;

  const picture = `img/${photographerName}/${image || video}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    let mediaElt;
    if (image) {
      mediaElt = document.createElement("img");
      mediaElt.setAttribute("src", picture);
      mediaElt.setAttribute("alt", "realisation photographe");
      mediaElt.setAttribute("description", "");
    } else if (video) {
      mediaElt = document.createElement("video");
      mediaElt.innerHTML = `<source src="${picture}" type="video/mp4">
      <object data="${picture}">
      </object>`;
    }

    mediaElt.addEventListener("click", (e) => {
      const lightBox = lightBoxFactory(index, imgs_copy);
      const lightBoxElt = lightBox.createDOMelt();
      lightBox.addKeyBoardNavListener();
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
    buttonLike.addEventListener("click", () => {
      onLikeIncrement(); // update le nbre total de coeurs (ds bottom-Ctr)
      const newLike = parseInt(nLike.textContent) + 1; //update le nbre coeur
      nLike.textContent = newLike; // afficher le nbre de coeur
    }); // on peut ne pas mettre les "()" à e à une Fn fléchée si 1 seul paramètre
    const heartIcon = document.createElement("i");
    heartIcon.className = "fas fa-heart like-heart";

    article.appendChild(mediaElt);
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
  let currentMedia = imgs[currentIndex];
  const img = document.createElement("img");
  const video = document.createElement("video");
  const title = document.createElement("h3");
  let globalCtr;
  function updateMediaNTitle() {
    currentMedia = imgs[currentIndex];
    if (currentMedia.image) {
      img.src = `img/${currentMedia.photographerName}/${currentMedia.image}`;
      img.style.display = "block";
      video.style.display = "none";
    } else if (currentMedia.video) {
      const picture = `img/${currentMedia.photographerName}/${currentMedia.video}`;
      video.innerHTML = `<source src="${picture}" type="video/mp4">
      <object data="${picture}">
      </object>`;
      img.style.display = "none";
      video.style.display = "block";
    }
    title.textContent = currentMedia.title;
  }
  function setCurrentIndexNext() {
    if (currentIndex == imgs.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    // ou "currentIndex = currentIndex + 1"
    // ou "currentIndex += 1"
    // ou "currentIndex++" (le "++" ne marche qu'avec 1 => incrémenter)
    updateMediaNTitle();
  }
  function setCurrentIndexPrev() {
    if (currentIndex == 0) {
      currentIndex = imgs.length - 1;
    } else {
      currentIndex -= 1;
    }
    // ou "currentIndex--"
    updateMediaNTitle();
  }

  function createDOMelt() {
    globalCtr = document.createElement("div");
    globalCtr.className = "lightbox-ctr";
    const closeBtn = document.createElement("button");
    closeBtn.className = "closing-LB";
    closeBtn.addEventListener("click", () => {
      globalCtr.parentNode.removeChild(globalCtr); //pr fermer la lightbox, on se sert de son parent
    });
    const crossIcon = document.createElement("i");
    crossIcon.className = "fas fa-times";
    const chevronL = document.createElement("button");
    chevronL.addEventListener("click", () => {
      setCurrentIndexPrev();
    });
    const chevronLIcon = document.createElement("i");
    chevronL.className = "chevron-left";
    chevronLIcon.className = "fas fa-chevron-left";
    const chevronR = document.createElement("button");
    chevronR.addEventListener("click", () => {
      setCurrentIndexNext();
    });
    const chevronRIcon = document.createElement("i");
    chevronR.className = "chevron-right";
    chevronRIcon.className = "fas fa-chevron-right";

    updateMediaNTitle();

    globalCtr.appendChild(closeBtn);
    globalCtr.appendChild(chevronL);
    chevronL.appendChild(chevronLIcon);
    globalCtr.appendChild(chevronR);
    chevronR.appendChild(chevronRIcon);
    globalCtr.appendChild(img);
    globalCtr.appendChild(video);
    globalCtr.appendChild(title);
    closeBtn.appendChild(crossIcon);

    return globalCtr;
  }

  function onKeyDown(e) {
    if (e.key == "ArrowLeft") {
      setCurrentIndexPrev();
    } else if (e.key == "ArrowRight" || e.key == "Tab") {
      setCurrentIndexNext();
      // } else if (e.key == "Backspace" || e.key == "Escape") {
      //   globalCtr.parentNode.removeChild(globalCtr);
    }
  }

  function addKeyBoardNavListener() {
    document.body.removeEventListener("keydown", onKeyDown);
    document.body.addEventListener("keydown", onKeyDown);
  }

  return { createDOMelt, addKeyBoardNavListener };
}
