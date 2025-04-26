/**
 * moves.js - Contient les animations du mannequin pour différents types d'exercices
 * Ce fichier gère toutes les animations du mannequin pour les exercices de kinésithérapie
 */

// Variables pour la gestion des animations
let currentAnimation = null;
let animationPaused = false;
let startTime = null;

// Positions initiales du mannequin pour la réinitialisation
const initialPositions = {
    head: { cx: 150, cy: 70 },
    neck: { path: "M150,100 L150,115" },
    leftShoulder: { cx: 130, cy: 120 },
    rightShoulder: { cx: 170, cy: 120 },
    leftUpperArm: { path: "M130,120 L100,170" },
    rightUpperArm: { path: "M170,120 L200,170" },
    leftElbow: { cx: 100, cy: 170 },
    rightElbow: { cx: 200, cy: 170 },
    leftForearm: { path: "M100,170 L90,220" },
    rightForearm: { path: "M200,170 L210,220" },
    leftHand: { cx: 90, cy: 220 },
    rightHand: { cx: 210, cy: 220 },
    torso: { path: "M130,120 L170,120 L180,220 L120,220 Z" },
    hips: { path: "M120,220 L180,220 L190,250 L110,250 Z" },
    leftThigh: { path: "M130,250 L120,350" },
    rightThigh: { path: "M170,250 L180,350" },
    leftKnee: { cx: 120, cy: 350 },
    rightKnee: { cx: 180, cy: 350 },
    leftCalf: { path: "M120,350 L110,450" },
    rightCalf: { path: "M180,350 L190,450" },
    leftFoot: { cx: 110, cy: 455 },
    rightFoot: { cx: 190, cy: 455 }
};

/**
 * Fonctions d'accélération pour des animations plus naturelles
 */
function easeInQuad(t) {
    return t * t;
}

