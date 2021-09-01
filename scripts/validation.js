var total = sessionStorage.getItem("total");
var id_commande = sessionStorage.getItem("id_commande");

var bloc_texte = document.getElementById("texte");

bloc_texte.innerHTML = `
    <h1>Merci pour votre commande!</h1>
    <p class="retour__texte__total">Votre commande d'un montant total de ${total},00 € a bien été prise en compte.</p>
    <p class="retour__texte__id">L'identifiant de votre commande est le <strong class="retour__texte__id__valeur">${id_commande}</strong></p>
    `;