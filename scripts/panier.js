// On vérifie si l'élément est déjà dans le panier
function existeDansPanier (id_check,lens_check) {
    let present = false;
    let panier_json = sessionStorage.getItem("panier");
    let panier = panier_json===null?[]:JSON.parse(panier_json);
    panier.forEach(element => {
        if (element.id == id_check && element.lens == lens_check) {
            present = true;
        }
    })
    return present;
}

//On ajoute un élément dans le panier
function ajouterPanier (id_produit,itemLens,quantity) {
    let panier_json = sessionStorage.getItem("panier");
    let panier = panier_json===null?[]:JSON.parse(panier_json);
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
    let newPanier = JSON.stringify(panier);
    sessionStorage.setItem("panier",newPanier);
}

function viderPanier() {
    sessionStorage.clear();
}