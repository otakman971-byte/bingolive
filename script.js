// Liste de toutes les phrases du bingo
const bingoItems = [
    "Il faut comprendre le contexte historique",
    "Frapper ne signifie pas frapper, c'est une mauvaise traduction",
    '" C\'est sorti de son contexte"',
    "Les châtiments coraniques sont rarement appliqués",
    '"L\'esclavage n\'existe plus en 2025"',
    " Vous êtes d'extrême droite !",
    "Se faire insulter",
    '"Une femme de 9ans..."',
    '"Des règles strictes empêchent les abus"',
    "Les femmes sont libre / sont un bijoux",
    '"Rien dans le Coran n\’encourage la haine gratuite"',
    "Il faut lire l'arabe classique pour comprendre",
    "Les autres religions ont fait pire",
    '"Ce ne sont pas de vrais musulmans"',
    "Il faut étudier des années pour comprendre",
    '"L\'islam a libéré les esclaves progressivement"',
    "Il faut voir l'ensemble du coran, pas un verset isolé",
    '"Le coran est parfait"',
    "C\'est symbolique / métaphorique",
    "Consultez un vrai érudit musulman",
    '"C\'est une religion de paix"',
    "C\'est de la propagande sioniste",
    "Aicha n'avait pas 9ans...",
    '"Dissonance"',
    "Si c'est écrit dans le coran, c'est vrai"
];

// Fonction pour mélanger un tableau
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Fonction pour créer la grille de bingo
function createBingo() {
    const grid = document.getElementById('bingoGrid');
    grid.innerHTML = '';
    
    const shuffled = shuffleArray(bingoItems);
    
    shuffled.forEach((item, index) => {
        const cell = document.createElement('button');
        cell.className = 'bingo-cell';
        cell.textContent = item;
        cell.onclick = () => toggleCell(cell);
        
        // Case gratuite au centre
        if (item === "CASE GRATUITE ⭐") {
            cell.classList.add('free', 'checked');
        }
        
        grid.appendChild(cell);
    });
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const cells = document.querySelectorAll('.bingo-cell');
    const checkedCells = document.querySelectorAll('.bingo-cell.checked');
    const total = cells.length;
    const checked = checkedCells.length;
    const percentage = Math.round((checked / total) * 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
    
    // Ajouter une animation et changer la couleur si 100%
    if (percentage === 100) {
        progressFill.classList.add('complete');
        progressText.style.color = '#38ef7d';
        
        // Effet de célébration
        setTimeout(() => {
            if (confirm('🎉 BINGO COMPLET ! 🎉\n\nFélicitations ! Voulez-vous télécharger votre bingo ?')) {
                downloadBingo();
            }
        }, 500);
    } else {
        progressFill.classList.remove('complete');
        progressText.style.color = '#667eea';
    }
}

// Fonction pour cocher/décocher une case
function toggleCell(cell) {
    if (!cell.classList.contains('free')) {
        cell.classList.toggle('checked');
        updateProgress();
    }
}

// Fonction pour réinitialiser le bingo
function resetBingo() {
    createBingo();
    updateProgress();
}

// Initialiser le bingo au chargement de la page
createBingo();
updateProgress();

// Fonction pour télécharger le bingo en image
async function downloadBingo() {
    // Charger la bibliothèque html2canvas si elle n'est pas déjà chargée
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
            script.onload = resolve;
        });
    }
    
    const container = document.querySelector('.container');
    
    try {
        const canvas = await html2canvas(container, {
            scale: 2,
            backgroundColor: '#667eea',
            logging: false
        });
        
        // Convertir le canvas en blob
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'bingo-tiktok.png';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        alert('Une erreur est survenue lors du téléchargement');
    }
}
