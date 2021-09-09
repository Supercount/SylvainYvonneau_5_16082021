let panier = recupererPanier();
let bloc = document.getElementById("liste_panier");

function calculertotal() {
    let total = 0;
    let i = 0;
    let valeur = panier.length;
    panier.forEach(element => {
        const identifiant = element.id;
        const nombre = element.quantite;
        fetch(`http://localhost:3000/api/cameras/${identifiant}`)
        .then( res => res.json())
        .then( data => {
            const prix = nombre*data.price/100;
            total += prix;
            i++;
            if (i>=valeur) {
                let bloc_fin = document.getElementById("bandeau_fin");
                bloc_fin.innerHTML = `<p>Montant total  <strong>${total},00 €</strong></p>`;
                sessionStorage.setItem("total",total);
                return total;
            }
        })
    })
}

function listeId () {
    let i = 0;
    let valeur = panier.length;
    let liste_envoi = [];
    panier.forEach(element => {
        const identifiant = element.id;
        liste_envoi.push(identifiant.toString());
        i++;
        if (i>=valeur) { 
            return liste_envoi;
        }
    })
    return liste_envoi;
}

function ajouterLigne(data, element, index) {
    const nom = data.name;
    const lentille = element.lens;
    const nombre = element.quantite;
    const prix = nombre*data.price/100;
    let tableau = document.getElementById("tableau");
    let newLine = document.createElement("tr");
    newLine.classList.add("panier__contenu__table__ligne");
    newLine.innerHTML = `
        <td>${nom}</td>
        <td>${lentille}</td>
        <td>${nombre}</td>
        <td>${prix},00 €</td>
        <td><i class="fas fa-trash-alt corbeille" id="corbeille-${index}"></i></td>`;
    tableau.appendChild(newLine);
    total = calculertotal();
    document.getElementById(`corbeille-${index}`).addEventListener("click",function() {
        retirerElementPanier(index);
        document.location.href="panier.html";
    })
}

function creerResetBouton (parent) {
    let bouton_reset = document.createElement("a");
    bouton_reset.setAttribute("id","reset");
    bouton_reset.setAttribute("href","panier.html");
    bouton_reset.innerText= "Vider le panier";
    bouton_reset.setAttribute("class","panier__reset bouton");
    parent.appendChild(bouton_reset);
    bouton_reset.addEventListener("click",viderPanier)
}

function prepareFormulaire () {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    adress = document.getElementById("adress").value;
    city = document.getElementById("city").value;
    email = document.getElementById("email").value;
    liste_envoi = listeId();
    console.log("liste des id après fonction " + liste_envoi)
    if (validerFormulaire(firstName,lastName,adress,city,email)) {
        envoiFormulaire(firstName,lastName,adress,city,email,liste_envoi);
        document.location.href="validation.html";
    } else {
        alert("Formulaire invalide");
    }
}

if ( panier.length === 0) {
    bloc.innerHTML = `
        <p>Votre Panier est vide!</p>
        <a href="index.html" class="bouton panier__contenu__retour">Retour à l'accueil</a>`;
    document.getElementById("formulaire").innerHTML = "";
} else {
    bloc.innerHTML = `
        <table class="panier__contenu__table" id="tableau">
            <tr class="panier__contenu__table__ligne">
                <th>Nom du produit</th>
                <th>Lentille personnalisée</th>
                <th>Quantité voulue</th>
                <th>Prix</th>
            </tr>
        </table>`;
    panier.forEach((element,index) => {
        const identifiant = element.id;
        fetch(`http://localhost:3000/api/cameras/${identifiant}`)
        .then( res => res.json())
        .then( data => ajouterLigne(data, element, index))
    });
    creerResetBouton(bloc);
    let bouton_envoi = document.getElementById("confirm");
    bouton_envoi.addEventListener("click", prepareFormulaire)
}