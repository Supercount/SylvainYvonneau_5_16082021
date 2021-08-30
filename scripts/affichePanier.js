let blocPanier = document.getElementById("panier");

var contenuPanier = sessionStorage.getItem("panier");
var panier = contenuPanier===null?[]:JSON.parse(contenuPanier);
console.log(contenuPanier);

if (contenuPanier == null) {
    blocPanier.innerHTML = `
        <div class="panier__bandeau panier__bandeau--haut">
            <h1>Votre panier</h1>
        </div>
        <div class="panier__contenu">
            <p>Votre Panier est vide!</p>
            <a href="index.html" class="bouton">Retour à l'accueil</a>
        </div>
        <div class="panier__bandeau formulaire__bandeau--bas">
        </div>`;
    document.getElementById("formulaire").innerHTML = "";
} else {
    blocPanier.innerHTML = `
        <div class="panier__bandeau panier__bandeau--haut">
            <h1>Votre panier</h1>
        </div>
        <div class="panier__contenu" id="liste_panier">
        </div>
        <div class="panier__bandeau formulaire__bandeau--bas" id="bandeau_fin">
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
    let total = 0;
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
            var tableau = document.getElementById("tableau");
            var newLine = document.createElement("tr");
            newLine.classList.add("panier__contenu__table__ligne");
            newLine.innerHTML = `<td>${nom}</td>
                <td>${lentille}</td>
                <td>${nombre}</td>
                <td>${prix},00 €</td>`;
            tableau.appendChild(newLine);
            total += prix;
            console.log("sur l'élément : " + total);
            var bloc_fin = document.getElementById("bandeau_fin");
            bloc_fin.innerHTML = `<p>Montant total  <strong>${total},00 €</strong></p>`;
        });
        console.log("dans la boucle : " + total);
    });
    console.log("hors de la boucle : " + total);
    var bouton_reset = document.createElement("a");
    bouton_reset.setAttribute("id","reset");
    bouton_reset.setAttribute("href","panier.html");
    bouton_reset.innerText= "Vider le panier";
    bouton_reset.setAttribute("class","panier__reset bouton");
    bloc.appendChild(bouton_reset);

    bouton_reset.addEventListener("click",function() {
        viderPanier()

    })
    
}

var bouton_envoi = document.getElementById("confirm");

bouton_envoi.addEventListener("click", function() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    adress = document.getElementById("adress").value;
    city = document.getElementById("city").value;
    email = document.getElementById("email").value;
    envoi_formulaire(firstName,lastName,adress,city,email,panier);
})