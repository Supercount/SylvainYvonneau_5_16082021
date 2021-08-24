//Récupération des paramètres dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);

//Récupération de l'id du produit depuis les paramètres
const id_produit = urlParams.get('id');

// On vérifie si l'élément est déjà dans le panier
function existeDansPanier (id_check,lens_check) {
    var present = false;
    var panier_json = sessionStorage.getItem("panier");
    var panier = JSON.parse(panier_json);
    panier.forEach(element => {
        if (element.id == id_check || element.lens == lens_check) {
            present = true;
        }
    })
}

//On ajoute un élément dans le panier
export function ajouterPanier (itemLens,quantity) {
    var panier_json = sessionStorage.getItem("panier");
    var panier = JSON.parse(panier_json);
    if (existeDansPanier(id_produit,itemLens)) {
        panier.forEach(element => {
            if (element.id == id_produit || element.lens == itemLens) {
                element.quantite += quantity;
            }
        })
    } else {
        let nouvelItem = {
            id: id_produit,
            lens: itemLens,
            quantite: quantity
        };
        panier.push(nouvelItem);
    }
    var newPanier = JSON.stringify(panier);
    sessionStorage.setItem("panier",newPanier);
}