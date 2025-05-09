/**
 * moves.js - Contient les animations du mannequin pour différents types d'exercices
 * Ce fichier gère toutes les animations du mannequin pour les exercices de kinésithérapie
 */

// Variables pour la gestion des animations
let currentAnimation = null;
let animationPaused = false;
let startTime = null;

// Variable pour stocker l'état actuel de certaines animations
let animationState = {
    activeLeg: 'none', // 'left', 'right', 'none'
    legPhase: 'raise', // 'raise', 'hold', 'lower', 'rest'
    currentPosition: 'standing' // 'standing', 'sitting', 'lying'
};

// Positions initiales du mannequin pour la réinitialisation (position debout)
const standingPositions = {
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

// Positions assises du mannequin - Redéfinies pour être clairement différentes
const sittingPositions = {
    head: { cx: 150, cy: 170 },
    neck: { path: "M150,200 L150,215" },
    leftShoulder: { cx: 130, cy: 220 },
    rightShoulder: { cx: 170, cy: 220 },
    leftUpperArm: { path: "M130,220 L100,260" },
    rightUpperArm: { path: "M170,220 L200,260" },
    leftElbow: { cx: 100, cy: 260 },
    rightElbow: { cx: 200, cy: 260 },
    leftForearm: { path: "M100,260 L90,300" },
    rightForearm: { path: "M200,260 L210,300" },
    leftHand: { cx: 90, cy: 300 },
    rightHand: { cx: 210, cy: 300 },
    torso: { path: "M130,220 L170,220 L180,300 L120,300 Z" },
    hips: { path: "M120,300 L180,300 L190,320 L110,320 Z" },
    leftThigh: { path: "M130,320 L100,380" },
    rightThigh: { path: "M170,320 L200,380" },
    leftKnee: { cx: 100, cy: 380 },
    rightKnee: { cx: 200, cy: 380 },
    leftCalf: { path: "M100,380 L120,450" },
    rightCalf: { path: "M200,380 L180,450" },
    leftFoot: { cx: 120, cy: 455 },
    rightFoot: { cx: 180, cy: 455 }
};

// Positions couchées du mannequin
const lyingPositions = {
    head: { cx: 70, cy: 150 },
    neck: { path: "M100,150 L115,150" },
    leftShoulder: { cx: 120, cy: 130 },
    rightShoulder: { cx: 120, cy: 170 },
    leftUpperArm: { path: "M120,130 L170,100" },
    rightUpperArm: { path: "M120,170 L170,200" },
    leftElbow: { cx: 170, cy: 100 },
    rightElbow: { cx: 170, cy: 200 },
    leftForearm: { path: "M170,100 L220,90" },
    rightForearm: { path: "M170,200 L220,210" },
    leftHand: { cx: 220, cy: 90 },
    rightHand: { cx: 220, cy: 210 },
    torso: { path: "M120,130 L120,170 L220,180 L220,120 Z" },
    hips: { path: "M220,120 L220,180 L250,190 L250,110 Z" },
    leftThigh: { path: "M250,130 L350,120" },
    rightThigh: { path: "M250,170 L350,180" },
    leftKnee: { cx: 350, cy: 120 },
    rightKnee: { cx: 350, cy: 180 },
    leftCalf: { path: "M350,120 L450,110" },
    rightCalf: { path: "M350,180 L450,190" },
    leftFoot: { cx: 455, cy: 110 },
    rightFoot: { cx: 455, cy: 190 }
};

// Position active courante
let initialPositions = standingPositions;

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
    
    // Réinitialiser l'état de l'animation
    animationState = {
        activeLeg: 'none',
        legPhase: 'raise',
        currentPosition: 'standing'
    };
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
    // Choisir la position initiale appropriée
    initialPositions = standingPositions;
    animationState.currentPosition = 'standing';
    
    // Appliquer la position choisie
    applyInitialPosition();
}

/**
 * Applique la position initiale choisie (debout, assis, couché)
 */
function applyInitialPosition() {
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

    // Log pour débogage
    console.log(`Position appliquée: ${animationState.currentPosition}`);
}

/**
 * Change la position initiale du mannequin
 * @param {string} position - 'standing', 'sitting', 'lying'
 */
function setInitialPosition(position) {
    console.log(`Changement de position vers: ${position}`);
    
    switch (position) {
        case 'sitting':
            initialPositions = sittingPositions;
            animationState.currentPosition = 'sitting';
            break;
        case 'lying':
            initialPositions = lyingPositions;
            animationState.currentPosition = 'lying';
            break;
        case 'standing':
        default:
            initialPositions = standingPositions;
            animationState.currentPosition = 'standing';
            break;
    }
    
    // Appliquer la nouvelle position
    applyInitialPosition();
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
    
    // Définir la position initiale en fonction de l'exercice
    determineInitialPosition(exercise);
    
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
            // Vérifier si l'exercice devrait être réalisé assis ou allongé
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
                currentAnimationFunction = animateLegRaisesSitting;
            } else if (exercise.instructions.toLowerCase().includes('allongé')) {
                setInitialPosition('lying');
                currentAnimationFunction = animateLegRaisesLying;
            } else {
                currentAnimationFunction = animateLegRaises;
            }
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
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
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
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
                currentAnimationFunction = animateFootLiftsSitting;
            } else {
                currentAnimationFunction = animateFootLifts;
            }
            break;
        case "calfRaises":
            currentAnimationFunction = animateCalfRaises;
            break;
        case "ankleRotations":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
                currentAnimationFunction = animateAnkleRotationsSitting;
            } else {
                currentAnimationFunction = animateAnkleRotations;
            }
            break;
        case "toeSpreads":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
            currentAnimationFunction = animateToeSpreads;
            break;
            
        // Animations pour Tête et cou
        case "headTurns":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
            currentAnimationFunction = animateHeadTurns;
            break;
        case "headNods":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
            currentAnimationFunction = animateHeadNods;
            break;
        case "headTilts":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
            currentAnimationFunction = animateHeadTilts;
            break;
        case "headCircles":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
            currentAnimationFunction = animateHeadCircles;
            break;
            
        // Animations pour Tronc
        case "trunkRotation":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
                currentAnimationFunction = animateTrunkRotationSitting;
            } else {
                currentAnimationFunction = animateTrunkRotation;
            }
            break;
        case "lateralTrunkBend":
            currentAnimationFunction = animateLateralTrunkBend;
            break;
        case "trunkForwardBend":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
                // Déterminer s'il s'agit de l'exercice spécifique "se lever sans les bras"
                if (exercise.instructions.toLowerCase().includes('lever') && 
                    exercise.instructions.toLowerCase().includes('sans utiliser vos bras')) {
                    currentAnimationFunction = animateSitToStandWithoutArms;
                } else {
                    currentAnimationFunction = animateTrunkForwardBendSitting;
                }
            } else {
                currentAnimationFunction = animateTrunkForwardBend;
            }
            break;
        case "hipCircles":
            if (exercise.instructions.toLowerCase().includes('allongé')) {
                setInitialPosition('lying');
                currentAnimationFunction = animateHipCirclesLying;
            } else {
                currentAnimationFunction = animateHipCircles;
            }
            break;
            
        // Animations pour Respiration
        case "deepBreathing":
            currentAnimationFunction = animateDeepBreathing;
            break;
        case "abdominalBreathing":
            if (exercise.instructions.toLowerCase().includes('allongé')) {
                setInitialPosition('lying');
                currentAnimationFunction = animateAbdominalBreathingLying;
            } else {
                currentAnimationFunction = animateAbdominalBreathing;
            }
            break;
        case "rhythmicBreathing":
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
            }
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
            if (exercise.instructions.toLowerCase().includes('assis')) {
                setInitialPosition('sitting');
                currentAnimationFunction = animateHamstringStretchSitting;
            } else {
                currentAnimationFunction = animateHamstringStretch;
            }
            break;
        case "crossedLegStretch":
            currentAnimationFunction = animateCrossedLegStretch;
            break;
        case "kneeToChest":
            if (exercise.instructions.toLowerCase().includes('allongé')) {
                setInitialPosition('lying');
                currentAnimationFunction = animateKneeToChestLying;
            } else {
                currentAnimationFunction = animateKneeToChest;
            }
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

