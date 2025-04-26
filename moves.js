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
/**
 * Animation pour faire des cercles avec les bras
 */
function animateArmCircles() {
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
        
        // Mouvement circulaire des bras
        const angle = progress * Math.PI * 2;
        const radius = 40; // Rayon du cercle
        
        // Bras gauche
        const leftShoulderX = 100;
        const leftShoulderY = 90;
        const leftElbowX = leftShoulderX - 20 + radius * Math.cos(angle);
        const leftElbowY = leftShoulderY + radius * Math.sin(angle);
        const leftHandX = leftElbowX - 20 + radius/2 * Math.cos(angle);
        const leftHandY = leftElbowY + radius/2 * Math.sin(angle);
        
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        // Bras droit (décalé de 180 degrés)
        const rightShoulderX = 100;
        const rightShoulderY = 90;
        const rightElbowX = rightShoulderX + 20 + radius * Math.cos(angle + Math.PI);
        const rightElbowY = rightShoulderY + radius * Math.sin(angle + Math.PI);
        const rightHandX = rightElbowX + 20 + radius/2 * Math.cos(angle + Math.PI);
        const rightHandY = rightElbowY + radius/2 * Math.sin(angle + Math.PI);
        
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
 * Animation pour faire des cercles avec les poignets
 */
function animateWristCircles() {
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
        
        // Angle pour les cercles des poignets
        const angle = progress * Math.PI * 2;
        const radius = 15; // Rayon du cercle du poignet
        
        // Bras tendus devant
        // Bras gauche position fixe, seule la main fait des cercles
        const leftElbowX = 85;
        const leftElbowY = 100;
        const leftHandX = leftElbowX - 20 + radius * Math.cos(angle);
        const leftHandY = leftElbowY + radius * Math.sin(angle);
        
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x2', leftHandX);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        // Bras droit position fixe, seule la main fait des cercles
        const rightElbowX = 115;
        const rightElbowY = 100;
        const rightHandX = rightElbowX + 20 + radius * Math.cos(angle);
        const rightHandY = rightElbowY + radius * Math.sin(angle);
        
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
 * Animation pour hausser les épaules
 */
function animateShoulderShrugs() {
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
        
        // Mouvement de hausser les épaules (haut-bas)
        let shoulderY;
        
        if (progress < 0.4) {
            // Monter les épaules
            shoulderY = 90 - 15 * (progress / 0.4);
        } else if (progress < 0.6) {
            // Maintenir les épaules hautes
            shoulderY = 75;
        } else {
            // Descendre les épaules
            shoulderY = 75 + 15 * ((progress - 0.6) / 0.4);
        }
        
        // Mettre à jour la position des bras pour suivre les épaules
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        
        // Ajuster la position des coudes et des mains pour qu'ils suivent les épaules
        const leftElbowY = shoulderY + 30;
        const rightElbowY = shoulderY + 30;
        const leftHandY = leftElbowY + 30;
        const rightHandY = rightElbowY + 30;
        
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('y2', leftHandY);
        
        document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('y2', rightHandY);
        
        // Déplacer légèrement la tête pour montrer le mouvement des épaules
        document.getElementById('head').setAttribute('cy', 50 - 5 * (1 - (shoulderY - 75) / 15));
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour la marche en tandem (talon-orteil)
 */
function animateTandemWalk() {
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
        
        if (progress < 0.5) {
            // Première moitié: pied droit devant le gauche
            const phase = progress * 2; // 0 à 1
            
            // Jambe droite avance
            const rightKneeX = 100 + 5 + 10 * phase;
            const rightKneeY = 230 - 20 * Math.sin(phase * Math.PI);
            const rightFootX = rightKneeX + 10 + 10 * phase;
            const rightFootY = 310;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
            // Jambe gauche reste en place
            document.getElementById('left-upper-leg').setAttribute('x2', '80');
            document.getElementById('left-upper-leg').setAttribute('y2', '230');
            document.getElementById('left-lower-leg').setAttribute('x1', '80');
            document.getElementById('left-lower-leg').setAttribute('y1', '230');
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
            
            // Balancement des bras
            document.getElementById('left-upper-arm').setAttribute('x2', 70 + 10 * phase);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 + 10 * phase);
            document.getElementById('right-upper-arm').setAttribute('x2', 130 - 10 * phase);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 - 10 * phase);
            
        } else {
            // Seconde moitié: pied gauche devant le droit
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Jambe gauche avance
            const leftKneeX = 100 - 5 - 10 * phase;
            const leftKneeY = 230 - 20 * Math.sin(phase * Math.PI);
            const leftFootX = leftKneeX - 10 - 10 * phase;
            const leftFootY = 310;
            
            document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
            document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
            document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
            // Jambe droite en place
            document.getElementById('right-upper-leg').setAttribute('x2', '120');
            document.getElementById('right-upper-leg').setAttribute('y2', '230');
            document.getElementById('right-lower-leg').setAttribute('x1', '120');
            document.getElementById('right-lower-leg').setAttribute('y1', '230');
            document.getElementById('right-lower-leg').setAttribute('x2', '130');
            document.getElementById('right-lower-leg').setAttribute('y2', '310');
            
            // Balancement des bras
            document.getElementById('left-upper-arm').setAttribute('x2', 70 - 10 * phase);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 - 10 * phase);
            document.getElementById('right-upper-arm').setAttribute('x2', 130 + 10 * phase);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 + 10 * phase);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour le transfert de poids d'un pied à l'autre
 */
function animateWeightShift() {
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
        
        // Position du corps durant le transfert de poids
        const shiftAngle = Math.sin(progress * Math.PI * 2) * 15; // -15° à +15°
        
        // Déplacer tout le corps
        const bodyShiftX = 100 + shiftAngle;
        
        // Tête
        document.getElementById('head').setAttribute('cx', bodyShiftX);
        
        // Colonne vertébrale
        document.getElementById('spine').setAttribute('x1', bodyShiftX);
        document.getElementById('spine').setAttribute('x2', bodyShiftX);
        
        // Point d'origine des bras
        document.getElementById('left-upper-arm').setAttribute('x1', bodyShiftX);
        document.getElementById('right-upper-arm').setAttribute('x1', bodyShiftX);
        
        // Bras
        const leftArmPhase = Math.max(0, -shiftAngle) / 15; // 0 à 1 quand on va à gauche
        const rightArmPhase = Math.max(0, shiftAngle) / 15; // 0 à 1 quand on va à droite
        
        document.getElementById('left-upper-arm').setAttribute('x2', bodyShiftX - 30 - 10 * leftArmPhase);
        document.getElementById('left-lower-arm').setAttribute('x1', bodyShiftX - 30 - 10 * leftArmPhase);
        document.getElementById('left-lower-arm').setAttribute('x2', bodyShiftX - 50 - 20 * leftArmPhase);
        
        document.getElementById('right-upper-arm').setAttribute('x2', bodyShiftX + 30 + 10 * rightArmPhase);
        document.getElementById('right-lower-arm').setAttribute('x1', bodyShiftX + 30 + 10 * rightArmPhase);
        document.getElementById('right-lower-arm').setAttribute('x2', bodyShiftX + 50 + 20 * rightArmPhase);
        
        // Point d'origine des jambes
        document.getElementById('left-upper-leg').setAttribute('x1', bodyShiftX);
        document.getElementById('right-upper-leg').setAttribute('x1', bodyShiftX);
        
        // Jambes
        document.getElementById('left-upper-leg').setAttribute('x2', bodyShiftX - 20 + 10 * (shiftAngle / 15));
        document.getElementById('left-lower-leg').setAttribute('x1', bodyShiftX - 20 + 10 * (shiftAngle / 15));
        document.getElementById('left-lower-leg').setAttribute('x2', bodyShiftX - 30 + 15 * (shiftAngle / 15));
        
        document.getElementById('right-upper-leg').setAttribute('x2', bodyShiftX + 20 - 10 * (shiftAngle / 15));
        document.getElementById('right-lower-leg').setAttribute('x1', bodyShiftX + 20 - 10 * (shiftAngle / 15));
        document.getElementById('right-lower-leg').setAttribute('x2', bodyShiftX + 30 - 15 * (shiftAngle / 15));
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour faire un pas en avant puis revenir
 */
function animateStepForward() {
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
        
        if (progress < 0.25) {
            // Première phase: lever la jambe droite
            const phase = progress * 4; // 0 à 1
            
            // Jambe droite se lève
            const rightKneeX = 120 + 15 * phase;
            const rightKneeY = 230 - 30 * phase;
            const rightFootX = 130 + 25 * phase;
            const rightFootY = 310 - 20 * phase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
        } else if (progress < 0.5) {
            // Deuxième phase: poser la jambe droite devant
            const phase = (progress - 0.25) * 4; // 0 à 1
            
            // Jambe droite s'abaisse en position avancée
            const rightKneeX = 135;
            const rightKneeY = 200 + 30 * phase;
            const rightFootX = 155;
            const rightFootY = 290 + 20 * phase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
        } else if (progress < 0.75) {
            // Troisième phase: lever la jambe droite pour revenir
            const phase = (progress - 0.5) * 4; // 0 à 1
            
            // Jambe droite se lève à nouveau
            const rightKneeX = 135 - 15 * phase;
            const rightKneeY = 230 - 30 * phase;
            const rightFootX = 155 - 25 * phase;
            const rightFootY = 310 - 20 * phase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
        } else {
            // Quatrième phase: reposer la jambe droite en position initiale
            const phase = (progress - 0.75) * 4; // 0 à 1
            
            // Jambe droite revient à la position initiale
            const rightKneeX = 120;
            const rightKneeY = 200 + 30 * phase;
            const rightFootX = 130;
            const rightFootY = 290 + 20 * phase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
        }
        
        // Bras en opposition
        const armPhase = Math.sin(progress * Math.PI * 2) * 0.5;
        document.getElementById('left-upper-arm').setAttribute('x2', 70 + 15 * armPhase);
        document.getElementById('left-lower-arm').setAttribute('x1', 70 + 15 * armPhase);
        document.getElementById('right-upper-arm').setAttribute('x2', 130 - 15 * armPhase);
        document.getElementById('right-lower-arm').setAttribute('x1', 130 - 15 * armPhase);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour lever et abaisser les pieds en alternance
 */
function animateFootLifts() {
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
        
        if (progress < 0.5) {
            // Première moitié: lever le pied gauche
            const phase = progress * 2; // 0 à 1
            
            // Lever le pied gauche
            const leftKneeY = 230;
            const leftFootX = 70;
            const leftFootY = 310 - 40 * Math.sin(phase * Math.PI);
            
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
            // Pied droit au sol
            document.getElementById('right-lower-leg').setAttribute('x2', '130');
            document.getElementById('right-lower-leg').setAttribute('y2', '310');
            
        } else {
            // Seconde moitié: lever le pied droit
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Pied gauche au sol
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
            
            // Lever le pied droit
            const rightKneeY = 230;
            const rightFootX = 130;
            const rightFootY = 310 - 40 * Math.sin(phase * Math.PI);
            
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour monter sur la pointe des pieds
 */
function animateCalfRaises() {
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
        
        let elevationY;
        
        if (progress < 0.4) {
            // Monter sur la pointe des pieds
            elevationY = 15 * (progress / 0.4);
        } else if (progress < 0.6) {
            // Maintenir la position haute
            elevationY = 15;
        } else {
            // Redescendre lentement
            elevationY = 15 * (1 - ((progress - 0.6) / 0.4));
        }
        
        // Ajuster la hauteur de tout le corps
        // Tête
        document.getElementById('head').setAttribute('cy', 50 - elevationY);
        
        // Colonne vertébrale
        document.getElementById('spine').setAttribute('y1', 70 - elevationY);
        document.getElementById('spine').setAttribute('y2', 150 - elevationY);
        
        // Bras
        document.getElementById('left-upper-arm').setAttribute('y1', 90 - elevationY);
        document.getElementById('left-upper-arm').setAttribute('y2', 120 - elevationY);
        document.getElementById('left-lower-arm').setAttribute('y1', 120 - elevationY);
        document.getElementById('left-lower-arm').setAttribute('y2', 150 - elevationY);
        
        document.getElementById('right-upper-arm').setAttribute('y1', 90 - elevationY);
        document.getElementById('right-upper-arm').setAttribute('y2', 120 - elevationY);
        document.getElementById('right-lower-arm').setAttribute('y1', 120 - elevationY);
        document.getElementById('right-lower-arm').setAttribute('y2', 150 - elevationY);
        
        // Jambes
        document.getElementById('left-upper-leg').setAttribute('y1', 150 - elevationY);
        document.getElementById('left-upper-leg').setAttribute('y2', 230 - elevationY);
        document.getElementById('left-lower-leg').setAttribute('y1', 230 - elevationY);
        document.getElementById('left-lower-leg').setAttribute('y2', 310 - elevationY);
        
        document.getElementById('right-upper-leg').setAttribute('y1', 150 - elevationY);
        document.getElementById('right-upper-leg').setAttribute('y2', 230 - elevationY);
        document.getElementById('right-lower-leg').setAttribute('y1', 230 - elevationY);
        document.getElementById('right-lower-leg').setAttribute('y2', 310 - elevationY);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les rotations des chevilles
 */
function animateAnkleRotations() {
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
        
        // Angle pour la rotation des chevilles
        const angle = progress * Math.PI * 2;
        const radius = 12; // Rayon du cercle de cheville
        
        if (progress < 0.5) {
            // Rotation de la cheville gauche
            const leftFootX = 70 + radius * Math.cos(angle * 2);
            const leftFootY = 310 + radius * Math.sin(angle * 2);
            
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
            // Cheville droite immobile
            document.getElementById('right-lower-leg').setAttribute('x2', '130');
            document.getElementById('right-lower-leg').setAttribute('y2', '310');
            
        } else {
            // Rotation de la cheville droite
            const rightFootX = 130 + radius * Math.cos(angle * 2);
            const rightFootY = 310 + radius * Math.sin(angle * 2);
            
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
            // Cheville gauche immobile
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour écarter et rapprocher les orteils
 */
function animateToeSpreads() {
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
        
        // Mouvement des orteils (suggéré par un léger écartement des pieds)
        let spreadFactor;
        
        if (progress < 0.4) {
            // Écarter les orteils
            spreadFactor = (progress / 0.4) * 5;
        } else if (progress < 0.6) {
            // Maintenir écartés
            spreadFactor = 5;
        } else {
            // Rapprocher les orteils
            spreadFactor = 5 - ((progress - 0.6) / 0.4) * 5;
        }
        
        // Ajuster la position des pieds pour suggérer le mouvement des orteils
        document.getElementById('left-lower-leg').setAttribute('x2', 70 - spreadFactor);
        document.getElementById('right-lower-leg').setAttribute('x2', 130 + spreadFactor);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour incliner la tête vers l'avant et l'arrière
 */
function animateHeadNods() {
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
        
        // Mouvement de la tête vers l'avant et l'arrière
        const headY = 50 + 15 * Math.sin(progress * Math.PI * 2);
        
        // Mise à jour de la position de la tête
        document.getElementById('head').setAttribute('cy', headY);
        
        // Ajuster le haut de la colonne vertébrale
        document.getElementById('spine').setAttribute('y1', 70 + (headY - 50) * 0.5);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour incliner la tête d'un côté à l'autre
 */
function animateHeadTilts() {
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
        
        // Inclinaison de la tête d'un côté à l'autre
        const tiltX = 100 + 15 * Math.sin(progress * Math.PI * 2);
        const tiltY = 50 + Math.abs(Math.sin(progress * Math.PI * 2)) * 5;
        
        // Mise à jour de la position de la tête
        document.getElementById('head').setAttribute('cx', tiltX);
        document.getElementById('head').setAttribute('cy', tiltY);
        
        // Ajuster le haut de la colonne vertébrale
        document.getElementById('spine').setAttribute('x1', 100 + (tiltX - 100) * 0.3);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour faire des cercles avec la tête
 */
function animateHeadCircles() {
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
        
        // Mouvement circulaire de la tête
        const angle = progress * Math.PI * 2;
        const radius = 10;
        
        const headX = 100 + radius * Math.cos(angle);
        const headY = 50 + radius * Math.sin(angle);
        
        // Mise à jour de la position de la tête
        document.getElementById('head').setAttribute('cx', headX);
        document.getElementById('head').setAttribute('cy', headY);
        
        // Ajuster le haut de la colonne vertébrale pour suivre le mouvement de la tête
        document.getElementById('spine').setAttribute('x1', 100 + (headX - 100) * 0.3);
        document.getElementById('spine').setAttribute('y1', 70 + (headY - 50) * 0.3);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour la rotation du tronc
 */
function animateTrunkRotation() {
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
        
        // Rotation du tronc
        const rotateAngle = Math.sin(progress * Math.PI * 2) * 20; // -20° à 20°
        
        // Déplacer le haut du corps en fonction de l'angle
        document.getElementById('head').setAttribute('cx', 100 + rotateAngle);
        document.getElementById('spine').setAttribute('x1', 100 + rotateAngle * 0.7);
        
        // Bras suivent la rotation du tronc
        document.getElementById('left-upper-arm').setAttribute('x1', 100 + rotateAngle * 0.7);
        document.getElementById('right-upper-arm').setAttribute('x1', 100 + rotateAngle * 0.7);
        
        // Coudes et mains suivent
        const leftArmFactor = Math.max(0, -rotateAngle) / 20; // 0-1 quand rotation à gauche
        const rightArmFactor = Math.max(0, rotateAngle) / 20; // 0-1 quand rotation à droite
        
        document.getElementById('left-upper-arm').setAttribute('x2', 70 + rotateAngle * 0.7 - 20 * leftArmFactor);
        document.getElementById('left-lower-arm').setAttribute('x1', 70 + rotateAngle * 0.7 - 20 * leftArmFactor);
        document.getElementById('left-lower-arm').setAttribute('x2', 50 + rotateAngle * 0.7 - 30 * leftArmFactor);
        
        document.getElementById('right-upper-arm').setAttribute('x2', 130 + rotateAngle * 0.7 + 20 * rightArmFactor);
        document.getElementById('right-lower-arm').setAttribute('x1', 130 + rotateAngle * 0.7 + 20 * rightArmFactor);
        document.getElementById('right-lower-arm').setAttribute('x2', 150 + rotateAngle * 0.7 + 30 * rightArmFactor);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour se pencher sur le côté
 */
function animateLateralTrunkBend() {
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
        
        // Cycle de flexion: 0-0.5 à gauche, 0.5-1 à droite
        let bendPhase;
        if (progress < 0.5) {
            // Flexion à gauche
            bendPhase = -progress * 2; // -1 à 0
        } else {
            // Flexion à droite
            bendPhase = (progress - 0.5) * 2; // 0 à 1
        }
        
        // Flexion latérale du tronc
        const spineTopX = 100 + 20 * bendPhase;
        const headX = spineTopX + 5 * bendPhase;
        const headY = 50 + Math.abs(bendPhase) * 10;
        
        // Mise à jour de la position de la tête et de la colonne
        document.getElementById('head').setAttribute('cx', headX);
        document.getElementById('head').setAttribute('cy', headY);
        document.getElementById('spine').setAttribute('x1', spineTopX);
        
        // Bras du côté où on se penche s'abaisse, l'autre s'élève
        if (bendPhase < 0) { // Flexion à gauche
            // Bras gauche s'abaisse
            document.getElementById('left-upper-arm').setAttribute('x1', spineTopX);
            document.getElementById('left-upper-arm').setAttribute('x2', spineTopX - 30 - 10 * Math.abs(bendPhase));
            document.getElementById('left-upper-arm').setAttribute('y2', 120 + 20 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('x1', spineTopX - 30 - 10 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('y1', 120 + 20 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('x2', spineTopX - 50 - 15 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('y2', 150 + 30 * Math.abs(bendPhase));
            
            // Bras droit s'élève
            document.getElementById('right-upper-arm').setAttribute('x1', spineTopX);
            document.getElementById('right-upper-arm').setAttribute('x2', spineTopX + 30 - 5 * Math.abs(bendPhase));
            document.getElementById('right-upper-arm').setAttribute('y2', 120 - 30 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('x1', spineTopX + 30 - 5 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('y1', 120 - 30 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('x2', spineTopX + 50 - 10 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('y2', 150 - 60 * Math.abs(bendPhase));
            
        } else { // Flexion à droite
            // Bras droit s'abaisse
            document.getElementById('right-upper-arm').setAttribute('x1', spineTopX);
            document.getElementById('right-upper-arm').setAttribute('x2', spineTopX + 30 + 10 * Math.abs(bendPhase));
            document.getElementById('right-upper-arm').setAttribute('y2', 120 + 20 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('x1', spineTopX + 30 + 10 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('y1', 120 + 20 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('x2', spineTopX + 50 + 15 * Math.abs(bendPhase));
            document.getElementById('right-lower-arm').setAttribute('y2', 150 + 30 * Math.abs(bendPhase));
            
            // Bras gauche s'élève
            document.getElementById('left-upper-arm').setAttribute('x1', spineTopX);
            document.getElementById('left-upper-arm').setAttribute('x2', spineTopX - 30 + 5 * Math.abs(bendPhase));
            document.getElementById('left-upper-arm').setAttribute('y2', 120 - 30 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('x1', spineTopX - 30 + 5 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('y1', 120 - 30 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('x2', spineTopX - 50 + 10 * Math.abs(bendPhase));
            document.getElementById('left-lower-arm').setAttribute('y2', 150 - 60 * Math.abs(bendPhase));
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour se pencher en avant
 */
function animateTrunkForwardBend() {
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
        
        // Pencher en avant puis revenir
        let bendPhase;
        if (progress < 0.5) {
            // Pencher en avant
            bendPhase = progress * 2; // 0 à 1
        } else {
            // Revenir à la position initiale
            bendPhase = 1 - ((progress - 0.5) * 2); // 1 à 0
        }
        
        // Flexion avant du tronc
        const spineTopY = 70 + 30 * bendPhase;
        const headY = 50 + 60 * bendPhase;
        
        // Mise à jour de la position de la tête et de la colonne
        document.getElementById('head').setAttribute('cy', headY);
        document.getElementById('spine').setAttribute('y1', spineTopY);
        
        // Les bras suivent le mouvement
        const shoulderY = spineTopY + 20;
        
        // Bras gauche
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('left-upper-arm').setAttribute('y2', shoulderY + 30 + 20 * bendPhase);
        document.getElementById('left-lower-arm').setAttribute('y1', shoulderY + 30 + 20 * bendPhase);
        document.getElementById('left-lower-arm').setAttribute('y2', shoulderY + 60 + 40 * bendPhase);
        
        // Bras droit
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('right-upper-arm').setAttribute('y2', shoulderY + 30 + 20 * bendPhase);
        document.getElementById('right-lower-arm').setAttribute('y1', shoulderY + 30 + 20 * bendPhase);
        document.getElementById('right-lower-arm').setAttribute('y2', shoulderY + 60 + 40 * bendPhase);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour faire des cercles avec le bassin
 */
function animateHipCircles() {
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
        
        // Mouvement circulaire du bassin
        const angle = progress * Math.PI * 2;
        const radius = 15;
        
        const hipX = 100 + radius * Math.cos(angle);
        const hipY = 150 + radius * Math.sin(angle) * 0.5; // Ellipse plus plate verticalement
        
        // Mise à jour de la position du bassin (bas de la colonne)
        document.getElementById('spine').setAttribute('x2', hipX);
        document.getElementById('spine').setAttribute('y2', hipY);
        
        // Les jambes suivent le bassin
        document.getElementById('left-upper-leg').setAttribute('x1', hipX);
        document.getElementById('left-upper-leg').setAttribute('y1', hipY);
        document.getElementById('right-upper-leg').setAttribute('x1', hipX);
        document.getElementById('right-upper-leg').setAttribute('y1', hipY);
        
        // Compenser le mouvement circulaire pour les genoux
        document.getElementById('left-upper-leg').setAttribute('x2', 80 + (hipX - 100) * 0.7);
        document.getElementById('left-upper-leg').setAttribute('y2', 230 + (hipY - 150) * 0.7);
        document.getElementById('left-lower-leg').setAttribute('x1', 80 + (hipX - 100) * 0.7);
        document.getElementById('left-lower-leg').setAttribute('y1', 230 + (hipY - 150) * 0.7);
        
        document.getElementById('right-upper-leg').setAttribute('x2', 120 + (hipX - 100) * 0.7);
        document.getElementById('right-upper-leg').setAttribute('y2', 230 + (hipY - 150) * 0.7);
        document.getElementById('right-lower-leg').setAttribute('x1', 120 + (hipX - 100) * 0.7);
        document.getElementById('right-lower-leg').setAttribute('y1', 230 + (hipY - 150) * 0.7);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour la respiration abdominale
 */
function animateAbdominalBreathing() {
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
        
        // Cycle de respiration abdominale
        let breathPhase;
        if (progress < 0.4) {
            // Inspiration (0 à 1)
            breathPhase = progress / 0.4;
        } else {
            // Expiration (1 à 0)
            breathPhase = 1 - ((progress - 0.4) / 0.6);
        }
        
        // Expansion de l'abdomen (bas de la colonne)
        const expansion = 8 * breathPhase;
        
        // Expansion de l'abdomen en avant
        document.getElementById('spine').setAttribute('y2', 150 - expansion * 0.5);
        
        // Légère expansion de la cage thoracique
        document.getElementById('left-upper-arm').setAttribute('y1', 90 - 2 * breathPhase);
        document.getElementById('right-upper-arm').setAttribute('y1', 90 - 2 * breathPhase);
        
        // Les jambes suivent le mouvement du bassin
        document.getElementById('left-upper-leg').setAttribute('y1', 150 - expansion * 0.5);
        document.getElementById('right-upper-leg').setAttribute('y1', 150 - expansion * 0.5);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour la respiration rythmique (4-7-8)
 */
function animateRhythmicBreathing() {
    let startTime = null;
    const duration = 19000; // 19 secondes pour un cycle 4-7-8
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        let breathPhase;
        
        if (progress < 4/19) {
            // Phase d'inspiration (4 secondes)
            breathPhase = progress / (4/19);
        } else if (progress < 11/19) {
            // Phase de rétention (7 secondes)
            breathPhase = 1;
        } else {
            // Phase d'expiration (8 secondes)
            breathPhase = 1 - ((progress - 11/19) / (8/19));
        }
        
        // Expansion de la poitrine
        const expansion = 8 * breathPhase;
        
        // Mouvement de la poitrine
        document.getElementById('spine').setAttribute('x2', 100 - expansion * 0.5);
        document.getElementById('left-upper-leg').setAttribute('x1', 100 - expansion * 0.5);
        document.getElementById('right-upper-leg').setAttribute('x1', 100 - expansion * 0.5);
        
        // Mouvement des épaules
        document.getElementById('left-upper-arm').setAttribute('y1', 90 - 3 * breathPhase);
        document.getElementById('right-upper-arm').setAttribute('y1', 90 - 3 * breathPhase);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour la respiration avec mouvement des bras
 */
function animateBreathWithArms() {
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
        
        // Cycle inspiration/expiration
        let breathPhase;
        if (progress < 0.5) {
            // Inspiration (lever les bras)
            breathPhase = progress * 2; // 0 à 1
        } else {
            // Expiration (abaisser les bras)
            breathPhase = 1 - ((progress - 0.5) * 2); // 1 à 0
        }
        
        // Expansion de la poitrine pendant l'inspiration
        const expansion = 5 * breathPhase;
        
        // Lever les bras pendant l'inspiration
        const armRaiseY = 120 - 100 * breathPhase;
        const handRaiseY = 150 - 180 * breathPhase;
        
        // Bras gauche
        document.getElementById('left-upper-arm').setAttribute('x2', 70 + 10 * breathPhase);
        document.getElementById('left-upper-arm').setAttribute('y2', armRaiseY);
        document.getElementById('left-lower-arm').setAttribute('x1', 70 + 10 * breathPhase);
        document.getElementById('left-lower-arm').setAttribute('y1', armRaiseY);
        document.getElementById('left-lower-arm').setAttribute('x2', 50 + 30 * breathPhase);
        document.getElementById('left-lower-arm').setAttribute('y2', handRaiseY);
        
        // Bras droit
        document.getElementById('right-upper-arm').setAttribute('x2', 130 - 10 * breathPhase);
        document.getElementById('right-upper-arm').setAttribute('y2', armRaiseY);
        document.getElementById('right-lower-arm').setAttribute('x1', 130 - 10 * breathPhase);
        document.getElementById('right-lower-arm').setAttribute('y1', armRaiseY);
        document.getElementById('right-lower-arm').setAttribute('x2', 150 - 30 * breathPhase);
        document.getElementById('right-lower-arm').setAttribute('y2', handRaiseY);
        
        // Expansion de la poitrine
        document.getElementById('spine').setAttribute('x2', 100 - expansion * 0.5);
        document.getElementById('left-upper-leg').setAttribute('x1', 100 - expansion * 0.5);
        document.getElementById('right-upper-leg').setAttribute('x1', 100 - expansion * 0.5);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les étirements des bras
 */
function animateArmStretches() {
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
            // Première moitié: étirement au-dessus de la tête
            const phase = progress * 2; // 0 à 1
            
            // Étirer les bras vers le haut
            const shoulderY = 90 - 5 * phase;
            const elbowY = shoulderY - 30 * phase;
            const handY = elbowY - 40 * phase;
            
            // Bras gauche
            document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
            document.getElementById('left-upper-arm').setAttribute('x2', 100 - 10 * (1 - phase));
            document.getElementById('left-upper-arm').setAttribute('y2', elbowY);
            document.getElementById('left-lower-arm').setAttribute('x1', 100 - 10 * (1 - phase));
            document.getElementById('left-lower-arm').setAttribute('y1', elbowY);
            document.getElementById('left-lower-arm').setAttribute('x2', 100 - 20 * (1 - phase));
            document.getElementById('left-lower-arm').setAttribute('y2', handY);
            
            // Bras droit
            document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
            document.getElementById('right-upper-arm').setAttribute('x2', 100 + 10 * (1 - phase));
            document.getElementById('right-upper-arm').setAttribute('y2', elbowY);
            document.getElementById('right-lower-arm').setAttribute('x1', 100 + 10 * (1 - phase));
            document.getElementById('right-lower-arm').setAttribute('y1', elbowY);
            document.getElementById('right-lower-arm').setAttribute('x2', 100 + 20 * (1 - phase));
            document.getElementById('right-lower-arm').setAttribute('y2', handY);
            
        } else {
            // Seconde moitié: étirement sur les côtés
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Étirer les bras sur les côtés
            const shoulderY = 85;
            const elbowX_left = 70 - 40 * phase;
            const elbowX_right = 130 + 40 * phase;
            const handX_left = elbowX_left - 20 - 20 * phase;
            const handX_right = elbowX_right + 20 + 20 * phase;
            
            // Bras gauche
            document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
            document.getElementById('left-upper-arm').setAttribute('x2', elbowX_left);
            document.getElementById('left-upper-arm').setAttribute('y2', shoulderY);
            document.getElementById('left-lower-arm').setAttribute('x1', elbowX_left);
            document.getElementById('left-lower-arm').setAttribute('y1', shoulderY);
            document.getElementById('left-lower-arm').setAttribute('x2', handX_left);
            document.getElementById('left-lower-arm').setAttribute('y2', shoulderY);
            
            // Bras droit
            document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
            document.getElementById('right-upper-arm').setAttribute('x2', elbowX_right);
            document.getElementById('right-upper-arm').setAttribute('y2', shoulderY);
            document.getElementById('right-lower-arm').setAttribute('x1', elbowX_right);
            document.getElementById('right-lower-arm').setAttribute('y1', shoulderY);
            document.getElementById('right-lower-arm').setAttribute('x2', handX_right);
            document.getElementById('right-lower-arm').setAttribute('y2', shoulderY);
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour l'étirement des ischio-jambiers
 */
function animateHamstringStretch() {
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
        
        // Phase d'étirement
        let stretchPhase;
        if (progress < 0.5) {
            // Se pencher en avant
            stretchPhase = progress * 2; // 0 à 1
        } else {
            // Maintenir l'étirement
            stretchPhase = 1;
        }
        
        // Jambe tendue (droite)
        document.getElementById('right-upper-leg').setAttribute('x2', 120 + 20 * stretchPhase);
        document.getElementById('right-upper-leg').setAttribute('y2', 230);
        document.getElementById('right-lower-leg').setAttribute('x1', 120 + 20 * stretchPhase);
        document.getElementById('right-lower-leg').setAttribute('y1', 230);
        document.getElementById('right-lower-leg').setAttribute('x2', 130 + 40 * stretchPhase);
        document.getElementById('right-lower-leg').setAttribute('y2', 310);
        
        // Pencher le tronc vers la jambe tendue
        const spineTopY = 70 + 40 * stretchPhase;
        const spineTopX = 100 + 10 * stretchPhase;
        const headX = spineTopX + 5 * stretchPhase;
        const headY = 50 + 60 * stretchPhase;
        
        document.getElementById('spine').setAttribute('x1', spineTopX);
        document.getElementById('spine').setAttribute('y1', spineTopY);
        document.getElementById('head').setAttribute('cx', headX);
        document.getElementById('head').setAttribute('cy', headY);
        
        // Bras tendus vers le pied
        const shoulderX = spineTopX;
        const shoulderY = spineTopY + 20;
        const handTargetX = 130 + 40 * stretchPhase; // Position du pied
        const handTargetY = 310;
        
        // Calculer la position des coudes et des mains pour atteindre le pied
        const elbowX_left = shoulderX + (handTargetX - shoulderX) * 0.3;
        const elbowY_left = shoulderY + (handTargetY - shoulderY) * 0.3;
        const elbowX_right = shoulderX + (handTargetX - shoulderX) * 0.4;
        const elbowY_right = shoulderY + (handTargetY - shoulderY) * 0.4;
        
        // Bras gauche
        document.getElementById('left-upper-arm').setAttribute('x1', shoulderX);
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('left-upper-arm').setAttribute('x2', elbowX_left);
        document.getElementById('left-upper-arm').setAttribute('y2', elbowY_left);
        document.getElementById('left-lower-arm').setAttribute('x1', elbowX_left);
        document.getElementById('left-lower-arm').setAttribute('y1', elbowY_left);
        document.getElementById('left-lower-arm').setAttribute('x2', handTargetX);
        document.getElementById('left-lower-arm').setAttribute('y2', handTargetY);
        
        // Bras droit
        document.getElementById('right-upper-arm').setAttribute('x1', shoulderX);
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('right-upper-arm').setAttribute('x2', elbowX_right);
        document.getElementById('right-upper-arm').setAttribute('y2', elbowY_right);
        document.getElementById('right-lower-arm').setAttribute('x1', elbowX_right);
        document.getElementById('right-lower-arm').setAttribute('y1', elbowY_right);
        document.getElementById('right-lower-arm').setAttribute('x2', handTargetX - 5);
        document.getElementById('right-lower-arm').setAttribute('y2', handTargetY - 5);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour l'étirement jambes croisées
 */
function animateCrossedLegStretch() {
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
        
        // Phase d'étirement
        let stretchPhase;
        if (progress < 0.4) {
            // Croiser les jambes
            stretchPhase = progress / 0.4; // 0 à 1
        } else if (progress < 0.7) {
            // Se pencher en avant
            stretchPhase = 1;
        } else {
            // Revenir à la position initiale
            stretchPhase = 1 - ((progress - 0.7) / 0.3); // 1 à 0
        }
        
        // Croiser la jambe gauche devant la droite
        const leftKneeX = 100;
        const leftKneeY = 230;
        const leftFootX = 120 + 10 * stretchPhase;
        const leftFootY = 310;
        
        document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
        document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
        document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
        document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
        document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
        document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
        
        // Pencher le tronc en avant
        const bendFactor = stretchPhase * (progress > 0.4 ? (progress < 0.7 ? (progress - 0.4) / 0.3 : 1) : 0);
        const spineTopY = 70 + 30 * bendFactor;
        const headY = 50 + 40 * bendFactor;
        
        document.getElementById('spine').setAttribute('y1', spineTopY);
        document.getElementById('head').setAttribute('cy', headY);
        
        // Bras tendus vers le bas
        const shoulderY = spineTopY + 20;
        
        // Bras gauche
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('left-upper-arm').setAttribute('y2', shoulderY + 30 + 20 * bendFactor);
        document.getElementById('left-lower-arm').setAttribute('y1', shoulderY + 30 + 20 * bendFactor);
        document.getElementById('left-lower-arm').setAttribute('y2', shoulderY + 60 + 40 * bendFactor);
        
        // Bras droit
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        document.getElementById('right-upper-arm').setAttribute('y2', shoulderY + 30 + 20 * bendFactor);
        document.getElementById('right-lower-arm').setAttribute('y1', shoulderY + 30 + 20 * bendFactor);
        document.getElementById('right-lower-arm').setAttribute('y2', shoulderY + 60 + 40 * bendFactor);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour ramener le genou vers la poitrine
 */
function animateKneeToChest() {
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
            // Première moitié: genou gauche vers la poitrine
            const phase = progress * 2; // 0 à 1
            
            // Position "allongée" - pencher légèrement en arrière
            const spineTopY = 70 - 10 * phase;
            document.getElementById('spine').setAttribute('y1', spineTopY);
            document.getElementById('head').setAttribute('cy', 50 - 10 * phase);
            
            // Ramener le genou gauche vers la poitrine
            const leftKneeX = 80 + 5 * phase;
            const leftKneeY = 230 - 80 * phase;
            const leftFootX = 70 + 15 * phase;
            const leftFootY = 310 - 160 * phase;
            
            document.getElementById('left-upper-leg').setAttribute('x2', leftKneeX);
            document.getElementById('left-upper-leg').setAttribute('y2', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x1', leftKneeX);
            document.getElementById('left-lower-leg').setAttribute('y1', leftKneeY);
            document.getElementById('left-lower-leg').setAttribute('x2', leftFootX);
            document.getElementById('left-lower-leg').setAttribute('y2', leftFootY);
            
            // Bras gauche pour tenir le genou
            document.getElementById('left-upper-arm').setAttribute('x2', 70 + 10 * phase);
            document.getElementById('left-upper-arm').setAttribute('y2', 120 - 20 * phase);
            document.getElementById('left-lower-arm').setAttribute('x1', 70 + 10 * phase);
            document.getElementById('left-lower-arm').setAttribute('y1', 120 - 20 * phase);
            document.getElementById('left-lower-arm').setAttribute('x2', leftKneeX);
            document.getElementById('left-lower-arm').setAttribute('y2', leftKneeY);
            
        } else {
            // Seconde moitié: genou droit vers la poitrine
            const phase = (progress - 0.5) * 2; // 0 à 1
            
            // Position "allongée" maintenue
            document.getElementById('spine').setAttribute('y1', 60);
            document.getElementById('head').setAttribute('cy', 40);
            
            // Remettre la jambe gauche en position allongée
            document.getElementById('left-upper-leg').setAttribute('x2', '80');
            document.getElementById('left-upper-leg').setAttribute('y2', '230');
            document.getElementById('left-lower-leg').setAttribute('x1', '80');
            document.getElementById('left-lower-leg').setAttribute('y1', '230');
            document.getElementById('left-lower-leg').setAttribute('x2', '70');
            document.getElementById('left-lower-leg').setAttribute('y2', '310');
            
            // Ramener le genou droit vers la poitrine
            const rightKneeX = 120 - 5 * phase;
            const rightKneeY = 230 - 80 * phase;
            const rightFootX = 130 - 15 * phase;
            const rightFootY = 310 - 160 * phase;
            
            document.getElementById('right-upper-leg').setAttribute('x2', rightKneeX);
            document.getElementById('right-upper-leg').setAttribute('y2', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x1', rightKneeX);
            document.getElementById('right-lower-leg').setAttribute('y1', rightKneeY);
            document.getElementById('right-lower-leg').setAttribute('x2', rightFootX);
            document.getElementById('right-lower-leg').setAttribute('y2', rightFootY);
            
            // Bras droit pour tenir le genou
            document.getElementById('right-upper-arm').setAttribute('x2', 130 - 10 * phase);
            document.getElementById('right-upper-arm').setAttribute('y2', 120 - 20 * phase);
            document.getElementById('right-lower-arm').setAttribute('x1', 130 - 10 * phase);
            document.getElementById('right-lower-arm').setAttribute('y1', 120 - 20 * phase);
            document.getElementById('right-lower-arm').setAttribute('x2', rightKneeX);
            document.getElementById('right-lower-arm').setAttribute('y2', rightKneeY);
            
            // Bras gauche au repos
            document.getElementById('left-upper-arm').setAttribute('x2', '70');
            document.getElementById('left-upper-arm').setAttribute('y2', '120');
            document.getElementById('left-lower-arm').setAttribute('x1', '70');
            document.getElementById('left-lower-arm').setAttribute('y1', '120');
            document.getElementById('left-lower-arm').setAttribute('x2', '50');
            document.getElementById('left-lower-arm').setAttribute('y2', '150');
        }
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}
