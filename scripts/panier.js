// //Récupération des paramètres dans l'URL
// const queryString = window.location.search;
// const urlParams = new URLSearchParams (queryString);

// //Récupération de l'id du produit depuis les paramètres
// const id_produit = urlParams.get('id');

// On vérifie si l'élément est déjà dans le panier
function existeDansPanier (id_check,lens_check) {
    var present = false;
    var panier_json = sessionStorage.getItem("panier");
    var panier = panier_json===null?[]:JSON.parse(panier_json);
    panier.forEach(element => {
        if (element.id == id_check && element.lens == lens_check) {
            present = true;
        }
    })
    return present;
}

//On ajoute un élément dans le panier
function ajouterPanier (id_produit,itemLens,quantity) {
    var panier_json = sessionStorage.getItem("panier");
    var panier = panier_json===null?[]:JSON.parse(panier_json);
    if (existeDansPanier(id_produit,itemLens)) {
        panier.forEach(element => {
            if (element.id == id_produit || element.lens == itemLens) {
                element.quantite += parseInt(quantity);
            }
        })
    } else {
        let nouvelItem = {
            id: id_produit,
            lens: itemLens,
            quantite: parseInt(quantity)
        };
        panier.push(nouvelItem);
    }
    var newPanier = JSON.stringify(panier);
    console.log(newPanier);
    sessionStorage.setItem("panier",newPanier);
}

function viderPanier() {
    sessionStorage.clear();
}