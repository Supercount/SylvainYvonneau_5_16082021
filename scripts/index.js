const main = document.getElementById("menu");

//Récupération des différents produits en vente
fetch("http://localhost:3000/api/cameras").then(function(res) {
    if (res.ok) {
        return res.json();
    }
}).then(function(data) {
    data.forEach(produit => { //Pour chaque produit, création d'un bloc contenant ses informations
        var newProduct = document.createElement("article");
        newProduct.classList.add("menu__element");
        const id_produit = produit._id;
        const image_produit = produit.imageUrl;
        const nom_produit = produit.name;
        const prix_produit = produit.price/100;
        newProduct.innerHTML = `<a href="produit.html?id=${id_produit}" class="menu__lien"><img src=${image_produit} alt="image_produit" class="menu__element__image"><div class="menu__element__description"><p class="menu__element__description__nom">${nom_produit}</p><p class="menu__element__description__prix">${prix_produit} €</p></div></a>`;
        main.appendChild(newProduct);
    });
})