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
 * Démarre l'animation appropriée pour la catégorie sélectionnée
 * @param {string} category - La catégorie d'exercice à animer
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function startAnimation(category) {
    stopAnimation(); // Arrête toute animation existante
    animationPaused = false;
    
    // Choisir l'animation en fonction de la catégorie
    if (!category) {
        return null;
    }
    
    // Animation par catégorie
    if (category === 'Bradykinésie') {
        currentAnimation = animateBradykinesia();
    } else if (category.includes('Bras') || category.includes('épaules')) {
        currentAnimation = animateArmsAndShoulders();
    } else if (category.includes('Jambes') || category.includes('pieds')) {
        currentAnimation = animateLegsAndFeet();
    } else if (category.includes('quilibre')) {
        currentAnimation = animateBalance();
    } else if (category.includes('Flexibilit')) {
        currentAnimation = animateFlexibility();
    } else if (category.includes('Tête') || category.includes('cou')) {
        currentAnimation = animateHeadAndNeck();
    } else if (category === 'Tronc') {
        currentAnimation = animateTrunk();
    } else if (category.includes('Respiration')) {
        currentAnimation = animateBreathing();
    } else {
        // Animation par défaut pour les autres catégories
        currentAnimation = animateGeneral();
    }
    
    return currentAnimation;
}

