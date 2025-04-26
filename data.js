/**
 * data.js - Gestion des données d'exercices de kinésithérapie
 * Ce fichier contient les données statiques des exercices avec leurs types d'animation.
 */

// Définition explicite de window.exercises comme un tableau vide
window.exercises = [];

/**
 * Initialise les données d'exercices
 */
window.initExercisesData = function() {
    // Réinitialisation des exercices
    window.exercises = [];
    
    // Exercices bradykinésie
    window.exercises.push({ category: "Bradykinésie", instructions: "Debout, donnez des coups de pied alternés en avant avec chaque jambe.", animationType: "kickingLegs" });
    window.exercises.push({ category: "Bradykinésie", instructions: "Marchez en levant exagérément les genoux à chaque pas.", animationType: "kneeRaises" });
    window.exercises.push({ category: "Bradykinésie", instructions: "Assis sur une chaise, levez lentement une jambe tout en la gardant tendue, puis abaissez-la. Répétez avec l'autre jambe.", animationType: "legRaises" });
    window.exercises.push({ category: "Bradykinésie", instructions: "Effectuez des mouvements de balancement des bras lents et délibérés en marchant.", animationType: "armSwing" });
    
    // Exercices bras et épaules
    window.exercises.push({ category: "Bras et épaules", instructions: "Levez les bras au-dessus de la tête, puis abaissez-les lentement de chaque côté.", animationType: "armRaises" });
    window.exercises.push({ category: "Bras et épaules", instructions: "Faites des cercles avec vos bras, d'abord petits puis de plus en plus grands.", animationType: "armCircles" });
    window.exercises.push({ category: "Bras et épaules", instructions: "Avec les bras tendus devant vous, effectuez de petits cercles avec les poignets.", animationType: "wristCircles" });
    window.exercises.push({ category: "Bras et épaules", instructions: "Levez et abaissez les épaules lentement, comme si vous haussiez les épaules.", animationType: "shoulderShrugs" });
    
    // Exercices équilibre
    window.exercises.push({ category: "Équilibre", instructions: "Tenez-vous sur une jambe pendant 10 secondes, puis changez de jambe.", animationType: "oneLegStand" });
    window.exercises.push({ category: "Équilibre", instructions: "Marchez en ligne droite en posant le talon juste devant les orteils de l'autre pied.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Équilibre", instructions: "Tenez-vous debout, pieds écartés largeur d'épaules, puis transférez votre poids d'un pied à l'autre.", animationType: "weightShift" });
    window.exercises.push({ category: "Équilibre", instructions: "Debout, faites un pas en avant, puis revenez à la position initiale. Répétez avec l'autre pied.", animationType: "stepForward" });
    
    // Exercices jambes et pieds
    window.exercises.push({ category: "Jambes et pieds", instructions: "Assis, soulevez et abaissez les pieds en alternance.", animationType: "footLifts" });
    window.exercises.push({ category: "Jambes et pieds", instructions: "Debout, montez sur la pointe des pieds puis redescendez lentement.", animationType: "calfRaises" });
    window.exercises.push({ category: "Jambes et pieds", instructions: "Assis, faites des rotations des chevilles dans les deux sens.", animationType: "ankleRotations" });
    window.exercises.push({ category: "Jambes et pieds", instructions: "Assis, écartez et rapprochez les orteils plusieurs fois.", animationType: "toeSpreads" });
    
    // Exercices tête et cou
    window.exercises.push({ category: "Tête et cou", instructions: "Tournez lentement la tête d'un côté puis de l'autre.", animationType: "headTurns" });
    window.exercises.push({ category: "Tête et cou", instructions: "Penchez la tête vers l'avant puis vers l'arrière avec précaution.", animationType: "headNods" });
    window.exercises.push({ category: "Tête et cou", instructions: "Inclinez la tête d'un côté puis de l'autre, comme si vous essayiez de toucher votre épaule avec votre oreille.", animationType: "headTilts" });
    window.exercises.push({ category: "Tête et cou", instructions: "Faites des mouvements circulaires lents avec la tête, d'abord dans un sens puis dans l'autre.", animationType: "headCircles" });
    
    // Exercices tronc
    window.exercises.push({ category: "Tronc", instructions: "Assis sur une chaise, tournez le haut du corps d'un côté puis de l'autre.", animationType: "trunkRotation" });
    window.exercises.push({ category: "Tronc", instructions: "Debout, penchez-vous lentement sur le côté et revenez à la position initiale.", animationType: "lateralTrunkBend" });
    window.exercises.push({ category: "Tronc", instructions: "Assis, penchez-vous en avant pour toucher vos pieds, puis revenez à la position initiale.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Tronc", instructions: "Debout, mains sur les hanches, faites des cercles avec le bassin dans les deux sens.", animationType: "hipCircles" });
    
    // Exercices respiration
    window.exercises.push({ category: "Respiration", instructions: "Inspirez profondément par le nez en gonflant l'abdomen, puis expirez lentement par la bouche.", animationType: "deepBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Pratiquez la respiration abdominale en position allongée, une main sur la poitrine et l'autre sur le ventre.", animationType: "abdominalBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Asseyez-vous confortablement et pratiquez la respiration 4-7-8 : inspirez pendant 4 secondes, retenez pendant 7 secondes, expirez pendant 8 secondes.", animationType: "rhythmicBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Debout, inspirez en levant les bras au-dessus de la tête, expirez en les abaissant.", animationType: "breathWithArms" });
    
    // Exercices flexibilité
    window.exercises.push({ category: "Flexibilité", instructions: "Étirez doucement vos bras au-dessus de votre tête, puis sur les côtés.", animationType: "armStretches" });
    window.exercises.push({ category: "Flexibilité", instructions: "Assis, tendez une jambe et penchez-vous en avant pour toucher votre pied.", animationType: "hamstringStretch" });
    window.exercises.push({ category: "Flexibilité", instructions: "Debout, croisez une jambe devant l'autre et penchez-vous lentement en avant.", animationType: "crossedLegStretch" });
    window.exercises.push({ category: "Flexibilité", instructions: "Allongé sur le dos, ramenez un genou vers la poitrine et maintenez-le avec vos mains.", animationType: "kneeToChest" });
    
    return window.exercises; // Retourner les exercices pour confirmation
}