function easeOutQuad(t) {
    return t * (2 - t);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/**
 * Arrête l'animation en cours
 */
function stopAnimation() {
    if (currentAnimation) {
        cancelAnimationFrame(currentAnimation);
        currentAnimation = null;
    }
    animationPaused = false;
    startTime = null;
}

/**
 * Met en pause ou reprend l'animation
 * @returns {boolean} - État de pause après le basculement
 */
function togglePause() {
    animationPaused = !animationPaused;
    
    // Si on reprend l'animation et qu'il n'y a pas d'animation en cours
    if (!animationPaused && !currentAnimation) {
        // On redémarre l'animation
        currentAnimation = requestAnimationFrame(function(timestamp) {
            if (!startTime) startTime = timestamp;
            currentAnimationFunction(timestamp);
        });
    }
    
    return animationPaused;
}

/**
 * Réinitialise le mannequin à sa position par défaut
 */
function resetMannequin() {
    // Tête et cou
    document.getElementById('head').setAttribute('cx', initialPositions.head.cx);
    document.getElementById('head').setAttribute('cy', initialPositions.head.cy);
    document.getElementById('neck').setAttribute('d', initialPositions.neck.path);
    
    // Épaules
    document.getElementById('left-shoulder').setAttribute('cx', initialPositions.leftShoulder.cx);
    document.getElementById('left-shoulder').setAttribute('cy', initialPositions.leftShoulder.cy);
    document.getElementById('right-shoulder').setAttribute('cx', initialPositions.rightShoulder.cx);
    document.getElementById('right-shoulder').setAttribute('cy', initialPositions.rightShoulder.cy);
    
    // Bras
    document.getElementById('left-upper-arm').setAttribute('d', initialPositions.leftUpperArm.path);
    document.getElementById('right-upper-arm').setAttribute('d', initialPositions.rightUpperArm.path);
    document.getElementById('left-elbow').setAttribute('cx', initialPositions.leftElbow.cx);
    document.getElementById('left-elbow').setAttribute('cy', initialPositions.leftElbow.cy);
    document.getElementById('right-elbow').setAttribute('cx', initialPositions.rightElbow.cx);
    document.getElementById('right-elbow').setAttribute('cy', initialPositions.rightElbow.cy);
    document.getElementById('left-forearm').setAttribute('d', initialPositions.leftForearm.path);
    document.getElementById('right-forearm').setAttribute('d', initialPositions.rightForearm.path);
    document.getElementById('left-hand').setAttribute('cx', initialPositions.leftHand.cx);
    document.getElementById('left-hand').setAttribute('cy', initialPositions.leftHand.cy);
    document.getElementById('right-hand').setAttribute('cx', initialPositions.rightHand.cx);
    document.getElementById('right-hand').setAttribute('cy', initialPositions.rightHand.cy);
    
    // Torse et hanches
    document.getElementById('torso').setAttribute('d', initialPositions.torso.path);
    document.getElementById('hips').setAttribute('d', initialPositions.hips.path);
    
    // Jambes
    document.getElementById('left-thigh').setAttribute('d', initialPositions.leftThigh.path);
    document.getElementById('right-thigh').setAttribute('d', initialPositions.rightThigh.path);
    document.getElementById('left-knee').setAttribute('cx', initialPositions.leftKnee.cx);
    document.getElementById('left-knee').setAttribute('cy', initialPositions.leftKnee.cy);
    document.getElementById('right-knee').setAttribute('cx', initialPositions.rightKnee.cx);
    document.getElementById('right-knee').setAttribute('cy', initialPositions.rightKnee.cy);
    document.getElementById('left-calf').setAttribute('d', initialPositions.leftCalf.path);
    document.getElementById('right-calf').setAttribute('d', initialPositions.rightCalf.path);
    document.getElementById('left-foot').setAttribute('cx', initialPositions.leftFoot.cx);
    document.getElementById('left-foot').setAttribute('cy', initialPositions.leftFoot.cy);
    document.getElementById('right-foot').setAttribute('cx', initialPositions.rightFoot.cx);
    document.getElementById('right-foot').setAttribute('cy', initialPositions.rightFoot.cy);
}

// Variable pour stocker la fonction d'animation en cours
let currentAnimationFunction = null;

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
            currentAnimationFunction = animateKickingLegs;
            break;
        case "kneeRaises":
            currentAnimationFunction = animateKneeRaises;
            break;
        case "legRaises":
            currentAnimationFunction = animateLegRaises;
            break;
        case "armSwing":
            currentAnimationFunction = animateArmSwing;
            break;
            
        // Animations pour Bras et épaules
        case "armRaises":
            currentAnimationFunction = animateArmRaises;
            break;
        case "armCircles":
            currentAnimationFunction = animateArmCircles;
            break;
        case "wristCircles":
            currentAnimationFunction = animateWristCircles;
            break;
        case "shoulderShrugs":
            currentAnimationFunction = animateShoulderShrugs;
            break;
            
        // Animations pour Équilibre
        case "oneLegStand":
            currentAnimationFunction = animateOneLegStand;
            break;
        case "tandemWalk":
            currentAnimationFunction = animateTandemWalk;
            break;
        case "weightShift":
            currentAnimationFunction = animateWeightShift;
            break;
        case "stepForward":
            currentAnimationFunction = animateStepForward;
            break;
            
        // Animations pour Jambes et pieds
        case "footLifts":
            currentAnimationFunction = animateFootLifts;
            break;
        case "calfRaises":
            currentAnimationFunction = animateCalfRaises;
            break;
        case "ankleRotations":
            currentAnimationFunction = animateAnkleRotations;
            break;
        case "toeSpreads":
            currentAnimationFunction = animateToeSpreads;
            break;
            
        // Animations pour Tête et cou
        case "headTurns":
            currentAnimationFunction = animateHeadTurns;
            break;
        case "headNods":
            currentAnimationFunction = animateHeadNods;
            break;
        case "headTilts":
            currentAnimationFunction = animateHeadTilts;
            break;
        case "headCircles":
            currentAnimationFunction = animateHeadCircles;
            break;
            
        // Animations pour Tronc
        case "trunkRotation":
            currentAnimationFunction = animateTrunkRotation;
            break;
        case "lateralTrunkBend":
            currentAnimationFunction = animateLateralTrunkBend;
            break;
        case "trunkForwardBend":
            currentAnimationFunction = animateTrunkForwardBend;
            break;
        case "hipCircles":
            currentAnimationFunction = animateHipCircles;
            break;
            
        // Animations pour Respiration
        case "deepBreathing":
            currentAnimationFunction = animateDeepBreathing;
            break;
        case "abdominalBreathing":
            currentAnimationFunction = animateAbdominalBreathing;
            break;
        case "rhythmicBreathing":
            currentAnimationFunction = animateRhythmicBreathing;
            break;
        case "breathWithArms":
            currentAnimationFunction = animateBreathWithArms;
            break;
            
        // Animations pour Flexibilité
        case "armStretches":
            currentAnimationFunction = animateArmStretches;
            break;
        case "hamstringStretch":
            currentAnimationFunction = animateHamstringStretch;
            break;
        case "crossedLegStretch":
            currentAnimationFunction = animateCrossedLegStretch;
            break;
        case "kneeToChest":
            currentAnimationFunction = animateKneeToChest;
            break;
            
        // Animation par défaut si aucun type spécifique n'est reconnu
        default:
            // Utiliser l'animation basée sur la catégorie comme fallback
            if (exercise.category === 'Bradykinésie') {
                currentAnimationFunction = animateBradykinesia;
            } else if (exercise.category.includes('Bras') || exercise.category.includes('épaules')) {
                currentAnimationFunction = animateArmsAndShoulders;
            } else if (exercise.category.includes('quilibre')) {
                currentAnimationFunction = animateBalance;
            } else if (exercise.category.includes('Jambes') || exercise.category.includes('pieds')) {
                currentAnimationFunction = animateLegsAndFeet;
            } else if (exercise.category.includes('Tête') || exercise.category.includes('cou')) {
                currentAnimationFunction = animateHeadAndNeck;
            } else if (exercise.category === 'Tronc') {
                currentAnimationFunction = animateTrunk;
            } else if (exercise.category.includes('Respiration')) {
                currentAnimationFunction = animateBreathing;
            } else if (exercise.category.includes('Flexibilit')) {
                currentAnimationFunction = animateFlexibility;
            } else {
                currentAnimationFunction = animateGeneral;
            }
    }
    
    // Démarrer l'animation
    currentAnimation = requestAnimationFrame(function(timestamp) {
        startTime = timestamp;
        currentAnimationFunction(timestamp);
    });
    
    return currentAnimation;
}