/**
 * Animation pour la bradykinésie (mouvements lents)
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateBradykinesia() {
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
        const leftFootX = leftKneeX - 10 - 30 * leftLegPhase;
        const leftFootY = leftKneeY + 80 - 40 * leftLegPhase;
        
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
            const rightFootX = rightKneeX + 10 + 30 * rightLegPhase;
            const rightFootY = rightKneeY + 80 - 40 * rightLegPhase;
            
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
 * Animation pour les exercices des bras et des épaules
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateArmsAndShoulders() {
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
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateLegsAndFeet() {
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
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateBalance() {
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
 * Animation pour les exercices de flexibilité
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateFlexibility() {
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
 * Animation pour les exercices de la tête et du cou
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateHeadAndNeck() {
    let startTime = null;
    const duration = 4000; // 4 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const cyclePosition = (elapsed % duration) / duration;
        
        // Diviser le cycle en 4 segments pour différents mouvements de tête/cou
        const segment = Math.floor(cyclePosition * 4);
        const segmentProgress = (cyclePosition * 4) % 1;
        
        let headX = 100;
        let headY = 50;
        
        switch (segment) {
            case 0: // Incliner la tête à gauche
                headX = 100 - 15 * segmentProgress;
                break;
            case 1: // Revenir au centre, puis incliner à droite
                headX = 85 + 15 * segmentProgress;
                if (segmentProgress > 0.5) {
                    headX = 100 + 15 * (segmentProgress - 0.5) * 2;
                }
                break;
            case 2: // Revenir au centre, puis incliner vers l'avant
                headX = 115 - 15 * segmentProgress;
                if (segmentProgress > 0.5) {
                    headY = 50 + 10 * (segmentProgress - 0.5) * 2;
                }
                break;
            case 3: // Revenir au centre, puis incliner vers l'arrière
                headY = 55 - 5 * segmentProgress;
                if (segmentProgress > 0.5) {
                    headY = 50 - 10 * (segmentProgress - 0.5) * 2;
                }
                break;
        }
        
        // Mettre à jour la position de la tête
        document.getElementById('head').setAttribute('cx', headX);
        document.getElementById('head').setAttribute('cy', headY);
        
        // Mettre à jour le haut de la colonne vertébrale pour correspondre au mouvement de la tête (zone du cou)
        document.getElementById('spine').setAttribute('x1', headX);
        document.getElementById('spine').setAttribute('y1', headY + 20);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les exercices du tronc
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateTrunk() {
    let startTime = null;
    const duration = 5000; // 5 secondes par cycle
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const cyclePosition = (elapsed % duration) / duration;
        
        // Diviser le cycle en 3 segments : se pencher à gauche, se pencher à droite, rotation
        const segment = Math.floor(cyclePosition * 3);
        const segmentProgress = (cyclePosition * 3) % 1;
        
        const hipX = 100;
        const hipY = 150;
        let spineTopX = 100;
        let spineTopY = 70;
        
        switch (segment) {
            case 0: // Incliner le tronc à gauche
                if (segmentProgress < 0.5) {
                    // Se pencher à gauche
                    spineTopX = 100 - 20 * segmentProgress * 2;
                } else {
                    // Revenir au centre
                    spineTopX = 80 + 20 * (segmentProgress - 0.5) * 2;
                }
                break;
            case 1: // Incliner le tronc à droite
                if (segmentProgress < 0.5) {
                    // Se pencher à droite
                    spineTopX = 100 + 20 * segmentProgress * 2;
                } else {
                    // Revenir au centre
                    spineTopX = 120 - 20 * (segmentProgress - 0.5) * 2;
                }
                break;
            case 2: // Rotation du tronc (simulée par le mouvement de la colonne vertébrale)
                // Rotation en déplaçant la colonne vertébrale en petit cercle
                spineTopX = 100 + 10 * Math.sin(segmentProgress * Math.PI * 2);
                spineTopY = 70 + 5 * Math.cos(segmentProgress * Math.PI * 2);
                break;
        }
        
        // Mettre à jour la position de la colonne vertébrale et de la tête
        document.getElementById('spine').setAttribute('x1', spineTopX);
        document.getElementById('spine').setAttribute('y1', spineTopY);
        document.getElementById('head').setAttribute('cx', spineTopX);
        document.getElementById('head').setAttribute('cy', spineTopY - 20);
        
        // Déplacer les bras avec le tronc
        const shoulderX = spineTopX;
        const shoulderY = spineTopY + 20;
        
        // Ajuster le bras gauche
        document.getElementById('left-upper-arm').setAttribute('x1', shoulderX);
        document.getElementById('left-upper-arm').setAttribute('y1', shoulderY);
        const leftElbowX = shoulderX - 30;
        const leftElbowY = shoulderY + 30;
        document.getElementById('left-upper-arm').setAttribute('x2', leftElbowX);
        document.getElementById('left-upper-arm').setAttribute('y2', leftElbowY);
        document.getElementById('left-lower-arm').setAttribute('x1', leftElbowX);
        document.getElementById('left-lower-arm').setAttribute('y1', leftElbowY);
        
        // Ajuster le bras droit
        document.getElementById('right-upper-arm').setAttribute('x1', shoulderX);
        document.getElementById('right-upper-arm').setAttribute('y1', shoulderY);
        const rightElbowX = shoulderX + 30;
        const rightElbowY = shoulderY + 30;
        document.getElementById('right-upper-arm').setAttribute('x2', rightElbowX);
        document.getElementById('right-upper-arm').setAttribute('y2', rightElbowY);
        document.getElementById('right-lower-arm').setAttribute('x1', rightElbowX);
        document.getElementById('right-lower-arm').setAttribute('y1', rightElbowY);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation pour les exercices de respiration
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateBreathing() {
    let startTime = null;
    const duration = 5000; // 5 secondes par cycle de respiration
    
    function frame(timestamp) {
        if (animationPaused) {
            currentAnimation = requestAnimationFrame(frame);
            return;
        }
        
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        
        // Simuler la respiration avec l'expansion de la poitrine et le mouvement des bras
        const breathPhase = Math.sin(progress * Math.PI * 2);
        const expansion = Math.max(0, breathPhase); // Valeurs positives pour l'inspiration
        
        // Les épaules se déplacent légèrement vers le haut et vers l'extérieur pendant l'inspiration
        const shoulderOffsetY = -5 * expansion;
        const shoulderOffsetX = 5 * expansion;
        
        // Bras gauche
        document.getElementById('left-upper-arm').setAttribute('x1', '100');
        document.getElementById('left-upper-arm').setAttribute('y1', 90 + shoulderOffsetY);
        document.getElementById('left-upper-arm').setAttribute('x2', 70 - shoulderOffsetX);
        document.getElementById('left-upper-arm').setAttribute('y2', 120 + shoulderOffsetY);
        
        document.getElementById('left-lower-arm').setAttribute('x1', 70 - shoulderOffsetX);
        document.getElementById('left-lower-arm').setAttribute('y1', 120 + shoulderOffsetY);
        document.getElementById('left-lower-arm').setAttribute('x2', 50 - shoulderOffsetX);
        document.getElementById('left-lower-arm').setAttribute('y2', 150 + shoulderOffsetY);
        
        // Bras droit
        document.getElementById('right-upper-arm').setAttribute('x1', '100');
        document.getElementById('right-upper-arm').setAttribute('y1', 90 + shoulderOffsetY);
        document.getElementById('right-upper-arm').setAttribute('x2', 130 + shoulderOffsetX);
        document.getElementById('right-upper-arm').setAttribute('y2', 120 + shoulderOffsetY);
        
        document.getElementById('right-lower-arm').setAttribute('x1', 130 + shoulderOffsetX);
        document.getElementById('right-lower-arm').setAttribute('y1', 120 + shoulderOffsetY);
        document.getElementById('right-lower-arm').setAttribute('x2', 150 + shoulderOffsetX);
        document.getElementById('right-lower-arm').setAttribute('y2', 150 + shoulderOffsetY);
        
        // Légère extension de la colonne vertébrale
        document.getElementById('spine').setAttribute('y1', 70 + shoulderOffsetY);
        
        // La tête se déplace légèrement vers le haut avec la respiration
        document.getElementById('head').setAttribute('cy', 50 + shoulderOffsetY);
        
        currentAnimation = requestAnimationFrame(frame);
    }
    
    return requestAnimationFrame(frame);
}

/**
 * Animation générale pour les autres catégories d'exercices
 * @returns {number} - ID de l'animation requestAnimationFrame
 */
function animateGeneral() {
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
