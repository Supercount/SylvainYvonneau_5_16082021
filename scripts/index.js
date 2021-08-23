const main = document.getElementById("menu");


fetch("http://localhost:3000/api/cameras").then(function(res) {
    if (res.ok) {
        return res.json();
    }
}).then(function(data) {
    data.forEach(produit => {
        var newProduct = document.createElement("article");
        newProduct.classList.add("menu__element");
        const image_produit = produit.imageUrl;
        const nom_produit = produit.name;
        const prix_produit = produit.price;
        newProduct.innerHTML = "<a href='produit.html'><img src=" + image_produit + " alt='image_produit' class='menu__element__image'><div class='menu__element__description'><p class='menu__element__description__nom'>" + nom_produit + "</p><p class='menu__element__description__prix'>" + prix_produit/100 + " € </p></div></a>";
        main.appendChild(newProduct);
    });
    console.log(data);
})