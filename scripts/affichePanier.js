let contenuPanier = sessionStorage.getItem("panier");
let panier = contenuPanier===null?[]:JSON.parse(contenuPanier);
let bloc = document.getElementById("liste_panier");

if (contenuPanier == null) {
    bloc.innerHTML = `
            <p>Votre Panier est vide!</p>
            <a href="index.html" class="bouton panier__contenu__retour">Retour à l'accueil</a>`;
    document.getElementById("formulaire").innerHTML = "";
} else {
    let listePanier = JSON.parse(contenuPanier);
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
    let liste_envoi = [];
    listePanier.forEach((element,index) => {
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
            let tableau = document.getElementById("tableau");
            let newLine = document.createElement("tr");
            newLine.classList.add("panier__contenu__table__ligne");
            newLine.innerHTML = `<td>${nom}</td>
                <td>${lentille}</td>
                <td>${nombre}</td>
                <td>${prix},00 €</td>
                <td><i class="fas fa-trash-alt corbeille" id="corbeille-${index}"></i></td>`;
            tableau.appendChild(newLine);
            total += prix;
            liste_envoi.push(identifiant);
            let bloc_fin = document.getElementById("bandeau_fin");
            bloc_fin.innerHTML = `<p>Montant total  <strong>${total},00 €</strong></p>`;
            sessionStorage.setItem("total",total);
            document.getElementById(`corbeille-${index}`).addEventListener("click",function() {
                retirer_element_panier(index);
                document.location.href="panier.html";
            })
        });
    });
    creer_reset_bouton(bloc);
}

function creer_reset_bouton (parent) {
    let bouton_reset = document.createElement("a");
    bouton_reset.setAttribute("id","reset");
    bouton_reset.setAttribute("href","panier.html");
    bouton_reset.innerText= "Vider le panier";
    bouton_reset.setAttribute("class","panier__reset bouton");
    parent.appendChild(bouton_reset);
    bouton_reset.addEventListener("click",function() {
        viderPanier()
    })
}

let bouton_envoi = document.getElementById("confirm");

bouton_envoi.addEventListener("click", function() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    adress = document.getElementById("adress").value;
    city = document.getElementById("city").value;
    email = document.getElementById("email").value;
    if (valider_formulaire(firstName,lastName,adress,city,email)) {
        envoi_formulaire(firstName,lastName,adress,city,email,liste_envoi);
        document.location.href="validation.html";
    } else {
        alert("Formulaire invalide");
    }
})