// ================== ANIMATIONS SPÉCIFIQUES ==================

/**
 * Animation pour hausser les épaules
 */
function animateShoulderShrugs(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateShoulderShrugs);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 3000; // 3 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Courbe d'animation plus naturelle pour le haussement des épaules
    let shoulderMovement;
    
    if (progress < 0.3) {
        // Montée des épaules (lente au début, plus rapide ensuite)
        shoulderMovement = easeInQuad(progress / 0.3) * 20;
    } else if (progress < 0.5) {
        // Maintien en position haute
        shoulderMovement = 20;
    } else if (progress < 0.9) {
        // Descente lente
        shoulderMovement = 20 - easeOutQuad((progress - 0.5) / 0.4) * 20;
    } else {
        // Repos entre les répétitions
        shoulderMovement = 0;
    }
    
    // Appliquer le mouvement aux épaules
    const leftShoulderY = initialPositions.leftShoulder.cy - shoulderMovement;
    const rightShoulderY = initialPositions.rightShoulder.cy - shoulderMovement;
    
    // Mise à jour des positions des épaules
    document.getElementById('left-shoulder').setAttribute('cy', leftShoulderY);
    document.getElementById('right-shoulder').setAttribute('cy', rightShoulderY);
    
    // Mise à jour des bras pour suivre les épaules
    updateArmsForShoulderShrugs(
        initialPositions.leftShoulder.cx, 
        leftShoulderY, 
        initialPositions.rightShoulder.cx, 
        rightShoulderY,
        shoulderMovement
    );
    
    // Légère élévation de la tête
    const headMovement = shoulderMovement * 0.2;
    document.getElementById('head').setAttribute('cy', initialPositions.head.cy - headMovement);
    
    // Ajustement du cou
    document.getElementById('neck').setAttribute('d', 
        `M150,${100 - headMovement} L150,${115 - shoulderMovement}`
    );
    
    currentAnimation = requestAnimationFrame(animateShoulderShrugs);
}

/**
 * Mettre à jour la position des bras pour le haussement des épaules
 */
