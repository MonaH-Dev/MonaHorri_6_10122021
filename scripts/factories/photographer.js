function photographerFactory(data, callback = null) {
  const { name, portrait, id, city, country, tagline, price } = data; // objt entre accolades -> destructuration
  // création de 2 propriétés pour l'objet "data"

  const picture = `img/IDPhotos/${portrait}`;

  // création d'une balise "article" avec plusieurs éléments:
  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    a.href = `photographer.html?id=${id}`; // création lien du a
    // ? : sépare les paramètres de l'adresse URL
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const taglineTxt = document.createElement("p");
    taglineTxt.className = "taglineTxt";
    taglineTxt.textContent = tagline;
    const pricing = document.createElement("p");
    pricing.className = "pricing";
    pricing.textContent = `${price}€/jour`;
    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(taglineTxt);
    article.appendChild(pricing);
    return article;
  }
  // Pour la page de détails :
  function getUserInfoDOM() {
    const article = document.createElement("article");
    article.className = "prez";
    const infoLeft = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const taglineTxt = document.createElement("p");
    taglineTxt.className = "taglineTxt";
    taglineTxt.textContent = tagline;
    infoLeft.appendChild(h2);
    infoLeft.appendChild(h3);
    infoLeft.appendChild(taglineTxt);
    const contactButton = document.createElement("button");
    contactButton.className = "contact_button";
    contactButton.textContent = "Contactez-moi";
    contactButton.addEventListener("click", callback);
    const img = document.createElement("img");
    img.setAttribute("alt", "");
    img.setAttribute("src", picture);
    article.appendChild(infoLeft);
    article.appendChild(contactButton);
    article.appendChild(img);
    return article;
  }

  return { name, picture, getUserCardDOM, getUserInfoDOM };
}
