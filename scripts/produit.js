const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);

const id_produit = urlParams.get('id');

let bloc = document.getElementById("produit");

function ajouterLentille(lens){
    let choice = document.createElement('option');
    choice.innerHTML = lens;
    choice.value = lens;
    document.getElementById("personnalisation").appendChild(choice);
}

function afficherProduit(data) {
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
            <p class="produit__bloc__prix">${prix},00 €</p>
            <form action="" method="get" class="produit__bloc__form">
                <label for="choix" class="produit__bloc__form__choix">Choix de la lentille </label>
                <select name="personnalisation" id="personnalisation" class="produit__bloc__form__choix"></select>
                <label for="quantite" class="produit__bloc__form__choix">Quantité voulue </label>
                <input id="quantite" type="number" min="1" value="1" class="produit__bloc__form__choix">
                <div class="produit__bloc__form__boutons">
                    <input type="button" value="Ajouter" class="produit__bloc__form__valid bouton" id="valider">
                    <a href="index.html" class="produit__bloc__form__retour bouton">Retour</a>
                </div>
            </form>
        </div>`;
    lensesList.forEach(lens => ajouterLentille(lens));
}

function commanderProduit() {
    let lentille = "";
    document.getElementById("personnalisation").addEventListener("change", function() {
        lentille = this.value;
    });
    let quantity = 0;
    document.getElementById("quantite").addEventListener("change", function() {
        quantity = this.value;
    });
    lentille = document.getElementById("personnalisation").value;
    quantity = document.getElementById("quantite").value;
    document.getElementById("valider").addEventListener("click", function() {ajouterPanier(id_produit,lentille,quantity)}
    );
}

fetch(`http://localhost:3000/api/cameras/${id_produit}`)
.then(res => res.json())
.then( data => afficherProduit(data))
.then( function() {commanderProduit()})

    