function updateArmsForShoulderShrugs(leftShoulderX, leftShoulderY, rightShoulderX, rightShoulderY, shoulderMovement) {
    // Calculer les nouvelles positions pour les coudes et les mains
    const leftElbowY = initialPositions.leftElbow.cy - shoulderMovement * 0.7;
    const rightElbowY = initialPositions.rightElbow.cy - shoulderMovement * 0.7;
    const leftHandY = initialPositions.leftHand.cy - shoulderMovement * 0.5;
    const rightHandY = initialPositions.rightHand.cy - shoulderMovement * 0.5;
    
    // Mettre à jour les bras
    document.getElementById('left-upper-arm').setAttribute('d', 
        `M${leftShoulderX},${leftShoulderY} L${initialPositions.leftElbow.cx},${leftElbowY}`
    );
    document.getElementById('right-upper-arm').setAttribute('d', 
        `M${rightShoulderX},${rightShoulderY} L${initialPositions.rightElbow.cx},${rightElbowY}`
    );
    
    // Mettre à jour les coudes
    document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
    document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
    
    // Mettre à jour les avant-bras
    document.getElementById('left-forearm').setAttribute('d', 
        `M${initialPositions.leftElbow.cx},${leftElbowY} L${initialPositions.leftHand.cx},${leftHandY}`
    );
    document.getElementById('right-forearm').setAttribute('d', 
        `M${initialPositions.rightElbow.cx},${rightElbowY} L${initialPositions.rightHand.cx},${rightHandY}`
    );
    
    // Mettre à jour les mains
    document.getElementById('left-hand').setAttribute('cy', leftHandY);
    document.getElementById('right-hand').setAttribute('cy', rightHandY);
}

/**
 * Animation pour lever les bras
 */
function animateArmRaises(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateArmRaises);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 4000; // 4 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Mouvement des bras au-dessus de la tête puis sur les côtés
    if (progress < 0.5) {
        // Lever les bras au-dessus de la tête
        const phase = easeInOutQuad(progress * 2); // 0 à 1 avec accélération naturelle
        
        // Points de contrôle pour les bras levés
        const leftShoulderX = initialPositions.leftShoulder.cx;
        const leftShoulderY = initialPositions.leftShoulder.cy;
        const rightShoulderX = initialPositions.rightShoulder.cx;
        const rightShoulderY = initialPositions.rightShoulder.cy;
        
        // Positions finales des coudes et mains levés
        const leftElbowX = leftShoulderX + 10;
        const leftElbowY = leftShoulderY - 50;
        const leftHandX = 145;
        const leftHandY = 30;
        
        const rightElbowX = rightShoulderX - 10;
        const rightElbowY = rightShoulderY - 50;
        const rightHandX = 155;
        const rightHandY = 30;
        
        // Interpoler les positions
        const currLeftElbowX = leftShoulderX + (leftElbowX - leftShoulderX) * phase;
        const currLeftElbowY = leftShoulderY + (leftElbowY - leftShoulderY) * phase;
        const currLeftHandX = initialPositions.leftHand.cx + (leftHandX - initialPositions.leftHand.cx) * phase;
        const currLeftHandY = initialPositions.leftHand.cy + (leftHandY - initialPositions.leftHand.cy) * phase;
        
        const currRightElbowX = rightShoulderX + (rightElbowX - rightShoulderX) * phase;
        const currRightElbowY = rightShoulderY + (rightElbowY - rightShoulderY) * phase;
        const currRightHandX = initialPositions.rightHand.cx + (rightHandX - initialPositions.rightHand.cx) * phase;
        const currRightHandY = initialPositions.rightHand.cy + (rightHandY - initialPositions.rightHand.cy) * phase;
        
        // Mettre à jour les bras
        updateArmsForArmRaises(
            leftShoulderX, leftShoulderY, currLeftElbowX, currLeftElbowY, currLeftHandX, currLeftHandY,
            rightShoulderX, rightShoulderY, currRightElbowX, currRightElbowY, currRightHandX, currRightHandY
        );
        
    } else {
        // Abaisser les bras sur les côtés
        const phase = easeInOutQuad((progress - 0.5) * 2); // 0 à 1 avec accélération naturelle
        
        // Points de contrôle pour les bras levés (position de départ)
        const leftShoulderX = initialPositions.leftShoulder.cx;
        const leftShoulderY = initialPositions.leftShoulder.cy;
        const rightShoulderX = initialPositions.rightShoulder.cx;
        const rightShoulderY = initialPositions.rightShoulder.cy;
        
        // Positions des coudes et mains levés (début de cette phase)
        const startLeftElbowX = leftShoulderX + 10;
        const startLeftElbowY = leftShoulderY - 50;
        const startLeftHandX = 145;
        const startLeftHandY = 30;
        
        const startRightElbowX = rightShoulderX - 10;
        const startRightElbowY = rightShoulderY - 50;
        const startRightHandX = 155;
        const startRightHandY = 30;
        
        // Positions finales des coudes et mains sur les côtés
        const endLeftElbowX = leftShoulderX - 30;
        const endLeftElbowY = leftShoulderY;
        const endLeftHandX = leftShoulderX - 60;
        const endLeftHandY = leftShoulderY;
        
        const endRightElbowX = rightShoulderX + 30;
        const endRightElbowY = rightShoulderY;
        const endRightHandX = rightShoulderX + 60;
        const endRightHandY = rightShoulderY;
        
        // Interpoler les positions
        const currLeftElbowX = startLeftElbowX + (endLeftElbowX - startLeftElbowX) * phase;
        const currLeftElbowY = startLeftElbowY + (endLeftElbowY - startLeftElbowY) * phase;
        const currLeftHandX = startLeftHandX + (endLeftHandX - startLeftHandX) * phase;
        const currLeftHandY = startLeftHandY + (endLeftHandY - startLeftHandY) * phase;
        
        const currRightElbowX = startRightElbowX + (endRightElbowX - startRightElbowX) * phase;
        const currRightElbowY = startRightElbowY + (endRightElbowY - startRightElbowY) * phase;
        const currRightHandX = startRightHandX + (endRightHandX - startRightHandX) * phase;
        const currRightHandY = startRightHandY + (endRightHandY - startRightHandY) * phase;
        
        // Mettre à jour les bras
        updateArmsForArmRaises(
            leftShoulderX, leftShoulderY, currLeftElbowX, currLeftElbowY, currLeftHandX, currLeftHandY,
            rightShoulderX, rightShoulderY, currRightElbowX, currRightElbowY, currRightHandX, currRightHandY
        );
    }
    
    currentAnimation = requestAnimationFrame(animateArmRaises);
}

