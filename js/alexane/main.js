// Données du tableau lorsque l'on charge la page
teams = [
    {
        id: 1,
        name: 'Palpatine',
        image: "https://media0.giphy.com/media/zCv1NuGumldXa/giphy.gif?cid=ecf05e47az5squ6xglhw3uuvpab2757ufhcqk0z86jehamls&rid=giphy.gif&ct=g",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia lorem in ante malesuada, vel ornare leo placerat. Donec consectetur elit venenatis enim iaculis lacinia. Aliquam bibendum sem ac convallis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam aliquam feugiat blandit. Integer lacinia pellentesque imperdiet. Ut dictum arcu mattis metus ultrices blandit. Vivamus mattis felis leo, ac facilisis nibh eleifend quis. Fusce quis ante mi.",
        job: "Cadre chez EDF"
    },
    {
        id: 2,
        name: 'Dark Vador',
        image: "https://media4.giphy.com/media/gH8qTMbBYLouBzEEbB/giphy.gif?cid=790b7611c7d6763a627be91b04b08aaf4aef5d8f408f2a3b&rid=giphy.gif&ct=g",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia lorem in ante malesuada, vel ornare leo placerat. Donec consectetur elit venenatis enim iaculis lacinia. Aliquam bibendum sem ac convallis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam aliquam feugiat blandit. Integer lacinia pellentesque imperdiet. Ut dictum arcu mattis metus ultrices blandit. Vivamus mattis felis leo, ac facilisis nibh eleifend quis. Fusce quis ante mi.",
        job: "Cupidon"
    },
    {
        id: 3,
        name: 'Obi-Wan Kenobi',
        image: "https://media1.giphy.com/media/9hEZaVdGkpZte/giphy.gif?cid=ecf05e47ba5abe2bun3o9ziazv2ho57awlbh33lmz21pg17c&rid=giphy.gif&ct=g",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia lorem in ante malesuada, vel ornare leo placerat. Donec consectetur elit venenatis enim iaculis lacinia. Aliquam bibendum sem ac convallis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam aliquam feugiat blandit. Integer lacinia pellentesque imperdiet. Ut dictum arcu mattis metus ultrices blandit. Vivamus mattis felis leo, ac facilisis nibh eleifend quis. Fusce quis ante mi.",
        job: "Danseur"
    },
    {
        id: 4,
        name: 'Yoda',
        image: "https://media4.giphy.com/media/Ll1rEkDebTIdO/giphy.gif?cid=ecf05e47p64otkbxond51hqosldlxlsmm2ga8jaslvv2hgdn&rid=giphy.gif&ct=g",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia lorem in ante malesuada, vel ornare leo placerat. Donec consectetur elit venenatis enim iaculis lacinia. Aliquam bibendum sem ac convallis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam aliquam feugiat blandit. Integer lacinia pellentesque imperdiet. Ut dictum arcu mattis metus ultrices blandit. Vivamus mattis felis leo, ac facilisis nibh eleifend quis. Fusce quis ante mi.",
        job: "DJ"
    },
    {
        id: 5,
        name: 'Stormtrooper 1',
        image: "https://media1.giphy.com/media/YE30zVuEf3Heo/giphy.gif?cid=ecf05e47e3cuharw3t9h3rq8ota7pf32egygjz83tyfrw0bs&rid=giphy.gif&ct=g",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia lorem in ante malesuada, vel ornare leo placerat. Donec consectetur elit venenatis enim iaculis lacinia. Aliquam bibendum sem ac convallis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam aliquam feugiat blandit. Integer lacinia pellentesque imperdiet. Ut dictum arcu mattis metus ultrices blandit. Vivamus mattis felis leo, ac facilisis nibh eleifend quis. Fusce quis ante mi.",
        job: "Sniper"
    },
    {
        id: 6,
        name: 'Boba Fett',
        image: "https://media2.giphy.com/media/uTYao1VRbSD4lYUcWN/giphy.gif?cid=790b76117a1408ca453281d2251503cf10fa30d2e19067b5&rid=giphy.gif&ct=g",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacinia lorem in ante malesuada, vel ornare leo placerat. Donec consectetur elit venenatis enim iaculis lacinia. Aliquam bibendum sem ac convallis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam aliquam feugiat blandit. Integer lacinia pellentesque imperdiet. Ut dictum arcu mattis metus ultrices blandit. Vivamus mattis felis leo, ac facilisis nibh eleifend quis. Fusce quis ante mi.",
        job: "Aliment"
    },
];

//---------------------------- Afficher les éléments teams --------------------------------------
document.addEventListener("DOMContentLoaded", function () {

    // --------------- Liste les données ---------------------
    listTeam();

    // --------------- Ajoute des données --------------------
    btnplus = document.querySelector(".btnplus");
    btnplus.addEventListener("click", addTeam);

    // --------------- Bouton pour supprimer une donnée ------------------
    buttonDelete();

    // -------------- Konami Code ---------------------

});

//---------- On écoute le clavier --------
document.addEventListener('keypress', validate);

function buttonDelete() {
    //-------------- Bouton pour supprimer une personne de l'équipe --------------------
    buttonsDelete = document.querySelectorAll(".delete");
    for (i of buttonsDelete) {
        i.addEventListener("click", removeTeam);
    }
}

