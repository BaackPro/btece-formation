// Configuration des prix des formations en FCFA
const formationPrices = {
    'plans_archi_elec': 130000,
    'conception_elec': 150000,
    'realisation_3d': 120000,
    'programmation': 200000
};

// Taux de conversion FCFA vers EUR
const exchangeRate = 655.957;

// Temps estimé par étape (en secondes)
const stepTimes = [60, 30, 30, 30, 30]; // Total: 3 minutes (180 secondes)

// Cache les éléments DOM
const DOM = {
    checkboxes: document.querySelectorAll('input[name="formations[]"]'),
    priceDisplay: document.getElementById('price-display'),
    totalPriceFCFA: document.getElementById('total-price-fcfa'),
    totalPriceEUR: document.getElementById('total-price-eur'),
    submitBtn: document.getElementById('submit-btn'),
    loadingIndicator: document.getElementById('loading'),
    registrationForm: document.getElementById('registration-form'),
    paysSelect: document.getElementById('pays'),
    phonePrefix: document.getElementById('phone-prefix'),
    phoneFormat: document.getElementById('phone-format'),
    telephoneInput: document.getElementById('telephone'),
    mainPage: document.getElementById('main-page'),
    confirmationPage: document.getElementById('confirmation-page'),
    formSteps: document.querySelectorAll('.form-step'),
    progressSteps: document.querySelectorAll('.step'),
    progressBar: document.getElementById('progress-bar'),
    progressText: document.getElementById('progress-text'),
    timeEstimation: document.getElementById('time-estimation'),
    saveStatus: document.getElementById('save-status'),
    objectifsTextarea: document.getElementById('objectifs'),
    objectifsCounter: document.getElementById('objectifs-counter'),
    dateNaissanceInput: document.getElementById('date_naissance'),
    ageError: document.getElementById('age-error'),
    modeFormationSelect: document.getElementById('mode-formation'),
    onlinePaymentMethods: document.getElementById('online-payment-methods'),
    presentielPaymentMethod: document.getElementById('presentiel-payment-method'),
    paymentMethodGroup: document.getElementById('payment-method-group')
};

// Variables d'état
const state = {
    currentStep: 1,
    saveTimeout: null,
    formData: {}
};

/**
 * Fonctions utilitaires
 */

// Compte les mots dans un texte
function countWords(text) {
    const trimmedText = text.trim();
    return trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
}

// Met à jour le compteur de mots
function updateWordCounter() {
    const wordCount = countWords(DOM.objectifsTextarea.value);
    DOM.objectifsCounter.textContent = `${wordCount}/100 mots`;
}

// Calcule l'âge à partir de la date de naissance
function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    
    return age;
}

// Valide l'âge minimum (13 ans)
function validateAge() {
    const birthDate = DOM.dateNaissanceInput.value;
    if (!birthDate) return true;
    
    const age = calculateAge(birthDate);
    if (age < 13) {
        DOM.ageError.style.display = 'block';
        DOM.dateNaissanceInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        DOM.ageError.style.display = 'none';
        DOM.dateNaissanceInput.style.borderColor = '#ddd';
        return true;
    }
}

/**
 * Fonctions de gestion du formulaire
 */

// Calcule le total des formations sélectionnées
function calculateTotal() {
    let totalFCfa = 0;
    const selectedFormations = Array.from(DOM.checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            totalFCfa += formationPrices[checkbox.value];
            return checkbox.value;
        });
    
    if (selectedFormations.length > 0) {
        const totalEur = (totalFCfa / exchangeRate).toFixed(2);
        
        DOM.totalPriceFCFA.textContent = totalFCfa.toLocaleString('fr-FR');
        DOM.totalPriceEUR.textContent = totalEur;
        DOM.priceDisplay.style.display = 'block';
    } else {
        DOM.priceDisplay.style.display = 'none';
    }
}

// Gère l'affichage des étapes du formulaire
function showStep(step) {
    DOM.formSteps.forEach((formStep, index) => {
        formStep.classList.toggle('active', index + 1 === step);
    });

    DOM.progressSteps.forEach((progressStep, index) => {
        if (index + 1 < step) {
            progressStep.classList.add('completed');
            progressStep.classList.remove('active');
        } else if (index + 1 === step) {
            progressStep.classList.add('active');
            progressStep.classList.remove('completed');
        } else {
            progressStep.classList.remove('active', 'completed');
        }
    });

    state.currentStep = step;
    updateProgressBar();
    updateTimeEstimation();
}

// Met à jour la barre de progression
function updateProgressBar() {
    const progress = ((state.currentStep - 1) / 5) * 100;
    DOM.progressBar.style.width = `${progress}%`;
    DOM.progressText.textContent = `${progress.toFixed(0)}% complété`;
}