/**
 * Détermine la position initiale en fonction des instructions de l'exercice
 * @param {Object} exercise - L'exercice à analyser
 */
function determineInitialPosition(exercise) {
    const instructions = exercise.instructions.toLowerCase();
    
    if (instructions.includes('assis') || instructions.includes('asseyez')) {
        setInitialPosition('sitting');
    } else if (instructions.includes('allongé') || instructions.includes('couché') || instructions.includes('allongez')) {
        setInitialPosition('lying');
    } else {
        setInitialPosition('standing');
    }
}

/**
 * Animation pour montrer le mouvement de se lever d'une chaise et s'asseoir sans utiliser les bras
 */
function animateSitToStandWithoutArms(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateSitToStandWithoutArms);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 8000; // 8 secondes par cycle complet
    const progress = (elapsed % duration) / duration;
    
    // Diviser l'animation en 4 phases :
    // 1. Position assise initiale et préparation (0-10%)
    // 2. Se lever (10-40%)
    // 3. Position debout complète (40-60%)
    // 4. S'asseoir à nouveau (60-100%)
    
    if (progress < 0.1) {
        // Phase 1: Position assise initiale - légère préparation en se penchant en avant
        const phase = easeInOutQuad(progress * 10); // 0 à 1
        
        // Pencher légèrement le tronc en avant en préparation
        const trunkTiltFactor = phase * 0.15;
        
        // Ajuster la position du torse et de la tête pour l'inclinaison vers l'avant
        adjustUpperBodyForwardTilt(trunkTiltFactor, sittingPositions);
        
        // Les bras restent le long du corps (sans utiliser les bras)
        keepArmsAlongBody();
        
    } else if (progress < 0.4) {
        // Phase 2: Se lever progressivement
        const phase = easeInOutQuad((progress - 0.1) / 0.3); // 0 à 1
        
        // Interpoler entre position assise et debout
        interpolatePositions(sittingPositions, standingPositions, phase);
        
        // Ajouter une inclinaison vers l'avant plus prononcée au début du mouvement
        const forwardTilt = Math.max(0, 0.3 - phase * 0.3);
        adjustUpperBodyForwardTilt(forwardTilt, null);
        
        // Maintenir les bras le long du corps
        keepArmsAlongBody();
        
    } else if (progress < 0.6) {
        // Phase 3: Position debout complète
        applyStandingPosition();
        
        // Maintenir les bras le long du corps
        keepArmsAlongBody();
        
    } else {
        // Phase 4: S'asseoir à nouveau
        const phase = easeInOutQuad((progress - 0.6) / 0.4); // 0 à 1
        
        // Interpoler entre position debout et assise
        interpolatePositions(standingPositions, sittingPositions, phase);
        
        // Ajouter une inclinaison vers l'avant plus prononcée au début du mouvement pour s'asseoir
        const forwardTilt = Math.min(0.3, phase * 0.3);
        adjustUpperBodyForwardTilt(forwardTilt, null);
        
        // Maintenir les bras le long du corps
        keepArmsAlongBody();
    }
    
    currentAnimation = requestAnimationFrame(animateSitToStandWithoutArms);
}

/**
 * Ajuste le haut du corps pour une inclinaison vers l'avant
 * @param {number} tiltFactor - Facteur d'inclinaison (0 à 1)
 * @param {Object} basePosition - Position de base (facultatif)
 */
function adjustUpperBodyForwardTilt(tiltFactor, basePosition) {
    const base = basePosition || {
        head: { cx: parseFloat(document.getElementById('head').getAttribute('cx')), 
                cy: parseFloat(document.getElementById('head').getAttribute('cy')) },
        neck: { path: document.getElementById('neck').getAttribute('d') }
    };
    
    // Calculer l'inclinaison de la tête
    const headForwardOffset = 20 * tiltFactor;
    const headDownOffset = 5 * tiltFactor;
    
    // Appliquer l'inclinaison à la tête
    document.getElementById('head').setAttribute('cx', base.head.cx + headForwardOffset);
    document.getElementById('head').setAttribute('cy', base.head.cy + headDownOffset);
    
    // Ajuster le cou
    const neckParts = base.neck.path.split(' ');
    if (neckParts.length >= 2) {
        const start = neckParts[0].replace('M', '').split(',');
        const end = neckParts[1].replace('L', '').split(',');
        
        if (start.length >= 2 && end.length >= 2) {
            const startX = parseFloat(start[0]) + headForwardOffset * 0.7;
            const startY = parseFloat(start[1]) + headDownOffset * 0.7;
            
            document.getElementById('neck').setAttribute('d', 
                `M${startX},${startY} L${end[0]},${end[1]}`
            );
        }
    }
    
    // Ajuster le torse pour l'inclinaison
    const torsoPath = document.getElementById('torso').getAttribute('d').split(' ');
    if (torsoPath.length >= 5) {
        const points = [];
        
        // Extraire les points du torse
        for (let i = 0; i < torsoPath.length; i++) {
            if (torsoPath[i].includes('M') || torsoPath[i].includes('L') || torsoPath[i].includes('Z')) {
                const point = torsoPath[i].replace('M', '').replace('L', '').replace('Z', '');
                if (point) {
                    points.push(point.split(','));
                }
            }
        }
        
        if (points.length >= 4) {
            // Ajuster les points supérieurs du torse pour l'inclinaison
            const topLeftX = parseFloat(points[0][0]) + headForwardOffset * 0.5;
            const topLeftY = parseFloat(points[0][1]) + headDownOffset * 0.5;
            
            const topRightX = parseFloat(points[1][0]) + headForwardOffset * 0.5;
            const topRightY = parseFloat(points[1][1]) + headDownOffset * 0.5;
            
            // Reconstruire le chemin du torse
            document.getElementById('torso').setAttribute('d', 
                `M${topLeftX},${topLeftY} L${topRightX},${topRightY} L${points[2][0]},${points[2][1]} L${points[3][0]},${points[3][1]} Z`
            );
        }
    }
}

/**
 * Maintient les bras le long du corps
 */