/**
 * Retourne toutes les catégories d'exercices disponibles
 * @returns {string[]} - Tableau des catégories uniques, triées alphabétiquement
 */
window.getCategories = function() {
    // Vérification de sécurité pour s'assurer que exercises existe
    if (!window.exercises || !Array.isArray(window.exercises)) {
        console.error("Le tableau des exercices n'est pas correctement initialisé");
        window.initExercisesData(); // Tenter une réinitialisation
    }
    
    return [...new Set(window.exercises.map(ex => ex.category))]
        .filter(Boolean)
        .sort();
}

/**
 * Retourne les exercices appartenant à une catégorie spécifique
 * @param {string} category - La catégorie d'exercice
 * @returns {Object[]} - Tableau d'objets exercices correspondant à la catégorie
 */
window.getExercisesByCategory = function(category) {
    // Vérification de sécurité pour s'assurer que exercises existe
    if (!window.exercises || !Array.isArray(window.exercises)) {
        console.error("Le tableau des exercices n'est pas correctement initialisé");
        window.initExercisesData(); // Tenter une réinitialisation
    }
    
    // Log pour le débogage
    console.log(`Recherche d'exercices pour la catégorie: "${category}"`);
    console.log(`Nombre total d'exercices: ${window.exercises.length}`);
    
    // Filtre avec vérification supplémentaire
    const result = window.exercises.filter(ex => {
        return ex && ex.category === category;
    });
    
    console.log(`Nombre d'exercices trouvés: ${result.length}`);
    return result;
}

/**
 * Obtient un exercice spécifique par son index dans une catégorie
 * @param {string} category - La catégorie d'exercice
 * @param {number} index - L'index de l'exercice dans sa catégorie
 * @returns {Object|null} - L'objet exercice ou null si non trouvé
 */
window.getExerciseByIndex = function(category, index) {
    const categoryExercises = window.getExercisesByCategory(category);
    return (index >= 0 && index < categoryExercises.length) ? categoryExercises[index] : null;
}

/**
 * Retourne tous les exercices
 * @returns {Object[]} - Tableau de tous les exercices
 */
window.getAllExercises = function() {
    // Vérification de sécurité pour s'assurer que exercises existe
    if (!window.exercises || !Array.isArray(window.exercises) || window.exercises.length === 0) {
        console.log("Initialisation des exercices car le tableau est vide ou non initialisé");
        window.initExercisesData();
    }
    return window.exercises;
}

// Appelle explicitement initExercisesData pour s'assurer que les exercices sont chargés
console.log("Initialisation des données d'exercices...");
window.initExercisesData();
console.log(`${window.exercises.length} exercices ont été chargés`);