function listTeam() {
    element = document.getElementsByClassName("products");

    for (i = 0; i < teams.length; i++) {
        // On créé le div principal
        teamCard = document.createElement("div");
        teamCard.className = "content-card team";
        teamCard.dataset.id = teams[i].id;
        teamCard.id = "team" + teams[i].id;

        // On récupère une image
        teamImg = document.createElement("img");
        teamImg.className = "content-card_image_team";
        teamImg.src = teams[i].image;

        // On créé une div pour le body de la card
        teamDiv = document.createElement("div");
        teamDiv.className = "content-card_body";

        // On affiche le titre, qui est le nom de la personne
        teamTitle = document.createElement("h2");
        teamTitle.setAttribute("contenteditable", "true");
        teamTitle.textContent = teams[i].name;

        // On affiche un sous-titre pour le travail
        teamJob = document.createElement("h3");
        teamJob.setAttribute("contenteditable", "true");
        teamJob.textContent = teams[i].job;

        // On créé la partie centrale de la card
        teamDivInfo = document.createElement("div");
        teamDivInfo.className = "content-card_body-info";

        // On affiche un paragraphe pour la description de la personne
        teamDesc = document.createElement("p");
        teamDesc.setAttribute("contenteditable", "true");
        teamDesc.className = "white"
        teamDesc.textContent = teams[i].desc;

        // On créé un div pour le footer dans lequel on mettra les boutons
        teamFooter = document.createElement("div");
        teamFooter.className = "content-card_footer_team";

        // On créé le bouton pour supprimer les données
        teamButtonDelete = document.createElement("button");
        teamButtonDelete.className = "delete";
        teamButtonDelete.style = "display: none";
        teamButtonDelete.textContent = "Supprimer";
        teamButtonDelete.id = "team" + teams[i].id;

        // On charge le tout
        teamCard.prepend(teamImg);
        teamCard.appendChild(teamDiv);
        teamDiv.appendChild(teamTitle);
        teamDiv.appendChild(teamJob);
        teamCard.appendChild(teamDivInfo);
        teamDivInfo.appendChild((teamDesc));
        teamCard.appendChild(teamFooter);
        teamFooter.appendChild(teamButtonDelete);
        element[0].appendChild(teamCard);
    }
}

//---------------------------- Ajouter un élément --------------------------------------
function addTeam() {
    id = teams.length + 1;
    teams.push({'id': id, 'name': 'NULL', 'image': 'NULL', 'desc': 'NULL', 'job': 'NULL'});
    imgDefaut = "https://media3.giphy.com/media/VfzhPTdPmfDMMuts4E/giphy.gif";

    // On créé le div principal
    teamCard = document.createElement("div");
    teamCard.className = "content-card";
    teamCard.dataset.id = id;
    teamCard.id = "team" + id;

    // On affiche une image de base
    teamImg = document.createElement("img");
    teamImg.className = "content-card_image_team";
    teamImg.src = imgDefaut;

    // On créé une div pour le body de la card
    teamDiv = document.createElement("div");
    teamDiv.className = "content-card_body";

    // On affiche le titre, qui est le nom de la personne
    teamTitle = document.createElement("h2");
    teamTitle.setAttribute("contenteditable", "true");
    teamTitle.textContent = "Nom";

    // On affiche un sous-titre pour le travail
    teamJob = document.createElement("h3");
    teamJob.setAttribute("contenteditable", "true");
    teamJob.textContent = "Job";

    // On créé la partie centrale de la card
    teamDivInfo = document.createElement("div");
    teamDivInfo.className = "content-card_body-info";

    // On affiche un paragraphe pour la description de la personne
    teamDesc = document.createElement("p");
    teamDesc.setAttribute("contenteditable", "true");
    teamDesc.textContent = "Entrez votre texte de présentation";

    // On créé un div pour le footer dans lequel on mettra les boutons
    teamFooter = document.createElement("div");
    teamFooter.className = "content-card_footer";

    // On créé le bouton pour supprimer les données
    teamButtonDelete = document.createElement("button");
    teamButtonDelete.className = "delete";
    teamButtonDelete.style = "display: none";
    teamButtonDelete.textContent = "Supprimer";
    teamButtonDelete.id = "team" + id;

    // On charge le tout
    teamCard.prepend(teamImg);
    teamCard.appendChild(teamDiv);
    teamDiv.appendChild(teamTitle);
    teamDiv.appendChild(teamJob);
    teamCard.appendChild(teamDivInfo);
    teamDivInfo.appendChild((teamDesc));
    teamCard.appendChild(teamFooter);
    teamFooter.appendChild(teamButtonDelete);
    element[0].appendChild(teamCard);

    buttonDelete();
}

// --------------------- Check le mot de passe taper sur le clavier -----------------------
password = "ordre 66";
tentative = "";
function validate(e) {
    if (event.key == 'o' && tentative == '') {
        tentative += event.key;
    } else if (event.key == 'r' && tentative == 'o') {
        tentative += event.key;
    } else if (event.key == 'd' && tentative == 'or') {
        tentative += event.key;
    } else if (event.key == 'r' && tentative == 'ord') {
        tentative += event.key;
    } else if (event.key == 'e' && tentative == 'ordr') {
        tentative += event.key;
    }else if (event.key == ' ' && tentative == 'ordre') {
        tentative += event.key;
    } else if (event.key == '6' && tentative == 'ordre ') {
        tentative += event.key;
    }else if (event.key == '6' && tentative == 'ordre 6') {
        tentative += event.key;
    }

    if (password == tentative) {
        showButton();
    }
}

// ------------------------- Afficher le bouton de suppression ---------------------------
function showButton() {
    btnDelete = document.querySelectorAll(".delete");
    for (i of btnDelete) {
        i.style.display = "block";
    }
}

//---------------------------- Supprimer un élément --------------------------------------
function removeTeam() {
    teamId = event.currentTarget.id;
    currentTeam = document.getElementById(teamId);
    currentTeam.remove();
}

// -------------------------- Konami Code ---------------------------------
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

// Code Konami officiel
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];

    if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
            activateCheats();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activateCheats() {
    lien_css = document.createElement('link');
    lien_css.href = "css/konami.css";
    lien_css.rel = "stylesheet";
    lien_css.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(lien_css);
}