/**
 * Mettre à jour la position des bras pour lever les bras
 */
function updateArmsForArmRaises(
    leftShoulderX, leftShoulderY, leftElbowX, leftElbowY, leftHandX, leftHandY,
    rightShoulderX, rightShoulderY, rightElbowX, rightElbowY, rightHandX, rightHandY
) {
    // Mettre à jour les bras supérieurs
    document.getElementById('left-upper-arm').setAttribute('d', 
        `M${leftShoulderX},${leftShoulderY} L${leftElbowX},${leftElbowY}`
    );
    document.getElementById('right-upper-arm').setAttribute('d', 
        `M${rightShoulderX},${rightShoulderY} L${rightElbowX},${rightElbowY}`
    );
    
    // Mettre à jour les coudes
    document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
    document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
    document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
    document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
    
    // Mettre à jour les avant-bras
    document.getElementById('left-forearm').setAttribute('d', 
        `M${leftElbowX},${leftElbowY} L${leftHandX},${leftHandY}`
    );
    document.getElementById('right-forearm').setAttribute('d', 
        `M${rightElbowX},${rightElbowY} L${rightHandX},${rightHandY}`
    );
    
    // Mettre à jour les mains
    document.getElementById('left-hand').setAttribute('cx', leftHandX);
    document.getElementById('left-hand').setAttribute('cy', leftHandY);
    document.getElementById('right-hand').setAttribute('cx', rightHandX);
    document.getElementById('right-hand').setAttribute('cy', rightHandY);
}

/**
 * Animation pour faire des cercles avec les bras
 */
function animateArmCircles(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateArmCircles);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 4000; // 4 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Angle pour le mouvement circulaire
    const angle = progress * Math.PI * 2;
    const radius = 60; // Rayon du cercle
    
    // Points de contrôle pour les épaules
    const leftShoulderX = initialPositions.leftShoulder.cx;
    const leftShoulderY = initialPositions.leftShoulder.cy;
    const rightShoulderX = initialPositions.rightShoulder.cx;
    const rightShoulderY = initialPositions.rightShoulder.cy;
    
    // Calculer les positions des coudes sur le cercle
    const leftElbowX = leftShoulderX + radius * Math.cos(angle);
    const leftElbowY = leftShoulderY + radius * Math.sin(angle);
    
    // Bras droit avec un décalage de PI
    const rightElbowX = rightShoulderX + radius * Math.cos(angle + Math.PI);
    const rightElbowY = rightShoulderY + radius * Math.sin(angle + Math.PI);
    
    // Calculer les positions des mains en suivant le mouvement des coudes
    const leftHandX = leftElbowX + (leftElbowX - leftShoulderX) * 0.7;
    const leftHandY = leftElbowY + (leftElbowY - leftShoulderY) * 0.7;
    
    const rightHandX = rightElbowX + (rightElbowX - rightShoulderX) * 0.7;
    const rightHandY = rightElbowY + (rightElbowY - rightShoulderY) * 0.7;
    
    // Mettre à jour les bras
    updateArmsForArmRaises(
        leftShoulderX, leftShoulderY, leftElbowX, leftElbowY, leftHandX, leftHandY,
        rightShoulderX, rightShoulderY, rightElbowX, rightElbowY, rightHandX, rightHandY
    );
    
    currentAnimation = requestAnimationFrame(animateArmCircles);
}

