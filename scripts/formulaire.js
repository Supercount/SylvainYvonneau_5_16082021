function envoiFormulaire (prenom,nom,adresse,ville,mail,panier) {
    let requete_envoi = {
        contact : {
            firstName : prenom,
            lastName : nom,
            address : adresse,
            city : ville,
            email : mail
        },
        products : panier
    }
    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(requete_envoi)
    })
    .then( reponse => reponse.json())
    .then( function (retour) {
        let id_commande = retour.orderId;
        sessionStorage.setItem("id_commande",id_commande);
        viderPanier();
        document.location.href="validation.html";
    });
}

function validerPrenom (valeur) {
    let regex = /^[a-zA-ZÉÈÊÄÏéèêäï][\-a-zéèêäï]*$/ ;
    return regex.test(valeur);
}

function validerNom (valeur) {
    let regex = /^[a-zA-ZÉÈÊÄÏéèêäï][a-zéèêäï]*$/ ;
    return regex.test(valeur);
}

function validerAdresse (valeur) {
    let regex = /^[1-9][0-9]*[ ][ a-zA-ZÉÈÊÄÏéèêäï]+$/ ;
    return regex.test(valeur);
}

function validerVille (valeur) {
    let regex = /^[a-zA-ZÉÈÊÄÏéèêäï][ \-a-zéèêäï]*$/ ;
    return regex.test(valeur);
}

function validerMail (valeur) {
    let regex = /^[a-z0-9]+([_|\.|-][a-z0-9]+)*@[a-z0-9]{4,10}[\.][a-z]{2,4}$/ ;
    return regex.test(valeur);
}

function validerFormulaire (prenom,nom,adresse,ville,mail) {
    if (!validerPrenom(prenom)) {
        alert("Veuillez insérer un prénom valide");
        return false;
    }
    if (!validerNom(nom)) {
        alert("Veuillez insérer un nom valide");
        return false;
    }
    if (!validerAdresse(adresse)) {
        alert("Veuillez insérer une adresse valide");
        return false;
    }
    if (!validerVille(ville)) {
        alert("Veuillez insérer une ville valide");
        return false;
    }
    if (!validerMail(mail)) {
        alert("Veuillez insérer un email valide");
        return false;
    }
    return true;
}