function keepArmsAlongBody() {
    // Obtenir la position actuelle du torse
    const torsoPath = document.getElementById('torso').getAttribute('d').split(' ');
    if (torsoPath.length < 5) return;
    
    // Extraire les points clés du torse
    const points = [];
    for (let i = 0; i < torsoPath.length; i++) {
        if (torsoPath[i].includes('M') || torsoPath[i].includes('L') || torsoPath[i].includes('Z')) {
            const point = torsoPath[i].replace('M', '').replace('L', '').replace('Z', '');
            if (point) {
                points.push(point.split(','));
            }
        }
    }
    
    if (points.length < 4) return;
    
    // Points d'épaule
    const leftShoulderX = parseFloat(points[0][0]);
    const leftShoulderY = parseFloat(points[0][1]);
    const rightShoulderX = parseFloat(points[1][0]);
    const rightShoulderY = parseFloat(points[1][1]);
    
    // Points de hanche
    const leftHipX = parseFloat(points[3][0]);
    const leftHipY = parseFloat(points[3][1]);
    const rightHipX = parseFloat(points[2][0]);
    const rightHipY = parseFloat(points[2][1]);
    
    // Positions pour les bras le long du corps
    const leftElbowX = leftShoulderX - (leftShoulderX - leftHipX) * 0.3;
    const leftElbowY = leftShoulderY + (leftHipY - leftShoulderY) * 0.5;
    const leftHandX = leftHipX - 5;
    const leftHandY = leftHipY - 10;
    
    const rightElbowX = rightShoulderX - (rightShoulderX - rightHipX) * 0.3;
    const rightElbowY = rightShoulderY + (rightHipY - rightShoulderY) * 0.5;
    const rightHandX = rightHipX + 5;
    const rightHandY = rightHipY - 10;
    
    // Mise à jour des bras
    document.getElementById('left-shoulder').setAttribute('cx', leftShoulderX);
    document.getElementById('left-shoulder').setAttribute('cy', leftShoulderY);
    document.getElementById('right-shoulder').setAttribute('cx', rightShoulderX);
    document.getElementById('right-shoulder').setAttribute('cy', rightShoulderY);
    
    document.getElementById('left-upper-arm').setAttribute('d', 
        `M${leftShoulderX},${leftShoulderY} L${leftElbowX},${leftElbowY}`
    );
    document.getElementById('right-upper-arm').setAttribute('d', 
        `M${rightShoulderX},${rightShoulderY} L${rightElbowX},${rightElbowY}`
    );
    
    document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
    document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
    document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
    document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
    
    document.getElementById('left-forearm').setAttribute('d', 
        `M${leftElbowX},${leftElbowY} L${leftHandX},${leftHandY}`
    );
    document.getElementById('right-forearm').setAttribute('d', 
        `M${rightElbowX},${rightElbowY} L${rightHandX},${rightHandY}`
    );
    
    document.getElementById('left-hand').setAttribute('cx', leftHandX);
    document.getElementById('left-hand').setAttribute('cy', leftHandY);
    document.getElementById('right-hand').setAttribute('cx', rightHandX);
    document.getElementById('right-hand').setAttribute('cy', rightHandY);
}

/**
 * Interpolation entre deux positions
 * @param {Object} startPos - Position de départ
 * @param {Object} endPos - Position d'arrivée
 * @param {number} factor - Facteur d'interpolation (0 à 1)
 */
function interpolatePositions(startPos, endPos, factor) {
    // Tête
    const headX = startPos.head.cx + (endPos.head.cx - startPos.head.cx) * factor;
    const headY = startPos.head.cy + (endPos.head.cy - startPos.head.cy) * factor;
    document.getElementById('head').setAttribute('cx', headX);
    document.getElementById('head').setAttribute('cy', headY);
    
    // Cou
    const startNeck = startPos.neck.path.split(' ');
    const endNeck = endPos.neck.path.split(' ');
    
    if (startNeck.length >= 2 && endNeck.length >= 2) {
        const startNeckPt1 = startNeck[0].replace('M', '').split(',');
        const startNeckPt2 = startNeck[1].replace('L', '').split(',');
        const endNeckPt1 = endNeck[0].replace('M', '').split(',');
        const endNeckPt2 = endNeck[1].replace('L', '').split(',');
        
        const neckX1 = parseFloat(startNeckPt1[0]) + (parseFloat(endNeckPt1[0]) - parseFloat(startNeckPt1[0])) * factor;
        const neckY1 = parseFloat(startNeckPt1[1]) + (parseFloat(endNeckPt1[1]) - parseFloat(startNeckPt1[1])) * factor;
        const neckX2 = parseFloat(startNeckPt2[0]) + (parseFloat(endNeckPt2[0]) - parseFloat(startNeckPt2[0])) * factor;
        const neckY2 = parseFloat(startNeckPt2[1]) + (parseFloat(endNeckPt2[1]) - parseFloat(startNeckPt2[1])) * factor;
        
        document.getElementById('neck').setAttribute('d', `M${neckX1},${neckY1} L${neckX2},${neckY2}`);
    }
    
    // Épaules
    const leftShoulderX = startPos.leftShoulder.cx + (endPos.leftShoulder.cx - startPos.leftShoulder.cx) * factor;
    const leftShoulderY = startPos.leftShoulder.cy + (endPos.leftShoulder.cy - startPos.leftShoulder.cy) * factor;
    const rightShoulderX = startPos.rightShoulder.cx + (endPos.rightShoulder.cx - startPos.rightShoulder.cx) * factor;
    const rightShoulderY = startPos.rightShoulder.cy + (endPos.rightShoulder.cy - startPos.rightShoulder.cy) * factor;
    
    document.getElementById('left-shoulder').setAttribute('cx', leftShoulderX);
    document.getElementById('left-shoulder').setAttribute('cy', leftShoulderY);
    document.getElementById('right-shoulder').setAttribute('cx', rightShoulderX);
    document.getElementById('right-shoulder').setAttribute('cy', rightShoulderY);
    
    // Torse
    const startTorso = startPos.torso.path.split(' ');
    const endTorso = endPos.torso.path.split(' ');
    
    if (startTorso.length >= 5 && endTorso.length >= 5) {
        const startTorsoPoints = extractPoints(startTorso);
        const endTorsoPoints = extractPoints(endTorso);
        
        if (startTorsoPoints.length >= 4 && endTorsoPoints.length >= 4) {
            let newTorsoPath = "M";
            
            for (let i = 0; i < 4; i++) {
                const x = parseFloat(startTorsoPoints[i][0]) + (parseFloat(endTorsoPoints[i][0]) - parseFloat(startTorsoPoints[i][0])) * factor;
                const y = parseFloat(startTorsoPoints[i][1]) + (parseFloat(endTorsoPoints[i][1]) - parseFloat(startTorsoPoints[i][1])) * factor;
                
                newTorsoPath += (i == 0 ? "" : " L") + `${x},${y}`;
            }
            
            newTorsoPath += " Z";
            document.getElementById('torso').setAttribute('d', newTorsoPath);
        }
    }
    
    // Hanches
    const startHips = startPos.hips.path.split(' ');
    const endHips = endPos.hips.path.split(' ');
    
    if (startHips.length >= 5 && endHips.length >= 5) {
        const startHipsPoints = extractPoints(startHips);
        const endHipsPoints = extractPoints(endHips);
        
        if (startHipsPoints.length >= 4 && endHipsPoints.length >= 4) {
            let newHipsPath = "M";
            
            for (let i = 0; i < 4; i++) {
                const x = parseFloat(startHipsPoints[i][0]) + (parseFloat(endHipsPoints[i][0]) - parseFloat(startHipsPoints[i][0])) * factor;
                const y = parseFloat(startHipsPoints[i][1]) + (parseFloat(endHipsPoints[i][1]) - parseFloat(startHipsPoints[i][1])) * factor;
                
                newHipsPath += (i == 0 ? "" : " L") + `${x},${y}`;
            }
            
            newHipsPath += " Z";
            document.getElementById('hips').setAttribute('d', newHipsPath);
        }
    }
    
    // Cuisses
    interpolatePath('left-thigh', startPos.leftThigh.path, endPos.leftThigh.path, factor);
    interpolatePath('right-thigh', startPos.rightThigh.path, endPos.rightThigh.path, factor);
    
    // Genoux
    const leftKneeX = startPos.leftKnee.cx + (endPos.leftKnee.cx - startPos.leftKnee.cx) * factor;
    const leftKneeY = startPos.leftKnee.cy + (endPos.leftKnee.cy - startPos.leftKnee.cy) * factor;
    const rightKneeX = startPos.rightKnee.cx + (endPos.rightKnee.cx - startPos.rightKnee.cx) * factor;
    const rightKneeY = startPos.rightKnee.cy + (endPos.rightKnee.cy - startPos.rightKnee.cy) * factor;
    
    document.getElementById('left-knee').setAttribute('cx', leftKneeX);
    document.getElementById('left-knee').setAttribute('cy', leftKneeY);
    document.getElementById('right-knee').setAttribute('cx', rightKneeX);
    document.getElementById('right-knee').setAttribute('cy', rightKneeY);
    
    // Mollets
    interpolatePath('left-calf', startPos.leftCalf.path, endPos.leftCalf.path, factor);
    interpolatePath('right-calf', startPos.rightCalf.path, endPos.rightCalf.path, factor);
    
    // Pieds
    const leftFootX = startPos.leftFoot.cx + (endPos.leftFoot.cx - startPos.leftFoot.cx) * factor;
    const leftFootY = startPos.leftFoot.cy + (endPos.leftFoot.cy - startPos.leftFoot.cy) * factor;
    const rightFootX = startPos.rightFoot.cx + (endPos.rightFoot.cx - startPos.rightFoot.cx) * factor;
    const rightFootY = startPos.rightFoot.cy + (endPos.rightFoot.cy - startPos.rightFoot.cy) * factor;
    
    document.getElementById('left-foot').setAttribute('cx', leftFootX);
    document.getElementById('left-foot').setAttribute('cy', leftFootY);
    document.getElementById('right-foot').setAttribute('cx', rightFootX);
    document.getElementById('right-foot').setAttribute('cy', rightFootY);
}

