

// Prix des formations en FCFA
const formationPrices = {
    'plans_archi_elec': 130000,
    'conception_elec': 150000,
    'realisation_3d': 120000,
    'programmation': 200000
};

// Taux de conversion FCFA vers EUR
const exchangeRate = 655.957;

// Temps estimé par étape (en secondes)
const stepTimes = [60, 30, 30, 30, 30];

// Indicatifs téléphoniques et formats par pays 
const phoneConfigurations = {
    // ... (identique à votre code existant)
    // (J'ai omis cette partie pour la concision, mais vous devriez la conserver telle quelle)
};

// Noms des formations pour l'affichage
const formationNames = {
    'plans_archi_elec': 'Plans architecturaux et électricité',
    'conception_elec': 'Conception électronique',
    'realisation_3d': 'Réalisation 3D',
    'programmation': 'Programmation'
};

// Noms des méthodes de paiement
const paymentMethodNames = {
    'VISA': 'Paiement par carte VISA',
    'MTN Mobile Money': 'Paiement par MTN Mobile Money',
    'Moov Africa Mobile Money': 'Paiement par Moov Africa Mobile Money',
    'Celtiis Mobile Money': 'Paiement par Celtiis Mobile Money',
    'Orange Money': 'Paiement par Orange Money',
    'Airtel Money': 'Paiement par Airtel Money',
    'Wari': 'Paiement par Wari',
    'Paiement sur place': 'Paiement sur place (espèces/chèque)'
};

// Initialisation après le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le calendrier
    initCalendar();
    
    // Charger les données sauvegardées
    loadSavedData();
    
    // Initialiser les écouteurs d'événements
    initEventListeners();
    
    // Initialiser le compteur de mots
    initWordCounter();
    
    // Démarrer la rotation des messages du rappel
    startRappelRotation();
});

function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2025-07-01',
        locale: 'fr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // ... (identique à votre code existant)
        ],
        eventDidMount: function(info) {
            info.el.addEventListener('mouseenter', function() {
                info.el.style.opacity = '0.8';
                info.el.style.transform = 'scale(1.02)';
                info.el.style.zIndex = '100';
            });
            info.el.addEventListener('mouseleave', function() {
                info.el.style.opacity = '1';
                info.el.style.transform = 'scale(1)';
                info.el.style.zIndex = '';
            });
        }
    });
    calendar.render();
}

function initEventListeners() {
    // Écouteurs pour les cases à cocher des formations
    document.querySelectorAll('input[name="formations[]"]').forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });

    // Écouteur pour le mode de formation
    document.getElementById('mode-formation').addEventListener('change', function() {
        togglePaymentMethods(this.value);
        autoSave();
    });

    // Écouteur pour le pays
    document.getElementById('pays').addEventListener('change', updatePhonePrefix);

    // Écouteurs pour la navigation du formulaire
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = parseInt(this.dataset.current || this.closest('.form-step').id.replace('form-step-', ''));
            nextStep(currentStep);
        });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = parseInt(this.dataset.current || this.closest('.form-step').id.replace('form-step-', ''));
            prevStep(currentStep);
        });
    });

    // Écouteur pour la soumission du formulaire
    document.getElementById('registration-form').addEventListener('submit', handleFormSubmit);

    // Écouteurs pour le chat
    document.getElementById('chat-toggle').addEventListener('click', toggleChat);
    document.getElementById('close-chat').addEventListener('click', toggleChat);
    document.getElementById('send-message').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') sendChatMessage();
    });

    // Écouteurs pour la modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.querySelector('.modal-cancel').addEventListener('click', closeModal);
    document.querySelector('.modal-confirm').addEventListener('click', confirmRegistration);

    // Protection contre le téléchargement
    document.addEventListener('contextmenu', preventDownload);
    document.addEventListener('dragstart', preventDownload);
}

// ... (Les autres fonctions restent identiques à votre code existant)

// Fonctions utilitaires
function preventDownload(e) {
    if(e.target.classList.contains('no-download')) {
        e.preventDefault();
    }
}

function toggleChat() {
    const chat = document.getElementById('chat-container');
    chat.style.display = chat.style.display === 'block' ? 'none' : 'block';
    if(chat.style.display === 'block') {
        document.getElementById('chat-input').focus();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if(message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            addChatMessage('Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.', 'bot');
        }, 1000);
    }
}

function addChatMessage(text, sender) {
    const messages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}