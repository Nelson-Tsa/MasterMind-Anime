const boutonJoueur1 = document.getElementById("bouttonJoueur1")
const boutonJoueur2 = document.getElementById("bouttonJoueur2")
const divJoueur1 = document.querySelector(".CouleursJoueur1")
const divJoueur2 = document.querySelector(".CouleursJoueur2")
const boutonJvsJ = document.getElementById("JoueurVsJoueur")
const boutonJvsIA = document.getElementById("JoueurVsIA")
const divChoix = document.querySelector(".ChoixModeJeux")
const divEssai = document.querySelector(".Essais")
const spanEssai = document.getElementById("EssaiRestant")
const divAide = document.querySelector(".Aide")
const boutonAide = document.getElementById("bouttonAide")
const spanBonneCouleur = document.getElementById("BonneCouleur")

// Variables pour stocker les codes secrets
let codeSecret = []
let codeJoueur = []
let NombreDeBonneCouleur;
let essai = 12;

spanEssai.textContent = "Nombre dessais restants : " + essai; // Afficher le nombre d'essais restants
divJoueur1.style.display = "none"; // Afficher le div du joueur 1 au départ
divJoueur2.style.display = "none"; // Masquer le div du joueur 2 au départ
spanEssai.style.display = "none"; // Masquer le span au départ
divAide.style.display = "none"; // Masquer le div d'aide au départ
boutonAide.style.display = "none"; // Masquer le bouton d'aide au départ

boutonAide.addEventListener("click", function() {
    if (divAide.style.display === "none") {
        divAide.style.display = "block"; // Afficher le div d'aide
    }
    else {
        divAide.style.display = "none"; // Masquer le div d'aide
    }
})

boutonJvsJ.addEventListener("click", function() {
    codeSecret = [] // Réinitialiser le tableau à chaque clic
    divJoueur1.style.display = "block";
    divChoix.style.display = "none";
    divEssai.style.display = "block";
    spanEssai.style.display = "block"; // Masquer le div de choix de mode de jeu
    boutonAide.style.display = "block"; // Afficher le bouton d'aide
})

boutonJvsIA.addEventListener("click", function() {
    codeSecret = [] // Réinitialiser le tableau à chaque clic
    divJoueur1.style.display = "none";
    divJoueur2.style.display = "block";
    divChoix.style.display = "none";
    divEssai.style.display = "block";
    spanEssai.style.display = "block"; // Masquer le div de choix de mode de jeu
    boutonAide.style.display = "block"; // Afficher le bouton d'aide
    CodeCouleurIA()
})
 // Afficher le nombre d'essais restants

function CodeSecretJoueur1(){
    codeSecret = [] // Réinitialiser le tableau à chaque clic
    const couleur1 = document.querySelector('input[name="couleur1"]:checked');
    const couleur2 = document.querySelector('input[name="couleur2"]:checked');
    const couleur3 = document.querySelector('input[name="couleur3"]:checked');
    const couleur4 = document.querySelector('input[name="couleur4"]:checked');

    if (couleur1 && couleur2 && couleur3 && couleur4) {
        codeSecret.push(couleur1.value);
        codeSecret.push(couleur2.value);
        codeSecret.push(couleur3.value);
        codeSecret.push(couleur4.value);
    }
    divJoueur1.style.display = "none";
    divJoueur2.style.display = "block"; // Masquer le div après la sélection du code
    return codeSecret
}



function CodeSecretJoueur2(){
    codeJoueur = [] // Réinitialiser le tableau à chaque clic
    const couleur1 = document.querySelector('input[name="couleur1j"]:checked');
    const couleur2 = document.querySelector('input[name="couleur2j"]:checked');
    const couleur3 = document.querySelector('input[name="couleur3j"]:checked');
    const couleur4 = document.querySelector('input[name="couleur4j"]:checked');

    if (couleur1 && couleur2 && couleur3 && couleur4) {
        codeJoueur.push(couleur1.value);
        codeJoueur.push(couleur2.value);
        codeJoueur.push(couleur3.value);
        codeJoueur.push(couleur4.value);
    }
    verifierCode();
    return codeJoueur;
}

boutonJoueur1.addEventListener("click", CodeSecretJoueur1)

boutonJoueur2.addEventListener("click", function() {
        CodeSecretJoueur2();
    });

function verifierCode() {
    console.log("codesecret verif : " + codeSecret)
    NombreDeBonneCouleur = 0; // Réinitialiser le compteur à chaque vérification
for (let i = 0; i < codeSecret.length; i++) {
    const inputElement = document.querySelector('input[name="AideCouleur' + (i + 1) + '"]');
    if (codeSecret[i] === codeJoueur[i]) {
        NombreDeBonneCouleur++;  
        if (inputElement) {
            inputElement.checked = true;
            inputElement.className = codeSecret[i]; // Appliquer la classe correspondant à la couleur
        }
    } else {
        if (inputElement) {
            inputElement.checked = false;
            inputElement.className = ''; // Réinitialiser la classe si nécessaire
        }
    }
}

essai--;
FinDePartie(NombreDeBonneCouleur, essai);
}


function CodeCouleurIA() {
    codeSecret = [] // Réinitialiser le tableau à chaque clic
    const couleurs = ["Rouge", "Vert", "Bleu", "Jaune", "Orange", "Violet"];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * couleurs.length);
        codeSecret.push(couleurs[randomIndex]);
    }
    return codeSecret
}

function FinDePartie(NombreDeBonneCouleur, essai) {
    if(NombreDeBonneCouleur === 4){
        spanBonneCouleur.textContent = "Bravo, vous avez trouvé le code secret !";
        Rejouer();
        
    }
    else{
        console.log(essai);
        spanBonneCouleur.textContent = "Nombre de bonnes couleurs : " + NombreDeBonneCouleur;
        spanEssai.textContent = "Nombre dessais restants : " + essai; 
    }
    if(essai === 0){
        spanBonneCouleur.textContent = "Dommage, vous avez perdu !";
        spanEssai.textContent = "Nombre dessais restants : " + essai; 
        Rejouer();
    }
}

function Rejouer() {
    setInterval(() => {
        location.reload();
        for (let i=0; i < 4; i++){
            const inputElement = document.querySelector('input[name="AideCouleur' + (i + 1) + '"]');
            if (inputElement) {
                inputElement.checked = false;
                inputElement.className = ''; // Réinitialiser la classe si nécessaire
            }
        }
    }, 4000);
    
}