/**
 * Applique la position debout
 */
function applyStandingPosition() {
    // Tête et cou
    document.getElementById('head').setAttribute('cx', standingPositions.head.cx);
    document.getElementById('head').setAttribute('cy', standingPositions.head.cy);
    document.getElementById('neck').setAttribute('d', standingPositions.neck.path);
    
    // Épaules
    document.getElementById('left-shoulder').setAttribute('cx', standingPositions.leftShoulder.cx);
    document.getElementById('left-shoulder').setAttribute('cy', standingPositions.leftShoulder.cy);
    document.getElementById('right-shoulder').setAttribute('cx', standingPositions.rightShoulder.cx);
    document.getElementById('right-shoulder').setAttribute('cy', standingPositions.rightShoulder.cy);
    
    // Torse et hanches
    document.getElementById('torso').setAttribute('d', standingPositions.torso.path);
    document.getElementById('hips').setAttribute('d', standingPositions.hips.path);
    
    // Jambes
    document.getElementById('left-thigh').setAttribute('d', standingPositions.leftThigh.path);
    document.getElementById('right-thigh').setAttribute('d', standingPositions.rightThigh.path);
    document.getElementById('left-knee').setAttribute('cx', standingPositions.leftKnee.cx);
    document.getElementById('left-knee').setAttribute('cy', standingPositions.leftKnee.cy);
    document.getElementById('right-knee').setAttribute('cx', standingPositions.rightKnee.cx);
    document.getElementById('right-knee').setAttribute('cy', standingPositions.rightKnee.cy);
    document.getElementById('left-calf').setAttribute('d', standingPositions.leftCalf.path);
    document.getElementById('right-calf').setAttribute('d', standingPositions.rightCalf.path);
    document.getElementById('left-foot').setAttribute('cx', standingPositions.leftFoot.cx);
    document.getElementById('left-foot').setAttribute('cy', standingPositions.leftFoot.cy);
    document.getElementById('right-foot').setAttribute('cx', standingPositions.rightFoot.cx);
    document.getElementById('right-foot').setAttribute('cy', standingPositions.rightFoot.cy);
}

/**
 * Extrait les points d'un chemin SVG
 * @param {Array} pathArray - Tableau des parties du chemin SVG
 * @returns {Array} - Tableau des coordonnées
 */
function extractPoints(pathArray) {
    const points = [];
    
    for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i].includes('M') || pathArray[i].includes('L') || pathArray[i].includes('Z')) {
            const point = pathArray[i].replace('M', '').replace('L', '').replace('Z', '');
            if (point) {
                points.push(point.split(','));
            }
        }
    }
    
    return points;
}

/**
 * Interpole un chemin SVG entre deux valeurs
 * @param {string} elementId - ID de l'élément SVG
 * @param {string} startPath - Chemin de départ
 * @param {string} endPath - Chemin d'arrivée
 * @param {number} factor - Facteur d'interpolation (0 à 1)
 */
function interpolatePath(elementId, startPath, endPath, factor) {
    const startPoints = startPath.split(' ');
    const endPoints = endPath.split(' ');
    
    if (startPoints.length >= 2 && endPoints.length >= 2) {
        const startPt1 = startPoints[0].replace('M', '').split(',');
        const startPt2 = startPoints[1].replace('L', '').split(',');
        const endPt1 = endPoints[0].replace('M', '').split(',');
        const endPt2 = endPoints[1].replace('L', '').split(',');
        
        const x1 = parseFloat(startPt1[0]) + (parseFloat(endPt1[0]) - parseFloat(startPt1[0])) * factor;
        const y1 = parseFloat(startPt1[1]) + (parseFloat(endPt1[1]) - parseFloat(startPt1[1])) * factor;
        const x2 = parseFloat(startPt2[0]) + (parseFloat(endPt2[0]) - parseFloat(startPt2[0])) * factor;
        const y2 = parseFloat(startPt2[1]) + (parseFloat(endPt2[1]) - parseFloat(startPt2[1])) * factor;
        
        document.getElementById(elementId).setAttribute('d', `M${x1},${y1} L${x2},${y2}`);
    }
}

/**
 * Animation pour la flexion du tronc vers l'avant en position assise
 */
function animateTrunkForwardBendSitting(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateTrunkForwardBendSitting);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 4000; // 4 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Calculer la flexion
    let flexionFactor;
    
    if (progress < 0.3) {
        // Flexion vers l'avant
        flexionFactor = easeInOutQuad(progress / 0.3) * 0.4; // 0 à 0.4
    } else if (progress < 0.7) {
        // Maintien en position fléchie
        flexionFactor = 0.4;
    } else {
        // Retour à la position initiale
        flexionFactor = 0.4 - easeInOutQuad((progress - 0.7) / 0.3) * 0.4; // 0.4 à 0
    }
    
    // Appliquer la flexion du tronc
    adjustUpperBodyForwardTilt(flexionFactor, sittingPositions);
    
    // Fléchir légèrement les bras en avant
    const torsoPath = document.getElementById('torso').getAttribute('d').split(' ');
    const points = extractPoints(torsoPath);
    
    if (points.length >= 4) {
        const leftShoulderX = parseFloat(points[0][0]);
        const leftShoulderY = parseFloat(points[0][1]);
        const rightShoulderX = parseFloat(points[1][0]);
        const rightShoulderY = parseFloat(points[1][1]);
        
        // Positions des coudes en flexion
        const leftElbowX = leftShoulderX + 15 * flexionFactor;
        const leftElbowY = leftShoulderY + 40 * flexionFactor;
        const rightElbowX = rightShoulderX - 15 * flexionFactor;
        const rightElbowY = rightShoulderY + 40 * flexionFactor;
        
        // Positions des mains en flexion
        const leftHandX = leftElbowX + 30 * flexionFactor;
        const leftHandY = leftElbowY + 30 * flexionFactor;
        const rightHandX = rightElbowX - 30 * flexionFactor;
        const rightHandY = rightElbowY + 30 * flexionFactor;
        
        // Mise à jour des bras
        document.getElementById('left-upper-arm').setAttribute('d', 
            `M${leftShoulderX},${leftShoulderY} L${leftElbowX},${leftElbowY}`
        );
        document.getElementById('right-upper-arm').setAttribute('d', 
            `M${rightShoulderX},${rightShoulderY} L${rightElbowX},${rightElbowY}`
        );
        
        document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
        document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
        document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
        document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
        
        document.getElementById('left-forearm').setAttribute('d', 
            `M${leftElbowX},${leftElbowY} L${leftHandX},${leftHandY}`
        );
        document.getElementById('right-forearm').setAttribute('d', 
            `M${rightElbowX},${rightElbowY} L${rightHandX},${rightHandY}`
        );
        
        document.getElementById('left-hand').setAttribute('cx', leftHandX);
        document.getElementById('left-hand').setAttribute('cy', leftHandY);
        document.getElementById('right-hand').setAttribute('cx', rightHandX);
        document.getElementById('right-hand').setAttribute('cy', rightHandY);
    }
    
    currentAnimation = requestAnimationFrame(animateTrunkForwardBendSitting);
}

