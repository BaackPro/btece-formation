
/**
 * Configuration des données de l'application
 */
const AppConfig = {
    // Prix des formations en FCFA
    formationPrices: {
        'plans_archi_elec': 130000,
        'conception_elec': 150000,
        'realisation_3d': 120000,
        'programmation': 200000
    },
    
    // Taux de conversion FCFA vers EUR
    exchangeRate: 655.957,
    
    // Temps estimé par étape (en secondes)
    stepTimes: [60, 30, 30, 30, 30],
    
    // Noms des formations pour l'affichage
    formationNames: {
        'plans_archi_elec': 'Plans architecturaux et électricité',
        'conception_elec': 'Conception électronique',
        'realisation_3d': 'Réalisation 3D',
        'programmation': 'Programmation'
    },
    
    // Noms des méthodes de paiement
    paymentMethodNames: {
        'VISA': 'Paiement par carte VISA',
        'MTN Mobile Money': 'Paiement par MTN Mobile Money',
        'Moov Africa Mobile Money': 'Paiement par Moov Africa Mobile Money',
        'Celtiis Mobile Money': 'Paiement par Celtiis Mobile Money',
        'Orange Money': 'Paiement par Orange Money',
        'Airtel Money': 'Paiement par Airtel Money',
        'Wari': 'Paiement par Wari',
        'Paiement sur place': 'Paiement sur place (espèces/chèque)'
    },
    
    // Configuration des numéros de téléphone par pays
    phoneConfigurations: {
        // Afrique
        'BJ': { code: '+229', pattern: '[0-9]{8}', format: '+229 XX XX XX XX' },
        'TG': { code: '+228', pattern: '[0-9]{8}', format: '+228 XX XX XX XX' },
        // ... (autres pays comme dans votre code original)
        'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
    },
    
    // Messages du rappel clignotant
    rappelMessages: [
        "Chaque individu qui se fait former change le monde",
        "Saisis donc ta chance maintenant",
        "Nous sommes déjà dans le futur que d'autres imaginent"
    ]
};

/**
 * Gestionnaire d'application principal
 */
class FormManager {
    constructor() {
        this.currentStep = 1;
        this.currentRappelIndex = 0;
        this.formData = {};
        this.saveTimeout = null;
        this.init();
    }

    /**
     * Initialisation de l'application
     */
    init() {
        this.cacheDOM();
        this.initCalendar();
        this.loadSavedData();
        this.bindEvents();
        this.initWordCounter();
        this.startRappelRotation();
        this.updateUI();
    }

    /**
     * Cache les éléments DOM fréquemment utilisés
     */
    cacheDOM() {
        this.dom = {
            // Éléments du formulaire
            registrationForm: document.getElementById('registration-form'),
            checkboxes: document.querySelectorAll('input[name="formations[]"]'),
            priceDisplay: document.getElementById('price-display'),
            totalPriceFCFA: document.getElementById('total-price-fcfa'),
            totalPriceEUR: document.getElementById('total-price-eur'),
            submitBtn: document.getElementById('submit-btn'),
            loadingIndicator: document.getElementById('loading'),
            paysSelect: document.getElementById('pays'),
            phonePrefix: document.getElementById('phone-prefix'),
            phoneFormat: document.getElementById('phone-format'),
            telephoneInput: document.getElementById('telephone'),
            modeFormationSelect: document.getElementById('mode-formation'),
            onlinePaymentMethods: document.getElementById('online-payment-methods'),
            presentielPaymentMethod: document.getElementById('presentiel-payment-method'),
            objectifsTextarea: document.getElementById('objectifs'),
            objectifsCounter: document.getElementById('objectifs-counter'),
            dateNaissanceInput: document.getElementById('date_naissance'),
            lieuNaissanceInput: document.getElementById('lieu_naissance'),
            ageError: document.getElementById('age-error'),
            
            // Pages
            mainPage: document.getElementById('main-page'),
            confirmationPage: document.getElementById('confirmation-page'),
            
            // Modal
            modal: document.getElementById('confirmation-modal'),
            modalFormationsList: document.getElementById('modal-formations-list'),
            modalUserInfo: document.getElementById('modal-user-info'),
            modalSessionInfo: document.getElementById('modal-session-info'),
            modalModeInfo: document.getElementById('modal-mode-info'),
            modalPaymentInfo: document.getElementById('modal-payment-info'),
            modalTotalPrice: document.getElementById('modal-total-price'),
            modalTotalPriceEur: document.getElementById('modal-total-price-eur'),
            
            // Chat
            chatToggle: document.getElementById('chat-toggle'),
            chatContainer: document.getElementById('chat-container'),
            closeChat: document.getElementById('close-chat'),
            chatMessages: document.getElementById('chat-messages'),
            chatInput: document.getElementById('chat-input'),
            sendMessage: document.getElementById('send-message'),
            
            // Navigation
            formSteps: document.querySelectorAll('.form-step'),
            progressSteps: document.querySelectorAll('.step'),
            progressBar: document.getElementById('progress-bar'),
            progressText: document.getElementById('progress-text'),
            timeEstimation: document.getElementById('time-estimation'),
            saveStatus: document.getElementById('save-status'),
            userSummary: document.getElementById('user-summary'),
            rappelMessages: document.querySelectorAll('.rappel-message'),
            rappelContainer: document.querySelector('.rappel-container')
        };
    }

