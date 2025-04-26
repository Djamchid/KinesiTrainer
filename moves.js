/**
 * moves.js - Contient les animations du pantin pour différents types d'exercices
 * Ce fichier gère toutes les animations du mannequin pour les exercices de kinésithérapie
 */

// Variables pour la gestion des animations
let currentAnimation = null;
let animationPaused = false;

/**
 * Arrête l'animation en cours
 */
function stopAnimation() {
    if (currentAnimation) {
        cancelAnimationFrame(currentAnimation);
        currentAnimation = null;
    }
    animationPaused = false;
}

/**
 * Met en pause ou reprend l'animation
 * @returns {boolean} - État de pause après le basculement
 */
function togglePause() {
    animationPaused = !animationPaused;
    return animationPaused;
}

/**
 * Réinitialise le mannequin à sa position par défaut
 */
function resetMannequin() {
    // Tête
    document.getElementById('head').setAttribute('cx', '100');
    document.getElementById('head').setAttribute('cy', '50');
    
    // Colonne vertébrale
    document.getElementById('spine').setAttribute('x1', '100');
    document.getElementById('spine').setAttribute('y1', '70');
    document.getElementById('spine').setAttribute('x2', '100');
    document.getElementById('spine').setAttribute('y2', '150');
    
    // Bras gauche
    document.getElementById('left-upper-arm').setAttribute('x1', '100');
    document.getElementById('left-upper-arm').setAttribute('y1', '90');
    document.getElementById('left-upper-arm').setAttribute('x2', '70');
    document.getElementById('left-upper-arm').setAttribute('y2', '120');
    
    document.getElementById('left-lower-arm').setAttribute('x1', '70');
    document.getElementById('left-lower-arm').setAttribute('y1', '120');
    document.getElementById('left-lower-arm').setAttribute('x2', '50');
    document.getElementById('left-lower-arm').setAttribute('y2', '150');
    
    // Bras droit
    document.getElementById('right-upper-arm').setAttribute('x1', '100');
    document.getElementById('right-upper-arm').setAttribute('y1', '90');
    document.getElementById('right-upper-arm').setAttribute('x2', '130');
    document.getElementById('right-upper-arm').setAttribute('y2', '120');
    
    document.getElementById('right-lower-arm').setAttribute('x1', '130');
    document.getElementById('right-lower-arm').setAttribute('y1', '120');
    document.getElementById('right-lower-arm').setAttribute('x2', '150');
    document.getElementById('right-lower-arm').setAttribute('y2', '150');
    
    // Jambe gauche
    document.getElementById('left-upper-leg').setAttribute('x1', '100');
    document.getElementById('left-upper-leg').setAttribute('y1', '150');
    document.getElementById('left-upper-leg').setAttribute('x2', '80');
    document.getElementById('left-upper-leg').setAttribute('y2', '230');
    
    document.getElementById('left-lower-leg').setAttribute('x1', '80');
    document.getElementById('left-lower-leg').setAttribute('y1', '230');
    document.getElementById('left-lower-leg').setAttribute('x2', '70');
    document.getElementById('left-lower-leg').setAttribute('y2', '310');
    
    // Jambe droite
    document.getElementById('right-upper-leg').setAttribute('x1', '100');
    document.getElementById('right-upper-leg').setAttribute('y1', '150');
    document.getElementById('right-upper-leg').setAttribute('x2', '120');
    document.getElementById('right-upper-leg').setAttribute('y2', '230');
    
    document.getElementById('right-lower-leg').setAttribute('x1', '120');
    document.getElementById('right-lower-leg').setAttribute('y1', '230');
    document.getElementById('right-lower-leg').setAttribute('x2', '130');
    document.getElementById('right-lower-leg').setAttribute('y2', '310');
}