/**
 * Animation basique pour la flexion du tronc vers l'avant
 */
function animateTrunkForwardBend(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateTrunkForwardBend);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 4000; // 4 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Calculer la flexion
    let flexionFactor;
    
    if (progress < 0.3) {
        // Flexion vers l'avant
        flexionFactor = easeInOutQuad(progress / 0.3) * 0.5; // 0 à 0.5
    } else if (progress < 0.7) {
        // Maintien en position fléchie
        flexionFactor = 0.5;
    } else {
        // Retour à la position initiale
        flexionFactor = 0.5 - easeInOutQuad((progress - 0.7) / 0.3) * 0.5; // 0.5 à 0
    }
    
    // Appliquer la flexion du tronc
    adjustUpperBodyForwardTilt(flexionFactor, standingPositions);
    
    // Fléchir les genoux pour accompagner le mouvement
    const kneesBendFactor = flexionFactor * 0.3;
    
    // Position des genoux fléchis
    const leftKneeX = standingPositions.leftKnee.cx;
    const leftKneeY = standingPositions.leftKnee.cy - 20 * kneesBendFactor;
    const rightKneeX = standingPositions.rightKnee.cx;
    const rightKneeY = standingPositions.rightKnee.cy - 20 * kneesBendFactor;
    
    // Mise à jour des genoux
    document.getElementById('left-knee').setAttribute('cy', leftKneeY);
    document.getElementById('right-knee').setAttribute('cy', rightKneeY);
    
    // Mise à jour des cuisses
    const hipsPath = document.getElementById('hips').getAttribute('d').split(' ');
    const hipsPoints = extractPoints(hipsPath);
    
    if (hipsPoints.length >= 4) {
        const leftHipX = parseFloat(hipsPoints[0][0]);
        const leftHipY = parseFloat(hipsPoints[0][1]);
        const rightHipX = parseFloat(hipsPoints[1][0]);
        const rightHipY = parseFloat(hipsPoints[1][1]);
        
        document.getElementById('left-thigh').setAttribute('d', 
            `M${leftHipX},${leftHipY} L${leftKneeX},${leftKneeY}`
        );
        document.getElementById('right-thigh').setAttribute('d', 
            `M${rightHipX},${rightHipY} L${rightKneeX},${rightKneeY}`
        );
    }
    
    // Mise à jour des mollets et pieds
    document.getElementById('left-calf').setAttribute('d', 
        `M${leftKneeX},${leftKneeY} L${standingPositions.leftFoot.cx},${standingPositions.leftFoot.cy}`
    );
    document.getElementById('right-calf').setAttribute('d', 
        `M${rightKneeX},${rightKneeY} L${standingPositions.rightFoot.cx},${standingPositions.rightFoot.cy}`
    );
    
    currentAnimation = requestAnimationFrame(animateTrunkForwardBend);
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
    
    // Ajustement du cou en fonction de la position actuelle
    if (animationState.currentPosition === 'standing' || animationState.currentPosition === 'sitting') {
        document.getElementById('neck').setAttribute('d', 
            `M150,${parseFloat(initialPositions.neck.path.split(',')[1]) - headMovement} L150,${parseFloat(initialPositions.neck.path.split(' ')[1].split(',')[1]) - shoulderMovement}`
        );
    } else if (animationState.currentPosition === 'lying') {
        document.getElementById('neck').setAttribute('d', 
            `M${parseFloat(initialPositions.neck.path.split(',')[0].replace('M', '')) - headMovement},150 L${parseFloat(initialPositions.neck.path.split(' ')[1].split(',')[0])},150`
        );
    }
    
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
    
    // Ajuster la position des bras en fonction de la position assise ou debout
    let frontOffsetY = 0;
    if (animationState.currentPosition === 'sitting') {
        frontOffsetY = -70; // Lever les bras plus haut en position assise
    }
    
    // Bras tendus devant
    const leftElbowX = leftShoulderX + (150 - leftShoulderX) * 0.5;
    const leftElbowY = leftShoulderY + frontOffsetY;
    const rightElbowX = rightShoulderX - (rightShoulderX - 150) * 0.5;
    const rightElbowY = rightShoulderY + frontOffsetY;
    
    // Calculer les positions des mains avec des cercles
    const leftHandX = leftElbowX + (150 - 25 - leftElbowX) + radius * Math.cos(angle);
    const leftHandY = leftElbowY + radius * Math.sin(angle);
    
    const rightHandX = rightElbowX + (150 + 25 - rightElbowX) + radius * Math.cos(angle);
    const rightHandY = rightElbowY + radius * Math.sin(angle);
    
    // Mettre à jour les bras
    updateArmsForArmRaises(
        leftShoulderX, leftShoulderY, leftElbowX, leftElbowY, leftHandX, leftHandY,
        rightShoulderX, rightShoulderY, rightElbowX, rightElbowY, rightHandX, rightHandY
    );
    
    currentAnimation = requestAnimationFrame(animateWristCircles);
}

/**
 * Animation pour tenir sur une jambe (améliorée avec séquence complète)
 */
