
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

// Configuration des numéros de téléphone par pays
const phoneConfigurations = {
    // Afrique
    'DZ': { code: '+213', pattern: '[0-9]{9}', format: '+213 XX XXX XXXX' },
    'AO': { code: '+244', pattern: '[0-9]{9}', format: '+244 XXX XXX XXX' },
    'BJ': { code: '+229', pattern: '[0-9]{10}', format: '+229 XX XX XX XX' },
    'BW': { code: '+267', pattern: '[0-9]{7}', format: '+267 XX XXX XXX' },
    'BF': { code: '+226', pattern: '[0-9]{8}', format: '+226 XX XX XX XX' },
    'BI': { code: '+257', pattern: '[0-9]{8}', format: '+257 XX XX XX XX' },
    'CM': { code: '+237', pattern: '[0-9]{8}', format: '+237 6XX XX XX XX' },
    'CV': { code: '+238', pattern: '[0-9]{7}', format: '+238 XXX XX XX' },
    'CF': { code: '+236', pattern: '[0-9]{8}', format: '+236 XX XX XX XX' },
    'TD': { code: '+235', pattern: '[0-9]{8}', format: '+235 XX XX XX XX' },
    'KM': { code: '+269', pattern: '[0-9]{7}', format: '+269 XXX XX XX' },
    'CG': { code: '+242', pattern: '[0-9]{9}', format: '+242 XX XXX XXX' },
    'CD': { code: '+243', pattern: '[0-9]{9}', format: '+243 XXX XXX XXX' },
    'CI': { code: '+225', pattern: '[0-9]{8}', format: '+225 XX XX XX XX' },
    'DJ': { code: '+253', pattern: '[0-9]{8}', format: '+253 XX XX XX XX' },
    'EG': { code: '+20', pattern: '[0-9]{10}', format: '+20 XXXX XXX XXXX' },
    'GQ': { code: '+240', pattern: '[0-9]{9}', format: '+240 XX XXX XXX' },
    'ER': { code: '+291', pattern: '[0-9]{7}', format: '+291 X XXX XXX' },
    'SZ': { code: '+268', pattern: '[0-9]{8}', format: '+268 XX XX XX XX' },
    'ET': { code: '+251', pattern: '[0-9]{9}', format: '+251 XX XXX XXXX' },
    'GA': { code: '+241', pattern: '[0-9]{7}', format: '+241 X XX XX XX' },
    'GM': { code: '+220', pattern: '[0-9]{7}', format: '+220 XXX XX XX' },
    'GH': { code: '+233', pattern: '[0-9]{9}', format: '+233 XX XXX XXXX' },
    'GN': { code: '+224', pattern: '[0-9]{8}', format: '+224 XX XX XX XX' },
    'GW': { code: '+245', pattern: '[0-9]{7}', format: '+245 XXX XX XX' },
    'KE': { code: '+254', pattern: '[0-9]{9}', format: '+254 XXX XXX XXX' },
    'LS': { code: '+266', pattern: '[0-9]{8}', format: '+266 XX XX XX XX' },
    'LR': { code: '+231', pattern: '[0-9]{7}', format: '+231 XX XXX XXX' },
    'LY': { code: '+218', pattern: '[0-9]{9}', format: '+218 XX XXX XXXX' },
    'MG': { code: '+261', pattern: '[0-9]{9}', format: '+261 XX XX XXX XX' },
    'MW': { code: '+265', pattern: '[0-9]{9}', format: '+265 X XXX XXXX' },
    'ML': { code: '+223', pattern: '[0-9]{8}', format: '+223 XX XX XX XX' },
    'MR': { code: '+222', pattern: '[0-9]{8}', format: '+222 XX XX XX XX' },
    'MU': { code: '+230', pattern: '[0-9]{7}', format: '+230 XXX XXXX' },
    'YT': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' },
    'MA': { code: '+212', pattern: '[0-9]{9}', format: '+212 X XXX XXXX' },
    'MZ': { code: '+258', pattern: '[0-9]{9}', format: '+258 XX XXX XXX' },
    'NA': { code: '+264', pattern: '[0-9]{9}', format: '+264 XX XXX XXXX' },
    'NE': { code: '+227', pattern: '[0-9]{8}', format: '+227 XX XX XX XX' },
    'NG': { code: '+234', pattern: '[0-9]{10}', format: '+234 XXX XXX XXXX' },
    'RE': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' },
    'RW': { code: '+250', pattern: '[0-9]{9}', format: '+250 XXX XXX XXX' },
    'SH': { code: '+290', pattern: '[0-9]{4}', format: '+290 XXXX' },
    'ST': { code: '+239', pattern: '[0-9]{7}', format: '+239 XX XX XXX' },
    'SN': { code: '+221', pattern: '[0-9]{9}', format: '+221 XX XXX XX XX' },
    'SC': { code: '+248', pattern: '[0-9]{7}', format: '+248 X XXX XXX' },
    'SL': { code: '+232', pattern: '[0-9]{8}', format: '+232 XX XXX XXX' },
    'SO': { code: '+252', pattern: '[0-9]{8}', format: '+252 XX XXX XXX' },
    'ZA': { code: '+27', pattern: '[0-9]{9}', format: '+27 XX XXX XXXX' },
    'SS': { code: '+211', pattern: '[0-9]{9}', format: '+211 XX XXX XXXX' },
    'SD': { code: '+249', pattern: '[0-9]{9}', format: '+249 XX XXX XXXX' },
    'TZ': { code: '+255', pattern: '[0-9]{9}', format: '+255 XX XXX XXXX' },
    'TG': { code: '+228', pattern: '[0-9]{8}', format: '+228 XX XX XX XX' },
    'TN': { code: '+216', pattern: '[0-9]{8}', format: '+216 XX XXX XXX' },
    'UG': { code: '+256', pattern: '[0-9]{9}', format: '+256 XXX XXX XXX' },
    'EH': { code: '+212', pattern: '[0-9]{9}', format: '+212 X XXX XXXX' },
    'ZM': { code: '+260', pattern: '[0-9]{9}', format: '+260 XX XXX XXXX' },
    'ZW': { code: '+263', pattern: '[0-9]{9}', format: '+263 XX XXX XXXX' },

    // Amérique
    'US': { code: '+1', pattern: '[0-9]{10}', format: '+1 (XXX) XXX-XXXX' },
    'CA': { code: '+1', pattern: '[0-9]{10}', format: '+1 (XXX) XXX-XXXX' },
    'MX': { code: '+52', pattern: '[0-9]{10}', format: '+52 XXX XXX XXXX' },
    'BR': { code: '+55', pattern: '[0-9]{10,11}', format: '+55 XX XXXX XXXX' },
    'AR': { code: '+54', pattern: '[0-9]{10}', format: '+54 XXX XXX XXXX' },
    'CL': { code: '+56', pattern: '[0-9]{9}', format: '+56 X XXX XXXX' },
    'CO': { code: '+57', pattern: '[0-9]{10}', format: '+57 XXX XXX XXXX' },
    'PE': { code: '+51', pattern: '[0-9]{9}', format: '+51 XXX XXX XXX' },
    'VE': { code: '+58', pattern: '[0-9]{10}', format: '+58 XXX XXX XXXX' },
    'BO': { code: '+591', pattern: '[0-9]{8}', format: '+591 XXXX XXXX' },
    'EC': { code: '+593', pattern: '[0-9]{9}', format: '+593 XX XXX XXXX' },
    'PY': { code: '+595', pattern: '[0-9]{9}', format: '+595 XXX XXX XXX' },
    'UY': { code: '+598', pattern: '[0-9]{8}', format: '+598 XX XXX XXX' },
    'CR': { code: '+506', pattern: '[0-9]{8}', format: '+506 XXXX XXXX' },
    'PA': { code: '+507', pattern: '[0-9]{8}', format: '+507 XXXX XXXX' },
    'DO': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'CU': { code: '+53', pattern: '[0-9]{8}', format: '+53 X XXX XXXX' },
    'GT': { code: '+502', pattern: '[0-9]{8}', format: '+502 XXXX XXXX' },
    'HN': { code: '+504', pattern: '[0-9]{8}', format: '+504 XXXX XXXX' },
    'NI': { code: '+505', pattern: '[0-9]{8}', format: '+505 XXXX XXXX' },
    'SV': { code: '+503', pattern: '[0-9]{8}', format: '+503 XXXX XXXX' },
    'HT': { code: '+509', pattern: '[0-9]{8}', format: '+509 XX XX XXXX' },
    'JM': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'TT': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'BZ': { code: '+501', pattern: '[0-9]{7}', format: '+501 XXX XXXX' },
    'GY': { code: '+592', pattern: '[0-9]{7}', format: '+592 XXX XXXX' },
    'SR': { code: '+597', pattern: '[0-9]{7}', format: '+597 XXX XXXX' },

    // Asie
    'AF': { code: '+93', pattern: '[0-9]{9}', format: '+93 XX XXX XXXX' },
    'AM': { code: '+374', pattern: '[0-9]{8}', format: '+374 XX XXX XXX' },
    'AZ': { code: '+994', pattern: '[0-9]{9}', format: '+994 XX XXX XX XX' },
    'BH': { code: '+973', pattern: '[0-9]{8}', format: '+973 XXXX XXXX' },
    'BD': { code: '+880', pattern: '[0-9]{10}', format: '+880 XX XXX XXXX' },
    'BT': { code: '+975', pattern: '[0-9]{7,8}', format: '+975 XX XXX XX' },
    'BN': { code: '+673', pattern: '[0-9]{7}', format: '+673 XXX XXXX' },
    'KH': { code: '+855', pattern: '[0-9]{8,9}', format: '+855 XX XXX XXX' },
    'CN': { code: '+86', pattern: '[0-9]{11}', format: '+86 XXX XXXX XXXX' },
    'CY': { code: '+357', pattern: '[0-9]{8}', format: '+357 XX XXX XXX' },
    'GE': { code: '+995', pattern: '[0-9]{9}', format: '+995 XXX XXX XXX' },
    'IN': { code: '+91', pattern: '[0-9]{10}', format: '+91 XXXX XXX XXX' },
    'ID': { code: '+62', pattern: '[0-9]{9,11}', format: '+62 XXX XXX XXX' },
    'IR': { code: '+98', pattern: '[0-9]{10}', format: '+98 XXX XXX XXXX' },
    'IQ': { code: '+964', pattern: '[0-9]{10}', format: '+964 XXX XXX XXXX' },
    'IL': { code: '+972', pattern: '[0-9]{9}', format: '+972 X XXX XXXX' },
    'JP': { code: '+81', pattern: '[0-9]{10}', format: '+81 XX XXXX XXXX' },
    'JO': { code: '+962', pattern: '[0-9]{9}', format: '+962 X XXX XXXX' },
    'KZ': { code: '+7', pattern: '[0-9]{10}', format: '+7 XXX XXX XX XX' },
    'KW': { code: '+965', pattern: '[0-9]{8}', format: '+965 XXXX XXXX' },
    'KG': { code: '+996', pattern: '[0-9]{9}', format: '+996 XXX XXX XXX' },
    'LA': { code: '+856', pattern: '[0-9]{9,10}', format: '+856 XX XXX XXXX' },
    'LB': { code: '+961', pattern: '[0-9]{7,8}', format: '+961 XX XXX XXX' },
    'MY': { code: '+60', pattern: '[0-9]{9,10}', format: '+60 X XXX XXX' },
    'MV': { code: '+960', pattern: '[0-9]{7}', format: '+960 XXX XXXX' },
    'MN': { code: '+976', pattern: '[0-9]{8}', format: '+976 XX XX XXXX' },
    'MM': { code: '+95', pattern: '[0-9]{8,10}', format: '+95 XX XXX XXXX' },
    'NP': { code: '+977', pattern: '[0-9]{10}', format: '+977 XXX XXX XXXX' },
    'KP': { code: '+850', pattern: '[0-9]{9,10}', format: '+850 XXX XXX XXXX' },
    'OM': { code: '+968', pattern: '[0-9]{8}', format: '+968 XXXX XXXX' },
    'PK': { code: '+92', pattern: '[0-9]{10}', format: '+92 XXX XXX XXXX' },
    'PS': { code: '+970', pattern: '[0-9]{9}', format: '+970 XX XXX XXXX' },
    'PH': { code: '+63', pattern: '[0-9]{10}', format: '+63 XXX XXX XXXX' },
    'QA': { code: '+974', pattern: '[0-9]{8}', format: '+974 XXXX XXXX' },
    'SA': { code: '+966', pattern: '[0-9]{9}', format: '+966 X XXX XXXX' },
    'SG': { code: '+65', pattern: '[0-9]{8}', format: '+65 XXXX XXXX' },
    'KR': { code: '+82', pattern: '[0-9]{9,10}', format: '+82 XX XXXX XXXX' },
    'LK': { code: '+94', pattern: '[0-9]{9}', format: '+94 XX XXX XXXX' },
    'SY': { code: '+963', pattern: '[0-9]{9}', format: '+963 XX XXX XXXX' },
    'TW': { code: '+886', pattern: '[0-9]{9}', format: '+886 X XXX XXX' },
    'TJ': { code: '+992', pattern: '[0-9]{9}', format: '+992 XX XXX XXXX' },
    'TH': { code: '+66', pattern: '[0-9]{9}', format: '+66 XX XXX XXXX' },
    'TL': { code: '+670', pattern: '[0-9]{8}', format: '+670 XXX XXXX' },
    'TR': { code: '+90', pattern: '[0-9]{10}', format: '+90 XXX XXX XXXX' },
    'TM': { code: '+993', pattern: '[0-9]{8}', format: '+993 XX XXX XX' },
    'AE': { code: '+971', pattern: '[0-9]{9}', format: '+971 X XXX XXXX' },
    'UZ': { code: '+998', pattern: '[0-9]{9}', format: '+998 XX XXX XXXX' },
    'VN': { code: '+84', pattern: '[0-9]{9,10}', format: '+84 XX XXXX XXXX' },
    'YE': { code: '+967', pattern: '[0-9]{9}', format: '+967 X XXX XXXX' },

    // Europe
    'AL': { code: '+355', pattern: '[0-9]{9}', format: '+355 XX XXX XXXX' },
    'AD': { code: '+376', pattern: '[0-9]{6}', format: '+376 XXX XXX' },
    'AT': { code: '+43', pattern: '[0-9]{10,11}', format: '+43 X XXX XXXX' },
    'BY': { code: '+375', pattern: '[0-9]{9}', format: '+375 XX XXX XX XX' },
    'BE': { code: '+32', pattern: '[0-9]{9}', format: '+32 X XXX XX XX' },
    'BA': { code: '+387', pattern: '[0-9]{8}', format: '+387 XX XXX XXX' },
    'BG': { code: '+359', pattern: '[0-9]{9}', format: '+359 XX XXX XXX' },
    'HR': { code: '+385', pattern: '[0-9]{9}', format: '+385 XX XXX XXXX' },
    'CZ': { code: '+420', pattern: '[0-9]{9}', format: '+420 XXX XXX XXX' },
    'DK': { code: '+45', pattern: '[0-9]{8}', format: '+45 XX XX XX XX' },
    'EE': { code: '+372', pattern: '[0-9]{7,8}', format: '+372 XXXX XXXX' },
    'FO': { code: '+298', pattern: '[0-9]{6}', format: '+298 XXX XXX' },
    'FI': { code: '+358', pattern: '[0-9]{9,10}', format: '+358 XX XXX XXXX' },
    'FR': { code: '+33', pattern: '[0-9]{9}', format: '+33 X XX XX XX XX' },
    'DE': { code: '+49', pattern: '[0-9]{10,11}', format: '+49 XXX XXXX XXXX' },
    'GI': { code: '+350', pattern: '[0-9]{8}', format: '+350 XXX XXX' },
    'GR': { code: '+30', pattern: '[0-9]{10}', format: '+30 XXX XXX XXXX' },
    'GG': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'HU': { code: '+36', pattern: '[0-9]{9}', format: '+36 XX XXX XXXX' },
    'IS': { code: '+354', pattern: '[0-9]{7}', format: '+354 XXX XXXX' },
    'IE': { code: '+353', pattern: '[0-9]{9}', format: '+353 XX XXX XXXX' },
    'IM': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'IT': { code: '+39', pattern: '[0-9]{9,10}', format: '+39 XXX XXX XXXX' },
    'JE': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'XK': { code: '+383', pattern: '[0-9]{8}', format: '+383 XX XXX XXX' },
    'LV': { code: '+371', pattern: '[0-9]{8}', format: '+371 XX XXX XXX' },
    'LI': { code: '+423', pattern: '[0-9]{7}', format: '+423 XXX XXXX' },
    'LT': { code: '+370', pattern: '[0-9]{8}', format: '+370 XX XXX XXX' },
    'LU': { code: '+352', pattern: '[0-9]{9}', format: '+352 XXX XXX XXX' },
    'MT': { code: '+356', pattern: '[0-9]{8}', format: '+356 XXXX XXXX' },
    'MD': { code: '+373', pattern: '[0-9]{8}', format: '+373 XX XXX XXX' },
    'MC': { code: '+377', pattern: '[0-9]{8,9}', format: '+377 X XXX XXX' },
    'ME': { code: '+382', pattern: '[0-9]{8}', format: '+382 XX XXX XXX' },
    'NL': { code: '+31', pattern: '[0-9]{9}', format: '+31 X XXX XXX' },
    'MK': { code: '+389', pattern: '[0-9]{8}', format: '+389 XX XXX XXX' },
    'NO': { code: '+47', pattern: '[0-9]{8}', format: '+47 XXX XX XXX' },
    'PL': { code: '+48', pattern: '[0-9]{9}', format: '+48 XXX XXX XXX' },
    'PT': { code: '+351', pattern: '[0-9]{9}', format: '+351 XXX XXX XXX' },
    'RO': { code: '+40', pattern: '[0-9]{9}', format: '+40 XX XXX XXXX' },
    'RU': { code: '+7', pattern: '[0-9]{10}', format: '+7 XXX XXX XX XX' },
    'SM': { code: '+378', pattern: '[0-9]{10}', format: '+378 XXX XXX XXXX' },
    'RS': { code: '+381', pattern: '[0-9]{8,9}', format: '+381 XX XXX XXXX' },
    'SK': { code: '+421', pattern: '[0-9]{9}', format: '+421 XXX XXX XXX' },
    'SI': { code: '+386', pattern: '[0-9]{8}', format: '+386 XX XXX XXX' },
    'ES': { code: '+34', pattern: '[0-9]{9}', format: '+34 XXX XXX XXX' },
    'SE': { code: '+46', pattern: '[0-9]{9}', format: '+46 XX XXX XXXX' },
    'CH': { code: '+41', pattern: '[0-9]{9}', format: '+41 XX XXX XXXX' },
    'UA': { code: '+380', pattern: '[0-9]{9}', format: '+380 XX XXX XXXX' },
    'GB': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' },
    'VA': { code: '+379', pattern: '[0-9]{10}', format: '+379 XXX XXX XXXX' },

    // Océanie
    'AS': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'AU': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' },
    'CK': { code: '+682', pattern: '[0-9]{5}', format: '+682 XX XXX' },
    'FJ': { code: '+679', pattern: '[0-9]{7}', format: '+679 XXX XXXX' },
    'PF': { code: '+689', pattern: '[0-9]{8}', format: '+689 XX XX XX' },
    'GU': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'KI': { code: '+686', pattern: '[0-9]{5}', format: '+686 XXX XX' },
    'MH': { code: '+692', pattern: '[0-9]{7}', format: '+692 XXX XXXX' },
    'FM': { code: '+691', pattern: '[0-9]{7}', format: '+691 XXX XXXX' },
    'NR': { code: '+674', pattern: '[0-9]{7}', format: '+674 XXX XXXX' },
    'NC': { code: '+687', pattern: '[0-9]{6}', format: '+687 XXX XXX' },
    'NZ': { code: '+64', pattern: '[0-9]{9}', format: '+64 X XXX XXXX' },
    'NU': { code: '+683', pattern: '[0-9]{4}', format: '+683 XXXX' },
    'NF': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' },
    'MP': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'PW': { code: '+680', pattern: '[0-9]{7}', format: '+680 XXX XXXX' },
    'PG': { code: '+675', pattern: '[0-9]{8}', format: '+675 XXX X XXXX' },
    'PN': { code: '+64', pattern: '[0-9]{9}', format: '+64 X XXX XXXX' },
    'WS': { code: '+685', pattern: '[0-9]{7}', format: '+685 XX XXX' },
    'SB': { code: '+677', pattern: '[0-9]{7}', format: '+677 XXX XXXX' },
    'TK': { code: '+690', pattern: '[0-9]{4}', format: '+690 XXXX' },
    'TO': { code: '+676', pattern: '[0-9]{7}', format: '+676 XXX XXXX' },
    'TV': { code: '+688', pattern: '[0-9]{5}', format: '+688 XX XXX' },
    'VU': { code: '+678', pattern: '[0-9]{7}', format: '+678 XXX XXXX' },
    'WF': { code: '+681', pattern: '[0-9]{6}', format: '+681 XX XX XX' },

    // Autres
    'AQ': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' },
    'BV': { code: '+47', pattern: '[0-9]{8}', format: '+47 XXX XX XXX' },
    'IO': { code: '+246', pattern: '[0-9]{7}', format: '+246 XXX XXXX' },
    'CX': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' },
    'CC': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' },
    'HM': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' },
    'GS': { code: '+500', pattern: '[0-9]{5}', format: '+500 XX XXX' },
    'UM': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' },
    'TF': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' },

    // Option par défaut pour les pays non listés
    'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
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
    'Bitcoin': 'Paiement par Crypto Currency',
    'Paiement sur place': 'Paiement sur place (espèces/chèque)'
};

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
    modal: document.getElementById('confirmation-modal'),
    modalFormationsList: document.getElementById('modal-formations-list'),
    modalUserInfo: document.getElementById('modal-user-info'),
    modalSessionInfo: document.getElementById('modal-session-info'),
    modalModeInfo: document.getElementById('modal-mode-info'),
    modalPaymentInfo: document.getElementById('modal-payment-info'),
    modalTotalPrice: document.getElementById('modal-total-price'),
    modalTotalPriceEur: document.getElementById('modal-total-price-eur'),
    modalNomComplet: document.getElementById('modal-nom-complet'),
    modalEmail: document.getElementById('modal-email'),
    modalDateNaissance: document.getElementById('modal-date-naissance'),
    modalLieuNaissance: document.getElementById('modal-lieu-naissance'),
    modalTelephone: document.getElementById('modal-telephone'),
    modalPays: document.getElementById('modal-pays'),
    modalProfession: document.getElementById('modal-profession'),
    modalObjectifs: document.getElementById('modal-objectifs'),
    closeModal: document.querySelector('.close-modal'),
    modalCancel: document.querySelector('.modal-cancel'),
    modalConfirm: document.querySelector('.modal-confirm'),
    chatToggle: document.getElementById('chat-toggle'),
    chatContainer: document.getElementById('chat-container'),
    closeChat: document.getElementById('close-chat'),
    chatMessages: document.getElementById('chat-messages'),
    chatInput: document.getElementById('chat-input'),
    sendMessage: document.getElementById('send-message'),
    modeFormationSelect: document.getElementById('mode-formation'),
    onlinePaymentMethods: document.getElementById('online-payment-methods'),
    presentielPaymentMethod: document.getElementById('presentiel-payment-method'),
    paymentMethodGroup: document.getElementById('payment-method-group'),
    formSteps: document.querySelectorAll('.form-step'),
    progressSteps: document.querySelectorAll('.step'),
    progressBar: document.getElementById('progress-bar'),
    progressText: document.getElementById('progress-text'),
    timeEstimation: document.getElementById('time-estimation'),
    saveStatus: document.getElementById('save-status'),
    userSummary: document.getElementById('user-summary'),
    rappelMessages: document.querySelectorAll('.rappel-message'),
    rappelContainer: document.querySelector('.rappel-container'),
    objectifsTextarea: document.getElementById('objectifs'),
    objectifsCounter: document.getElementById('objectifs-counter'),
    dateNaissanceInput: document.getElementById('date_naissance'),
    lieuNaissanceInput: document.getElementById('lieu_naissance'),
    ageError: document.getElementById('age-error'),
    resendEmailBtn: document.getElementById('resend-email-btn')
};