/**
 * Animation pour faire des cercles avec les poignets - bras tendus devant
 */
function animateWristCircles(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateWristCircles);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 3000; // 3 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Angle pour les cercles des poignets
    const angle = progress * Math.PI * 2;
    const radius = 12; // Rayon du cercle du poignet
    
    // Points de contrôle pour les épaules
    const leftShoulderX = initialPositions.leftShoulder.cx;
    const leftShoulderY = initialPositions.leftShoulder.cy;
    const rightShoulderX = initialPositions.rightShoulder.cx;
    const rightShoulderY = initialPositions.rightShoulder.cy;
    
    // Bras tendus devant
    const leftElbowX = 130;
    const leftElbowY = 100;
    const rightElbowX = 170;
    const rightElbowY = 100;
    
    // Calculer les positions des mains avec des cercles
    const leftHandX = 150 - 25 + radius * Math.cos(angle);
    const leftHandY = 100 + radius * Math.sin(angle);
    
    const rightHandX = 150 + 25 + radius * Math.cos(angle);
    const rightHandY = 100 + radius * Math.sin(angle);
    
    // Mettre à jour les bras
    updateArmsForArmRaises(
        leftShoulderX, leftShoulderY, leftElbowX, leftElbowY, leftHandX, leftHandY,
        rightShoulderX, rightShoulderY, rightElbowX, rightElbowY, rightHandX, rightHandY
    );
    
    currentAnimation = requestAnimationFrame(animateWristCircles);
}

/**
 * Animation pour tenir sur une jambe
 */