function animateOneLegStand(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateOneLegStand);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 6000; // 6 secondes par cycle
    
    // Divisé en quatre phases: lever jambe droite, abaisser jambe droite, lever jambe gauche, abaisser jambe gauche
    const cycleProgress = (elapsed % duration) / duration;
    
    // Position initiale de référence
    const leftHipX = parseFloat(initialPositions.hips.path.split(' ')[0].replace('M', ''));
    const leftHipY = parseFloat(initialPositions.hips.path.split(' ')[1]);
    const rightHipX = parseFloat(initialPositions.hips.path.split(' ')[2]);
    const rightHipY = parseFloat(initialPositions.hips.path.split(' ')[3]);
    
    // Répartition du cycle:
    if (cycleProgress < 0.25) {
        // Phase 1: Lever la jambe droite (phase de montée)
        const phase = easeInOutQuad(cycleProgress * 4); // 0 à 1
        
        animationState.activeLeg = 'right';
        animationState.legPhase = 'raise';
        
        // Positions pour la jambe droite levée
        const rightKneeX = initialPositions.rightKnee.cx + 20 * phase;
        const rightKneeY = initialPositions.rightKnee.cy - 70 * phase;
        const rightFootX = initialPositions.rightFoot.cx + 20 * phase;
        const rightFootY = initialPositions.rightFoot.cy - 140 * phase;
        
        // Réinitialiser la jambe gauche
        document.getElementById('left-thigh').setAttribute('d', initialPositions.leftThigh.path);
        document.getElementById('left-knee').setAttribute('cx', initialPositions.leftKnee.cx);
        document.getElementById('left-knee').setAttribute('cy', initialPositions.leftKnee.cy);
        document.getElementById('left-calf').setAttribute('d', initialPositions.leftCalf.path);
        document.getElementById('left-foot').setAttribute('cx', initialPositions.leftFoot.cx);
        document.getElementById('left-foot').setAttribute('cy', initialPositions.leftFoot.cy);
        
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
        
    } else if (cycleProgress < 0.5) {
        // Phase 2: Abaisser la jambe droite (phase de descente)
        const phase = 1 - easeInOutQuad((cycleProgress - 0.25) * 4); // 1 à 0
        
        animationState.activeLeg = 'right';
        animationState.legPhase = 'lower';
        
        // Positions pour la jambe droite en train de s'abaisser
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
        
    } else if (cycleProgress < 0.75) {
        // Phase 3: Lever la jambe gauche (phase de montée)
        const phase = easeInOutQuad((cycleProgress - 0.5) * 4); // 0 à 1
        
        animationState.activeLeg = 'left';
        animationState.legPhase = 'raise';
        
        // Positions pour la jambe gauche levée
        const leftKneeX = initialPositions.leftKnee.cx - 20 * phase;
        const leftKneeY = initialPositions.leftKnee.cy - 70 * phase;
        const leftFootX = initialPositions.leftFoot.cx - 20 * phase;
        const leftFootY = initialPositions.leftFoot.cy - 140 * phase;
        
        // Réinitialiser la jambe droite
        document.getElementById('right-thigh').setAttribute('d', initialPositions.rightThigh.path);
        document.getElementById('right-knee').setAttribute('cx', initialPositions.rightKnee.cx);
        document.getElementById('right-knee').setAttribute('cy', initialPositions.rightKnee.cy);
        document.getElementById('right-calf').setAttribute('d', initialPositions.rightCalf.path);
        document.getElementById('right-foot').setAttribute('cx', initialPositions.rightFoot.cx);
        document.getElementById('right-foot').setAttribute('cy', initialPositions.rightFoot.cy);
        
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
        
    } else {
        // Phase 4: Abaisser la jambe gauche (phase de descente)
        const phase = 1 - easeInOutQuad((cycleProgress - 0.75) * 4); // 1 à 0
        
        animationState.activeLeg = 'left';
        animationState.legPhase = 'lower';
        
        // Positions pour la jambe gauche en train de s'abaisser
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
    }
    
    // Appliquer les mouvements des bras pour l'équilibre quelle que soit la phase
    // Bras écartés pour l'équilibre
    const armPhase = Math.min(1, cycleProgress * 4); // Atteindre rapidement la position d'équilibre
    const leftElbowX = initialPositions.leftElbow.cx - 30 * armPhase;
    const rightElbowX = initialPositions.rightElbow.cx + 30 * armPhase;
    const leftHandX = initialPositions.leftHand.cx - 60 * armPhase;
    const rightHandX = initialPositions.rightHand.cx + 60 * armPhase;
    
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
    
    // Ajuster légèrement le cou selon la position
    if (animationState.currentPosition === 'standing' || animationState.currentPosition === 'sitting') {
        // Pour les positions debout et assise, le cou est vertical
        document.getElementById('neck').setAttribute('d', 
            `M${initialPositions.head.cx + headRotation * 0.3},${initialPositions.neck.path.split(',')[1]} L150,${initialPositions.neck.path.split(' ')[1].split(',')[1]}`
        );
    } else if (animationState.currentPosition === 'lying') {
        // Pour la position couchée, le cou est horizontal
        document.getElementById('neck').setAttribute('d', 
            `M${initialPositions.neck.path.split(',')[0].replace('M', '')},${initialPositions.head.cy + headRotation * 0.3} L${initialPositions.neck.path.split(' ')[1].split(',')[0]},150`
        );
    }
    
    currentAnimation = requestAnimationFrame(animateHeadTurns);
}

/**
 * Animation pour soulever les jambes en position assise
 */
function animateLegRaisesSitting(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateLegRaisesSitting);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 6000; // 6 secondes par cycle
    
    // Divisé en quatre phases: lever jambe droite, abaisser jambe droite, lever jambe gauche, abaisser jambe gauche
    const cycleProgress = (elapsed % duration) / duration;
    
    // Position initiale de référence
    const leftHipX = initialPositions.leftThigh.path.split(' ')[0].replace('M', '');
    const leftHipY = initialPositions.leftThigh.path.split(' ')[1];
    const rightHipX = initialPositions.rightThigh.path.split(' ')[0].replace('M', '');
    const rightHipY = initialPositions.rightThigh.path.split(' ')[1];
    
    // Répartition du cycle:
    if (cycleProgress < 0.25) {
        // Phase 1: Lever la jambe droite en position assise
        const phase = easeInOutQuad(cycleProgress * 4); // 0 à 1
        
        // En position assise, lever la jambe signifie la tendre
        const rightKneeX = initialPositions.rightKnee.cx - (initialPositions.rightKnee.cx - 170) * phase;
        const rightKneeY = initialPositions.rightKnee.cy;
        const rightFootX = initialPositions.rightFoot.cx - (initialPositions.rightFoot.cx - 140) * phase;
        const rightFootY = initialPositions.rightFoot.cy - 10 * phase;
        
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
        
    } else if (cycleProgress < 0.5) {
        // Phase 2: Abaisser la jambe droite
        const phase = 1 - easeInOutQuad((cycleProgress - 0.25) * 4); // 1 à 0
        
        // En position assise, abaisser la jambe signifie la plier
        const rightKneeX = initialPositions.rightKnee.cx - (initialPositions.rightKnee.cx - 170) * phase;
        const rightKneeY = initialPositions.rightKnee.cy;
        const rightFootX = initialPositions.rightFoot.cx - (initialPositions.rightFoot.cx - 140) * phase;
        const rightFootY = initialPositions.rightFoot.cy - 10 * phase;
        
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
        
    } else if (cycleProgress < 0.75) {
        // Phase 3: Lever la jambe gauche
        const phase = easeInOutQuad((cycleProgress - 0.5) * 4); // 0 à 1
        
        // En position assise, lever la jambe signifie la tendre
        const leftKneeX = initialPositions.leftKnee.cx - (initialPositions.leftKnee.cx - 130) * phase;
        const leftKneeY = initialPositions.leftKnee.cy;
        const leftFootX = initialPositions.leftFoot.cx - (initialPositions.leftFoot.cx - 160) * phase;
        const leftFootY = initialPositions.leftFoot.cy - 10 * phase;
        
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
        
    } else {
        // Phase 4: Abaisser la jambe gauche
        const phase = 1 - easeInOutQuad((cycleProgress - 0.75) * 4); // 1 à 0
        
        // En position assise, abaisser la jambe signifie la plier
        const leftKneeX = initialPositions.leftKnee.cx - (initialPositions.leftKnee.cx - 130) * phase;
        const leftKneeY = initialPositions.leftKnee.cy;
        const leftFootX = initialPositions.leftFoot.cx - (initialPositions.leftFoot.cx - 160) * phase;
        const leftFootY = initialPositions.leftFoot.cy - 10 * phase;
        
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
    }
    
    currentAnimation = requestAnimationFrame(animateLegRaisesSitting);
}

/**
 * Animation pour soulever les jambes en position couchée
 */
