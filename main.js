/**
 * main.js - Fichier principal de l'application d'exercices de kinésithérapie
 * Ce fichier initialise l'application, gère les interactions utilisateur et coordonne
 * les autres modules (data.js et moves.js).
 */

// Attendre que le DOM soit chargé avant de lancer l'application
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const categorySelect = document.getElementById('category-select');
    const exerciseSelect = document.getElementById('exercise-select');
    const instructionsText = document.getElementById('instructions-text');
    const currentExercise = document.querySelector('.current-exercise');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    
    // Initialiser l'application
    init();
    
    /**
     * Initialise l'application
     */
    async function init() {
        // Essayer de charger les données depuis le fichier CSV
        try {
            await loadExercisesData();
            populateCategories();
        } catch (error) {
            console.error("Erreur lors de l'initialisation de l'application:", error);
            // Créer des données statiques en cas d'erreur
            createStaticExercisesData();
            populateCategories();
        }
        
        // Attacher les gestionnaires d'événements
        attachEventListeners();
    }
    
    /**
     * Remplit le sélecteur de catégories avec les catégories disponibles
     */
    function populateCategories() {
        // Vider d'abord le sélecteur
        categorySelect.innerHTML = '<option value="">Sélectionnez une catégorie</option>';
        
        // Obtenir les catégories
        const categories = getCategories();
        
        // Ajouter chaque catégorie au sélecteur
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
        
        // Afficher un message dans les instructions
        instructionsText.textContent = `${exercises.length} exercices chargés dans ${categories.length} catégories. Veuillez sélectionner une catégorie.`;
    }
    
    /**
     * Remplit le sélecteur d'exercices avec les exercices de la catégorie sélectionnée
     * @param {string} category - La catégorie d'exercice sélectionnée
     */
    function populateExercises(category) {
        // Vider d'abord le sélecteur
        exerciseSelect.innerHTML = '<option value="">Sélectionnez un exercice</option>';
        
        if (!category) return;
        
        // Obtenir les exercices de la catégorie
        const categoryExercises = getExercisesByCategory(category);
        
        // Ajouter chaque exercice au sélecteur
        categoryExercises.forEach((ex, index) => {
            const option = document.createElement('option');
            option.value = index;
            // Afficher une partie de l'instruction comme texte de l'option
            const shortInstructions = ex.instructions.length > 50 
                ? ex.instructions.substring(0, 47) + '...' 
                : ex.instructions;
            option.textContent = shortInstructions;
            exerciseSelect.appendChild(option);
        });
    }
    
    /**
     * Attache les gestionnaires d'événements aux éléments de l'interface
     */
    function attachEventListeners() {
        // Gestionnaire pour le changement de catégorie
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            populateExercises(category);
            
            // Réinitialiser l'affichage si une nouvelle catégorie est sélectionnée
            resetExerciseDisplay();
        });
        
        // Gestionnaire pour le changement d'exercice
        exerciseSelect.addEventListener('change', function() {
            if (this.value !== '') {
                displaySelectedExercise();
            }
        });
        
        // Gestionnaires pour les boutons de contrôle
        playButton.addEventListener('click', handlePlayButton);
        pauseButton.addEventListener('click', handlePauseButton);
        resetButton.addEventListener('click', handleResetButton);
    }
    
    /**
     * Affiche l'exercice sélectionné
     */
    function displaySelectedExercise() {
        const exerciseIndex = parseInt(exerciseSelect.value);
        const category = categorySelect.value;
        
        // Obtenir les exercices de la catégorie et sélectionner celui choisi
        const categoryExercises = getExercisesByCategory(category);
        
        if (categoryExercises.length > exerciseIndex) {
            const selectedExercise = categoryExercises[exerciseIndex];
            
            // Afficher les instructions
            instructionsText.textContent = selectedExercise.instructions;
            currentExercise.textContent = `${selectedExercise.category}: Exercice ${exerciseIndex + 1}`;
            
            // Réinitialiser l'animation
            stopAnimation();
            resetMannequin();
        }
    }
    
    /**
     * Réinitialise l'affichage de l'exercice
     */
    function resetExerciseDisplay() {
        instructionsText.textContent = "Sélectionnez un exercice pour voir les instructions.";
        currentExercise.textContent = "Sélectionnez un exercice pour commencer";
        stopAnimation();
        resetMannequin();
    }
    
    /**
     * Gère le clic sur le bouton Démarrer
     */
    function handlePlayButton() {
        // Vérifier si un exercice est sélectionné
        if (!exerciseSelect.value) {
            alert('Veuillez sélectionner un exercice avant de démarrer l\'animation.');
            return;
        }
        
        // Démarrer l'animation pour la catégorie sélectionnée
        startAnimation(categorySelect.value);
    }
    
    /**
     * Gère le clic sur le bouton Pause
     */
    function handlePauseButton() {
        // Basculer l'état de pause
        const isPaused = togglePause();
        
        // Mettre à jour le texte du bouton
        pauseButton.textContent = isPaused ? 'Reprendre' : 'Pause';
    }
    
    /**
     * Gère le clic sur le bouton Réinitialiser
     */
    function handleResetButton() {
        // Arrêter l'animation et réinitialiser le mannequin
        stopAnimation();
        resetMannequin();
        
        // Réinitialiser le texte du bouton de pause
        pauseButton.textContent = 'Pause';
    }
});
