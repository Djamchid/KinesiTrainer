/**
 * data.js - Gestion des données d'exercices de kinésithérapie
 * Ce fichier contient les fonctions de chargement et de manipulation des données d'exercices,
 * ainsi que des données statiques de repli en cas d'échec du chargement du fichier CSV.
 */

// Variable globale pour stocker les exercices
let exercises = [];

/**
 * Charge les exercices depuis le fichier CSV
 * @returns {Promise<boolean>} - Retourne true si le chargement a réussi, false sinon
 */
async function loadExercisesData() {
    try {
        // Essayer de charger le fichier CSV
        const response = await window.fs.readFile('EXERCICES KINE DIGIPARK CORRIGE ML ET NGK DD SEPT 2023.xlsx  copie pour js.csv', { encoding: 'utf8' });
        
        // Essayer de parser avec point-virgule d'abord
        if (!parseCSVWithSemicolon(response)) {
            // Si ça échoue, essayer avec virgule
            if (!parseCSVWithComma(response)) {
                // Si tout échoue, utiliser les données statiques
                console.error('Échec du parsing CSV, utilisation des données statiques');
                createStaticExercisesData();
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Erreur lors du chargement du fichier CSV:', error);
        // En cas d'erreur, utiliser les données statiques
        createStaticExercisesData();
        return false;
    }
}

/**
 * Parse le CSV avec point-virgule comme séparateur
 * @param {string} csvData - Le contenu du fichier CSV
 * @returns {boolean} - Retourne true si le parsing a réussi, false sinon
 */
function parseCSVWithSemicolon(csvData) {
    try {
        // Découpage par lignes
        const lines = csvData.split('\n');
        if (lines.length < 2) {
            return false;
        }
        
        // Extraction des en-têtes
        const headers = lines[0].split(';');
        
        // Recherche des indices des colonnes
        const categoryIndex = headers.findIndex(h => h.includes('Catégorie'));
        const instructionsIndex = headers.findIndex(h => h.includes('Instructions'));
        
        if (categoryIndex === -1 || instructionsIndex === -1) {
            return false;
        }
        
        // Réinitialisation des exercices
        exercises = [];
        
        // Traitement des lignes de données (sauter l'en-tête)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const fields = line.split(';');
                if (fields.length > Math.max(categoryIndex, instructionsIndex)) {
                    const category = fields[categoryIndex]?.replace(/"/g, '').trim();
                    const instruction = fields[instructionsIndex]?.replace(/"/g, '').trim();
                    
                    if (category && instruction) {
                        exercises.push({
                            category: category,
                            instructions: instruction
                        });
                    }
                }
            }
        }
        
        // Vérifier si on a récupéré des données
        return exercises.length > 0;
    } catch (error) {
        console.error('Erreur lors du parsing CSV avec point-virgule:', error);
        return false;
    }
}

/**
 * Parse le CSV avec virgule comme séparateur
 * @param {string} csvData - Le contenu du fichier CSV
 * @returns {boolean} - Retourne true si le parsing a réussi, false sinon
 */
function parseCSVWithComma(csvData) {
    try {
        // Découpage par lignes
        const lines = csvData.split('\n');
        if (lines.length < 2) {
            return false;
        }
        
        // Extraction des en-têtes
        const headers = lines[0].split(',');
        
        // Recherche des indices des colonnes
        const categoryIndex = headers.findIndex(h => h.includes('Catégorie'));
        const instructionsIndex = headers.findIndex(h => h.includes('Instructions'));
        
        if (categoryIndex === -1 || instructionsIndex === -1) {
            return false;
        }
        
        // Réinitialisation des exercices
        exercises = [];
        
        // Traitement des lignes de données (sauter l'en-tête)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                // Traitement spécial pour gérer les virgules dans les valeurs citées
                let fields = [];
                let inQuotes = false;
                let currentField = '';
                
                for (let j = 0; j < line.length; j++) {
                    if (line[j] === '"') {
                        inQuotes = !inQuotes;
                    } else if (line[j] === ',' && !inQuotes) {
                        fields.push(currentField);
                        currentField = '';
                    } else {
                        currentField += line[j];
                    }
                }
                fields.push(currentField); // Ajouter le dernier champ
                
                if (fields.length > Math.max(categoryIndex, instructionsIndex)) {
                    const category = fields[categoryIndex]?.replace(/"/g, '').trim();
                    const instruction = fields[instructionsIndex]?.replace(/"/g, '').trim();
                    
                    if (category && instruction) {
                        exercises.push({
                            category: category,
                            instructions: instruction
                        });
                    }
                }
            }
        }
        
        // Vérifier si on a récupéré des données
        return exercises.length > 0;
    } catch (error) {
        console.error('Erreur lors du parsing CSV avec virgule:', error);
        return false;
    }
}

/**
 * Crée un ensemble de données statiques d'exercices
 */
function createStaticExercisesData() {
    // Réinitialisation des exercices
    exercises = [];
    
    // Exercices bradykinésie
    exercises.push({ category: "Bradykinésie", instructions: "Debout, donnez des coups de pied alternés en avant avec chaque jambe." });
    exercises.push({ category: "Bradykinésie", instructions: "Marchez en levant exagérément les genoux à chaque pas." });
    exercises.push({ category: "Bradykinésie", instructions: "Assis sur une chaise, levez lentement une jambe tout en la gardant tendue, puis abaissez-la. Répétez avec l'autre jambe." });
    exercises.push({ category: "Bradykinésie", instructions: "Effectuez des mouvements de balancement des bras lents et délibérés en marchant." });
    
    // Exercices bras et épaules
    exercises.push({ category: "Bras et épaules", instructions: "Levez les bras au-dessus de la tête, puis abaissez-les lentement de chaque côté." });
    exercises.push({ category: "Bras et épaules", instructions: "Faites des cercles avec vos bras, d'abord petits puis de plus en plus grands." });
    exercises.push({ category: "Bras et épaules", instructions: "Avec les bras tendus devant vous, effectuez de petits cercles avec les poignets." });
    exercises.push({ category: "Bras et épaules", instructions: "Levez et abaissez les épaules lentement, comme si vous haussiez les épaules." });
    
    // Exercices équilibre
    exercises.push({ category: "Équilibre", instructions: "Tenez-vous sur une jambe pendant 10 secondes, puis changez de jambe." });
    exercises.push({ category: "Équilibre", instructions: "Marchez en ligne droite en posant le talon juste devant les orteils de l'autre pied." });
    exercises.push({ category: "Équilibre", instructions: "Tenez-vous debout, pieds écartés largeur d'épaules, puis transférez votre poids d'un pied à l'autre." });
    exercises.push({ category: "Équilibre", instructions: "Debout, faites un pas en avant, puis revenez à la position initiale. Répétez avec l'autre pied." });
    
    // Exercices jambes et pieds
    exercises.push({ category: "Jambes et pieds", instructions: "Assis, soulevez et abaissez les pieds en alternance." });
    exercises.push({ category: "Jambes et pieds", instructions: "Debout, montez sur la pointe des pieds puis redescendez lentement." });
    exercises.push({ category: "Jambes et pieds", instructions: "Assis, faites des rotations des chevilles dans les deux sens." });
    exercises.push({ category: "Jambes et pieds", instructions: "Assis, écartez et rapprochez les orteils plusieurs fois." });
    
    // Exercices tête et cou
    exercises.push({ category: "Tête et cou", instructions: "Tournez lentement la tête d'un côté puis de l'autre." });
    exercises.push({ category: "Tête et cou", instructions: "Penchez la tête vers l'avant puis vers l'arrière avec précaution." });
    exercises.push({ category: "Tête et cou", instructions: "Inclinez la tête d'un côté puis de l'autre, comme si vous essayiez de toucher votre épaule avec votre oreille." });
    exercises.push({ category: "Tête et cou", instructions: "Faites des mouvements circulaires lents avec la tête, d'abord dans un sens puis dans l'autre." });
    
    // Exercices tronc
    exercises.push({ category: "Tronc", instructions: "Assis sur une chaise, tournez le haut du corps d'un côté puis de l'autre." });
    exercises.push({ category: "Tronc", instructions: "Debout, penchez-vous lentement sur le côté et revenez à la position initiale." });
    exercises.push({ category: "Tronc", instructions: "Assis, penchez-vous en avant pour toucher vos pieds, puis revenez à la position initiale." });
    exercises.push({ category: "Tronc", instructions: "Debout, mains sur les hanches, faites des cercles avec le bassin dans les deux sens." });
    
    // Exercices respiration
    exercises.push({ category: "Respiration", instructions: "Inspirez profondément par le nez en gonflant l'abdomen, puis expirez lentement par la bouche." });
    exercises.push({ category: "Respiration", instructions: "Pratiquez la respiration abdominale en position allongée, une main sur la poitrine et l'autre sur le ventre." });
    exercises.push({ category: "Respiration", instructions: "Asseyez-vous confortablement et pratiquez la respiration 4-7-8 : inspirez pendant 4 secondes, retenez pendant 7 secondes, expirez pendant 8 secondes." });
    exercises.push({ category: "Respiration", instructions: "Debout, inspirez en levant les bras au-dessus de la tête, expirez en les abaissant." });
    
    // Exercices flexibilité
    exercises.push({ category: "Flexibilité", instructions: "Étirez doucement vos bras au-dessus de votre tête, puis sur les côtés." });
    exercises.push({ category: "Flexibilité", instructions: "Assis, tendez une jambe et penchez-vous en avant pour toucher votre pied." });
    exercises.push({ category: "Flexibilité", instructions: "Debout, croisez une jambe devant l'autre et penchez-vous lentement en avant." });
    exercises.push({ category: "Flexibilité", instructions: "Allongé sur le dos, ramenez un genou vers la poitrine et maintenez-le avec vos mains." });
}

/**
 * Retourne toutes les catégories d'exercices disponibles
 * @returns {string[]} - Tableau des catégories uniques, triées alphabétiquement
 */
function getCategories() {
    return [...new Set(exercises.map(ex => ex.category))]
        .filter(Boolean)
        .sort();
}

/**
 * Retourne les exercices appartenant à une catégorie spécifique
 * @param {string} category - La catégorie d'exercice
 * @returns {Object[]} - Tableau d'objets exercices correspondant à la catégorie
 */
function getExercisesByCategory(category) {
    return exercises.filter(ex => ex.category === category);
}