function animateLegRaisesLying(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateLegRaisesLying);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 6000; // 6 secondes par cycle
    
    // Divisé en quatre phases: lever jambe droite, abaisser jambe droite, lever jambe gauche, abaisser jambe gauche
    const cycleProgress = (elapsed % duration) / duration;
    
    // Position initiale de référence (en position couchée)
    const leftHipX = initialPositions.leftThigh.path.split(' ')[0].replace('M', '');
    const leftHipY = initialPositions.leftThigh.path.split(' ')[1];
    const rightHipX = initialPositions.rightThigh.path.split(' ')[0].replace('M', '');
    const rightHipY = initialPositions.rightThigh.path.split(' ')[1];
    
    // Répartition du cycle:
    if (cycleProgress < 0.25) {
        // Phase 1: Lever la jambe droite en position couchée
        const phase = easeInOutQuad(cycleProgress * 4); // 0 à 1
        
        // En position couchée, lever la jambe signifie la monter verticalement
        const rightKneeX = initialPositions.rightKnee.cx;
        const rightKneeY = initialPositions.rightKnee.cy - 40 * phase;
        const rightFootX = initialPositions.rightFoot.cx;
        const rightFootY = initialPositions.rightFoot.cy - 80 * phase;
        
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
        
    } else if (cycleProgress < 0.5) {
        // Phase 2: Abaisser la jambe droite
        const phase = 1 - easeInOutQuad((cycleProgress - 0.25) * 4); // 1 à 0
        
        // En position couchée, abaisser la jambe signifie la ramener à l'horizontale
        const rightKneeX = initialPositions.rightKnee.cx;
        const rightKneeY = initialPositions.rightKnee.cy - 40 * phase;
        const rightFootX = initialPositions.rightFoot.cx;
        const rightFootY = initialPositions.rightFoot.cy - 80 * phase;
        
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
        
    } else if (cycleProgress < 0.75) {
        // Phase 3: Lever la jambe gauche
        const phase = easeInOutQuad((cycleProgress - 0.5) * 4); // 0 à 1
        
        // En position couchée, lever la jambe signifie la monter verticalement
        const leftKneeX = initialPositions.leftKnee.cx;
        const leftKneeY = initialPositions.leftKnee.cy - 40 * phase;
        const leftFootX = initialPositions.leftFoot.cx;
        const leftFootY = initialPositions.leftFoot.cy - 80 * phase;
        
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
        
    } else {
        // Phase 4: Abaisser la jambe gauche
        const phase = 1 - easeInOutQuad((cycleProgress - 0.75) * 4); // 1 à 0
        
        // En position couchée, abaisser la jambe signifie la ramener à l'horizontale
        const leftKneeX = initialPositions.leftKnee.cx;
        const leftKneeY = initialPositions.leftKnee.cy - 40 * phase;
        const leftFootX = initialPositions.leftFoot.cx;
        const leftFootY = initialPositions.leftFoot.cy - 80 * phase;
        
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
    }
    
    currentAnimation = requestAnimationFrame(animateLegRaisesLying);
}

/**
 * Animation pour la rotation du tronc en position assise
 */
function animateTrunkRotationSitting(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateTrunkRotationSitting);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 4000; // 4 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Angle pour la rotation du tronc
    const angle = Math.sin(progress * Math.PI * 2) * 30; // -30 à 30 degrés
    
    // Calculer la rotation du tronc
    const torso = document.getElementById('torso');
    const torsoPath = initialPositions.torso.path.split(' ');
    const hipsPath = initialPositions.hips.path.split(' ');
    
    // Centre de rotation (approximativement au centre du bassin)
    const centerX = 150;
    const centerY = initialPositions.hips.path.split(' ')[1];
    
    // Calculer les nouvelles positions des épaules avec rotation
    const leftShoulderX = centerX + (initialPositions.leftShoulder.cx - centerX) * Math.cos(angle * Math.PI/180) - 
                          (initialPositions.leftShoulder.cy - centerY) * Math.sin(angle * Math.PI/180);
    const leftShoulderY = centerY + (initialPositions.leftShoulder.cx - centerX) * Math.sin(angle * Math.PI/180) + 
                          (initialPositions.leftShoulder.cy - centerY) * Math.cos(angle * Math.PI/180);
    
    const rightShoulderX = centerX + (initialPositions.rightShoulder.cx - centerX) * Math.cos(angle * Math.PI/180) - 
                           (initialPositions.rightShoulder.cy - centerY) * Math.sin(angle * Math.PI/180);
    const rightShoulderY = centerY + (initialPositions.rightShoulder.cx - centerX) * Math.sin(angle * Math.PI/180) + 
                           (initialPositions.rightShoulder.cy - centerY) * Math.cos(angle * Math.PI/180);
    
    // Mettre à jour les positions des épaules
    document.getElementById('left-shoulder').setAttribute('cx', leftShoulderX);
    document.getElementById('left-shoulder').setAttribute('cy', leftShoulderY);
    document.getElementById('right-shoulder').setAttribute('cx', rightShoulderX);
    document.getElementById('right-shoulder').setAttribute('cy', rightShoulderY);
    
    // Mettre à jour le torse
    const topLeft = `M${leftShoulderX},${leftShoulderY}`;
    const topRight = `${rightShoulderX},${rightShoulderY}`;
    const bottomRight = torsoPath[2];
    const bottomLeft = torsoPath[3];
    
    torso.setAttribute('d', `${topLeft} L${topRight} L${bottomRight} L${bottomLeft} Z`);
    
    // Ajuster la tête et le cou
    const headX = centerX + (initialPositions.head.cx - centerX) * Math.cos(angle * Math.PI/180);
    document.getElementById('head').setAttribute('cx', headX);
    
    document.getElementById('neck').setAttribute('d', 
        `M${headX},${initialPositions.neck.path.split(',')[1]} L${(leftShoulderX + rightShoulderX) / 2},${(leftShoulderY + rightShoulderY) / 2}`
    );
    
    // Ajuster les bras
    updateArmsForArmRaises(
        leftShoulderX, leftShoulderY, leftShoulderX - 30, leftShoulderY + 50, leftShoulderX - 60, leftShoulderY + 60,
        rightShoulderX, rightShoulderY, rightShoulderX + 30, rightShoulderY + 50, rightShoulderX + 60, rightShoulderY + 60
    );
    
    currentAnimation = requestAnimationFrame(animateTrunkRotationSitting);
}

/**
 * Animation pour les exercices de respiration abdominale en position allongée
 */
function animateAbdominalBreathingLying(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateAbdominalBreathingLying);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 5000; // 5 secondes par cycle
    const progress = (elapsed % duration) / duration;
    
    // Calculer le mouvement de respiration
    let breathMovement;
    
    if (progress < 0.4) {
        // Inspiration (gonflement du ventre)
        breathMovement = easeInOutQuad(progress / 0.4) * 10;
    } else if (progress < 0.6) {
        // Maintien
        breathMovement = 10;
    } else {
        // Expiration (lente)
        breathMovement = 10 - easeInOutQuad((progress - 0.6) / 0.4) * 10;
    }
    
    // Calculer les nouvelles dimensions du torse
    const torsoPath = initialPositions.torso.path.split(' ');
    const centerX = (parseFloat(torsoPath[0].replace('M', '')) + parseFloat(torsoPath[2])) / 2;
    
    // Gonfler le torse horizontalement (en position allongée)
    const leftOffset = breathMovement;
    const rightOffset = breathMovement;
    
    // Mettre à jour le torse avec le gonflement
    document.getElementById('torso').setAttribute('d', 
        `${torsoPath[0]} L${torsoPath[1]} L${parseFloat(torsoPath[2]) + rightOffset},${torsoPath[3].split(',')[1]} L${parseFloat(torsoPath[0].replace('M', '')) - leftOffset},${torsoPath[3].split(',')[1]} Z`
    );
    
    // Ajouter mouvement léger aux bras pour accompagner la respiration
    const leftHandY = initialPositions.leftHand.cy - breathMovement * 0.3;
    const rightHandY = initialPositions.rightHand.cy + breathMovement * 0.3;
    
    document.getElementById('left-hand').setAttribute('cy', leftHandY);
    document.getElementById('right-hand').setAttribute('cy', rightHandY);
    
    // Ajuster légèrement les bras pour suivre les mains
    const leftElbowY = initialPositions.leftElbow.cy - breathMovement * 0.15;
    const rightElbowY = initialPositions.rightElbow.cy + breathMovement * 0.15;
    
    document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
    document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
    
    document.getElementById('left-forearm').setAttribute('d', 
        `M${initialPositions.leftElbow.cx},${leftElbowY} L${initialPositions.leftHand.cx},${leftHandY}`
    );
    document.getElementById('right-forearm').setAttribute('d', 
        `M${initialPositions.rightElbow.cx},${rightElbowY} L${initialPositions.rightHand.cx},${rightHandY}`
    );
    
    currentAnimation = requestAnimationFrame(animateAbdominalBreathingLying);
}