/**
 * Démarre l'animation appropriée pour l'exercice sélectionné
 * @param {Object} exercise - L'exercice à animer
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function startAnimation(exercise) {
    stopAnimation(); // Arrête toute animation existante
    animationPaused = false;
    
    if (!exercise) {
        return null;
    }
    
    // Choisir l'animation en fonction du type d'animation de l'exercice
    switch (exercise.animationType) {
        // Animations pour Bradykinésie
        case "kickingLegs":
            currentAnimation = animateKickingLegs();
            break;
        case "kneeRaises":
            currentAnimation = animateKneeRaises();
            break;
        case "legRaises":
            currentAnimation = animateLegRaises();
            break;
        case "armSwing":
            currentAnimation = animateArmSwing();
            break;
            
        // Animations pour Bras et épaules
        case "armRaises":
            currentAnimation = animateArmRaises();
            break;
        case "armCircles":
            currentAnimation = animateArmCircles();
            break;
        case "wristCircles":
            currentAnimation = animateWristCircles();
            break;
        case "shoulderShrugs":
            currentAnimation = animateShoulderShrugs();
            break;
            
        // Animations pour Équilibre
        case "oneLegStand":
            currentAnimation = animateOneLegStand();
            break;
        case "tandemWalk":
            currentAnimation = animateTandemWalk();
            break;
        case "weightShift":
            currentAnimation = animateWeightShift();
            break;
        case "stepForward":
            currentAnimation = animateStepForward();
            break;
            
        // Animations pour Jambes et pieds
        case "footLifts":
            currentAnimation = animateFootLifts();
            break;
        case "calfRaises":
            currentAnimation = animateCalfRaises();
            break;
        case "ankleRotations":
            currentAnimation = animateAnkleRotations();
            break;
        case "toeSpreads":
            currentAnimation = animateToeSpreads();
            break;
            
        // Animations pour Tête et cou
        case "headTurns":
            currentAnimation = animateHeadTurns();
            break;
        case "headNods":
            currentAnimation = animateHeadNods();
            break;
        case "headTilts":
            currentAnimation = animateHeadTilts();
            break;
        case "headCircles":
            currentAnimation = animateHeadCircles();
            break;
            
        // Animations pour Tronc
        case "trunkRotation":
            currentAnimation = animateTrunkRotation();
            break;
        case "lateralTrunkBend":
            currentAnimation = animateLateralTrunkBend();
            break;
        case "trunkForwardBend":
            currentAnimation = animateTrunkForwardBend();
            break;
        case "hipCircles":
            currentAnimation = animateHipCircles();
            break;
            
        // Animations pour Respiration
        case "deepBreathing":
            currentAnimation = animateDeepBreathing();
            break;
        case "abdominalBreathing":
            currentAnimation = animateAbdominalBreathing();
            break;
        case "rhythmicBreathing":
            currentAnimation = animateRhythmicBreathing();
            break;
        case "breathWithArms":
            currentAnimation = animateBreathWithArms();
            break;
            
        // Animations pour Flexibilité
        case "armStretches":
            currentAnimation = animateArmStretches();
            break;
        case "hamstringStretch":
            currentAnimation = animateHamstringStretch();
            break;
        case "crossedLegStretch":
            currentAnimation = animateCrossedLegStretch();
            break;
        case "kneeToChest":
            currentAnimation = animateKneeToChest();
            break;
            
        // Animation par défaut si aucun type spécifique n'est reconnu
        default:
            // Utiliser l'animation basée sur la catégorie comme fallback
            if (exercise.category === 'Bradykinésie') {
                currentAnimation = animateBradykinesia();
            } else if (exercise.category.includes('Bras') || exercise.category.includes('épaules')) {
                currentAnimation = animateArmsAndShoulders();
            } else if (exercise.category.includes('quilibre')) {
                currentAnimation = animateBalance();
            } else if (exercise.category.includes('Jambes') || exercise.category.includes('pieds')) {
                currentAnimation = animateLegsAndFeet();
            } else if (exercise.category.includes('Tête') || exercise.category.includes('cou')) {
                currentAnimation = animateHeadAndNeck();
            } else if (exercise.category === 'Tronc') {
                currentAnimation = animateTrunk();
            } else if (exercise.category.includes('Respiration')) {
                currentAnimation = animateBreathing();
            } else if (exercise.category.includes('Flexibilit')) {
                currentAnimation = animateFlexibility();
            } else {
                currentAnimation = animateGeneral();
            }
    }
    
    return currentAnimation;
}

// ================== ANIMATIONS SPÉCIFIQUES ==================

/**
 * Animation pour donner des coups de pied alternés
 */
