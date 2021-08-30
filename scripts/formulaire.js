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