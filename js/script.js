

// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Configuration des prix
    const formationPrices = {
        'plans_archi_elec': 50000,
        'conception_elec': 60000,
        'realisation_3d': 70000,
        'programmation': 80000
    };

    const exchangeRate = 655.957;

    // Configuration téléphonique par pays
    const phoneConfigurations = {
        'BJ': { code: '+229', pattern: '[0-9]{8}', format: '+229 XX XX XX XX' },
        'TG': { code: '+228', pattern: '[0-9]{8}', format: '+228 XX XX XX XX' },
        // [Tous les autres pays...]
        'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
    };

    // Éléments du DOM
    const checkboxes = document.querySelectorAll('input[name="formations[]"]');
    const priceDisplay = document.getElementById('price-display');
    const totalPriceFCFA = document.getElementById('total-price-fcfa');
    const totalPriceEUR = document.getElementById('total-price-eur');
    const submitBtn = document.getElementById('submit-btn');
    const loadingIndicator = document.getElementById('loading');
    const registrationForm = document.getElementById('registration-form');
    const paysSelect = document.getElementById('pays');
    const phonePrefix = document.getElementById('phone-prefix');
    const phoneFormat = document.getElementById('phone-format');
    const telephoneInput = document.getElementById('telephone');
    const mainPage = document.getElementById('main-page');
    const confirmationPage = document.getElementById('confirmation-page');

    // Gestion du changement de pays
    paysSelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        const config = phoneConfigurations[selectedCountry] || phoneConfigurations['other'];
        
        phonePrefix.textContent = config.code;
        telephoneInput.pattern = config.pattern;
        telephoneInput.title = `Numéro valide (format: ${config.format})`;
        phoneFormat.textContent = `Format: ${config.format}`;
        phoneFormat.style.display = 'block';
        telephoneInput.value = '';
    });

    // Calcul du total
    function calculateTotal() {
        let totalFCfa = 0;
        let selectedFormations = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalFCfa += formationPrices[checkbox.value];
                selectedFormations++;
            }
        });
        
        if (selectedFormations > 0) {
            const totalEur = (totalFCfa / exchangeRate).toFixed(2);
            
            totalPriceFCFA.textContent = totalFCfa.toLocaleString('fr-FR');
            totalPriceEUR.textContent = totalEur;
            priceDisplay.style.display = 'block';
            
            submitBtn.textContent = selectedFormations === 1 
                ? `S'inscrire maintenant (${totalFCfa.toLocaleString('fr-FR')} FCFA)`
                : `S'inscrire maintenant (${selectedFormations} formations - ${totalFCfa.toLocaleString('fr-FR')} FCFA)`;
        } else {
            priceDisplay.style.display = 'none';
            submitBtn.textContent = `S'inscrire maintenant`;
        }
    }

    // Écouteurs d'événements
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Validation du formulaire
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation des champs
        if (!validateForm()) return;
        
        loadingIndicator.style.display = 'block';
        submitBtn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            mainPage.style.display = 'none';
            confirmationPage.style.display = 'block';
            window.scrollTo(0, 0);
        }, 1500);
    });

    // Fonction de validation
    function validateForm() {
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const pays = document.getElementById('pays').value;
        const checkedFormations = document.querySelectorAll('input[name="formations[]"]:checked');
        const checkedSession = document.querySelector('input[name="session"]:checked');
        const checkedProfession = document.querySelector('input[name="profession"]:checked');
        
        if (!document.getElementById('consentement').checked) {
            showError('Veuillez accepter les conditions générales');
            return false;
        }
        
        if (!pays) {
            showError('Veuillez sélectionner votre pays');
            return false;
        }
        
        if (checkedFormations.length === 0) {
            showError('Veuillez sélectionner au moins une formation');
            return false;
        }
        
        if (!checkedSession) {
            showError('Veuillez sélectionner une session');
            return false;
        }
        
        if (!checkedProfession) {
            showError('Veuillez sélectionner votre profession');
            return false;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            showError('Veuillez entrer une adresse email valide');
            return false;
        }
        
        if (!validatePhone(telephone, pays)) {
            const config = phoneConfigurations[pays] || phoneConfigurations['other'];
            showError(`Veuillez entrer un numéro valide (format: ${config.format})`);
            return false;
        }
        
        return true;
    }

    function showError(message) {
        alert(message);
        loadingIndicator.style.display = 'none';
        submitBtn.disabled = false;
    }

    function validatePhone(phone, country) {
        const config = phoneConfigurations[country] || phoneConfigurations['other'];
        const regex = new RegExp(`^${config.pattern}$`);
        return regex.test(phone);
    }

    // Initialisation
    calculateTotal();
});