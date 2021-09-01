function envoi_formulaire (prenom,nom,adresse,ville,mail,panier) {
    var requete_envoi = {
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
    }).then(function(reponse) {
        return reponse.json();
    }).then(function(retour) {
        var id_commande = retour.orderId;
        sessionStorage.setItem("id_commande",id_commande);
        // sessionStorage.removeItem("panier");
        console.log(id_commande);
    });
}

function valider_prenom (valeur) {
    var regex = /^[a-zA-ZÉÈÊÄÏéèêäï][\-a-zéèêäï]*$/ ;
    return regex.test(valeur);
}

function valider_nom (valeur) {
    var regex = /^[a-zA-ZÉÈÊÄÏéèêäï][a-zéèêäï]*$/ ;
    return regex.test(valeur);
}

function valider_adresse (valeur) {
    var regex = /^[1-9][0-9]*[ ][ a-zA-ZÉÈÊÄÏéèêäï]+$/ ;
    return regex.test(valeur);
}

function valider_ville (valeur) {
    var regex = /^[a-zA-ZÉÈÊÄÏéèêäï][ \-a-zéèêäï]*$/ ;
    return regex.test(valeur);
}

function valider_mail (valeur) {
    var regex = /^[a-z0-9]+([_|\.|-][a-z0-9]+)*@[a-z0-9]{4,10}[\.][a-z]{2,4}$/ ;
    return regex.test(valeur);
}

function valider_formulaire (prenom,nom,adresse,ville,mail) {
    if (!valider_prenom(prenom)) {
        alert("Veuillez insérer un prénom valide");
        return false;
    }
    if (!valider_nom(nom)) {
        alert("Veuillez insérer un nom valide");
        return false;
    }
    if (!valider_adresse(adresse)) {
        alert("Veuillez insérer une adresse valide");
        return false;
    }
    if (!valider_ville(ville)) {
        alert("Veuillez insérer une ville valide");
        return false;
    }
    if (!valider_mail(mail)) {
        alert("Veuillez insérer un email valide");
        return false;
    }
    return true;
}