/**
 * Animation pour ramener le genou vers la poitrine en position allongée
 */
function animateKneeToChestLying(timestamp) {
    if (animationPaused) {
        currentAnimation = requestAnimationFrame(animateKneeToChestLying);
        return;
    }
    
    const elapsed = timestamp - startTime;
    const duration = 6000; // 6 secondes par cycle
    
    // Divisé en quatre phases: lever genou droit, abaisser genou droit, lever genou gauche, abaisser genou gauche
    const cycleProgress = (elapsed % duration) / duration;
    
    // Position initiale de référence (en position couchée)
    const leftHipX = initialPositions.leftThigh.path.split(' ')[0].replace('M', '');
    const leftHipY = initialPositions.leftThigh.path.split(' ')[1];
    const rightHipX = initialPositions.rightThigh.path.split(' ')[0].replace('M', '');
    const rightHipY = initialPositions.rightThigh.path.split(' ')[1];
    
    // Répartition du cycle:
    if (cycleProgress < 0.25) {
        // Phase 1: Ramener le genou droit vers la poitrine
        const phase = easeInOutQuad(cycleProgress * 4); // 0 à 1
        
        // Position pour le genou droit ramené vers la poitrine
        const rightKneeX = initialPositions.rightKnee.cx - 80 * phase;
        const rightKneeY = initialPositions.rightKnee.cy - 30 * phase;
        const rightFootX = initialPositions.rightFoot.cx - 40 * phase;
        const rightFootY = initialPositions.rightFoot.cy - 10 * phase;
        
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
        
        // Déplacer la main droite pour "tenir" le genou
        const rightHandX = rightKneeX;
        const rightHandY = rightKneeY - 15;
        
        // Ajuster le bras droit pour atteindre le genou
        const rightElbowX = initialPositions.rightElbow.cx - 20 * phase;
        const rightElbowY = initialPositions.rightElbow.cy - 10 * phase;
        
        document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
        document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
        
        document.getElementById('right-upper-arm').setAttribute('d', 
            `M${initialPositions.rightShoulder.cx},${initialPositions.rightShoulder.cy} L${rightElbowX},${rightElbowY}`
        );
        
        document.getElementById('right-forearm').setAttribute('d', 
            `M${rightElbowX},${rightElbowY} L${rightHandX},${rightHandY}`
        );
        
        document.getElementById('right-hand').setAttribute('cx', rightHandX);
        document.getElementById('right-hand').setAttribute('cy', rightHandY);
        
    } else if (cycleProgress < 0.5) {
        // Phase 2: Relâcher le genou droit
        const phase = 1 - easeInOutQuad((cycleProgress - 0.25) * 4); // 1 à 0
        
        // Position pour le genou droit qui revient à sa position initiale
        const rightKneeX = initialPositions.rightKnee.cx - 80 * phase;
        const rightKneeY = initialPositions.rightKnee.cy - 30 * phase;
        const rightFootX = initialPositions.rightFoot.cx - 40 * phase;
        const rightFootY = initialPositions.rightFoot.cy - 10 * phase;
        
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
        
        // Ramener la main droite à sa position initiale
        const rightHandX = rightKneeX * phase + initialPositions.rightHand.cx * (1 - phase);
        const rightHandY = (rightKneeY - 15) * phase + initialPositions.rightHand.cy * (1 - phase);
        
        // Ajuster le bras droit
        const rightElbowX = initialPositions.rightElbow.cx - 20 * phase;
        const rightElbowY = initialPositions.rightElbow.cy - 10 * phase;
        
        document.getElementById('right-elbow').setAttribute('cx', rightElbowX);
        document.getElementById('right-elbow').setAttribute('cy', rightElbowY);
        
        document.getElementById('right-upper-arm').setAttribute('d', 
            `M${initialPositions.rightShoulder.cx},${initialPositions.rightShoulder.cy} L${rightElbowX},${rightElbowY}`
        );
        
        document.getElementById('right-forearm').setAttribute('d', 
            `M${rightElbowX},${rightElbowY} L${rightHandX},${rightHandY}`
        );
        
        document.getElementById('right-hand').setAttribute('cx', rightHandX);
        document.getElementById('right-hand').setAttribute('cy', rightHandY);
        
    } else if (cycleProgress < 0.75) {
        // Phase 3: Ramener le genou gauche vers la poitrine
        const phase = easeInOutQuad((cycleProgress - 0.5) * 4); // 0 à 1
        
        // Position pour le genou gauche ramené vers la poitrine
        const leftKneeX = initialPositions.leftKnee.cx - 80 * phase;
        const leftKneeY = initialPositions.leftKnee.cy - 30 * phase;
        const leftFootX = initialPositions.leftFoot.cx - 40 * phase;
        const leftFootY = initialPositions.leftFoot.cy - 10 * phase;
        
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
        
        // Déplacer la main gauche pour "tenir" le genou
        const leftHandX = leftKneeX;
        const leftHandY = leftKneeY - 15;
        
        // Ajuster le bras gauche pour atteindre le genou
        const leftElbowX = initialPositions.leftElbow.cx - 20 * phase;
        const leftElbowY = initialPositions.leftElbow.cy - 10 * phase;
        
        document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
        document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
        
        document.getElementById('left-upper-arm').setAttribute('d', 
            `M${initialPositions.leftShoulder.cx},${initialPositions.leftShoulder.cy} L${leftElbowX},${leftElbowY}`
        );
        
        document.getElementById('left-forearm').setAttribute('d', 
            `M${leftElbowX},${leftElbowY} L${leftHandX},${leftHandY}`
        );
        
        document.getElementById('left-hand').setAttribute('cx', leftHandX);
        document.getElementById('left-hand').setAttribute('cy', leftHandY);
        
    } else {
        // Phase 4: Relâcher le genou gauche
        const phase = 1 - easeInOutQuad((cycleProgress - 0.75) * 4); // 1 à 0
        
        // Position pour le genou gauche qui revient à sa position initiale
        const leftKneeX = initialPositions.leftKnee.cx - 80 * phase;
        const leftKneeY = initialPositions.leftKnee.cy - 30 * phase;
        const leftFootX = initialPositions.leftFoot.cx - 40 * phase;
        const leftFootY = initialPositions.leftFoot.cy - 10 * phase;
        
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
        
        // Ramener la main gauche à sa position initiale
        const leftHandX = leftKneeX * phase + initialPositions.leftHand.cx * (1 - phase);
        const leftHandY = (leftKneeY - 15) * phase + initialPositions.leftHand.cy * (1 - phase);
        
        // Ajuster le bras gauche
        const leftElbowX = initialPositions.leftElbow.cx - 20 * phase;
        const leftElbowY = initialPositions.leftElbow.cy - 10 * phase;
        
        document.getElementById('left-elbow').setAttribute('cx', leftElbowX);
        document.getElementById('left-elbow').setAttribute('cy', leftElbowY);
        
        document.getElementById('left-upper-arm').setAttribute('d', 
            `M${initialPositions.leftShoulder.cx},${initialPositions.leftShoulder.cy} L${leftElbowX},${leftElbowY}`
        );
        
        document.getElementById('left-forearm').setAttribute('d', 
            `M${leftElbowX},${leftElbowY} L${leftHandX},${leftHandY}`
        );
        
        document.getElementById('left-hand').setAttribute('cx', leftHandX);
        document.getElementById('left-hand').setAttribute('cy', leftHandY);
    }
    
    currentAnimation = requestAnimationFrame(animateKneeToChestLying);
}
