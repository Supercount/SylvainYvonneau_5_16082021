let blocPanier = document.getElementById("panier");

var contenuPanier = sessionStorage.getItem("panier");
var panier = contenuPanier===null?[]:JSON.parse(contenuPanier);
console.log(contenuPanier);
var total = 0;

if (contenuPanier == null) {
    blocPanier.innerHTML = `
        <div class="panier__bandeau">
            <h1>Votre panier</h1>
        </div>
        <div class="panier__contenu">
            <p>Votre Panier est vide!</p>
        </div>
        <div class="panier__bandeau">
        </div>`;
} else {
    blocPanier.innerHTML = `
        <div class="panier__bandeau">
            <h1>Votre panier</h1>
        </div>
        <div class="panier__contenu" id="liste_panier">
        </div>
        <div class="panier__bandeau" id="bandeau_fin">
        </div>`;
    var bloc = document.getElementById("liste_panier");
    var listePanier = JSON.parse(contenuPanier);
    bloc.innerHTML = `
        <table class="panier__contenu__table" id="tableau">
        <tr class="panier__contenu__table__ligne">
            <th>Nom du produit</th>
            <th>Lentille personnalisée</th>
            <th>Quantité voulue</th>
            <th>Prix</th>
        </tr>
        </table>
    `;
    listePanier.forEach(element => {
        const identifiant = element.id;
        const lentille = element.lens;
        const nombre = element.quantite;
        fetch(`http://localhost:3000/api/cameras/${identifiant}`).then(function(res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function(data) {
            const nom = data.name;
            const prix = nombre*data.price/100;
            total += prix;
            var tableau = document.getElementById("tableau");
            var newLine = document.createElement("tr");
            newLine.classList.add("panier__contenu__table__ligne");
            newLine.innerHTML = `<td>${nom}</td>
                <td>${lentille}</td>
                <td>${nombre}</td>
                <td>${prix},00 €</td>`;
            tableau.appendChild(newLine);
        });
    });
    var bouton_reset = document.createElement("input");
    bouton_reset.setAttribute("id","reset");
    bouton_reset.setAttribute("type","button");
    bouton_reset.setAttribute("value","Vider le panier");
    bouton_reset.setAttribute("class","panier__reset");
    bloc.appendChild(bouton_reset);
    var bloc_fin = document.getElementById("bandeau_fin");
    bloc_fin.innerHTML = `<p>Montant total  ${total},00 €</p>`;



    /*
        ajouter le formulaire d'envoi de la commande
    */
}
