//Récupération des paramètres dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);

//Récupération de l'id du produit depuis les paramètres
const id_produit = urlParams.get('id');
console.log(id_produit);

var bloc = document.getElementById("produit");


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
            <form action="">
                Choix de la lentille <select name="personnalisation" id="personnalisation">
                </select>
                <p>Quantité voulue <input type="number" min="1" value="1"></p>
                <input type="button" value="Ajouter">
            </form>
        </div>`;

    lensesList.forEach(lens => {
        var choiceLens = document.createElement('option');
        choiceLens.innerHTML = lens;
        document.getElementById("personnalisation").appendChild(choiceLens);
    });
    console.log(data);
});