// Met à jour l'estimation du temps restant
function updateTimeEstimation() {
    let remainingTime = 0;
    for (let i = state.currentStep - 1; i < stepTimes.length; i++) {
        remainingTime += stepTimes[i];
    }
    
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    if (minutes > 0) {
        DOM.timeEstimation.textContent = `Temps estimé : ${minutes} minute${minutes > 1 ? 's' : ''}${seconds > 0 ? ` et ${seconds} seconde${seconds > 1 ? 's' : ''}` : ''}`;
    } else {
        DOM.timeEstimation.textContent = `Temps estimé : ${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
}

// Passe à l'étape suivante avec validation
function nextStep(current) {
    if (!validateStep(current)) return;
    showStep(current + 1);
}

// Valide une étape spécifique
function validateStep(step) {
    switch(step) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return validateStep4();
        default:
            return true;
    }
}

// Valide l'étape 1 (Informations personnelles)
function validateStep1() {
    let isValid = true;
    
    // Validation du nom
    const nom = document.getElementById('nom').value.trim();
    if (nom.length < 2) {
        document.getElementById('nom-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nom-error').style.display = 'none';
    }
    
    // Validation du prénom
    const prenom = document.getElementById('prenom').value.trim();
    if (prenom.length < 2) {
        document.getElementById('prenom-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('prenom-error').style.display = 'none';
    }
    
    // Validation de l'email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('email-error').style.display = 'none';
    }
    
    // Validation de la date de naissance
    const dateNaissance = document.getElementById('date_naissance').value;
    if (!dateNaissance) {
        document.getElementById('date_naissance-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('date_naissance-error').style.display = 'none';
    }
    
    // Validation du lieu de naissance
    const lieuNaissance = document.getElementById('lieu_naissance').value.trim();
    if (lieuNaissance.length < 2) {
        document.getElementById('lieu_naissance-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('lieu_naissance-error').style.display = 'none';
    }
    
    // Validation du pays
    const pays = document.getElementById('pays').value;
    if (!pays) {
        document.getElementById('pays-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('pays-error').style.display = 'none';
    }
    
    // Validation du téléphone
    const telephone = document.getElementById('telephone').value.trim();
    const phoneRegex = /^\d{8,10}$/;
    if (!phoneRegex.test(telephone)) {
        document.getElementById('telephone-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('telephone-error').style.display = 'none';
    }
    
    // Validation de la profession
    if (!document.querySelector('input[name="profession"]:checked')) {
        document.getElementById('profession-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('profession-error').style.display = 'none';
    }
    
    // Validation des objectifs
    const objectifs = document.getElementById('objectifs').value.trim();
    const wordCount = countWords(objectifs);
    if (wordCount < 10) {
        document.getElementById('objectifs-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('objectifs-error').style.display = 'none';
    }
    
    // Validation de l'âge
    if (!validateAge()) {
        isValid = false;
    }
    
    return isValid;
}

// Valide l'étape 2 (Formations)
function validateStep2() {
    if (DOM.checkboxes.length === 0 || !Array.from(DOM.checkboxes).some(cb => cb.checked)) {
        document.getElementById('formations-error').style.display = 'block';
        return false;
    }
    
    document.getElementById('formations-error').style.display = 'none';
    return true;
}

// Valide l'étape 3 (Session & Mode)
function validateStep3() {
    let isValid = true;
    
    if (!document.querySelector('input[name="session"]:checked')) {
        document.getElementById('session-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('session-error').style.display = 'none';
    }

    if (!DOM.modeFormationSelect.value) {
        document.getElementById('mode-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('mode-error').style.display = 'none';
    }

    return isValid;
}

// Valide l'étape 4 (Paiement)
function validateStep4() {
    if (!document.querySelector('input[name="payment_method"]:checked')) {
        document.getElementById('payment-error').style.display = 'block';
        return false;
    }
    
    document.getElementById('payment-error').style.display = 'none';
    return true;
}

// Retourne à l'étape précédente
function prevStep(current) {
    showStep(current - 1);
}

// Initialisation
function init() {
    // Configuration de la date maximale pour la date de naissance (13 ans minimum)
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    DOM.dateNaissanceInput.max = maxDate.toISOString().split('T')[0];
    
    // Gestion du mode de formation
    DOM.modeFormationSelect.addEventListener('change', function() {
        DOM.onlinePaymentMethods.style.display = this.value === 'en-ligne' ? 'block' : 'none';
        DOM.presentielPaymentMethod.style.display = this.value === 'presentiel' ? 'block' : 'none';
    });
    
    // Calcul du total des formations
    DOM.checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
    
    // Compteur de mots pour les objectifs
    DOM.objectifsTextarea.addEventListener('input', updateWordCounter);
    
    // Validation de l'âge
    DOM.dateNaissanceInput.addEventListener('change', validateAge);
    
    // Initialisation finale
    updateWordCounter();
    calculateTotal();
    showStep(1);
}

// Lance l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', init);

// Expose les fonctions pour les boutons dans le HTML
window.validateStep1 = function() {
    if (validateStep1()) {
        nextStep(1);
    }
};

window.validateStep2 = function() {
    if (validateStep2()) {
        nextStep(2);
    }
};

window.validateStep3 = function() {
    if (validateStep3()) {
        nextStep(3);
    }
};

window.validateStep4 = function() {
    if (validateStep4()) {
        nextStep(4);
    }
};

window.prevStep = prevStep;
window.validateFinalStep = function() {
    if (document.getElementById('consentement').checked) {
        document.getElementById('registration-form').submit();
    } else {
        document.getElementById('consentement-error').style.display = 'block';
    }
};