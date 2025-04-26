/**
 * main.js - Fichier principal de l'application d'exercices de kinésithérapie
 * Ce fichier initialise l'application et gère les interactions utilisateur.
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
    function init() {
        console.log("Initialisation de l'application...");
        
        // S'assurer que les exercices sont initialisés
        if (!window.exercises || window.exercises.length === 0) {
            console.log("Initialisation des exercices depuis main.js");
            if (typeof window.initExercisesData === 'function') {
                window.initExercisesData();
            } else {
                console.error("La fonction d'initialisation des exercices n'est pas disponible!");
                // Création d'une fonction de secours si nécessaire
                fallbackInitialization();
            }
        }
        
        // Vérifier que les exercices sont chargés
        console.log(`Nombre d'exercices chargés: ${window.exercises ? window.exercises.length : 0}`);
        
        // Remplir les catégories
        populateCategories();
        
        // Attacher les gestionnaires d'événements
        attachEventListeners();
    }
    
    /**
     * Initialisation de secours des exercices si la fonction principale n'est pas disponible
     */
    function fallbackInitialization() {
        console.log("Utilisation de l'initialisation de secours pour les exercices");
        window.exercises = [];
        
        // Définition des catégories d'exercices standard
        const categories = [
            "Bradykinésie", "Bras et épaules", "Équilibre", "Jambes et pieds",
            "Tête et cou", "Tronc", "Respiration", "Flexibilité"
        ];
        
        // Créer au moins un exercice par catégorie
        categories.forEach(category => {
            window.exercises.push({
                category: category,
                instructions: `Exercice pour ${category.toLowerCase()}. Sélectionnez pour voir les instructions détaillées.`,
                animationType: category.toLowerCase().replace(/[éèê]/g, 'e').replace(/\s+/g, '')
            });
        });
        
        // Définir les fonctions d'accès aux données si elles n'existent pas
        if (typeof window.getCategories !== 'function') {
            window.getCategories = function() {
                return [...new Set(window.exercises.map(ex => ex.category))].filter(Boolean).sort();
            };
        }
        
        if (typeof window.getExercisesByCategory !== 'function') {
            window.getExercisesByCategory = function(category) {
                return window.exercises.filter(ex => ex.category === category);
            };
        }
        
        if (typeof window.getExerciseByIndex !== 'function') {
            window.getExerciseByIndex = function(category, index) {
                const categoryExercises = window.getExercisesByCategory(category);
                return (index >= 0 && index < categoryExercises.length) ? categoryExercises[index] : null;
            };
        }
        
        if (typeof window.getAllExercises !== 'function') {
            window.getAllExercises = function() {
                return window.exercises;
            };
        }
    }
    
    /**
     * Remplit le sélecteur de catégories avec les catégories disponibles
     */
    function populateCategories() {
        console.log("Remplissage des catégories...");
        
        // Vider d'abord le sélecteur
        categorySelect.innerHTML = '<option value="">Sélectionnez une catégorie</option>';
        
        // Vérifier que la fonction getCategories existe
        if (typeof window.getCategories !== 'function') {
            console.error("La fonction getCategories n'est pas disponible!");
            return;
        }
        
        // Obtenir les catégories
        const categories = window.getCategories();
        console.log(`Catégories trouvées: ${categories.length}`, categories);
        
        // Ajouter chaque catégorie au sélecteur
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
        
        // Vérifier que getAllExercises existe
        if (typeof window.getAllExercises !== 'function') {
            console.error("La fonction getAllExercises n'est pas disponible!");
            return;
        }
        
        // Obtenir tous les exercices pour afficher le comptage
        const allExercises = window.getAllExercises();
        
        // Afficher un message dans les instructions
        instructionsText.textContent = `${allExercises.length} exercices disponibles dans ${categories.length} catégories. Veuillez sélectionner une catégorie.`;
    }
    
    /**
     * Remplit le sélecteur d'exercices avec les exercices de la catégorie sélectionnée
     * @param {string} category - La catégorie d'exercice sélectionnée
     */
    function populateExercises(category) {
        console.log(`Remplissage des exercices pour la catégorie: ${category}`);
        
        // Vider d'abord le sélecteur
        exerciseSelect.innerHTML = '<option value="">Sélectionnez un exercice</option>';
        
        if (!category) return;
        
        // Vérifier que la fonction getExercisesByCategory existe
        if (typeof window.getExercisesByCategory !== 'function') {
            console.error("La fonction getExercisesByCategory n'est pas disponible!");
            return;
        }
        
        // Obtenir les exercices de la catégorie
        const categoryExercises = window.getExercisesByCategory(category);
        console.log(`Exercices trouvés pour ${category}: ${categoryExercises.length}`);
        
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
        
        // Si aucun exercice n'a été trouvé, afficher un message
        if (categoryExercises.length === 0) {
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "Aucun exercice disponible pour cette catégorie";
            exerciseSelect.appendChild(option);
            
            // Afficher un message dans les instructions
            instructionsText.textContent = `Aucun exercice disponible pour la catégorie ${category}.`;
        }
    }
    
    /**
     * Attache les gestionnaires d'événements aux éléments de l'interface
     */
    function attachEventListeners() {
        console.log("Attachement des gestionnaires d'événements...");
        
        // Gestionnaire pour le changement de catégorie
        categorySelect.addEventListener('change', function() {
            const category = this.value;
            console.log(`Catégorie sélectionnée: "${category}"`);
            populateExercises(category);
            
            // Réinitialiser l'affichage si une nouvelle catégorie est sélectionnée
            resetExerciseDisplay();
        });
        
        // Gestionnaire pour le changement d'exercice
        exerciseSelect.addEventListener('change', function() {
            if (this.value !== '') {
                console.log(`Exercice sélectionné: index ${this.value}`);
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
        
        console.log(`Affichage de l'exercice: catégorie=${category}, index=${exerciseIndex}`);
        
        // Vérifier que getExerciseByIndex existe
        if (typeof window.getExerciseByIndex !== 'function') {
            console.error("La fonction getExerciseByIndex n'est pas disponible!");
            return;
        }
        
        // Obtenir l'exercice sélectionné
        const selectedExercise = window.getExerciseByIndex(category, exerciseIndex);
        
        if (selectedExercise) {
            // Afficher les instructions
            instructionsText.textContent = selectedExercise.instructions;
            currentExercise.textContent = `${selectedExercise.category}: Exercice ${exerciseIndex + 1}`;
            
            // Réinitialiser l'animation
            if (typeof stopAnimation === 'function') {
                stopAnimation();
            }
            if (typeof resetMannequin === 'function') {
                resetMannequin();
            }
        } else {
            console.error(`Exercice non trouvé: catégorie=${category}, index=${exerciseIndex}`);
        }
    }
    
    /**
     * Réinitialise l'affichage de l'exercice
     */
    function resetExerciseDisplay() {
        instructionsText.textContent = "Sélectionnez un exercice pour voir les instructions.";
        currentExercise.textContent = "Sélectionnez un exercice pour commencer";
        
        if (typeof stopAnimation === 'function') {
            stopAnimation();
        }
        if (typeof resetMannequin === 'function') {
            resetMannequin();
        }
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
        
        // Récupérer l'exercice sélectionné
        const exerciseIndex = parseInt(exerciseSelect.value);
        const category = categorySelect.value;
        
        // Vérifier que getExerciseByIndex existe
        if (typeof window.getExerciseByIndex !== 'function') {
            console.error("La fonction getExerciseByIndex n'est pas disponible!");
            return;
        }
        
        const selectedExercise = window.getExerciseByIndex(category, exerciseIndex);
        
        if (selectedExercise) {
            // Vérifier que startAnimation existe
            if (typeof startAnimation !== 'function') {
                console.error("La fonction startAnimation n'est pas disponible!");
                alert('Désolé, la fonction d\'animation n\'est pas disponible.');
                return;
            }
            
            // Démarrer l'animation pour l'exercice spécifique
            startAnimation(selectedExercise);
        }
    }
    
    /**
     * Gère le clic sur le bouton Pause
     */
    function handlePauseButton() {
        // Vérifier que togglePause existe
        if (typeof togglePause !== 'function') {
            console.error("La fonction togglePause n'est pas disponible!");
            return;
        }
        
        // Basculer l'état de pause
        const isPaused = togglePause();
        
        // Mettre à jour le texte du bouton
        pauseButton.textContent = isPaused ? 'Reprendre' : 'Pause';
    }
    
    /**
     * Gère le clic sur le bouton Réinitialiser
     */
    function handleResetButton() {
        // Vérifier que les fonctions nécessaires existent
        if (typeof stopAnimation !== 'function' || typeof resetMannequin !== 'function') {
            console.error("Les fonctions stopAnimation ou resetMannequin ne sont pas disponibles!");
            return;
        }
        
        // Arrêter l'animation et réinitialiser le mannequin
        stopAnimation();
        resetMannequin();
        
        // Réinitialiser le texte du bouton de pause
        pauseButton.textContent = 'Pause';
    }
});
