const main = document.getElementById("menu");

function creerProduit (produit) {
    let newProduct = document.createElement("article");
    newProduct.classList.add("menu__element");
    const id_produit = produit._id;
    const image_produit = produit.imageUrl;
    const nom_produit = produit.name;
    const prix_produit = produit.price/100;
    newProduct.innerHTML = `<a href="produit.html?id=${id_produit}" class="menu__lien"><img src=${image_produit} alt="image_produit" class="menu__element__image"><div class="menu__element__description"><p class="menu__element__description__nom">${nom_produit}</p><p class="menu__element__description__prix">${prix_produit},00 €</p></div></a>`;
    main.appendChild(newProduct);
}

fetch("http://localhost:3000/api/cameras")
.then (res => res.json())
.then (data => data.forEach(produit => creerProduit(produit)))