// Variables d'état
const state = {
    saveTimeout: null,
    formData: {},
    currentStep: 1,
    currentRappelIndex: 0,
    isSubmitting: false,
    touchStartX: 0,
    touchEndX: 0,
    emailSent: false
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
    
    if (wordCount > 100) {
        DOM.objectifsCounter.style.color = '#e74c3c';
        DOM.objectifsTextarea.style.borderColor = '#e74c3c';
    } else {
        DOM.objectifsCounter.style.color = '#666';
        DOM.objectifsTextarea.style.borderColor = '#ddd';
    }
}

// Fait défiler les messages du rappel
function rotateRappelMessages() {
    DOM.rappelMessages.forEach(msg => msg.classList.remove('active'));
    DOM.rappelMessages[state.currentRappelIndex].classList.add('active');
    state.currentRappelIndex = (state.currentRappelIndex + 1) % DOM.rappelMessages.length;
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

// Valide un numéro de téléphone selon le pays
function validatePhone(phone, country) {
    const config = phoneConfigurations[country] || phoneConfigurations['other'];
    const regex = new RegExp(`^${config.pattern}$`);
    return regex.test(phone);
}

// Nettoie les entrées pour prévenir les attaques XSS
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Efface le contenu du formulaire après soumission
function clearForm() {
    DOM.registrationForm.reset();
    DOM.priceDisplay.style.display = 'none';
    DOM.totalPriceFCFA.textContent = '0';
    DOM.totalPriceEUR.textContent = '0.00';
    DOM.submitBtn.textContent = "S'inscrire maintenant";
    DOM.checkboxes.forEach(checkbox => checkbox.checked = false);
    DOM.phonePrefix.textContent = '+';
    DOM.phoneFormat.style.display = 'none';
    DOM.objectifsCounter.textContent = '0/100 mots';
    DOM.objectifsCounter.style.color = '#666';
    DOM.objectifsTextarea.style.borderColor = '#ddd';
    DOM.ageError.style.display = 'none';
    DOM.dateNaissanceInput.style.borderColor = '#ddd';
    DOM.onlinePaymentMethods.style.display = 'none';
    DOM.presentielPaymentMethod.style.display = 'none';
    document.getElementById('consentement').checked = false;
    document.querySelectorAll('input[name="profession"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('input[name="session"]').forEach(radio => radio.checked = false);
    document.querySelectorAll('input[name="payment_method"]').forEach(radio => radio.checked = false);
    DOM.modeFormationSelect.value = '';
    DOM.paysSelect.value = '';
}

/**
 * Fonctions de gestion du formulaire
 */

// Sauvegarde automatique des données du formulaire
function autoSave() {
    DOM.saveStatus.textContent = "Sauvegarde en cours...";
    DOM.saveStatus.className = "save-status saving";
    DOM.saveStatus.style.display = "block";
    
    state.formData = {
        step: state.currentStep,
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        date_naissance: DOM.dateNaissanceInput.value,
        lieu_naissance: DOM.lieuNaissanceInput.value,
        pays: DOM.paysSelect.value,
        telephone: DOM.telephoneInput.value,
        profession: document.querySelector('input[name="profession"]:checked')?.value,
        objectifs: DOM.objectifsTextarea.value,
        formations: Array.from(DOM.checkboxes).filter(cb => cb.checked).map(cb => cb.value),
        session: document.querySelector('input[name="session"]:checked')?.value,
        modeFormation: DOM.modeFormationSelect.value,
        paymentMethod: document.querySelector('input[name="payment_method"]:checked')?.value,
        consentement: document.getElementById('consentement').checked
    };
    
    localStorage.setItem('bteceFormData', JSON.stringify(state.formData));
    
    setTimeout(() => {
        DOM.saveStatus.textContent = "Données sauvegardées";
        DOM.saveStatus.className = "save-status saved";
        
        setTimeout(() => {
            DOM.saveStatus.style.display = "none";
        }, 3000);
    }, 1000);
}

// Charge les données sauvegardées
function loadSavedData() {
    const savedData = localStorage.getItem('bteceFormData');
    if (!savedData) return;
    
    try {
        state.formData = JSON.parse(savedData);
        
        // Remplit les champs avec les données sauvegardées
        const fillField = (id, value) => value && (document.getElementById(id).value = sanitizeInput(value));
        const checkRadio = (name, value) => {
            if (value) {
                const radio = document.querySelector(`input[name="${name}"][value="${sanitizeInput(value)}"]`);
                if (radio) radio.checked = true;
            }
        };
        
        fillField('nom', state.formData.nom);
        fillField('prenom', state.formData.prenom);
        fillField('email', state.formData.email);
        fillField('date_naissance', state.formData.date_naissance);
        fillField('lieu_naissance', state.formData.lieu_naissance);
        
        if (state.formData.pays) {
            DOM.paysSelect.value = state.formData.pays;
            DOM.paysSelect.dispatchEvent(new Event('change'));
        }
        
        fillField('telephone', state.formData.telephone);
        checkRadio('profession', state.formData.profession);
        fillField('objectifs', state.formData.objectifs);
        
        // Formations
        if (state.formData.formations?.length > 0) {
            state.formData.formations.forEach(formation => {
                const checkbox = document.querySelector(`input[name="formations[]"][value="${sanitizeInput(formation)}"]`);
                if (checkbox) checkbox.checked = true;
            });
            calculateTotal();
        }
        
        // Session
        checkRadio('session', state.formData.session);
        
        // Mode de formation
        if (state.formData.modeFormation) {
            DOM.modeFormationSelect.value = state.formData.modeFormation;
            DOM.modeFormationSelect.dispatchEvent(new Event('change'));
        }
        
        // Méthode de paiement
        checkRadio('payment_method', state.formData.paymentMethod);
        
        // Consentement
        if (state.formData.consentement) {
            document.getElementById('consentement').checked = true;
        }
        
        // Aller à l'étape sauvegardée
        if (state.formData.step) {
            showStep(state.formData.step);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données sauvegardées:', error);
        localStorage.removeItem('bteceFormData');
    }
}

// Met à jour la barre de progression
function updateProgressBar() {
    const progress = ((state.currentStep - 1) / 5) * 100;
    DOM.progressBar.style.width = `${progress}%`;
    DOM.progressText.textContent = `${progress.toFixed(0)}% complété`;
    
    if (state.currentStep > 1) {
        document.querySelector('.progress-container').style.display = 'block';
    }
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
        
        if (selectedFormations.length === 1) {
            DOM.submitBtn.textContent = `S'inscrire maintenant (${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
        } else {
            DOM.submitBtn.textContent = `S'inscrire maintenant (${selectedFormations.length} formations - ${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
        }
    } else {
        DOM.priceDisplay.style.display = 'none';
        DOM.submitBtn.textContent = `S'inscrire maintenant`;
    }
    
    autoSave();
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
    autoSave();
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
    const requiredFields = [
        { id: 'nom', name: 'Nom' },
        { id: 'prenom', name: 'Prénom' },
        { id: 'email', name: 'Email' },
        { id: 'date_naissance', name: 'Date de naissance' },
        { id: 'lieu_naissance', name: 'Lieu de naissance' },
        { id: 'pays', name: 'Pays' },
        { id: 'telephone', name: 'Téléphone' }
    ];

    for (const field of requiredFields) {
        const value = document.getElementById(field.id).value.trim();
        if (!value) {
            alert(`Veuillez remplir le champ "${field.name}"`);
            return false;
        }
    }

    // Validation de l'email
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Veuillez entrer une adresse email valide');
        return false;
    }

    // Validation du téléphone
    const pays = DOM.paysSelect.value;
    const telephone = DOM.telephoneInput.value.trim();
    if (!validatePhone(telephone, pays)) {
        const config = phoneConfigurations[pays] || phoneConfigurations['other'];
        alert(`Veuillez entrer un numéro de téléphone valide pour votre pays (format: ${config.format})`);
        return false;
    }

    // Validation de la profession
    if (!document.querySelector('input[name="profession"]:checked')) {
        alert('Veuillez sélectionner une profession');
        return false;
    }

    // Validation des objectifs
    const objectifs = DOM.objectifsTextarea.value.trim();
    const wordCount = countWords(objectifs);
    if (wordCount > 100) {
        alert('Veuillez limiter vos objectifs à 100 mots maximum');
        return false;
    }

    // Validation de l'âge
    if (!validateAge()) {
        return false;
    }

    return true;
}

// Valide l'étape 2 (Formations)
function validateStep2() {
    if (DOM.checkboxes.length === 0 || !Array.from(DOM.checkboxes).some(cb => cb.checked)) {
        alert('Veuillez sélectionner au moins une formation');
        return false;
    }
    return true;
}

// Valide l'étape 3 (Session & Mode)
function validateStep3() {
    if (!document.querySelector('input[name="session"]:checked')) {
        alert('Veuillez sélectionner une session');
        return false;
    }

    if (!DOM.modeFormationSelect.value) {
        alert('Veuillez sélectionner un mode de formation');
        return false;
    }

    return true;
}

// Valide l'étape 4 (Paiement)
function validateStep4() {
    if (!document.querySelector('input[name="payment_method"]:checked')) {
        alert('Veuillez sélectionner une méthode de paiement');
        return false;
    }
    return true;
}

// Retourne à l'étape précédente
function prevStep(current) {
    showStep(current - 1);
}

// Valide l'étape finale avant soumission
function validateFinalStep() {
    if (!document.getElementById('consentement').checked) {
        alert('Veuillez accepter les conditions générales');
        return false;
    }

    if (!validateAllSteps()) {
        alert('Veuillez compléter toutes les étapes du formulaire');
        return false;
    }

    const checkedFormations = Array.from(DOM.checkboxes).filter(cb => cb.checked);
    showConfirmationModal(checkedFormations);
    return true;
}

// Valide toutes les étapes
function validateAllSteps() {
    return validateStep1() && validateStep2() && validateStep3() && validateStep4();
}

// Affiche la modal de confirmation
function showConfirmationModal(checkedFormations) {
    let total = 0;
    DOM.modalFormationsList.innerHTML = '';
    
    checkedFormations.forEach(checkbox => {
        const formationName = formationNames[checkbox.value];
        const formationPrice = formationPrices[checkbox.value];
        total += formationPrice;
        
        const li = document.createElement('li');
        li.textContent = `${formationName} - ${formationPrice.toLocaleString('fr-FR')} FCFA`;
        DOM.modalFormationsList.appendChild(li);
    });

    // Remplit les informations dans la modal
    const getValue = id => sanitizeInput(document.getElementById(id).value);
    const getRadioValue = name => document.querySelector(`input[name="${name}"]:checked`)?.value;
    const getRadioText = name => sanitizeInput(document.querySelector(`input[name="${name}"]:checked`)?.nextElementSibling?.textContent);
    const getSelectText = id => sanitizeInput(DOM[id].options[DOM[id].selectedIndex]?.text);

    DOM.modalNomComplet.textContent = `${getValue('prenom')} ${getValue('nom')}`;
    DOM.modalEmail.textContent = getValue('email');
    DOM.modalDateNaissance.textContent = getValue('date_naissance');
    DOM.modalLieuNaissance.textContent = getValue('lieu_naissance');
    DOM.modalTelephone.textContent = `${DOM.phonePrefix.textContent} ${getValue('telephone')}`;
    DOM.modalPays.textContent = getSelectText('paysSelect');
    DOM.modalProfession.textContent = getRadioText('profession');
    DOM.modalObjectifs.textContent = getValue('objectifs');
    DOM.modalSessionInfo.textContent = getRadioText('session');
    DOM.modalModeInfo.textContent = getSelectText('modeFormationSelect');
    
    const paymentMethod = getRadioValue('payment_method');
    DOM.modalPaymentInfo.textContent = paymentMethodNames[paymentMethod] || paymentMethod;
    
    const totalEur = (total / exchangeRate).toFixed(2);
    DOM.modalTotalPrice.textContent = total.toLocaleString('fr-FR');
    DOM.modalTotalPriceEur.textContent = totalEur;
    DOM.modal.style.display = 'block';
}

// Envoie les données du formulaire
function sendFormData() {
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    
    DOM.modal.style.display = 'none';
    DOM.loadingIndicator.style.display = 'block';
    DOM.submitBtn.disabled = true;
    
    const formData = new FormData(DOM.registrationForm);
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbx684D00HrPRq1IuoXWBj8Xgg0TAHCp6ccug55c6-1sAXaci4wi82OW7ANt6KdOgXW4cQ/exec';
    // Ajoutez ceci AVANT votre fetch()
    const corsApiUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy CORS
    const API_URL = `https://script.google.com/.../exec?key= Baack08`;  // Mon code secret
    const fullUrl = corsApiUrl + API_URL;
    const response = {
  "status": "success",
  "sheetUrl": "https://docs.google.com/spreadsheets/d/14VgMGuRowc7OtrroVUBGRpV-i_GAtrjAojUjlDQMw_Q/edit"
    };

    const sheetUrl = response.sheetUrl; 
    console.log("URL à utiliser :", sheetUrl);
    // Output: https://docs.google.com/spreadsheets/d/14VgMGuRowc7OtrroVUBGRpV-i_GAtrjAojUjlDQMw_Q/edit

// Utilisez fullUrl dans votre fetch()
    
    fetch(scriptUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
    .then(() => {
        showConfirmationPage();
        localStorage.removeItem('bteceFormData');
        sendConfirmationEmail();
        clearForm(); // Effacer le formulaire après soumission
    })
    .catch(error => {
        console.error('Erreur:', error);
        saveToLocalStorage();
        showConfirmationPage();
        clearForm(); // Effacer le formulaire même en cas d'erreur
    })
    .finally(() => {
        state.isSubmitting = false;
    });
}

// Envoie un email de confirmation via EmailJS
function sendConfirmationEmail() {
    const formData = {
        nom: sanitizeInput(document.getElementById('nom').value),
        prenom: sanitizeInput(document.getElementById('prenom').value),
        email: sanitizeInput(document.getElementById('email').value),
        formations: Array.from(DOM.checkboxes)
            .filter(cb => cb.checked)
            .map(cb => formationNames[cb.value])
            .join(', '),
        total: DOM.totalPriceFCFA.textContent + ' FCFA'
    };
    
    // Utilisation des variables d'environnement pour EmailJS
    emailjs.init(process.env.USER_ID);
    
    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, formData)
        .then(function(response) {
            console.log('Email de confirmation envoyé avec succès!', response.status, response.text);
            state.emailSent = true;
        }, function(error) {
            console.log('Échec de l\'envoi de l\'email de confirmation:', error);
            state.emailSent = false;
        });
}

// Fonction pour renvoyer l'email de confirmation
function resendConfirmationEmail() {
    if (state.emailSent) {
        alert('Un email de confirmation vous a déjà été envoyé. Veuillez vérifier votre boîte de réception ou vos spams.');
        return;
    }

    DOM.resendEmailBtn.disabled = true;
    DOM.resendEmailBtn.textContent = 'Envoi en cours...';
    
    sendConfirmationEmail();
    
    setTimeout(() => {
        if (state.emailSent) {
            alert('Un nouveau email de confirmation vous a été envoyé');
        } else {
            alert('Échec de l\'envoi du nouvel email. Veuillez réessayer plus tard.');
        }
        DOM.resendEmailBtn.disabled = false;
        DOM.resendEmailBtn.textContent = 'Renvoyer l\'email de confirmation';
    }, 2000);
}

// Sauvegarde locale en cas d'échec
function saveToLocalStorage() {
    const formData = {
        nom: sanitizeInput(document.getElementById('nom').value),
        prenom: sanitizeInput(document.getElementById('prenom').value),
        email: sanitizeInput(document.getElementById('email').value),
        dateNaissance: sanitizeInput(document.getElementById('date_naissance').value),
        lieuNaissance: sanitizeInput(document.getElementById('lieu_naissance').value),
        pays: sanitizeInput(document.getElementById('pays').value),
        telephone: sanitizeInput(document.getElementById('telephone').value),
        profession: document.querySelector('input[name="profession"]:checked')?.value,
        objectifs: sanitizeInput(document.getElementById('objectifs').value),
        checkedFormations: Array.from(DOM.checkboxes)
            .filter(cb => cb.checked)
            .map(cb => formationNames[cb.value]),
        session: document.querySelector('input[name="session"]:checked')?.value,
        modeFormation: DOM.modeFormationSelect.value,
        paymentMethod: document.querySelector('input[name="payment_method"]:checked')?.value,
        total: DOM.totalPriceFCFA.textContent,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('pendingRegistration', JSON.stringify(formData));
    alert('Votre inscription a été enregistrée localement. Veuillez cliquer sur OK si vous n\'êtes pas un robot');
}

// Affiche la page de confirmation
function showConfirmationPage() {
    DOM.mainPage.style.display = 'none';
    DOM.confirmationPage.style.display = 'block';
    window.scrollTo(0, 0);
    
    displayUserSummary();
    simulateTracking();
}

// Affiche le résumé des informations
function displayUserSummary() {
    const getValue = id => sanitizeInput(document.getElementById(id).value);
    const getRadioText = name => sanitizeInput(document.querySelector(`input[name="${name}"]:checked`)?.nextElementSibling?.textContent);
    const getSelectText = id => sanitizeInput(DOM[id].options[DOM[id].selectedIndex]?.text);
    
    const checkedFormations = Array.from(DOM.checkboxes)
        .filter(cb => cb.checked)
        .map(cb => formationNames[cb.value]);
    
    const total = Array.from(DOM.checkboxes)
        .filter(cb => cb.checked)
        .reduce((sum, cb) => sum + formationPrices[cb.value], 0);
    
    const totalEur = (total / exchangeRate).toFixed(2);
    
    DOM.userSummary.innerHTML = `
        <h4>Récapitulatif de votre inscription</h4>
        <p><strong>Nom complet :</strong> ${getValue('prenom')} ${getValue('nom')}</p>
        <p><strong>Email :</strong> ${getValue('email')}</p>
        <p><strong>Date de naissance :</strong> ${getValue('date_naissance')}</p>
        <p><strong>Lieu de naissance :</strong> ${getValue('lieu_naissance')}</p>
        <p><strong>Téléphone :</strong> ${DOM.phonePrefix.textContent} ${getValue('telephone')}</p>
        <p><strong>Pays :</strong> ${getSelectText('paysSelect')}</p>
        <p><strong>Profession :</strong> ${getRadioText('profession')}</p>
        <p><strong>Objectifs :</strong> ${getValue('objectifs')}</p>
        <p><strong>Formations choisies :</strong> ${checkedFormations.join(', ')}</p>
        <p><strong>Session :</strong> ${getRadioText('session').charAt(0).toUpperCase() + getRadioText('session').slice(1)} 2025</p>
        <p><strong>Mode de formation :</strong> ${DOM.modeFormationSelect.value === 'presentiel' ? 'Présentiel à Cotonou' : 'En ligne'}</p>
        <p><strong>Méthode de paiement :</strong> ${paymentMethodNames[getRadioText('payment_method')] || getRadioText('payment_method')}</p>
        <p><strong>Montant total :</strong> ${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)</p>
    `;
}

// Simule le suivi de l'inscription
function simulateTracking() {
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

// Gestion du chat
function sendChatMessage() {
    const message = DOM.chatInput.value.trim();
    if (!message) return;
    
    addChatMessage(message, 'user');
    DOM.chatInput.value = '';
    
    setTimeout(() => {
        addChatMessage('Merci pour votre message. Veuillez laisser votre préocupation par e-mail via notre adresse. Notre équipe vous répondra dans les plus brefs délais.', 'bot');
    }, 1000);
}

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${sanitizeInput(text)}</p>`;
    DOM.chatMessages.appendChild(messageDiv);
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
}

// Gestion des gestes tactiles
function handleSwipe() {
    const threshold = 50;
    
    if (state.touchEndX < state.touchStartX - threshold && state.currentStep < 5) {
        nextStep(state.currentStep);
    } else if (state.touchEndX > state.touchStartX + threshold && state.currentStep > 1) {
        prevStep(state.currentStep);
    }
}

// Initialisation
function init() {
    // Chargement des données sauvegardées
    loadSavedData();
    updateProgressBar();
    updateTimeEstimation();
    
    // Rotation des messages du rappel
    setInterval(rotateRappelMessages, 2000);
    
    // Écouteurs d'événements
    DOM.objectifsTextarea.addEventListener('input', updateWordCounter);
    DOM.dateNaissanceInput.addEventListener('change', validateAge);
    
    DOM.modeFormationSelect.addEventListener('change', function() {
        DOM.onlinePaymentMethods.style.display = this.value === 'en-ligne' ? 'block' : 'none';
        DOM.presentielPaymentMethod.style.display = this.value === 'presentiel' ? 'block' : 'none';
        autoSave();
    });
    
    DOM.paysSelect.addEventListener('change', function() {
        const selectedCountry = this.value;
        const config = phoneConfigurations[selectedCountry] || phoneConfigurations['other'];
        
        DOM.phonePrefix.textContent = config.code;
        DOM.telephoneInput.pattern = config.pattern;
        DOM.telephoneInput.title = `Numéro valide (format: ${config.format})`;
        DOM.phoneFormat.textContent = `Format: ${config.format}`;
        DOM.phoneFormat.style.display = 'block';
        DOM.telephoneInput.value = '';
        autoSave();
    });
    
    DOM.checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
    
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('change', () => {
            clearTimeout(state.saveTimeout);
            state.saveTimeout = setTimeout(autoSave, 1000);
        });
        
        element.addEventListener('input', () => {
            clearTimeout(state.saveTimeout);
            state.saveTimeout = setTimeout(autoSave, 1000);
        });
    });
    
    DOM.registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateFinalStep();
    });
    
    DOM.modalConfirm.addEventListener('click', sendFormData);
    DOM.modalCancel.addEventListener('click', () => DOM.modal.style.display = 'none');
    DOM.closeModal.addEventListener('click', () => DOM.modal.style.display = 'none');
    
    DOM.chatToggle.addEventListener('click', () => {
        DOM.chatContainer.style.display = DOM.chatContainer.style.display === 'block' ? 'none' : 'block';
        if (DOM.chatContainer.style.display === 'block') DOM.chatInput.focus();
    });
    
    DOM.closeChat.addEventListener('click', () => DOM.chatContainer.style.display = 'none');
    DOM.sendMessage.addEventListener('click', sendChatMessage);
    DOM.chatInput.addEventListener('keypress', e => e.key === 'Enter' && sendChatMessage());
    
    // Bouton de renvoi d'email
    DOM.resendEmailBtn.addEventListener('click', resendConfirmationEmail);
    
    // Protection contre le clic droit et le glisser-déposer
    document.addEventListener('contextmenu', function(e) {
        if (e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
            e.preventDefault();
        }
    });
    
    // Gestion des gestes tactiles
    document.addEventListener('touchstart', function(e) {
        state.touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        state.touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    // Initialisation finale
    updateWordCounter();
    calculateTotal();
    DOM.modeFormationSelect.dispatchEvent(new Event('change'));
}

// Lance l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', init);