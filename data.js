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
    // Ajouter les exercices du CSV qui ne sont pas déjà présents dans data.js
    // Insérer ce code juste avant la dernière ligne "return window.exercises; // Retourner les exercices pour confirmation"
    
    // Exercices bradykinésie supplémentaires
    window.exercises.push({ category: "Bradykinésie", instructions: "Debout, balancez rapidement vos bras d'avant en arrière.", animationType: "armSwing" });
    window.exercises.push({ category: "Bradykinésie", instructions: "Asseyez-vous droit. Tournez lentement votre tête vers la gauche, revenez au centre, puis tournez vers la droite.", animationType: "headTurns" });
    
    // Exercices bras et épaules supplémentaires
    window.exercises.push({ category: "Bras et épaules", instructions: "Avec vos bras le long du corps, levez-les lentement jusqu'à la hauteur des épaules, puis abaissez-les à nouveau.", animationType: "armRaises" });
    window.exercises.push({ category: "Bras et épaules", instructions: "Avec une bande élastique autour de vos poignets, étirez la bande en écartant les bras.", animationType: "armStretches" });
    window.exercises.push({ category: "Bras et épaules", instructions: "Faites de grands cercles avec vos bras, d'abord dans le sens des aiguilles d'une montre, puis dans le sens inverse.", animationType: "armCircles" });
    window.exercises.push({ category: "Bras et épaules", instructions: "Tendez vos bras sur les côtés. Faites de petits cercles dans l'air avec vos bras, d'abord dans le sens des aiguilles d'une montre, puis dans le sens inverse.", animationType: "armCircles" });
    
    // Exercices contrôle moteur
    window.exercises.push({ category: "Contrôle moteur", instructions: "Assis sur une chaise, levez une jambe. Faites des cercles avec la cheville dans le sens des aiguilles d'une montre, puis dans le sens inverse.", animationType: "ankleRotations" });
    
    // Exercices coordination
    window.exercises.push({ category: "Coordination", instructions: "Assis ou debout, lancez une balle d'une main à l'autre à une distance confortable.", animationType: "armCircles" });
    window.exercises.push({ category: "Coordination", instructions: "Pratiquez le mouvement lancer et attraper une balle en suivant les recommandations de votre kinésithérapeute.", animationType: "armCircles" });
    window.exercises.push({ category: "Coordination", instructions: "Marchez en croisant les bras opposés aux jambes: levez main droite et genou droit puis main gauche et genou gauche.", animationType: "kneeRaises" });
    window.exercises.push({ category: "Coordination", instructions: "Allongé sur le dos, levez le bras droit et la jambe gauche simultanément, puis changez pour lever le bras gauche et la jambe droite.", animationType: "legRaises" });
    window.exercises.push({ category: "Coordination", instructions: "Tenez-vous droit, transférez lentement votre poids d'un pied à l'autre.", animationType: "weightShift" });
    
    // Exercices équilibre supplémentaires
    window.exercises.push({ category: "Équilibre", instructions: "Marchez en ligne droite avec les yeux fermés pendant quelques pas, en ayant un kinésithérapeute ou un soutien à proximité.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Équilibre", instructions: "Pratiquez le mouvement marche en ligne droite les yeux fermés en suivant les recommandations de votre kinésithérapeute.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Équilibre", instructions: "Marchez en mettant d'abord le talon au sol, puis la pointe du pied.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Équilibre", instructions: "Marchez comme si vous suiviez une ligne droite imaginaire au sol.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Équilibre", instructions: "Debout, levez un pied du sol et essayez de maintenir votre équilibre avec les yeux fermés.", animationType: "oneLegStand" });
    window.exercises.push({ category: "Équilibre", instructions: "Pratiquez le mouvement station unipodale avec les yeux fermés en suivant les recommandations de votre kinésithérapeute.", animationType: "oneLegStand" });
    window.exercises.push({ category: "Équilibre", instructions: "Tenez-vous debout, soulevez une jambe et essayez de maintenir votre équilibre.", animationType: "oneLegStand" });
    
    // Exercices flexibilité et souplesse
    window.exercises.push({ category: "Flexibilité et souplesse", instructions: "Mettez-vous à genoux. Avancez un pied devant vous, en formant un angle droit avec le genou. Penchez-vous légèrement en avant, en sentant l'étirement à l'avant de la hanche de la jambe arrière.", animationType: "hamstringStretch" });
    
    // Exercices flexibilité supplémentaires
    window.exercises.push({ category: "Flexibilité", instructions: "Asseyez-vous avec une jambe tendue devant vous et l'autre pliée vers l'intérieur. Penchez-vous doucement vers la jambe tendue, en gardant le dos droit.", animationType: "hamstringStretch" });
    window.exercises.push({ category: "Flexibilité", instructions: "Asseyez-vous droit sur une chaise. Croisez les bras devant vous et arrondissez le dos, en poussant doucement les bras vers l'avant.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Flexibilité", instructions: "Tenez-vous droit. Penchez doucement votre tête vers l'épaule droite, en sentant l'étirement sur le côté gauche du cou. Changez de côté et répétez.", animationType: "headTilts" });
    
    // Exercices fonctionnels
    window.exercises.push({ category: "Fonctionnel", instructions: "Marchez en ligne droite, puis changez rapidement de direction et continuez à marcher.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Fonctionnel", instructions: "Pratiquez le mouvement marcher en changeant de direction rapidement en suivant les recommandations de votre kinésithérapeute.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Fonctionnel", instructions: "Assis sur une chaise, essayez de vous lever sans utiliser vos bras, puis asseyez-vous à nouveau.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Fonctionnel", instructions: "Pratiquez le mouvement pratiquer le mouvement d'asseoir et de se lever d'une chaise en suivant les recommandations de votre kinésithérapeute.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Fonctionnel", instructions: "Faites semblant de ramasser un objet du sol en vous penchant en avant à partir des hanches et des genoux.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Fonctionnel", instructions: "Pratiquez le mouvement simuler le mouvement de ramasser un objet du sol en suivant les recommandations de votre kinésithérapeute.", animationType: "trunkForwardBend" });
    
    // Exercices force
    window.exercises.push({ category: "Force", instructions: "Debout, maintenez-vous à une chaise pour l'équilibre. Levez votre jambe droite sur le côté, puis abaissez-la. Répétez avec la jambe gauche.", animationType: "legRaises" });
    window.exercises.push({ category: "Force et renforcement", instructions: "Pratiquez le mouvement élévations de jambe latérales en suivant les recommandations de votre kinésithérapeute.", animationType: "legRaises" });
    window.exercises.push({ category: "Force", instructions: "Placez vos mains sur une table ou un mur. Reculez vos pieds et inclinez-vous vers la table ou le mur, puis poussez-vous pour revenir à la position de départ.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Force", instructions: "Pratiquez le mouvement push-ups inclinés (en utilisant une table ou un mur) en suivant les recommandations de votre kinésithérapeute.", animationType: "trunkForwardBend" });
    window.exercises.push({ category: "Force", instructions: "Pratiquez le mouvement squats contre un mur en suivant les recommandations de votre kinésithérapeute.", animationType: "kneeRaises" });
    window.exercises.push({ category: "Force", instructions: "Pratiquez le mouvement tirer une bande élastique avec les deux mains en suivant les recommandations de votre kinésithérapeute.", animationType: "armStretches" });
    window.exercises.push({ category: "Force", instructions: "Tenez une bande élastique avec les deux mains devant vous. Étirez la bande en écartant vos mains.", animationType: "armStretches" });
    
    // Exercices jambes et pieds supplémentaires
    window.exercises.push({ category: "Jambes et pieds", instructions: "Assis sur une chaise, tendez une jambe devant vous et maintenez 10 secondes. Abaissez-la lentement et répétez avec l'autre jambe.", animationType: "legRaises" });
    window.exercises.push({ category: "Jambes et pieds", instructions: "Assis sur une chaise, pliez votre genou en amenant votre talon vers vos fesses. Étendez votre jambe et répétez.", animationType: "legRaises" });
    window.exercises.push({ category: "Jambes et pieds", instructions: "Allongé sur le dos, genoux pliés, faites tomber doucement les genoux d'un côté, puis de l'autre.", animationType: "hipCircles" });
    
    // Exercices mobilité
    window.exercises.push({ category: "Mobilité", instructions: "Pratiquez le mouvement flexion-extension du poignet en suivant les recommandations de votre kinésithérapeute.", animationType: "wristCircles" });
    window.exercises.push({ category: "Mobilité", instructions: "Pratiquez le mouvement mouvements d'ouverture-fermeture de la main en suivant les recommandations de votre kinésithérapeute.", animationType: "wristCircles" });
    window.exercises.push({ category: "Mobilité", instructions: "Asseyez-vous sur une chaise avec les pieds suspendus. Effectuez des rotations complètes avec vos chevilles, d'abord dans le sens des aiguilles d'une montre, puis dans le sens inverse.", animationType: "ankleRotations" });
    window.exercises.push({ category: "Mobilité", instructions: "Pratiquez le mouvement rotation des chevilles en suivant les recommandations de votre kinésithérapeute.", animationType: "ankleRotations" });
    
    // Exercices problèmes d'équilibre et de marche
    window.exercises.push({ category: "Problèmes d'équilibre et de marche", instructions: "Tenez-vous près d'une surface stable. Levez un pied du sol et essayez de maintenir votre équilibre pendant quelques secondes. Changez de pied et répétez.", animationType: "oneLegStand" });
    window.exercises.push({ category: "Problèmes d'équilibre et de marche", instructions: "Debout, levez une jambe du sol et maintenez l'équilibre. Changez de jambe après quelques secondes.", animationType: "oneLegStand" });
    window.exercises.push({ category: "Problèmes d'équilibre et de marche", instructions: "Marchez sur la pointe des pieds pendant quelques pas, puis sur les talons.", animationType: "calfRaises" });
    window.exercises.push({ category: "Problèmes d'équilibre et de marche", instructions: "Marchez latéralement en croisant une jambe devant l'autre.", animationType: "stepForward" });
    window.exercises.push({ category: "Problèmes d'équilibre et de marche", instructions: "Asseyez-vous droit. Tournez votre tronc vers la gauche tout en gardant vos hanches stables, puis tournez vers la droite.", animationType: "trunkRotation" });
    window.exercises.push({ category: "Problèmes d'équilibre et de marche", instructions: "Assis sur une chaise, levez-vous puis asseyez-vous sans utiliser vos mains.", animationType: "trunkForwardBend" });
    
    // Exercices proprioception
    window.exercises.push({ category: "Proprioception", instructions: "Tenez-vous debout sur une jambe. Fermez les yeux et essayez de maintenir votre équilibre pendant quelques secondes.", animationType: "oneLegStand" });
    window.exercises.push({ category: "Proprioception", instructions: "Marchez en ligne droite, puis déplacez-vous latéralement de gauche à droite à chaque pas, formant un motif en zigzag.", animationType: "weightShift" });
    
    // Exercices renforcement
    window.exercises.push({ category: "Renforcement", instructions: "Asseyez-vous sur une chaise, un poids dans chaque main. Levez les bras au-dessus de la tête, puis fléchissez les coudes pour amener les poids derrière la tête.", animationType: "armRaises" });
    window.exercises.push({ category: "Renforcement", instructions: "Tenez un poids dans chaque main, les bras le long du corps. Élevez lentement les bras sur les côtés jusqu'à ce qu'ils soient parallèles au sol, puis abaissez-les.", animationType: "armRaises" });
    window.exercises.push({ category: "Renforcement", instructions: "Allongez-vous sur le dos, les jambes tendues. Levez une jambe à la fois, en gardant le genou légèrement fléchi.", animationType: "legRaises" });
    window.exercises.push({ category: "Renforcement", instructions: "Tenez-vous debout, les pieds à la largeur des épaules. Abaissez-vous comme si vous alliez vous asseoir sur une chaise, puis revenez à la position initiale.", animationType: "kneeRaises" });
    
    // Exercices respiration supplémentaires
    window.exercises.push({ category: "Respiration", instructions: "Avec une paille dans la bouche, inspirez par le nez et expirez lentement par la paille.", animationType: "deepBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Pratiquez le mouvement exercices de souffle en utilisant une paille en suivant les recommandations de votre kinésithérapeute.", animationType: "deepBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Inspirez profondément, retenez votre souffle pendant 5 à 10 secondes, puis expirez lentement.", animationType: "rhythmicBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Pratiquez le mouvement holding respiratoire pour renforcer les poumons en suivant les recommandations de votre kinésithérapeute.", animationType: "rhythmicBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Allongé sur le dos, placez une main sur votre poitrine et l'autre sur votre abdomen. Inspirez profondément par le nez, en laissant votre abdomen se soulever plus que votre poitrine.", animationType: "abdominalBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Pratiquez le mouvement respiration diaphragmatique en suivant les recommandations de votre kinésithérapeute.", animationType: "abdominalBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Asseyez-vous ou tenez-vous debout. Inspirez profondément par le nez, en laissant votre poitrine se lever. Expirez lentement par la bouche.", animationType: "deepBreathing" });
    window.exercises.push({ category: "Respiration", instructions: "Pratiquez le mouvement respiration profonde avec expansion thoracique en suivant les recommandations de votre kinésithérapeute.", animationType: "deepBreathing" });
    window.exercises.push({ category: "Respiration & Relaxation", instructions: "Mettez de la musique douce. Faites des étirements lents et contrôlés pour chaque partie de votre corps, en vous laissant guider par la musique.", animationType: "armStretches" });
    
    // Exercices rigidité musculaire
    window.exercises.push({ category: "Rigidité musculaire", instructions: "Levez les bras à la hauteur des épaules et étirez-les sur les côtés. Ramenez-les lentement devant vous, puis étendez-les à nouveau.", animationType: "armRaises" });
    window.exercises.push({ category: "Rigidité musculaire", instructions: "Debout, étendez un bras devant vous et utilisez l'autre bras pour le pousser doucement vers votre poitrine.", animationType: "armStretches" });
    window.exercises.push({ category: "Rigidité musculaire", instructions: "Debout, étirez vos bras au-dessus de votre tête et essayez de toucher le ciel tout en étirant tout votre corps.", animationType: "armRaises" });
    window.exercises.push({ category: "Rigidité musculaire", instructions: "Debout ou assis, placez vos mains derrière votre tête et ouvrez votre poitrine en poussant vos coudes vers l'arrière.", animationType: "shoulderShrugs" });
    
    // Exercices tête et cou supplémentaires
    window.exercises.push({ category: "Tête et cou", instructions: "Avec les doigts, massez doucement la nuque et les côtés du cou.", animationType: "headTilts" });
    window.exercises.push({ category: "Tête et cou", instructions: "Asseyez-vous droit. Penchez lentement votre tête vers votre épaule droite, puis vers votre épaule gauche.", animationType: "headTilts" });
    window.exercises.push({ category: "Tête et cou", instructions: "Inclinez doucement votre tête d'un côté, en essayant de toucher l'épaule avec l'oreille.", animationType: "headTilts" });
    window.exercises.push({ category: "Tête et cou", instructions: "Inclinez doucement la tête en arrière, en regardant vers le plafond.", animationType: "headNods" });
    window.exercises.push({ category: "Tête et cou", instructions: "Tournez doucement la tête d'un côté, puis de l'autre.", animationType: "headTurns" });
    
    // Exercices tremblements
    window.exercises.push({ category: "Tremblements", instructions: "Tendez vos bras devant vous. Ouvrez vos mains en écartant les doigts, puis fermez-les en formant un poing. Répétez ce mouvement.", animationType: "wristCircles" });
    window.exercises.push({ category: "Tremblements", instructions: "Prenez un objet souple, comme une balle en mousse, et serrez-le puis relâchez-le.", animationType: "wristCircles" });
    window.exercises.push({ category: "Tremblements", instructions: "Tendez votre bras devant vous avec la paume vers le haut. Pliez lentement chaque doigt vers la paume, puis étendez-les à nouveau.", animationType: "wristCircles" });
    window.exercises.push({ category: "Tremblements", instructions: "Avec votre main à plat, touchez chaque doigt avec votre pouce, en commençant par l'index et en terminant par le petit doigt.", animationType: "wristCircles" });
    window.exercises.push({ category: "Tremblements", instructions: "Placez vos mains devant vous, paumes face à face. Pressez les paumes l'une contre l'autre, puis relâchez.", animationType: "armStretches" });
    window.exercises.push({ category: "Tremblements", instructions: "Tendez vos bras devant vous, paumes vers le bas. Tournez lentement vos poignets dans le sens des aiguilles d'une montre, puis dans le sens inverse.", animationType: "wristCircles" });
    window.exercises.push({ category: "Tremblements", instructions: "Placez votre main à plat sur une table. Tapotez chaque doigt rapidement et répétez.", animationType: "wristCircles" });
    
    // Exercices tronc supplémentaires
    window.exercises.push({ category: "Tronc", instructions: "Assis ou debout, tournez le tronc d'un côté puis de l'autre.", animationType: "trunkRotation" });
    
    // Exercices pour Parkinson débutants sans troubles posturaux
    window.exercises.push({ category: "Parkinson débutants sans troubles posturaux", instructions: "Marchez en arrière en touchant d'abord le talon au sol, puis la pointe du pied. Concentrez-vous sur la précision de chaque étape.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Parkinson débutants sans troubles posturaux", instructions: "Essayez de marcher en arrière en ligne droite.", animationType: "tandemWalk" });
    window.exercises.push({ category: "Parkinson débutants sans troubles posturaux", instructions: "Debout, saisissez votre cheville et tirez votre talon vers vos fesses.", animationType: "kneeToChest" });
    window.exercises.push({ category: "Parkinson débutants sans troubles posturaux", instructions: "Marchez sur la pointe des pieds pendant quelques pas en avant, puis sur les talons. Revenez en arrière sur les pointes puis talons.", animationType: "calfRaises" });    

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