    /**
     * Initialise le calendrier des sessions
     */
    initCalendar() {
        if (!this.dom.calendar) return;

        const calendar = new FullCalendar.Calendar(this.dom.calendar, {
            initialView: 'dayGridMonth',
            initialDate: '2025-07-01',
            locale: 'fr',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: this.getCalendarEvents(),
            eventTimeFormat: { 
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            },
            height: 'auto',
            contentHeight: 'auto',
            dayMaxEvents: true,
            eventDisplay: 'block',
            eventDidMount: this.calendarEventHoverEffect.bind(this)
        });
        
        calendar.render();
    }

    /**
     * Retourne les événements du calendrier
     */
    getCalendarEvents() {
        return [
            // Session Juillet - Matin (Lundi, Mercredi, Vendredi)
            {
                title: 'Session Matin (8h-12h)',
                start: '2025-07-07T08:00:00',
                end: '2025-07-07T12:00:00',
                color: '#8bc34a',
                daysOfWeek: [1,3,5],
                startRecur: '2025-07-07',
                endRecur: '2025-08-01'
            },
            // ... (autres sessions comme dans votre code original)
        ];
    }

    /**
     * Effet de survol pour les événements du calendrier
     */
    calendarEventHoverEffect(info) {
        info.el.addEventListener('mouseenter', () => {
            info.el.style.opacity = '0.8';
            info.el.style.transform = 'scale(1.02)';
            info.el.style.zIndex = '100';
        });
        
        info.el.addEventListener('mouseleave', () => {
            info.el.style.opacity = '1';
            info.el.style.transform = 'scale(1)';
            info.el.style.zIndex = '';
        });
    }