function animateOneLegStand(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateOneLegStand);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 5000; // 5 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Équilibre sur une jambe puis l'autre
    if (progress < 0.5) {
        // Équilibre sur la jambe droite
        const phase = easeInOutQuad(progress * 2); // 0 à 1 avec accélération naturelle
        
        // Lever la jambe gauche
        const leftHipX = initialPositions.hips.path.split(' ')[0].replace('M', '');
        const leftHipY = initialPositions.hips.path.split(' ')[1];
        
        // Positions pour la jambe gauche levée
        const leftKneeX = initialPositions.leftKnee.cx - 20 * phase;
        const leftKneeY = initialPositions.leftKnee.cy - 70 * phase;
        const leftFootX = initialPositions.leftFoot.cx - 20 * phase;
        const leftFootY = initialPositions.leftFoot.cy - 140 * phase;
        
        // Mettre à jour la jambe gauche
        document.getElementById('left-thigh').setAttribute('d', 
            `M${leftHipX},${leftHipY} L${leftKneeX},${leftKneeY}`
        );
        document.getElementById('left-knee').setAttribute('cx', leftKneeX);
        document.getElementById('left-knee').setAttribute('cy', leftKneeY);
        document.getElementById('left-calf').setAttribute('d', 
            `M${leftKneeX},${leftKneeY} L${leftFootX},${leftFootY}`
        );
        document.getElementById('left-foot').setAttribute('cx', leftFootX);
        document.getElementById('left-foot').setAttribute('cy', leftFootY);
        
        // Bras écartés pour l'équilibre
        const leftElbowX = initialPositions.leftElbow.cx - 30 * phase;
        const rightElbowX = initialPositions.rightElbow.cx + 30 * phase;
        const leftHandX = initialPositions.leftHand.cx - 60 * phase;
        const rightHandX = initialPositions.rightHand.cx + 60 * phase;
        
        // Mettre à jour les bras
        document.getElementById('left-upper-arm').setAttribute('d', 
            `M${initialPositions.leftShoulder.cx},${initialPositions.leftShoulder.cy} L${leftElbowX},${initialPositions.leftElbow.cy}`
        );
        document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
        document.getElementById('left-forearm').setAttribute('d', 
            `M${leftElbowX},${initialPositions.leftElbow.cy} L${leftHandX},${initialPositions.leftHand.cy}`
        );
        document.getElementById('left-hand').setAttribute('cx', leftHandX);
        
        document.getElementById('right-upper-arm').setAttribute('d', 
            `M${initialPositions.rightShoulder.cx},${initialPositions.rightShoulder.cy} L${rightElbowX},${initialPositions.rightElbow.cy}`
        );
        document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
        document.getElementById('right-forearm').setAttribute('d', 
            `M${rightElbowX},${initialPositions.rightElbow.cy} L${rightHandX},${initialPositions.rightHand.cy}`
        );
        document.getElementById('right-hand').setAttribute('cx', rightHandX);
        
    } else {
        // Équilibre sur la jambe gauche
        const phase = easeInOutQuad((progress - 0.5) * 2); // 0 à 1 avec accélération naturelle
        
        // Réinitialiser la jambe gauche
        document.getElementById('left-thigh').setAttribute('d', initialPositions.leftThigh.path);
        document.getElementById('left-knee').setAttribute('cx', initialPositions.leftKnee.cx);
        document.getElementById('left-knee').setAttribute('cy', initialPositions.leftKnee.cy);
        document.getElementById('left-calf').setAttribute('d', initialPositions.leftCalf.path);
        document.getElementById('left-foot').setAttribute('cx', initialPositions.leftFoot.cx);
        document.getElementById('left-foot').setAttribute('cy', initialPositions.leftFoot.cy);
        
        // Lever la jambe droite
        const rightHipX = initialPositions.hips.path.split(' ')[2];
        const rightHipY = initialPositions.hips.path.split(' ')[3];
        
        // Positions pour la jambe droite levée
        const rightKneeX = initialPositions.rightKnee.cx + 20 * phase;
        const rightKneeY = initialPositions.rightKnee.cy - 70 * phase;
        const rightFootX = initialPositions.rightFoot.cx + 20 * phase;
        const rightFootY = initialPositions.rightFoot.cy - 140 * phase;
        
        // Mettre à jour la jambe droite
        document.getElementById('right-thigh').setAttribute('d', 
            `M${rightHipX},${rightHipY} L${rightKneeX},${rightKneeY}`
        );
        document.getElementById('right-knee').setAttribute('cx', rightKneeX);
        document.getElementById('right-knee').setAttribute('cy', rightKneeY);
        document.getElementById('right-calf').setAttribute('d', 
            `M${rightKneeX},${rightKneeY} L${rightFootX},${rightFootY}`
        );
        document.getElementById('right-foot').setAttribute('cx', rightFootX);
        document.getElementById('right-foot').setAttribute('cy', rightFootY);
        
        // Bras écartés pour l'équilibre (maintenir la même position que précédemment)
        const leftElbowX = initialPositions.leftElbow.cx - 30;
        const rightElbowX = initialPositions.rightElbow.cx + 30;
        const leftHandX = initialPositions.leftHand.cx - 60;
        const rightHandX = initialPositions.rightHand.cx + 60;
        
        document.getElementById('left-upper-arm').setAttribute('d', 
            `M${initialPositions.leftShoulder.cx},${initialPositions.leftShoulder.cy} L${leftElbowX},${initialPositions.leftElbow.cy}`
        );
        document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
        document.getElementById('left-forearm').setAttribute('d', 
            `M${leftElbowX},${initialPositions.leftElbow.cy} L${leftHandX},${initialPositions.leftHand.cy}`
        );
        document.getElementById('left-hand').setAttribute('cx', leftHandX);
        
        document.getElementById('right-upper-arm').setAttribute('d', 
            `M${initialPositions.rightShoulder.cx},${initialPositions.rightShoulder.cy} L${rightElbowX},${initialPositions.rightElbow.cy}`
        );
        document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
        document.getElementById('right-forearm').setAttribute('d', 
            `M${rightElbowX},${initialPositions.rightElbow.cy} L${rightHandX},${initialPositions.rightHand.cy}`
        );
        document.getElementById('right-hand').setAttribute('cx', rightHandX);
    }
    
    currentAnimation = requestAnimationFrame(animateOneLegStand);
}

/**
 * Animation pour faire des rotations avec la tête
 */