function animateKickingLegs() {
    let startTime = null;
    const duration = 3000; // 3 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Animer le mouvement de coup de pied - jambes alternées
        const leftLegPhase = progress < 0.5 ? progress * 2 : 2 - progress * 2;
        const rightLegPhase = progress < 0.5 ? 0 : (progress - 0.5) * 2;
        
        // Mouvement de la jambe gauche - coup de pied vers l'avant
        const leftKneeX = 100 - 20 * leftLegPhase;
        const leftKneeY = 150 + 80 * (1 - leftLegPhase * 0.5);
        const leftFootX = leftKneeX - 10 - 40 * leftLegPhase;
        const leftFootY = leftKneeY + 80 - 50 * leftLegPhase;
        
        document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
        document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
        document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
        document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
        document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
        document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
        
        // Mouvement de la jambe droite - ne bouge que dans la seconde moitié de l'animation
        if (progress >= 0.5) {
            const rightKneeX = 100 + 20 * rightLegPhase;
            const rightKneeY = 150 + 80 * (1 - rightLegPhase * 0.5);
            const rightFootX = rightKneeX + 10 + 40 * rightLegPhase;
            const rightFootY = rightKneeY + 80 - 50 * rightLegPhase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
        } else {
            // Réinitialiser la jambe droite en position debout
            document.getElementById('right-upper-leg').setAttribute('x2', '120');
            document.getElementById('right-upper-leg').setAttribute('y2', '230');
            document.getElementById('right-lower-leg').setAttribute('x1', '120');
            document.getElementById('right-lower-leg').setAttribute('y1', '230');
            document.getElementById('right-lower-leg').setAttribute('x2', '130');
            document.getElementById('right-lower-leg').setAttribute('y2', '310');
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour lever les genoux en marchant
 */
function animateKneeRaises() {
    let startTime = null;
    const duration = 2000; // 2 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Animation pour la marche avec genoux levés
        if (progress < 0.5) {
            // Premier demi-cycle: jambe gauche levée, jambe droite au sol
            const phase = progress * 2; // 0 à 1
            
            // Jambe gauche levée
            const leftKneeX = 100 - 15 * phase;
            const leftKneeY = 230 - 70 * phase;
            const leftFootX = leftKneeX - 10;
            const leftFootY = leftKneeY + 30;
            
            document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
            document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
            document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
            // Jambe droite au sol
            document.getElementById('right-upper-leg').setAttribute('x2', '120');
            document.getElementById('right-upper-leg').setAttribute('y2', '230');
            document.getElementById('right-lower-leg').setAttribute('x1', '120');
            document.getElementById('right-lower-leg').setAttribute('y1', '230');
            document.getElementById('right-lower-leg').setAttribute('x2', '130');
            document.getElementById('right-lower-leg').setAttribute('y2', '310');
            
        } else {
            // Second demi-cycle: jambe droite levée, jambe gauche au sol
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Jambe droite levée
            const rightKneeX = 100 + 15 * phase;
            const rightKneeY = 230 - 70 * phase;
            const rightFootX = rightKneeX + 10;
            const rightFootY = rightKneeY + 30;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
            // Jambe gauche au sol
            document.getElementById('left-upper-leg').setAttribute('x2', '80');
            document.getElementById('left-upper-leg').setAttribute('y2', '230');
            document.getElementById('left-lower-leg').setAttribute('x1', '80');
            document.getElementById('left-lower-leg').setAttribute('y1', '230');
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
        }
        
        // Ajouter le balancement des bras en opposition avec les jambes
        if (progress < 0.5) {
            const armPhase = progress * 2;
            
            // Bras droit vers l'avant
            document.getElementById('right-upper-arm').setAttribute('x2', 130 - 20 * armPhase);
            document.getElementById('right-upper-arm').setAttribute('y2', 120 - 10 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 - 20 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y1', 120 - 10 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('x2', 150 - 30 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y2', 150 - 20 * armPhase);
            
            // Bras gauche vers l'arrière
            document.getElementById('left-upper-arm').setAttribute('x2', 70 + 10 * armPhase);
            document.getElementById('left-upper-arm').setAttribute('y2', 120 - 5 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 + 10 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y1', 120 - 5 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('x2', 50 + 20 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y2', 150 - 10 * armPhase);
        } else {
            const armPhase = (progress - 0.5) * 2;
            
            // Bras gauche vers l'avant
            document.getElementById('left-upper-arm').setAttribute('x2', 70 - 20 * armPhase);
            document.getElementById('left-upper-arm').setAttribute('y2', 120 - 10 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 - 20 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y1', 120 - 10 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('x2', 50 - 30 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y2', 150 - 20 * armPhase);
            
            // Bras droit vers l'arrière
            document.getElementById('right-upper-arm').setAttribute('x2', 130 + 10 * armPhase);
            document.getElementById('right-upper-arm').setAttribute('y2', 120 - 5 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 + 10 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y1', 120 - 5 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('x2', 150 + 20 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y2', 150 - 10 * armPhase);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour lever lentement une jambe tendue
 */
function animateLegRaises() {
    let startTime = null;
    const duration = 4000; // 4 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        if (progress < 0.5) {
            // Première moitié: lever la jambe gauche
            const upPhase = progress * 2; // 0 à 1
            
            // Lever lentement la jambe gauche tendue
            const leftKneeX = 80 - 10 * upPhase;
            const leftKneeY = 230 - 50 * upPhase;
            const leftFootX = 70 - 20 * upPhase;
            const leftFootY = 310 - 150 * upPhase;
            
            document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
            document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
            document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
        } else {
            // Seconde moitié: lever la jambe droite
            const upPhase = (progress - 0.5) * 2; // 0 à 1
            
            // Remettre la jambe gauche en position initiale
            document.getElementById('left-upper-leg').setAttribute('x2', '80');
            document.getElementById('left-upper-leg').setAttribute('y2', '230');
            document.getElementById('left-lower-leg').setAttribute('x1', '80');
            document.getElementById('left-lower-leg').setAttribute('y1', '230');
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
            
            // Lever lentement la jambe droite tendue
            const rightKneeX = 120 + 10 * upPhase;
            const rightKneeY = 230 - 50 * upPhase;
            const rightFootX = 130 + 20 * upPhase;
            const rightFootY = 310 - 150 * upPhase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour le balancement des bras en marchant
 */
function animateArmSwing() {
    let startTime = null;
    const duration = 3000; // 3 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Simuler un balancement de bras lent et délibéré
        const phase = Math.sin(progress * Math.PI * 2);
        
        // Bras gauche
        const leftShoulderX = 100;
        const leftShoulderY = 90;
        const leftElbowX = leftShoulderX - 30 - 15 * phase;
        const leftElbowY = leftShoulderY + 30;
        const leftHandX = leftElbowX - 20 - 10 * phase;
        const leftHandY = leftElbowY + 30;
        
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        // Bras droit (en opposition de phase)
        const rightShoulderX = 100;
        const rightShoulderY = 90;
        const rightElbowX = rightShoulderX + 30 + 15 * phase;
        const rightElbowY = rightShoulderY + 30;
        const rightHandX = rightElbowX + 20 + 10 * phase;
        const rightHandY = rightElbowY + 30;
        
        document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
        document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
        document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x2', rightHandX);
        document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
        
        // Léger mouvement des jambes pour simuler la marche
        const legPhase = Math.sin(progress * Math.PI * 2) * 0.5;
        
        const leftKneeX = 80 + 5 * legPhase;
        const leftFootX = 70 + 10 * legPhase;
        
        document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
        document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
        document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
        
        const rightKneeX = 120 - 5 * legPhase;
        const rightFootX = 130 - 10 * legPhase;
        
        document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
        document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
        document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

// =======================================================
// Conservez les fonctions d'animation par catégorie pour le fallback

/**
 * Animation pour la bradykinésie (mouvements lents)
 */
function animateBradykinesia() {
    // Code existant
    return animateKickingLegs(); // Utiliser l'animation de coups de pied comme fallback
}

/**
 * Animation pour les exercices des bras et des épaules
 */
function animateArmsAndShoulders() {
    // Code existant
    let startTime = null;
    const duration = 4000; // 4 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Rotation des épaules et levée des bras
        const phase = Math.sin(progress * Math.PI * 2);
        
        // Mouvement du bras gauche
        const leftShoulderX = 100;
        const leftShoulderY = 90;
        const leftElbowX = leftShoulderX - 30 + 10 * phase;
        const leftElbowY = leftShoulderY - 20 * phase + 30;
        const leftHandX = leftElbowX - 20 - 10 * phase;
        const leftHandY = leftElbowY + 30 - 20 * phase;
        
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        // Mouvement du bras droit (phase opposée)
        const rightShoulderX = 100;
        const rightShoulderY = 90;
        const rightElbowX = rightShoulderX + 30 - 10 * phase;
        const rightElbowY = rightShoulderY + 20 * phase + 30;
        const rightHandX = rightElbowX + 20 + 10 * phase;
        const rightHandY = rightElbowY + 30 - 20 * phase;
        
        document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
        document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
        document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x2', rightHandX);
        document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les exercices des jambes et des pieds
 */
function animateLegsAndFeet() {
    // Code existant
    let startTime = null;
    const duration = 3000; // 3 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Simuler le lever et l'abaissement des jambes
        const leftPhase = Math.sin(progress * Math.PI * 2);
        const rightPhase = Math.sin((progress + 0.5) * Math.PI * 2); // Phase opposée
        
        // Jambe gauche
        const leftKneeX = 100 - 20 - 5 * leftPhase;
        const leftKneeY = 230 - 50 * Math.max(0, leftPhase);
        const leftFootX = leftKneeX - 10 - 5 * leftPhase;
        const leftFootY = leftKneeY + 80 - 20 * Math.max(0, leftPhase);
        
        document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
        document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
        document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
        document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
        document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
        document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
        
        // Jambe droite
        const rightKneeX = 100 + 20 + 5 * rightPhase;
        const rightKneeY = 230 - 50 * Math.max(0, rightPhase);
        const rightFootX = rightKneeX + 10 + 5 * rightPhase;
        const rightFootY = rightKneeY + 80 - 20 * Math.max(0, rightPhase);
        
        document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
        document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
        document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
        document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
        document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
        document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les exercices d'équilibre
 */
function animateBalance() {
    // Code existant
    return animateOneLegStand(); // Utiliser l'animation sur une jambe comme fallback
}

/**
 * Animation pour se tenir sur une jambe
 */
function animateOneLegStand() {
    let startTime = null;
    const duration = 5000; // 5 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Simuler l'équilibre sur une jambe
        if (progress < 0.5) {
            // Équilibre sur la jambe droite
            const phase = progress * 2; // 0 à 1
            
            // Lever la jambe gauche
            const leftKneeX = 100 - 10 - 10 * phase;
            const leftKneeY = 230 - 40 * phase;
            const leftFootX = leftKneeX - 20 * phase;
            const leftFootY = leftKneeY + 30;
            
            document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
            document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
            document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
            // Bras écartés pour l'équilibre
            const armPhase = phase * 0.7;
            document.getElementById('left-upper-arm').setAttribute('x2', 70 - 20 * armPhase);
            document.getElementById('left-upper-arm').setAttribute('y2', 90);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 - 20 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y1', 90);
            document.getElementById('left-lower-arm').setAttribute('x2', 50 - 30 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y2', 90);
            
            document.getElementById('right-upper-arm').setAttribute('x2', 130 + 20 * armPhase);
            document.getElementById('right-upper-arm').setAttribute('y2', 90);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 + 20 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y1', 90);
            document.getElementById('right-lower-arm').setAttribute('x2', 150 + 30 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y2', 90);
            
        } else {
            // Équilibre sur la jambe gauche
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Lever la jambe droite
            const rightKneeX = 100 + 10 + 10 * phase;
            const rightKneeY = 230 - 40 * phase;
            const rightFootX = rightKneeX + 20 * phase;
            const rightFootY = rightKneeY + 30;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
            // Réinitialiser la jambe gauche en position debout
            document.getElementById('left-upper-leg').setAttribute('x2', '80');
            document.getElementById('left-upper-leg').setAttribute('y2', '230');
            document.getElementById('left-lower-leg').setAttribute('x1', '80');
            document.getElementById('left-lower-leg').setAttribute('y1', '230');
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
            
            // Bras écartés pour l'équilibre
            const armPhase = phase * 0.7;
            document.getElementById('left-upper-arm').setAttribute('x2', 70 - 20 * armPhase);
            document.getElementById('left-upper-arm').setAttribute('y2', 90);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 - 20 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y1', 90);
            document.getElementById('left-lower-arm').setAttribute('x2', 50 - 30 * armPhase);
            document.getElementById('left-lower-arm').setAttribute('y2', 90);
            
            document.getElementById('right-upper-arm').setAttribute('x2', 130 + 20 * armPhase);
            document.getElementById('right-upper-arm').setAttribute('y2', 90);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 + 20 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y1', 90);
            document.getElementById('right-lower-arm').setAttribute('x2', 150 + 30 * armPhase);
            document.getElementById('right-lower-arm').setAttribute('y2', 90);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les exercices de la tête et du cou
 */
function animateHeadAndNeck() {
    // Code existant
    return animateHeadTurns(); // Utiliser l'animation de rotation de tête comme fallback
}

/**
 * Animation pour tourner la tête d'un côté à l'autre
 */
function animateHeadTurns() {
    let startTime = null;
    const duration = 3000; // 3 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Rotation de la tête d'un côté à l'autre
        const headX = 100 + 20 * Math.sin(progress * Math.PI * 2);
        
        // Mettre à jour la position de la tête
        document.getElementById('head').setAttribute('cx', headX);
        
        // Mettre à jour le haut de la colonne vertébrale pour correspondre au mouvement de la tête
        document.getElementById('spine').setAttribute('x1', 100 + (headX - 100) * 0.3);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les exercices du tronc
 */
function animateTrunk() {
    // Code existant
    return animateTrunkRotation(); // Utiliser l'animation de rotation du tronc comme fallback
}

/**
 * Animation pour les exercices de respiration
 */
function animateBreathing() {
    // Code existant
    return animateDeepBreathing(); // Utiliser l'animation de respiration profonde comme fallback
}

/**
 * Animation pour les exercices de flexibilité
 */
function animateFlexibility() {
    // Code existant
    let startTime = null;
    const duration = 4000; // 4 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Simuler un mouvement d'étirement
        const stretchPhase = Math.sin(progress * Math.PI) * 0.8; // 0 à 1 à 0
        
        // Se pencher en avant (flexibilité du tronc)
        const hipX = 100;
        const hipY = 150;
        const spineTopX = hipX;
        const spineTopY = 70 + 20 * stretchPhase;
        const headX = spineTopX;
        const headY = 50 + 20 * stretchPhase;
        
        // Mettre à jour la position de la colonne vertébrale et de la tête
        document.getElementById('spine').setAttribute('x1', spineTopX);
        document.getElementById('spine').setAttribute('y1', spineTopY);
        document.getElementById('head').setAttribute('cx', headX);
        document.getElementById('head').setAttribute('cy', headY);
        
        // Déplacer les bras vers l'avant dans un étirement
        const shoulderX = 100;
        const shoulderY = spineTopY + 20;
        
        // Bras gauche étiré vers le bas
        const leftElbowX = shoulderX - 20 - 10 * stretchPhase;
        const leftElbowY = shoulderY + 20 + 20 * stretchPhase;
        const leftHandX = leftElbowX - 20 - 10 * stretchPhase;
        const leftHandY = leftElbowY + 20 + 30 * stretchPhase;
        
        document.getElementById('left-upper-arm').setAttribute('x1', shoulderX);
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        // Bras droit étiré vers le bas
        const rightElbowX = shoulderX + 20 + 10 * stretchPhase;
        const rightElbowY = shoulderY + 20 + 20 * stretchPhase;
        const rightHandX = rightElbowX + 20 + 10 * stretchPhase;
        const rightHandY = rightElbowY + 20 + 30 * stretchPhase;
        
        document.getElementById('right-upper-arm').setAttribute('x1', shoulderX);
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
        document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
        document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x2', rightHandX);
        document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation générale pour les autres catégories d'exercices
 */
function animateGeneral() {
    // Code existant
    let startTime = null;
    const duration = 4000; // 4 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Mouvement corporel simple pouvant représenter divers exercices
        const phase = Math.sin(progress * Math.PI * 2);
        
        // Les bras bougent dans un mouvement d'exercice général
        const armPhaseLeft = Math.max(0, phase);
        const armPhaseRight = Math.max(0, -phase);
        
        // Mouvement du bras gauche
        const leftElbowX = 100 - 30 - 10 * armPhaseLeft;
        const leftElbowY = 90 + 30 - 20 * armPhaseLeft;
        const leftHandX = leftElbowX - 20 - 10 * armPhaseLeft;
        const leftHandY = leftElbowY + 30 - 40 * armPhaseLeft;
        
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        // Mouvement du bras droit
        const rightElbowX = 100 + 30 + 10 * armPhaseRight;
        const rightElbowY = 90 + 30 - 20 * armPhaseRight;
        const rightHandX = rightElbowX + 20 + 10 * armPhaseRight;
        const rightHandY = rightElbowY + 30 - 40 * armPhaseRight;
        
        document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
        document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
        document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x2', rightHandX);
        document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
        
        // Léger mouvement des jambes
        const legPhase = Math.abs(phase) * 0.3;
        
        // Jambe gauche
        document.getElementById('left-upper-leg').setAttribute('x2', 80 - 10 * legPhase);
        document.getElementById('left-upper-leg').setAttribute('y2', 230 - 20 * legPhase);
        document.getElementById('left-lower-leg').setAttribute('x1', 80 - 10 * legPhase);
        document.getElementById('left-lower-leg').setAttribute('y1', 230 - 20 * legPhase);
        
        // Jambe droite
        document.getElementById('right-upper-leg').setAttribute('x2', 120 + 10 * legPhase);
        document.getElementById('right-upper-leg').setAttribute('y2', 230 - 20 * legPhase);
        document.getElementById('right-lower-leg').setAttribute('x1', 120 + 10 * legPhase);
        document.getElementById('right-lower-leg').setAttribute('y1', 230 - 20 * legPhase);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

// =======================================================
// Créez ici toutes les autres fonctions d'animation spécifiques
// comme animateArmRaises, animateHeadNods, etc.
// selon les types définis dans data.js.
// =======================================================

/**
 * Animation pour lever les bras
 */
function animateArmRaises() {
    let startTime = null;
    const duration = 4000; // 4 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Mouvement des bras au-dessus de la tête puis sur les côtés
        if (progress < 0.5) {
            // Lever les bras au-dessus de la tête
            const phase = progress * 2; // 0 à 1
            
            // Bras gauche
            const leftElbowX = 100 - 20 * (1 - phase);
            const leftElbowY = 90 - 30 * phase;
            const leftHandX = leftElbowX - 20 + 40 * phase;
            const leftHandY = leftElbowY - 30 * phase;
            
            document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
            document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
            document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
            document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
            document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
            document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
            
            // Bras droit
            const rightElbowX = 100 + 20 * (1 - phase);
            const rightElbowY = 90 - 30 * phase;
            const rightHandX = rightElbowX + 20 - 40 * phase;
            const rightHandY = rightElbowY - 30 * phase;
            
            document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
            document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
            document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
            document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
            document.getElementById('right-lower-arm').setAttribute('x2', rightHandX);
            document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
            
        } else {
            // Abaisser les bras sur les côtés
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Bras gauche
            const leftElbowX = 100 - 20 * phase;
            const leftElbowY = 60 + 60 * phase;
            const leftHandX = leftElbowX + 20 - 40 * phase;
            const leftHandY = leftElbowY - 30 + 60 * phase;
            
            document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
            document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
            document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
            document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
            document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
            document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
            
            // Bras droit
            const rightElbowX = 100 + 20 * phase;
            const rightElbowY = 60 + 60 * phase;
            const rightHandX = rightElbowX - 20 + 40 * phase;
            const rightHandY = rightElbowY - 30 + 60 * phase;
            
            document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
            document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
            document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
            document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
            document.getElementById('right-lower-arm').setAttribute('x2', rightHandX);
            document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour la respiration profonde
 */
function animateDeepBreathing() {
    let startTime = null;
    const duration = 6000; // 6 secondes par cycle (respiration lente)
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Cycle de respiration: 0-0.4 inspiration, 0.4-1 expiration
        let breathPhase;
        if (progress < 0.4) {
            // Inspiration (0 à 1)
            breathPhase = progress / 0.4;
        } else {
            // Expiration (1 à 0)
            breathPhase = 1 - ((progress - 0.4) / 0.6);
        }
        
        // Expansion de la cage thoracique
        const expansion = 5 * breathPhase;
        
        // Mouvement subtil des épaules
        const shoulderY = 90 - 3 * breathPhase;
        
        // Mise à jour des bras pour suivre le mouvement des épaules
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        
        // Expansion légère de la colonne vertébrale
        document.getElementById('spine').setAttribute('x2', 100 - expansion);
        document.getElementById('left-upper-leg').setAttribute('x1', 100 - expansion);
        document.getElementById('right-upper-leg').setAttribute('x1', 100 - expansion);
        
        // Léger mouvement des épaules vers le haut pendant l'inspiration
        document.getElementById('left-upper-arm').setAttribute('x2', 70 - expansion);
        document.getElementById('left-lower-arm').setAttribute('x1', 70 - expansion);
        document.getElementById('right-upper-arm').setAttribute('x2', 130 + expansion);
        document.getElementById('right-lower-arm').setAttribute('x1', 130 + expansion);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

// Ajoutez d'autres fonctions d'animation spécifiques ici...