    /**
     * Lie les événements aux éléments DOM
     */
    bindEvents() {
        // Formations
        this.dom.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.calculateTotal());
        });

        // Mode de formation
        this.dom.modeFormationSelect.addEventListener('change', (e) => {
            this.togglePaymentMethods(e.target.value);
            this.autoSave();
        });

        // Pays
        this.dom.paysSelect.addEventListener('change', () => this.updatePhonePrefix());

        // Navigation
        document.querySelectorAll('[data-action="next-step"]').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });

        document.querySelectorAll('[data-action="prev-step"]').forEach(btn => {
            btn.addEventListener('click', () => this.prevStep());
        });

        // Soumission
        this.dom.registrationForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Chat
        this.dom.chatToggle.addEventListener('click', () => this.toggleChat());
        this.dom.chatToggle.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') this.toggleChat();
        });
        this.dom.closeChat.addEventListener('click', () => this.toggleChat());
        this.dom.sendMessage.addEventListener('click', () => this.sendChatMessage());
        this.dom.chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.sendChatMessage();
        });

        // Modal
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-cancel').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-confirm').addEventListener('click', () => this.confirmRegistration());

        // Protection
        document.addEventListener('contextmenu', (e) => this.preventDownload(e));
        document.addEventListener('dragstart', (e) => this.preventDownload(e));

        // Validation âge
        this.dom.dateNaissanceInput.addEventListener('change', () => this.validateAge());
    }

    /**
     * Calcule le total des formations sélectionnées
     */
    calculateTotal() {
        let totalFCfa = 0;
        const selectedFormations = [];
        
        this.dom.checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalFCfa += AppConfig.formationPrices[checkbox.value];
                selectedFormations.push(checkbox.value);
            }
        });
        
        if (selectedFormations.length > 0) {
            const totalEur = (totalFCfa / AppConfig.exchangeRate).toFixed(2);
            
            this.dom.totalPriceFCFA.textContent = totalFCfa.toLocaleString('fr-FR');
            this.dom.totalPriceEUR.textContent = totalEur;
            this.dom.priceDisplay.style.display = 'block';
            
            if (selectedFormations.length === 1) {
                this.dom.submitBtn.textContent = `S'inscrire maintenant (${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
            } else {
                this.dom.submitBtn.textContent = `S'inscrire maintenant (${selectedFormations.length} formations - ${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
            }
        } else {
            this.dom.priceDisplay.style.display = 'none';
            this.dom.submitBtn.textContent = `S'inscrire maintenant`;
        }
        
        this.autoSave();
    }

    /**
     * Met à jour l'indicatif téléphonique en fonction du pays sélectionné
     */
    updatePhonePrefix() {
        const selectedCountry = this.dom.paysSelect.value;
        const config = AppConfig.phoneConfigurations[selectedCountry] || AppConfig.phoneConfigurations['other'];
        
        this.dom.phonePrefix.textContent = config.code;
        this.dom.telephoneInput.pattern = config.pattern;
        this.dom.telephoneInput.title = `Numéro valide (format: ${config.format})`;
        this.dom.phoneFormat.textContent = `Format: ${config.format}`;
        this.dom.phoneFormat.style.display = 'block';
        this.dom.telephoneInput.value = '';
        
        this.autoSave();
    }

    /**
     * Affiche/masque les méthodes de paiement en fonction du mode de formation
     */
    togglePaymentMethods(mode) {
        if (mode === 'en-ligne') {
            this.dom.onlinePaymentMethods.style.display = 'block';
            this.dom.presentielPaymentMethod.style.display = 'none';
        } else if (mode === 'presentiel') {
            this.dom.onlinePaymentMethods.style.display = 'none';
            this.dom.presentielPaymentMethod.style.display = 'block';
        } else {
            this.dom.onlinePaymentMethods.style.display = 'none';
            this.dom.presentielPaymentMethod.style.display = 'none';
        }
    }

    /**
     * Valide le numéro de téléphone
     */
    validatePhone(phone, country) {
        const config = AppConfig.phoneConfigurations[country] || AppConfig.phoneConfigurations['other'];
        const regex = new RegExp(`^${config.pattern}$`);
        return regex.test(phone);
    }

    /**
     * Nettoie les entrées utilisateur
     */
    sanitizeInput(input) {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /**
     * Gère la navigation entre les étapes
     */
    showStep(step) {
        this.dom.formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index + 1 === step);
        });

        this.dom.progressSteps.forEach((progressStep, index) => {
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

        this.currentStep = step;
        this.updateProgressBar();
        this.updateTimeEstimation();
        this.autoSave();
    }

    /**
     * Passe à l'étape suivante avec validation
     */
    nextStep() {
        if (!this.validateCurrentStep()) return;
        this.showStep(this.currentStep + 1);
    }

    /**
     * Retourne à l'étape précédente
     */
    prevStep() {
        this.showStep(this.currentStep - 1);
    }

    /**
     * Valide l'étape actuelle
     */
    validateCurrentStep() {
        switch (this.currentStep) {
            case 1: return this.validatePersonalInfo();
            case 2: return this.validateFormations();
            case 3: return this.validateSession();
            case 4: return this.validatePayment();
            default: return true;
        }
    }

    /**
     * Valide les informations personnelles
     */
    validatePersonalInfo() {
        const nom = this.dom.registrationForm.nom.value;
        const prenom = this.dom.registrationForm.prenom.value;
        const email = this.dom.registrationForm.email.value;
        const dateNaissance = this.dom.dateNaissanceInput.value;
        const lieuNaissance = this.dom.lieuNaissanceInput.value;
        const pays = this.dom.paysSelect.value;
        const telephone = this.dom.telephoneInput.value;
        const profession = this.dom.registrationForm.querySelector('input[name="profession"]:checked');
        const objectifs = this.dom.objectifsTextarea.value;
        
        // Validation des champs obligatoires
        if (!nom || !prenom || !email || !dateNaissance || !lieuNaissance || !pays || !telephone || !profession || !objectifs) {
            alert('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        
        // Validation email
        if (!email.includes('@') || !email.includes('.')) {
            alert('Veuillez entrer une adresse email valide');
            return false;
        }
        
        // Validation téléphone
        if (!this.validatePhone(telephone, pays)) {
            const config = AppConfig.phoneConfigurations[pays] || AppConfig.phoneConfigurations['other'];
            alert(`Veuillez entrer un numéro de téléphone valide pour votre pays (format: ${config.format})`);
            return false;
        }
        
        // Validation objectifs
        if (this.countWords(objectifs) > 100) {
            alert('Veuillez limiter vos objectifs à 100 mots maximum');
            return false;
        }
        
        // Validation âge
        if (!this.validateAge()) {
            return false;
        }
        
        return true;
    }

    /**
     * Valide les formations sélectionnées
     */
    validateFormations() {
        const checkedFormations = this.dom.registrationForm.querySelectorAll('input[name="formations[]"]:checked');
        if (checkedFormations.length === 0) {
            alert('Veuillez sélectionner au moins une formation');
            return false;
        }
        return true;
    }

    /**
     * Valide la session et le mode
     */
    validateSession() {
        const session = this.dom.registrationForm.querySelector('input[name="session"]:checked');
        const mode = this.dom.modeFormationSelect.value;
        
        if (!session) {
            alert('Veuillez sélectionner une session');
            return false;
        }
        
        if (!mode) {
            alert('Veuillez sélectionner un mode de formation');
            return false;
        }
        
        return true;
    }

    /**
     * Valide le mode de paiement
     */
    validatePayment() {
        const paymentMethod = this.dom.registrationForm.querySelector('input[name="payment_method"]:checked');
        if (!paymentMethod) {
            alert('Veuillez sélectionner une méthode de paiement');
            return false;
        }
        return true;
    }

    /**
     * Gère la soumission du formulaire
     */
    handleFormSubmit(e) {
        e.preventDefault();
        
        const consentement = this.dom.registrationForm.consentement.checked;
        if (!consentement) {
            alert('Veuillez accepter les conditions générales');
            return;
        }
        
        this.showConfirmationModal();
    }

    /**
     * Affiche la modal de confirmation
     */
    showConfirmationModal() {
        let total = 0;
        this.dom.modalFormationsList.innerHTML = '';
        
        const checkedFormations = this.dom.registrationForm.querySelectorAll('input[name="formations[]"]:checked');
        checkedFormations.forEach(checkbox => {
            const formationName = AppConfig.formationNames[checkbox.value];
            const formationPrice = AppConfig.formationPrices[checkbox.value];
            total += formationPrice;
            
            const li = document.createElement('li');
            li.textContent = `${formationName} - ${formationPrice.toLocaleString('fr-FR')} FCFA`;
            this.dom.modalFormationsList.appendChild(li);
        });
        
        // Remplir les informations personnelles
        this.fillModalUserInfo();
        
        const totalEur = (total / AppConfig.exchangeRate).toFixed(2);
        this.dom.modalTotalPrice.textContent = total.toLocaleString('fr-FR');
        this.dom.modalTotalPriceEur.textContent = totalEur;
        this.dom.modal.style.display = 'block';
    }

    /**
     * Remplit les informations utilisateur dans la modal
     */
    fillModalUserInfo() {
        const form = this.dom.registrationForm;
        
        this.dom.modalNomComplet.textContent = `${form.prenom.value} ${form.nom.value}`;
        this.dom.modalEmail.textContent = form.email.value;
        this.dom.modalDateNaissance.textContent = form.date_naissance.value;
        this.dom.modalLieuNaissance.textContent = form.lieu_naissance.value;
        this.dom.modalTelephone.textContent = `${this.dom.phonePrefix.textContent} ${form.telephone.value}`;
        this.dom.modalPays.textContent = this.dom.paysSelect.options[this.dom.paysSelect.selectedIndex].text;
        this.dom.modalProfession.textContent = form.querySelector('input[name="profession"]:checked').nextElementSibling.textContent;
        this.dom.modalObjectifs.textContent = form.objectifs.value;
        this.dom.modalSessionInfo.textContent = form.querySelector('input[name="session"]:checked').nextElementSibling.textContent;
        this.dom.modalModeInfo.textContent = this.dom.modeFormationSelect.options[this.dom.modeFormationSelect.selectedIndex].text;
        
        const paymentMethod = form.querySelector('input[name="payment_method"]:checked')?.value;
        this.dom.modalPaymentInfo.textContent = AppConfig.paymentMethodNames[paymentMethod] || paymentMethod;
    }

    /**
     * Ferme la modal
     */
    closeModal() {
        this.dom.modal.style.display = 'none';
    }

    /**
     * Confirme l'inscription
     */
    async confirmRegistration() {
        this.closeModal();
        this.dom.loadingIndicator.style.display = 'block';
        this.dom.submitBtn.disabled = true;
        
        try {
            await this.sendFormData();
            this.showConfirmationPage();
            localStorage.removeItem('bteceFormData');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
        } finally {
            this.dom.loadingIndicator.style.display = 'none';
            this.dom.submitBtn.disabled = false;
        }
    }

    /**
     * Envoie les données du formulaire
     */
    async sendFormData() {
        const formData = new FormData(this.dom.registrationForm);
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbw9LNZTz3TVV-omzZL4BBrpUJ2oyTjuTkcdQ9iiT9Cy/dev';
        
        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
        
        return response.json();
    }

    /**
     * Affiche la page de confirmation
     */
    showConfirmationPage() {
        this.dom.mainPage.style.display = 'none';
        this.dom.confirmationPage.style.display = 'block';
        window.scrollTo(0, 0);
        
        this.displayUserSummary();
        this.simulateTracking();
    }

    /**
     * Affiche le résumé des informations utilisateur
     */
    displayUserSummary() {
        const form = this.dom.registrationForm;
        const checkedFormations = Array.from(form.querySelectorAll('input[name="formations[]"]:checked'))
            .map(cb => AppConfig.formationNames[cb.value]);
        
        let total = 0;
        form.querySelectorAll('input[name="formations[]"]:checked').forEach(checkbox => {
            total += AppConfig.formationPrices[checkbox.value];
        });
        const totalEur = (total / AppConfig.exchangeRate).toFixed(2);
        
        this.dom.userSummary.innerHTML = `
            <h4>Récapitulatif de votre inscription</h4>
            <p><strong>Nom complet :</strong> ${form.prenom.value} ${form.nom.value}</p>
            <p><strong>Email :</strong> ${form.email.value}</p>
            <p><strong>Date de naissance :</strong> ${form.date_naissance.value}</p>
            <p><strong>Lieu de naissance :</strong> ${form.lieu_naissance.value}</p>
            <p><strong>Téléphone :</strong> ${this.dom.phonePrefix.textContent} ${form.telephone.value}</p>
            <p><strong>Pays :</strong> ${this.dom.paysSelect.options[this.dom.paysSelect.selectedIndex].text}</p>
            <p><strong>Profession :</strong> ${form.querySelector('input[name="profession"]:checked').value}</p>
            <p><strong>Objectifs :</strong> ${form.objectifs.value}</p>
            <p><strong>Formations choisies :</strong> ${checkedFormations.join(', ')}</p>
            <p><strong>Session :</strong> ${form.querySelector('input[name="session"]:checked').value.charAt(0).toUpperCase() + form.querySelector('input[name="session"]:checked').value.slice(1)} 2025</p>
            <p><strong>Mode de formation :</strong> ${this.dom.modeFormationSelect.value === 'presentiel' ? 'Présentiel à Cotonou' : 'En ligne'}</p>
            <p><strong>Méthode de paiement :</strong> ${AppConfig.paymentMethodNames[form.querySelector('input[name="payment_method"]:checked').value] || form.querySelector('input[name="payment_method"]:checked').value}</p>
            <p><strong>Montant total :</strong> ${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)</p>
        `;
    }

    /**
     * Simule le suivi de l'inscription
     */
    simulateTracking() {
        const steps = document.querySelectorAll('.tracking-steps li');
        
        setTimeout(() => {
            steps[1].classList.add('completed');
            steps[2].classList.add('active');
            
            setTimeout(() => {
                steps[2].classList.add('completed');
                steps[3].classList.add('active');
                
                setTimeout(() => {
                    steps[3].classList.add('completed');
                    steps[4].classList.add('active');
                }, 3000);
            }, 2000);
        }, 1000);
    }

    /**
     * Initialise le compteur de mots
     */
    initWordCounter() {
        this.dom.objectifsTextarea.addEventListener('input', () => this.updateWordCounter());
        this.updateWordCounter();
    }

    /**
     * Met à jour le compteur de mots
     */
    updateWordCounter() {
        const wordCount = this.countWords(this.dom.objectifsTextarea.value);
        this.dom.objectifsCounter.textContent = `${wordCount}/100 mots`;
        
        if (wordCount > 100) {
            this.dom.objectifsCounter.style.color = '#e74c3c';
            this.dom.objectifsTextarea.style.borderColor = '#e74c3c';
        } else {
            this.dom.objectifsCounter.style.color = '#666';
            this.dom.objectifsTextarea.style.borderColor = '#ddd';
        }
    }

    /**
     * Compte les mots dans un texte
     */
    countWords(text) {
        const trimmedText = text.trim();
        return trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    }

    /**
     * Valide l'âge
     */
    validateAge() {
        const birthDate = this.dom.dateNaissanceInput.value;
        if (!birthDate) return true;
        
        const age = this.calculateAge(birthDate);
        if (age < 13) {
            this.dom.ageError.style.display = 'block';
            this.dom.dateNaissanceInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            this.dom.ageError.style.display = 'none';
            this.dom.dateNaissanceInput.style.borderColor = '#ddd';
            return true;
        }
    }

    /**
     * Calcule l'âge à partir de la date de naissance
     */
    calculateAge(birthDate) {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        
        return age;
    }

    /**
     * Lance la rotation des messages du rappel
     */
    startRappelRotation() {
        setInterval(() => this.rotateRappelMessages(), 2000);
    }

    /**
     * Fait tourner les messages du rappel
     */
    rotateRappelMessages() {
        this.dom.rappelMessages.forEach(msg => msg.classList.remove('active'));
        this.dom.rappelMessages[this.currentRappelIndex].classList.add('active');
        this.currentRappelIndex = (this.currentRappelIndex + 1) % this.dom.rappelMessages.length;
    }

    /**
     * Met à jour la barre de progression
     */
    updateProgressBar() {
        const progress = ((this.currentStep - 1) / 5) * 100;
        this.dom.progressBar.style.width = `${progress}%`;
        this.dom.progressText.textContent = `${progress.toFixed(0)}% complété`;
        
        if (this.currentStep > 1) {
            document.querySelector('.progress-container').style.display = 'block';
        }
    }

    /**
     * Met à jour l'estimation du temps restant
     */
    updateTimeEstimation() {
        let remainingTime = 0;
        for (let i = this.currentStep - 1; i < AppConfig.stepTimes.length; i++) {
            remainingTime += AppConfig.stepTimes[i];
        }
        
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        if (minutes > 0) {
            this.dom.timeEstimation.textContent = `Temps estimé : ${minutes} minute${minutes > 1 ? 's' : ''}${seconds > 0 ? ` et ${seconds} seconde${seconds > 1 ? 's' : ''}` : ''}`;
        } else {
            this.dom.timeEstimation.textContent = `Temps estimé : ${seconds} seconde${seconds > 1 ? 's' : ''}`;
        }
    }

    /**
     * Sauvegarde automatique des données
     */
    autoSave() {
        this.dom.saveStatus.textContent = "Sauvegarde en cours...";
        this.dom.saveStatus.className = "save-status saving";
        this.dom.saveStatus.style.display = "block";
        
        this.formData = {
            step: this.currentStep,
            nom: this.dom.registrationForm.nom.value,
            prenom: this.dom.registrationForm.prenom.value,
            email: this.dom.registrationForm.email.value,
            date_naissance: this.dom.dateNaissanceInput.value,
            lieu_naissance: this.dom.lieuNaissanceInput.value,
            pays: this.dom.paysSelect.value,
            telephone: this.dom.telephoneInput.value,
            profession: this.dom.registrationForm.querySelector('input[name="profession"]:checked')?.value,
            objectifs: this.dom.objectifsTextarea.value,
            formations: Array.from(this.dom.registrationForm.querySelectorAll('input[name="formations[]"]:checked')).map(cb => cb.value),
            session: this.dom.registrationForm.querySelector('input[name="session"]:checked')?.value,
            modeFormation: this.dom.modeFormationSelect.value,
            paymentMethod: this.dom.registrationForm.querySelector('input[name="payment_method"]:checked')?.value,
            consentement: this.dom.registrationForm.consentement.checked
        };
        
        localStorage.setItem('bteceFormData', JSON.stringify(this.formData));
        
        setTimeout(() => {
            this.dom.saveStatus.textContent = "Données sauvegardées";
            this.dom.saveStatus.className = "save-status saved";
            
            setTimeout(() => {
                this.dom.saveStatus.style.display = "none";
            }, 3000);
        }, 1000);
    }

    /**
     * Charge les données sauvegardées
     */
    loadSavedData() {
        const savedData = localStorage.getItem('bteceFormData');
        if (!savedData) return;
        
        this.formData = JSON.parse(savedData);
        
        // Remplir les champs avec les données sauvegardées
        if (this.formData.nom) this.dom.registrationForm.nom.value = this.formData.nom;
        if (this.formData.prenom) this.dom.registrationForm.prenom.value = this.formData.prenom;
        if (this.formData.email) this.dom.registrationForm.email.value = this.formData.email;
        if (this.formData.date_naissance) this.dom.dateNaissanceInput.value = this.formData.date_naissance;
        if (this.formData.lieu_naissance) this.dom.lieuNaissanceInput.value = this.formData.lieu_naissance;
        
        if (this.formData.pays) {
            this.dom.paysSelect.value = this.formData.pays;
            this.dom.paysSelect.dispatchEvent(new Event('change'));
        }
        
        if (this.formData.telephone) this.dom.telephoneInput.value = this.formData.telephone;
        
        if (this.formData.profession) {
            const professionInput = this.dom.registrationForm.querySelector(`input[name="profession"][value="${this.formData.profession}"]`);
            if (professionInput) professionInput.checked = true;
        }
        
        if (this.formData.objectifs) this.dom.objectifsTextarea.value = this.formData.objectifs;
        
        if (this.formData.formations && this.formData.formations.length > 0) {
            this.formData.formations.forEach(formation => {
                const formationInput = this.dom.registrationForm.querySelector(`input[name="formations[]"][value="${formation}"]`);
                if (formationInput) formationInput.checked = true;
            });
            this.calculateTotal();
        }
        
        if (this.formData.session) {
            const sessionInput = this.dom.registrationForm.querySelector(`input[name="session"][value="${this.formData.session}"]`);
            if (sessionInput) sessionInput.checked = true;
        }
        
        if (this.formData.modeFormation) {
            this.dom.modeFormationSelect.value = this.formData.modeFormation;
            this.dom.modeFormationSelect.dispatchEvent(new Event('change'));
        }
        
        if (this.formData.paymentMethod) {
            const paymentInput = this.dom.registrationForm.querySelector(`input[name="payment_method"][value="${this.formData.paymentMethod}"]`);
            if (paymentInput) paymentInput.checked = true;
        }
        
        if (this.formData.consentement) {
            this.dom.registrationForm.consentement.checked = true;
        }
        
        if (this.formData.step) {
            this.showStep(this.formData.step);
        }
    }

    /**
     * Gère le chat
     */
    toggleChat() {
        this.dom.chatContainer.style.display = this.dom.chatContainer.style.display === 'block' ? 'none' : 'block';
        if (this.dom.chatContainer.style.display === 'block') {
            this.dom.chatInput.focus();
        }
    }

    /**
     * Envoie un message dans le chat
     */
    sendChatMessage() {
        const message = this.dom.chatInput.value.trim();
        if (!message) return;
        
        this.addChatMessage(message, 'user');
        this.dom.chatInput.value = '';
        
        setTimeout(() => {
            this.addChatMessage('Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.', 'bot');
        }, 1000);
    }

    /**
     * Ajoute un message au chat
     */
    addChatMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.dom.chatMessages.appendChild(messageDiv);
        this.dom.chatMessages.scrollTop = this.dom.chatMessages.scrollHeight;
    }

    /**
     * Empêche le téléchargement des images protégées
     */
    preventDownload(e) {
        if (e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
            e.preventDefault();
        }
    }

    /**
     * Met à jour l'interface utilisateur
     */
    updateUI() {
        this.calculateTotal();
        this.dom.modeFormationSelect.dispatchEvent(new Event('change'));
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = new FormManager();
    } catch (error) {
        console.error("Erreur lors de l'initialisation de l'application:", error);
        alert("Une erreur est survenue lors du chargement de l'application. Veuillez recharger la page.");
    }
});