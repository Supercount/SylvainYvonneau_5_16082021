//Récupération des paramètres dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);

//Récupération de l'id du produit depuis les paramètres
const id_produit = urlParams.get('id');


export function ajouterPanier () {
    var panier_json = sessionStorage.getItem("panier");
    var panier_list = JSON.parse(panier_json);
    
}