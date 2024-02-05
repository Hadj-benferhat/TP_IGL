function traiterAuteursEtInstitutions(chaine) {
    const lignes = chaine.split('\n');
    let auteurs = '';
    let institutions = '';

    let isAuthors = true; // Indique si nous sommes en train de traiter les auteurs

    lignes.forEach(ligne => {
        if (ligne.trim() !== '') {
            if (isAuthors) {
                // Si nous sommes en train de traiter les auteurs, ajoutons la ligne à la liste des auteurs
                if (isFirstLetterUpperCase(ligne)) {
                    console.log(ligne)
                    ligne += ',';
                    auteurs += ligne.trim();
                    isAuthors = false;
                }                
                

            } else {
                // Sinon, ajoutons la ligne à la liste des institutions
                if (institutions !== '') {
                    institutions += '\n';
                }
                institutions += ligne.trim();
                if(ligne.includes('@')) {
                    isAuthors = true;
                    institutions +=',';
                }
            }
        } else {
            // Si la ligne est vide, cela signifie que nous passons des auteurs aux institutions
        }
    });

    return {
        authors: auteurs.slice(0, chaine.lastIndexOf(",")),
        
        institutions: institutions.slice(0, chaine.lastIndexOf(","))
    };
}
function isFirstLetterUpperCase(chaine) {
    // Obtenez la première lettre de la chaîne
    const premiereLettre = chaine.charAt(0);
    // Vérifiez si la première lettre est égale à sa version en majuscule
    return premiereLettre === premiereLettre.toUpperCase();
}
// Exemple d'utilisation avec votre exemple de chaîne
const article = {
    authors: "Colin Atkinson\nUniversity of Mannheim,\nGermany\natkinson@informatik.uni-\nmannheim.de\nDietmar Stoll\nUniversity of Mannheim,\nGermany\nstoll@informatik.uni-\nmannheim.de\nChristian Tunjic\nUniversity of Mannheim,\nGermany\ntunjic@informatik.uni-\nmannheim.de\nJacques Robin\nUniversidade Federal de\nPernambuco, Recife, Brasil\njr@cin.ufpe.br\n",
    institutions: ""
};

const result = traiterAuteursEtInstitutions(article.authors.replace(/,/g, ''));

console.log('result');
console.log(result);
