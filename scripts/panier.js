function recupererPanier () {
    let contenuPanier = sessionStorage.getItem("panier");
    let panier = contenuPanier===null?[]:JSON.parse(contenuPanier);
    return panier;
}

function existeDansPanier (id_check,lens_check) {
    let present = false;
    let panier = recupererPanier();
    panier.forEach(element => {
        if (element.id == id_check && element.lens == lens_check) {
            present = true;
        }
    })
    return present;
}

function ajouterPanier (id_produit,itemLens,quantity) {
    let panier = recupererPanier();
    if (existeDansPanier(id_produit,itemLens)) {
        panier.forEach(element => {
            if (element.id == id_produit && element.lens == itemLens) {
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
    sessionStorage.removeItem("panier");
}

function retirerElementPanier(index) {
    let panier = recupererPanier();
    panier.splice(index, 1);
    let newPanier = JSON.stringify(panier);
    sessionStorage.setItem("panier",newPanier);
}