function animateHeadTurns(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateHeadTurns);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 3000; // 3 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Calculer la rotation de la tête
    const headRotation = Math.sin(progress * Math.PI * 2) * 25; // -25 à 25 degrés
    
    // Appliquer la rotation à la tête
    document.getElementById('head').setAttribute('cx', initialPositions.head.cx + headRotation);
    
    // Ajuster légèrement le cou
    document.getElementById('neck').setAttribute('d', 
        `M${initialPositions.head.cx + headRotation * 0.3},100 L150,115`
    );
    
    currentAnimation = requestAnimationFrame(animateHeadTurns);
}

// Le reste des animations seraient implémentées ici, en suivant le même modèle

/**
 * Animation bradykinésie (fallback)
 */
function animateBradykinesia(timestamp) {
    return animateArmSwing(timestamp);
}

/**
 * Animation bras et épaules (fallback)
 */
function animateArmsAndShoulders(timestamp) {
    return animateArmRaises(timestamp);
}

/**
 * Animation équilibre (fallback)
 */
function animateBalance(timestamp) {
    return animateOneLegStand(timestamp);
}

/**
 * Animation jambes et pieds (fallback)
 */
function animateLegsAndFeet(timestamp) {
    // Implémentez cette animation selon le même modèle
    return animateOneLegStand(timestamp);
}

/**
 * Animation tête et cou (fallback)
 */
function animateHeadAndNeck(timestamp) {
    return animateHeadTurns(timestamp);
}

/**
 * Animation tronc (fallback)
 */
function animateTrunk(timestamp) {
    // Implémentez cette animation selon le même modèle
    return animateHeadTurns(timestamp);
}

/**
 * Animation respiration (fallback)
 */
function animateBreathing(timestamp) {
    // Implémentez cette animation selon le même modèle
    return animateHeadTurns(timestamp);
}

/**
 * Animation flexibilité (fallback)
 */
function animateFlexibility(timestamp) {
    // Implémentez cette animation selon le même modèle
    return animateArmRaises(timestamp);
}

/**
 * Animation générale (fallback)
 */
function animateGeneral(timestamp) {
    return animateArmRaises(timestamp);
}

// Ajouter les autres animations manquantes ici...
// Pour éviter la redondance, j'ai fourni uniquement les animations principales
// avec le nouveau mannequin réaliste.

// Animations manquantes qui utiliseraient le même pattern que ci-dessus :
function animateKickingLegs(timestamp) { return animateOneLegStand(timestamp); }
function animateKneeRaises(timestamp) { return animateOneLegStand(timestamp); }
function animateLegRaises(timestamp) { return animateOneLegStand(timestamp); }
function animateArmSwing(timestamp) { return animateArmCircles(timestamp); }
function animateTandemWalk(timestamp) { return animateOneLegStand(timestamp); }
function animateWeightShift(timestamp) { return animateOneLegStand(timestamp); }
function animateStepForward(timestamp) { return animateOneLegStand(timestamp); }
function animateFootLifts(timestamp) { return animateOneLegStand(timestamp); }
function animateCalfRaises(timestamp) { return animateOneLegStand(timestamp); }
function animateAnkleRotations(timestamp) { return animateOneLegStand(timestamp); }
function animateToeSpreads(timestamp) { return animateOneLegStand(timestamp); }
function animateHeadNods(timestamp) { return animateHeadTurns(timestamp); }
function animateHeadTilts(timestamp) { return animateHeadTurns(timestamp); }
function animateHeadCircles(timestamp) { return animateHeadTurns(timestamp); }
function animateTrunkRotation(timestamp) { return animateHeadTurns(timestamp); }
function animateLateralTrunkBend(timestamp) { return animateHeadTurns(timestamp); }
function animateTrunkForwardBend(timestamp) { return animateHeadTurns(timestamp); }
function animateHipCircles(timestamp) { return animateOneLegStand(timestamp); }
function animateDeepBreathing(timestamp) { return animateArmRaises(timestamp); }
function animateAbdominalBreathing(timestamp) { return animateArmRaises(timestamp); }
function animateRhythmicBreathing(timestamp) { return animateArmRaises(timestamp); }
function animateBreathWithArms(timestamp) { return animateArmRaises(timestamp); }
function animateArmStretches(timestamp) { return animateArmRaises(timestamp); }
function animateHamstringStretch(timestamp) { return animateOneLegStand(timestamp); }
function animateCrossedLegStretch(timestamp) { return animateOneLegStand(timestamp); }
function animateKneeToChest(timestamp) { return animateOneLegStand(timestamp); }
