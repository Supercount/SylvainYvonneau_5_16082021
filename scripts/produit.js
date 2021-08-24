//Récupération des paramètres dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);

//Récupération de l'id du produit depuis les paramètres
const id_produit = urlParams.get('id');

var bloc = document.getElementById("produit");

import {ajouterPanier} from panier.js;

fetch(`http://localhost:3000/api/cameras/${id_produit}`).then(function(res) {
if (res.ok) {
    return res.json();
}
}).then(function(data) {
    const image = data.imageUrl;
    const nom = data.name;
    const prix = data.price/100;
    const description = data.description;
    const lensesList = data.lenses;
    bloc.innerHTML = `
        <div class="produit__bloc">
            <img src="${image}" alt="image produit" class="produit__bloc__image">
        </div>
        <div class="produit__bloc--description produit__bloc">
            <h1 class="produit__bloc__nom">${nom}</h1>
            <p class="produit__bloc__description">${description}</p>
            <p class="produit__bloc__prix">${prix} €</p>
            <form action="" method="get" class="produit__bloc__form">
                <label for="choix" class="produit__bloc__form__choix">Choix de la lentille </label>
                <select name="personnalisation" id="personnalisation" class="produit__bloc__form__choix"></select>
                <label for="quantite" class="produit__bloc__form__choix">Quantité voulue </label>
                <input id="quantite" type="number" min="1" value="1" class="produit__bloc__form__choix">
                <div class="produit__bloc__form__boutons">
                    <input type="button" value="Ajouter" class="produit__bloc__form__valid produit__bloc__form__boutons__press" id="valider">
                    <a href="index.html" class="produit__bloc__form__retour produit__bloc__form__boutons__press">Accueil</a>
                </div>
            </form>
        </div>`;

    lensesList.forEach(lens => {
        var choice = document.createElement('option');
        choice.innerHTML = lens;
        document.getElementById("personnalisation").appendChild(choice);
    });
});
