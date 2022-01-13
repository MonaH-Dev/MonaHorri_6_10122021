function mediaFactory(
  data,
  onLikeIncrement = () => {}, // à la place d'écrire "null" => Fn vide (il ne se passe rien)
  lightboxCallBack = () => {}
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
      lightboxCallBack(id);
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
