
/**
 * Module principal de l'application d'inscription aux formations BTECE
 * @module btece-registration
 * @version 2.0.0
 * @license MIT
 */

// ==============================================
// MODULE DE CONFIGURATION
// ==============================================

/**
 * Configuration des prix des formations
 * @constant {Object.<string, number>}
 */
const formationPrices = {
    'plans_archi_elec': 130000,
    'conception_elec': 150000,
    'realisation_3d': 120000,
    'programmation': 200000
};

/**
 * Taux de conversion FCFA vers EUR
 * @constant {number}
 */
const exchangeRate = 655.957;

/**
 * Temps estimé par étape (en secondes)
 * @constant {number[]}
 */
const stepTimes = [60, 30, 30, 30, 30];

/**
 * Configuration des numéros de téléphone par pays
 * @constant {Object.<string, Object>}
 */
const phoneConfigurations = {
    // Afrique
    'DZ': { code: '+213', pattern: '[0-9]{9}', format: '+213 XX XXX XXXX' }, // Algérie
    'AO': { code: '+244', pattern: '[0-9]{9}', format: '+244 XXX XXX XXX' }, // Angola
    'BJ': { code: '+229', pattern: '[0-9]{8}', format: '+229 XX XX XX XX' }, // Bénin
    'BW': { code: '+267', pattern: '[0-9]{7}', format: '+267 XX XXX XXX' }, // Botswana
    'BF': { code: '+226', pattern: '[0-9]{8}', format: '+226 XX XX XX XX' }, // Burkina Faso
    'BI': { code: '+257', pattern: '[0-9]{8}', format: '+257 XX XX XX XX' }, // Burundi
    'CM': { code: '+237', pattern: '[0-9]{8}', format: '+237 6XX XX XX XX' }, // Cameroun
    'CV': { code: '+238', pattern: '[0-9]{7}', format: '+238 XXX XX XX' }, // Cap-Vert
    'CF': { code: '+236', pattern: '[0-9]{8}', format: '+236 XX XX XX XX' }, // Centrafrique
    'TD': { code: '+235', pattern: '[0-9]{8}', format: '+235 XX XX XX XX' }, // Tchad
    'KM': { code: '+269', pattern: '[0-9]{7}', format: '+269 XXX XX XX' }, // Comores
    'CG': { code: '+242', pattern: '[0-9]{9}', format: '+242 XX XXX XXX' }, // Congo-Brazzaville
    'CD': { code: '+243', pattern: '[0-9]{9}', format: '+243 XXX XXX XXX' }, // Congo-Kinshasa
    'CI': { code: '+225', pattern: '[0-9]{8}', format: '+225 XX XX XX XX' }, // Côte d'Ivoire
    'DJ': { code: '+253', pattern: '[0-9]{8}', format: '+253 XX XX XX XX' }, // Djibouti
    'EG': { code: '+20', pattern: '[0-9]{10}', format: '+20 XXXX XXX XXXX' }, // Égypte
    'GQ': { code: '+240', pattern: '[0-9]{9}', format: '+240 XX XXX XXX' }, // Guinée équatoriale
    'ER': { code: '+291', pattern: '[0-9]{7}', format: '+291 X XXX XXX' }, // Érythrée
    'SZ': { code: '+268', pattern: '[0-9]{8}', format: '+268 XX XX XX XX' }, // Eswatini
    'ET': { code: '+251', pattern: '[0-9]{9}', format: '+251 XX XXX XXXX' }, // Éthiopie
    'GA': { code: '+241', pattern: '[0-9]{7}', format: '+241 X XX XX XX' }, // Gabon
    'GM': { code: '+220', pattern: '[0-9]{7}', format: '+220 XXX XX XX' }, // Gambie
    'GH': { code: '+233', pattern: '[0-9]{9}', format: '+233 XX XXX XXXX' }, // Ghana
    'GN': { code: '+224', pattern: '[0-9]{8}', format: '+224 XX XX XX XX' }, // Guinée
    'GW': { code: '+245', pattern: '[0-9]{7}', format: '+245 XXX XX XX' }, // Guinée-Bissau
    'KE': { code: '+254', pattern: '[0-9]{9}', format: '+254 XXX XXX XXX' }, // Kenya
    'LS': { code: '+266', pattern: '[0-9]{8}', format: '+266 XX XX XX XX' }, // Lesotho
    'LR': { code: '+231', pattern: '[0-9]{7}', format: '+231 XX XXX XXX' }, // Liberia
    'LY': { code: '+218', pattern: '[0-9]{9}', format: '+218 XX XXX XXXX' }, // Libye
    'MG': { code: '+261', pattern: '[0-9]{9}', format: '+261 XX XX XXX XX' }, // Madagascar
    'MW': { code: '+265', pattern: '[0-9]{9}', format: '+265 X XXX XXXX' }, // Malawi
    'ML': { code: '+223', pattern: '[0-9]{8}', format: '+223 XX XX XX XX' }, // Mali
    'MR': { code: '+222', pattern: '[0-9]{8}', format: '+222 XX XX XX XX' }, // Mauritanie
    'MU': { code: '+230', pattern: '[0-9]{7}', format: '+230 XXX XXXX' }, // Maurice
    'YT': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' }, // Mayotte
    'MA': { code: '+212', pattern: '[0-9]{9}', format: '+212 X XXX XXXX' }, // Maroc
    'MZ': { code: '+258', pattern: '[0-9]{9}', format: '+258 XX XXX XXX' }, // Mozambique
    'NA': { code: '+264', pattern: '[0-9]{9}', format: '+264 XX XXX XXXX' }, // Namibie
    'NE': { code: '+227', pattern: '[0-9]{8}', format: '+227 XX XX XX XX' }, // Niger
    'NG': { code: '+234', pattern: '[0-9]{10}', format: '+234 XXX XXX XXXX' }, // Nigeria
    'RE': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' }, // Réunion
    'RW': { code: '+250', pattern: '[0-9]{9}', format: '+250 XXX XXX XXX' }, // Rwanda
    'SH': { code: '+290', pattern: '[0-9]{4}', format: '+290 XXXX' }, // Sainte-Hélène
    'ST': { code: '+239', pattern: '[0-9]{7}', format: '+239 XX XX XXX' }, // Sao Tomé-et-Principe
    'SN': { code: '+221', pattern: '[0-9]{9}', format: '+221 XX XXX XX XX' }, // Sénégal
    'SC': { code: '+248', pattern: '[0-9]{7}', format: '+248 X XXX XXX' }, // Seychelles
    'SL': { code: '+232', pattern: '[0-9]{8}', format: '+232 XX XXX XXX' }, // Sierra Leone
    'SO': { code: '+252', pattern: '[0-9]{8}', format: '+252 XX XXX XXX' }, // Somalie
    'ZA': { code: '+27', pattern: '[0-9]{9}', format: '+27 XX XXX XXXX' }, // Afrique du Sud
    'SS': { code: '+211', pattern: '[0-9]{9}', format: '+211 XX XXX XXXX' }, // Soudan du Sud
    'SD': { code: '+249', pattern: '[0-9]{9}', format: '+249 XX XXX XXXX' }, // Soudan
    'TZ': { code: '+255', pattern: '[0-9]{9}', format: '+255 XX XXX XXXX' }, // Tanzanie
    'TG': { code: '+228', pattern: '[0-9]{8}', format: '+228 XX XX XX XX' }, // Togo
    'TN': { code: '+216', pattern: '[0-9]{8}', format: '+216 XX XXX XXX' }, // Tunisie
    'UG': { code: '+256', pattern: '[0-9]{9}', format: '+256 XXX XXX XXX' }, // Ouganda
    'EH': { code: '+212', pattern: '[0-9]{9}', format: '+212 X XXX XXXX' }, // Sahara occidental
    'ZM': { code: '+260', pattern: '[0-9]{9}', format: '+260 XX XXX XXXX' }, // Zambie
    'ZW': { code: '+263', pattern: '[0-9]{9}', format: '+263 XX XXX XXXX' }, // Zimbabwe

    // Amérique
    'US': { code: '+1', pattern: '[0-9]{10}', format: '+1 (XXX) XXX-XXXX' }, // États-Unis
    'CA': { code: '+1', pattern: '[0-9]{10}', format: '+1 (XXX) XXX-XXXX' }, // Canada
    'MX': { code: '+52', pattern: '[0-9]{10}', format: '+52 XXX XXX XXXX' }, // Mexique
    'BR': { code: '+55', pattern: '[0-9]{10,11}', format: '+55 XX XXXX XXXX' }, // Brésil
    'AR': { code: '+54', pattern: '[0-9]{10}', format: '+54 XXX XXX XXXX' }, // Argentine
    'CL': { code: '+56', pattern: '[0-9]{9}', format: '+56 X XXX XXXX' }, // Chili
    'CO': { code: '+57', pattern: '[0-9]{10}', format: '+57 XXX XXX XXXX' }, // Colombie
    'PE': { code: '+51', pattern: '[0-9]{9}', format: '+51 XXX XXX XXX' }, // Pérou
    'VE': { code: '+58', pattern: '[0-9]{10}', format: '+58 XXX XXX XXXX' }, // Venezuela
    'BO': { code: '+591', pattern: '[0-9]{8}', format: '+591 XXXX XXXX' }, // Bolivie
    'EC': { code: '+593', pattern: '[0-9]{9}', format: '+593 XX XXX XXXX' }, // Équateur
    'PY': { code: '+595', pattern: '[0-9]{9}', format: '+595 XXX XXX XXX' }, // Paraguay
    'UY': { code: '+598', pattern: '[0-9]{8}', format: '+598 XX XXX XXX' }, // Uruguay
    'CR': { code: '+506', pattern: '[0-9]{8}', format: '+506 XXXX XXXX' }, // Costa Rica
    'PA': { code: '+507', pattern: '[0-9]{8}', format: '+507 XXXX XXXX' }, // Panama
    'DO': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // République dominicaine
    'CU': { code: '+53', pattern: '[0-9]{8}', format: '+53 X XXX XXXX' }, // Cuba
    'GT': { code: '+502', pattern: '[0-9]{8}', format: '+502 XXXX XXXX' }, // Guatemala
    'HN': { code: '+504', pattern: '[0-9]{8}', format: '+504 XXXX XXXX' }, // Honduras
    'NI': { code: '+505', pattern: '[0-9]{8}', format: '+505 XXXX XXXX' }, // Nicaragua
    'SV': { code: '+503', pattern: '[0-9]{8}', format: '+503 XXXX XXXX' }, // Salvador
    'HT': { code: '+509', pattern: '[0-9]{8}', format: '+509 XX XX XXXX' }, // Haïti
    'JM': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // Jamaïque
    'TT': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // Trinité-et-Tobago
    'BZ': { code: '+501', pattern: '[0-9]{7}', format: '+501 XXX XXXX' }, // Belize
    'GY': { code: '+592', pattern: '[0-9]{7}', format: '+592 XXX XXXX' }, // Guyana
    'SR': { code: '+597', pattern: '[0-9]{7}', format: '+597 XXX XXXX' }, // Suriname

    // Asie
    'AF': { code: '+93', pattern: '[0-9]{9}', format: '+93 XX XXX XXXX' }, // Afghanistan
    'AM': { code: '+374', pattern: '[0-9]{8}', format: '+374 XX XXX XXX' }, // Arménie
    'AZ': { code: '+994', pattern: '[0-9]{9}', format: '+994 XX XXX XX XX' }, // Azerbaïdjan
    'BH': { code: '+973', pattern: '[0-9]{8}', format: '+973 XXXX XXXX' }, // Bahreïn
    'BD': { code: '+880', pattern: '[0-9]{10}', format: '+880 XX XXX XXXX' }, // Bangladesh
    'BT': { code: '+975', pattern: '[0-9]{7,8}', format: '+975 XX XXX XX' }, // Bhoutan
    'BN': { code: '+673', pattern: '[0-9]{7}', format: '+673 XXX XXXX' }, // Brunei
    'KH': { code: '+855', pattern: '[0-9]{8,9}', format: '+855 XX XXX XXX' }, // Cambodge
    'CN': { code: '+86', pattern: '[0-9]{11}', format: '+86 XXX XXXX XXXX' }, // Chine
    'CY': { code: '+357', pattern: '[0-9]{8}', format: '+357 XX XXX XXX' }, // Chypre
    'GE': { code: '+995', pattern: '[0-9]{9}', format: '+995 XXX XXX XXX' }, // Géorgie
    'IN': { code: '+91', pattern: '[0-9]{10}', format: '+91 XXXX XXX XXX' }, // Inde
    'ID': { code: '+62', pattern: '[0-9]{9,11}', format: '+62 XXX XXX XXX' }, // Indonésie
    'IR': { code: '+98', pattern: '[0-9]{10}', format: '+98 XXX XXX XXXX' }, // Iran
    'IQ': { code: '+964', pattern: '[0-9]{10}', format: '+964 XXX XXX XXXX' }, // Irak
    'IL': { code: '+972', pattern: '[0-9]{9}', format: '+972 X XXX XXXX' }, // Israël
    'JP': { code: '+81', pattern: '[0-9]{10}', format: '+81 XX XXXX XXXX' }, // Japon
    'JO': { code: '+962', pattern: '[0-9]{9}', format: '+962 X XXX XXXX' }, // Jordanie
    'KZ': { code: '+7', pattern: '[0-9]{10}', format: '+7 XXX XXX XX XX' }, // Kazakhstan
    'KW': { code: '+965', pattern: '[0-9]{8}', format: '+965 XXXX XXXX' }, // Koweït
    'KG': { code: '+996', pattern: '[0-9]{9}', format: '+996 XXX XXX XXX' }, // Kirghizistan
    'LA': { code: '+856', pattern: '[0-9]{9,10}', format: '+856 XX XXX XXXX' }, // Laos
    'LB': { code: '+961', pattern: '[0-9]{7,8}', format: '+961 XX XXX XXX' }, // Liban
    'MY': { code: '+60', pattern: '[0-9]{9,10}', format: '+60 X XXX XXX' }, // Malaisie
    'MV': { code: '+960', pattern: '[0-9]{7}', format: '+960 XXX XXXX' }, // Maldives
    'MN': { code: '+976', pattern: '[0-9]{8}', format: '+976 XX XX XXXX' }, // Mongolie
    'MM': { code: '+95', pattern: '[0-9]{8,10}', format: '+95 XX XXX XXXX' }, // Myanmar
    'NP': { code: '+977', pattern: '[0-9]{10}', format: '+977 XXX XXX XXXX' }, // Népal
    'KP': { code: '+850', pattern: '[0-9]{9,10}', format: '+850 XXX XXX XXXX' }, // Corée du Nord
    'OM': { code: '+968', pattern: '[0-9]{8}', format: '+968 XXXX XXXX' }, // Oman
    'PK': { code: '+92', pattern: '[0-9]{10}', format: '+92 XXX XXX XXXX' }, // Pakistan
    'PS': { code: '+970', pattern: '[0-9]{9}', format: '+970 XX XXX XXXX' }, // Palestine
    'PH': { code: '+63', pattern: '[0-9]{10}', format: '+63 XXX XXX XXXX' }, // Philippines
    'QA': { code: '+974', pattern: '[0-9]{8}', format: '+974 XXXX XXXX' }, // Qatar
    'SA': { code: '+966', pattern: '[0-9]{9}', format: '+966 X XXX XXXX' }, // Arabie saoudite
    'SG': { code: '+65', pattern: '[0-9]{8}', format: '+65 XXXX XXXX' }, // Singapour
    'KR': { code: '+82', pattern: '[0-9]{9,10}', format: '+82 XX XXXX XXXX' }, // Corée du Sud
    'LK': { code: '+94', pattern: '[0-9]{9}', format: '+94 XX XXX XXXX' }, // Sri Lanka
    'SY': { code: '+963', pattern: '[0-9]{9}', format: '+963 XX XXX XXXX' }, // Syrie
    'TW': { code: '+886', pattern: '[0-9]{9}', format: '+886 X XXX XXX' }, // Taïwan
    'TJ': { code: '+992', pattern: '[0-9]{9}', format: '+992 XX XXX XXXX' }, // Tadjikistan
    'TH': { code: '+66', pattern: '[0-9]{9}', format: '+66 XX XXX XXXX' }, // Thaïlande
    'TL': { code: '+670', pattern: '[0-9]{8}', format: '+670 XXX XXXX' }, // Timor oriental
    'TR': { code: '+90', pattern: '[0-9]{10}', format: '+90 XXX XXX XXXX' }, // Turquie
    'TM': { code: '+993', pattern: '[0-9]{8}', format: '+993 XX XXX XX' }, // Turkménistan
    'AE': { code: '+971', pattern: '[0-9]{9}', format: '+971 X XXX XXXX' }, // Émirats arabes unis
    'UZ': { code: '+998', pattern: '[0-9]{9}', format: '+998 XX XXX XXXX' }, // Ouzbékistan
    'VN': { code: '+84', pattern: '[0-9]{9,10}', format: '+84 XX XXXX XXXX' }, // Vietnam
    'YE': { code: '+967', pattern: '[0-9]{9}', format: '+967 X XXX XXXX' }, // Yémen

    // Europe
    'AL': { code: '+355', pattern: '[0-9]{9}', format: '+355 XX XXX XXXX' }, // Albanie
    'AD': { code: '+376', pattern: '[0-9]{6}', format: '+376 XXX XXX' }, // Andorre
    'AT': { code: '+43', pattern: '[0-9]{10,11}', format: '+43 X XXX XXXX' }, // Autriche
    'BY': { code: '+375', pattern: '[0-9]{9}', format: '+375 XX XXX XX XX' }, // Biélorussie
    'BE': { code: '+32', pattern: '[0-9]{9}', format: '+32 X XXX XX XX' }, // Belgique
    'BA': { code: '+387', pattern: '[0-9]{8}', format: '+387 XX XXX XXX' }, // Bosnie-Herzégovine
    'BG': { code: '+359', pattern: '[0-9]{9}', format: '+359 XX XXX XXX' }, // Bulgarie
    'HR': { code: '+385', pattern: '[0-9]{9}', format: '+385 XX XXX XXXX' }, // Croatie
    'CZ': { code: '+420', pattern: '[0-9]{9}', format: '+420 XXX XXX XXX' }, // République tchèque
    'DK': { code: '+45', pattern: '[0-9]{8}', format: '+45 XX XX XX XX' }, // Danemark
    'EE': { code: '+372', pattern: '[0-9]{7,8}', format: '+372 XXXX XXXX' }, // Estonie
    'FO': { code: '+298', pattern: '[0-9]{6}', format: '+298 XXX XXX' }, // Îles Féroé
    'FI': { code: '+358', pattern: '[0-9]{9,10}', format: '+358 XX XXX XXXX' }, // Finlande
    'FR': { code: '+33', pattern: '[0-9]{9}', format: '+33 X XX XX XX XX' }, // France
    'DE': { code: '+49', pattern: '[0-9]{10,11}', format: '+49 XXX XXXX XXXX' }, // Allemagne
    'GI': { code: '+350', pattern: '[0-9]{8}', format: '+350 XXX XXX' }, // Gibraltar
    'GR': { code: '+30', pattern: '[0-9]{10}', format: '+30 XXX XXX XXXX' }, // Grèce
    'GG': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' }, // Guernesey
    'HU': { code: '+36', pattern: '[0-9]{9}', format: '+36 XX XXX XXXX' }, // Hongrie
    'IS': { code: '+354', pattern: '[0-9]{7}', format: '+354 XXX XXXX' }, // Islande
    'IE': { code: '+353', pattern: '[0-9]{9}', format: '+353 XX XXX XXXX' }, // Irlande
    'IM': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' }, // Île de Man
    'IT': { code: '+39', pattern: '[0-9]{9,10}', format: '+39 XXX XXX XXXX' }, // Italie
    'JE': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' }, // Jersey
    'XK': { code: '+383', pattern: '[0-9]{8}', format: '+383 XX XXX XXX' }, // Kosovo
    'LV': { code: '+371', pattern: '[0-9]{8}', format: '+371 XX XXX XXX' }, // Lettonie
    'LI': { code: '+423', pattern: '[0-9]{7}', format: '+423 XXX XXXX' }, // Liechtenstein
    'LT': { code: '+370', pattern: '[0-9]{8}', format: '+370 XX XXX XXX' }, // Lituanie
    'LU': { code: '+352', pattern: '[0-9]{9}', format: '+352 XXX XXX XXX' }, // Luxembourg
    'MT': { code: '+356', pattern: '[0-9]{8}', format: '+356 XXXX XXXX' }, // Malte
    'MD': { code: '+373', pattern: '[0-9]{8}', format: '+373 XX XXX XXX' }, // Moldavie
    'MC': { code: '+377', pattern: '[0-9]{8,9}', format: '+377 X XXX XXX' }, // Monaco
    'ME': { code: '+382', pattern: '[0-9]{8}', format: '+382 XX XXX XXX' }, // Monténégro
    'NL': { code: '+31', pattern: '[0-9]{9}', format: '+31 X XXX XXX' }, // Pays-Bas
    'MK': { code: '+389', pattern: '[0-9]{8}', format: '+389 XX XXX XXX' }, // Macédoine du Nord
    'NO': { code: '+47', pattern: '[0-9]{8}', format: '+47 XXX XX XXX' }, // Norvège
    'PL': { code: '+48', pattern: '[0-9]{9}', format: '+48 XXX XXX XXX' }, // Pologne
    'PT': { code: '+351', pattern: '[0-9]{9}', format: '+351 XXX XXX XXX' }, // Portugal
    'RO': { code: '+40', pattern: '[0-9]{9}', format: '+40 XX XXX XXXX' }, // Roumanie
    'RU': { code: '+7', pattern: '[0-9]{10}', format: '+7 XXX XXX XX XX' }, // Russie
    'SM': { code: '+378', pattern: '[0-9]{10}', format: '+378 XXX XXX XXXX' }, // Saint-Marin
    'RS': { code: '+381', pattern: '[0-9]{8,9}', format: '+381 XX XXX XXXX' }, // Serbie
    'SK': { code: '+421', pattern: '[0-9]{9}', format: '+421 XXX XXX XXX' }, // Slovaquie
    'SI': { code: '+386', pattern: '[0-9]{8}', format: '+386 XX XXX XXX' }, // Slovénie
    'ES': { code: '+34', pattern: '[0-9]{9}', format: '+34 XXX XXX XXX' }, // Espagne
    'SE': { code: '+46', pattern: '[0-9]{9}', format: '+46 XX XXX XXXX' }, // Suède
    'CH': { code: '+41', pattern: '[0-9]{9}', format: '+41 XX XXX XXXX' }, // Suisse
    'UA': { code: '+380', pattern: '[0-9]{9}', format: '+380 XX XXX XXXX' }, // Ukraine
    'GB': { code: '+44', pattern: '[0-9]{10}', format: '+44 XXXX XXX XXX' }, // Royaume-Uni
    'VA': { code: '+379', pattern: '[0-9]{10}', format: '+379 XXX XXX XXXX' }, // Vatican

    // Océanie
    'AS': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // Samoa américaines
    'AU': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' }, // Australie
    'CK': { code: '+682', pattern: '[0-9]{5}', format: '+682 XX XXX' }, // Îles Cook
    'FJ': { code: '+679', pattern: '[0-9]{7}', format: '+679 XXX XXXX' }, // Fidji
    'PF': { code: '+689', pattern: '[0-9]{8}', format: '+689 XX XX XX' }, // Polynésie française
    'GU': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // Guam
    'KI': { code: '+686', pattern: '[0-9]{5}', format: '+686 XXX XX' }, // Kiribati
    'MH': { code: '+692', pattern: '[0-9]{7}', format: '+692 XXX XXXX' }, // Îles Marshall
    'FM': { code: '+691', pattern: '[0-9]{7}', format: '+691 XXX XXXX' }, // Micronésie
    'NR': { code: '+674', pattern: '[0-9]{7}', format: '+674 XXX XXXX' }, // Nauru
    'NC': { code: '+687', pattern: '[0-9]{6}', format: '+687 XXX XXX' }, // Nouvelle-Calédonie
    'NZ': { code: '+64', pattern: '[0-9]{9}', format: '+64 X XXX XXXX' }, // Nouvelle-Zélande
    'NU': { code: '+683', pattern: '[0-9]{4}', format: '+683 XXXX' }, // Niue
    'NF': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' }, // Île Norfolk
    'MP': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // Îles Mariannes du Nord
    'PW': { code: '+680', pattern: '[0-9]{7}', format: '+680 XXX XXXX' }, // Palaos
    'PG': { code: '+675', pattern: '[0-9]{8}', format: '+675 XXX X XXXX' }, // Papouasie-Nouvelle-Guinée
    'PN': { code: '+64', pattern: '[0-9]{9}', format: '+64 X XXX XXXX' }, // Îles Pitcairn
    'WS': { code: '+685', pattern: '[0-9]{7}', format: '+685 XX XXX' }, // Samoa
    'SB': { code: '+677', pattern: '[0-9]{7}', format: '+677 XXX XXXX' }, // Îles Salomon
    'TK': { code: '+690', pattern: '[0-9]{4}', format: '+690 XXXX' }, // Tokelau
    'TO': { code: '+676', pattern: '[0-9]{7}', format: '+676 XXX XXXX' }, // Tonga
    'TV': { code: '+688', pattern: '[0-9]{5}', format: '+688 XX XXX' }, // Tuvalu
    'VU': { code: '+678', pattern: '[0-9]{7}', format: '+678 XXX XXXX' }, // Vanuatu
    'WF': { code: '+681', pattern: '[0-9]{6}', format: '+681 XX XX XX' }, // Wallis-et-Futuna

    // Autres
    'AQ': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' }, // Antarctique
    'BV': { code: '+47', pattern: '[0-9]{8}', format: '+47 XXX XX XXX' }, // Île Bouvet
    'IO': { code: '+246', pattern: '[0-9]{7}', format: '+246 XXX XXXX' }, // Territoire britannique de l'océan Indien
    'CX': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' }, // Île Christmas
    'CC': { code: '+61', pattern: '[0-9]{9}', format: '+61 X XXX XXX XXX' }, // Îles Cocos
    'HM': { code: '+672', pattern: '[0-9]{5}', format: '+672 XX XXX' }, // Îles Heard-et-MacDonald
    'GS': { code: '+500', pattern: '[0-9]{5}', format: '+500 XX XXX' }, // Géorgie du Sud-et-les Îles Sandwich du Sud
    'UM': { code: '+1', pattern: '[0-9]{10}', format: '+1 XXX XXX XXXX' }, // Îles mineures éloignées des États-Unis
    'TF': { code: '+262', pattern: '[0-9]{9}', format: '+262 XXX XXX XXX' }, // Terres australes et antarctiques françaises

    // Option par défaut pour les pays non listés
    'other': { code: '+', pattern: '[0-9]{8,15}', format: '+XXX XXX XXXX' }
};

/**
 * Noms des formations pour l'affichage
 * @constant {Object.<string, string>}
 */
const formationNames = {
    'plans_archi_elec': 'Plans architecturaux et électricité',
    'conception_elec': 'Conception électronique',
    'realisation_3d': 'Réalisation 3D',
    'programmation': 'Programmation'
};

/**
 * Noms des méthodes de paiement
 * @constant {Object.<string, string>}
 */
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

// ==============================================
// MODULE DE GESTION D'ÉTAT (STATE MANAGEMENT)
// ==============================================

/**
 * Gestionnaire d'état de l'application
 * @namespace
 */
const AppState = (() => {
    let state = {
        currentStep: 1,
        currentRappelIndex: 0,
        saveTimeout: null,
        formData: {},
        chatMessages: []
    };

    /**
     * Initialise l'état avec les données sauvegardées
     * @function
     */
    const init = () => {
        const savedData = localStorage.getItem('bteceFormData');
        if (savedData) {
            state.formData = JSON.parse(savedData);
            state.currentStep = state.formData.step || 1;
        }
    };

    /**
     * Met à jour l'étape courante
     * @function
     * @param {number} step - Le numéro de l'étape
     */
    const setCurrentStep = (step) => {
        state.currentStep = step;
        state.formData.step = step;
    };

    /**
     * Met à jour les données du formulaire
     * @function
     * @param {Object} data - Les données à sauvegarder
     */
    const updateFormData = (data) => {
        state.formData = { ...state.formData, ...data };
    };

    /**
     * Sauvegarde l'état dans le localStorage
     * @function
     */
    const saveState = () => {
        localStorage.setItem('bteceFormData', JSON.stringify(state.formData));
    };

    /**
     * Réinitialise l'état
     * @function
     */
    const resetState = () => {
        state = {
            currentStep: 1,
            currentRappelIndex: 0,
            saveTimeout: null,
            formData: {},
            chatMessages: []
        };
        localStorage.removeItem('bteceFormData');
    };

    return {
        init,
        getState: () => state,
        setCurrentStep,
        updateFormData,
        saveState,
        resetState
    };
})();

// ==============================================
// MODULE DE GESTION DU DOM
// ==============================================

/**
 * Gestionnaire des éléments DOM
 * @namespace
 */
const DOM = (() => {
    let elements = {};

    /**
     * Initialise les éléments DOM
     * @function
     */
    const init = () => {
        elements = {
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
            calendarEl: document.getElementById('calendar')
        };
    };

    /**
     * Met à jour l'affichage du prix total
     * @function
     * @param {number} totalFCfa - Montant total en FCFA
     * @param {number} totalEur - Montant total en EUR
     * @param {number} selectedCount - Nombre de formations sélectionnées
     */
    const updatePriceDisplay = (totalFCfa, totalEur, selectedCount) => {
        if (selectedCount > 0) {
            elements.totalPriceFCFA.textContent = totalFCfa.toLocaleString('fr-FR');
            elements.totalPriceEUR.textContent = totalEur;
            elements.priceDisplay.style.display = 'block';
            
            elements.submitBtn.textContent = selectedCount === 1 ? 
                `S'inscrire maintenant (${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)` : 
                `S'inscrire maintenant (${selectedCount} formations - ${totalFCfa.toLocaleString('fr-FR')} FCFA / ${totalEur} €)`;
        } else {
            elements.priceDisplay.style.display = 'none';
            elements.submitBtn.textContent = `S'inscrire maintenant`;
        }
    };

    /**
     * Met à jour la barre de progression
     * @function
     * @param {number} currentStep - Étape actuelle
     */
    const updateProgressBar = (currentStep) => {
        const progress = ((currentStep - 1) / 5) * 100;
        elements.progressBar.style.width = `${progress}%`;
        elements.progressText.textContent = `${progress.toFixed(0)}% complété`;
        
        if (currentStep > 1) {
            document.querySelector('.progress-container').style.display = 'block';
        }
    };

    /**
     * Met à jour l'estimation du temps restant
     * @function
     * @param {number} currentStep - Étape actuelle
     */
    const updateTimeEstimation = (currentStep) => {
        let remainingTime = 0;
        for (let i = currentStep - 1; i < stepTimes.length; i++) {
            remainingTime += stepTimes[i];
        }
        
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        if (minutes > 0) {
            elements.timeEstimation.textContent = `Temps estimé : ${minutes} minute${minutes > 1 ? 's' : ''}${seconds > 0 ? ` et ${seconds} seconde${seconds > 1 ? 's' : ''}` : ''}`;
        } else {
            elements.timeEstimation.textContent = `Temps estimé : ${seconds} seconde${seconds > 1 ? 's' : ''}`;
        }
    };

    /**
     * Affiche une étape du formulaire
     * @function
     * @param {number} step - Numéro de l'étape à afficher
     */
    const showStep = (step) => {
        elements.formSteps.forEach((formStep, index) => {
            formStep.classList.toggle('active', index + 1 === step);
        });

        elements.progressSteps.forEach((progressStep, index) => {
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

        updateProgressBar(step);
        updateTimeEstimation(step);
    };

    /**
     * Affiche la modal de confirmation
     * @function
     * @param {Array} checkedFormations - Formations sélectionnées
     */
    const showConfirmationModal = (checkedFormations) => {
        let total = 0;
        elements.modalFormationsList.innerHTML = '';
        
        checkedFormations.forEach(checkbox => {
            const formationName = formationNames[checkbox.value];
            const formationPrice = formationPrices[checkbox.value];
            total += formationPrice;
            
            const li = document.createElement('li');
            li.textContent = `${formationName} - ${formationPrice.toLocaleString('fr-FR')} FCFA`;
            elements.modalFormationsList.appendChild(li);
        });

        const nom = elements.registrationForm.nom.value;
        const prenom = elements.registrationForm.prenom.value;
        const email = elements.registrationForm.email.value;
        const dateNaissance = elements.dateNaissanceInput.value;
        const lieuNaissance = elements.lieuNaissanceInput.value;
        const pays = elements.paysSelect.options[elements.paysSelect.selectedIndex].text;
        const telephone = elements.phonePrefix.textContent + ' ' + elements.telephoneInput.value;
        const profession = document.querySelector('input[name="profession"]:checked')?.nextElementSibling.textContent;
        const objectifs = elements.objectifsTextarea.value;
        const session = document.querySelector('input[name="session"]:checked')?.nextElementSibling.textContent;
        const modeFormation = elements.modeFormationSelect.options[elements.modeFormationSelect.selectedIndex].text;
        const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
        
        elements.modalNomComplet.textContent = `${prenom} ${nom}`;
        elements.modalEmail.textContent = email;
        elements.modalDateNaissance.textContent = dateNaissance;
        elements.modalLieuNaissance.textContent = lieuNaissance;
        elements.modalTelephone.textContent = telephone;
        elements.modalPays.textContent = pays;
        elements.modalProfession.textContent = profession;
        elements.modalObjectifs.textContent = objectifs;
        elements.modalSessionInfo.textContent = session;
        elements.modalModeInfo.textContent = modeFormation;
        elements.modalPaymentInfo.textContent = paymentMethodNames[paymentMethod] || paymentMethod;
        
        const totalEur = (total / exchangeRate).toFixed(2);
        elements.modalTotalPrice.textContent = total.toLocaleString('fr-FR');
        elements.modalTotalPriceEur.textContent = totalEur;
        elements.modal.style.display = 'block';
    };

    /**
     * Affiche la page de confirmation
     * @function
     */
    const showConfirmationPage = () => {
        elements.mainPage.style.display = 'none';
        elements.confirmationPage.style.display = 'block';
        window.scrollTo(0, 0);
    };

    return {
        init,
        getElements: () => elements,
        updatePriceDisplay,
        updateProgressBar,
        updateTimeEstimation,
        showStep,
        showConfirmationModal,
        showConfirmationPage
    };
})();

// ==============================================
// MODULE DE VALIDATION
// ==============================================

/**
 * Gestionnaire de validation
 * @namespace
 */
const Validator = (() => {
    /**
     * Valide un numéro de téléphone selon le pays
     * @function
     * @param {string} phone - Numéro de téléphone
     * @param {string} country - Code pays
     * @returns {boolean}
     */
    const validatePhone = (phone, country) => {
        const config = phoneConfigurations[country] || phoneConfigurations['other'];
        const regex = new RegExp(`^${config.pattern}$`);
        return regex.test(phone);
    };

    /**
     * Nettoie une entrée utilisateur
     * @function
     * @param {string} input - Entrée à nettoyer
     * @returns {string}
     */
    const sanitizeInput = (input) => {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };

    /**
     * Compte les mots dans un texte
     * @function
     * @param {string} text - Texte à analyser
     * @returns {number}
     */
    const countWords = (text) => {
        const trimmedText = text.trim();
        return trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    };

    /**
     * Calcule l'âge à partir d'une date de naissance
     * @function
     * @param {string} birthDate - Date de naissance (format YYYY-MM-DD)
     * @returns {number}
     */
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        
        return age;
    };

    /**
     * Valide l'âge minimum (13 ans)
     * @function
     * @param {string} birthDate - Date de naissance
     * @returns {boolean}
     */
    const validateAge = (birthDate) => {
        if (!birthDate) return true;
        return calculateAge(birthDate) >= 13;
    };

    /**
     * Valide une étape du formulaire
     * @function
     * @param {number} step - Numéro de l'étape
     * @returns {boolean}
     */
    const validateStep = (step) => {
        const elements = DOM.getElements();
        const state = AppState.getState();

        switch (step) {
            case 1:
                if (!elements.registrationForm.nom.value || 
                    !elements.registrationForm.prenom.value || 
                    !elements.registrationForm.email.value ||
                    !elements.dateNaissanceInput.value ||
                    !elements.lieuNaissanceInput.value ||
                    !elements.paysSelect.value ||
                    !elements.telephoneInput.value ||
                    !document.querySelector('input[name="profession"]:checked') ||
                    !elements.objectifsTextarea.value) {
                    return false;
                }

                if (!elements.registrationForm.email.value.includes('@') || 
                    !elements.registrationForm.email.value.includes('.')) {
                    return false;
                }

                if (!validatePhone(elements.telephoneInput.value, elements.paysSelect.value)) {
                    return false;
                }

                if (countWords(elements.objectifsTextarea.value) > 100) {
                    return false;
                }

                return validateAge(elements.dateNaissanceInput.value);

            case 2:
                return document.querySelectorAll('input[name="formations[]"]:checked').length > 0;

            case 3:
                return document.querySelector('input[name="session"]:checked') && 
                       elements.modeFormationSelect.value;

            case 4:
                return document.querySelector('input[name="payment_method"]:checked');

            case 5:
                return elements.registrationForm.consentement.checked;

            default:
                return true;
        }
    };

    return {
        validatePhone,
        sanitizeInput,
        countWords,
        calculateAge,
        validateAge,
        validateStep
    };
})();

// ==============================================
// MODULE DE GESTION DU FORMULAIRE
// ==============================================

/**
 * Gestionnaire du formulaire
 * @namespace
 */
const FormManager = (() => {
    /**
     * Initialise les écouteurs d'événements
     * @function
     */
    const initEventListeners = () => {
        const elements = DOM.getElements();

        // Écouteurs pour les cases à cocher des formations
        elements.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });

        // Écouteurs pour les changements de formulaire
        document.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('change', handleFormChange);
            element.addEventListener('input', handleFormChange);
        });

        // Mode de formation
        elements.modeFormationSelect.addEventListener('change', handleModeChange);

        // Pays
        elements.paysSelect.addEventListener('change', handleCountryChange);

        // Soumission du formulaire
        elements.registrationForm.addEventListener('submit', handleFormSubmit);

        // Modal de confirmation
        elements.modalConfirm.addEventListener('click', confirmRegistration);
        elements.modalCancel.addEventListener('click', () => {
            elements.modal.style.display = 'none';
        });
        elements.closeModal.addEventListener('click', () => {
            elements.modal.style.display = 'none';
        });

        // Chat
        elements.chatToggle.addEventListener('click', toggleChat);
        elements.chatToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleChat();
        });
        elements.closeChat.addEventListener('click', () => {
            elements.chatContainer.style.display = 'none';
        });
        elements.sendMessage.addEventListener('click', sendChatMessage);
        elements.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });

        // Gestion des gestes tactiles
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchEnd, false);
    };

    /**
     * Gère les changements dans le formulaire
     * @function
     */
    const handleFormChange = () => {
        const state = AppState.getState();
        
        clearTimeout(state.saveTimeout);
        state.saveTimeout = setTimeout(autoSave, 1000);
    };

    /**
     * Gère le changement de mode de formation
     * @function
     */
    const handleModeChange = function() {
        const elements = DOM.getElements();
        
        if(this.value === 'en-ligne') {
            elements.onlinePaymentMethods.style.display = 'block';
            elements.presentielPaymentMethod.style.display = 'none';
        } else if(this.value === 'presentiel') {
            elements.onlinePaymentMethods.style.display = 'none';
            elements.presentielPaymentMethod.style.display = 'block';
        } else {
            elements.onlinePaymentMethods.style.display = 'none';
            elements.presentielPaymentMethod.style.display = 'none';
        }
        
        autoSave();
    };

    /**
     * Gère le changement de pays
     * @function
     */
    const handleCountryChange = function() {
        const elements = DOM.getElements();
        const selectedCountry = this.value;
        const config = phoneConfigurations[selectedCountry] || phoneConfigurations['other'];
        
        elements.phonePrefix.textContent = config.code;
        elements.telephoneInput.pattern = config.pattern;
        elements.telephoneInput.title = `Numéro valide (format: ${config.format})`;
        elements.phoneFormat.textContent = `Format: ${config.format}`;
        elements.phoneFormat.style.display = 'block';
        elements.telephoneInput.value = '';
        
        autoSave();
    };

    /**
     * Gère la soumission du formulaire
     * @function
     * @param {Event} e - Événement de soumission
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        validateFinalStep();
    };

    /**
     * Calcule le total des formations sélectionnées
     * @function
     */
    const calculateTotal = () => {
        const elements = DOM.getElements();
        let totalFCfa = 0;
        let selectedFormations = [];
        
        elements.checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalFCfa += formationPrices[checkbox.value];
                selectedFormations.push(checkbox.value);
            }
        });
        
        if (selectedFormations.length > 0) {
            const totalEur = (totalFCfa / exchangeRate).toFixed(2);
            DOM.updatePriceDisplay(totalFCfa, totalEur, selectedFormations.length);
        } else {
            DOM.updatePriceDisplay(0, 0, 0);
        }
        
        autoSave();
    };

    /**
     * Sauvegarde automatique des données du formulaire
     * @function
     */
    const autoSave = () => {
        const elements = DOM.getElements();
        const state = AppState.getState();
        
        elements.saveStatus.textContent = "Sauvegarde en cours...";
        elements.saveStatus.className = "save-status saving";
        elements.saveStatus.style.display = "block";
        
        const formData = {
            step: state.currentStep,
            nom: elements.registrationForm.nom.value,
            prenom: elements.registrationForm.prenom.value,
            email: elements.registrationForm.email.value,
            date_naissance: elements.dateNaissanceInput.value,
            lieu_naissance: elements.lieuNaissanceInput.value,
            pays: elements.paysSelect.value,
            telephone: elements.telephoneInput.value,
            profession: document.querySelector('input[name="profession"]:checked')?.value,
            objectifs: elements.objectifsTextarea.value,
            formations: Array.from(document.querySelectorAll('input[name="formations[]"]:checked')).map(cb => cb.value),
            session: document.querySelector('input[name="session"]:checked')?.value,
            modeFormation: elements.modeFormationSelect.value,
            paymentMethod: document.querySelector('input[name="payment_method"]:checked')?.value,
            consentement: elements.registrationForm.consentement.checked
        };
        
        AppState.updateFormData(formData);
        AppState.saveState();
        
        setTimeout(() => {
            elements.saveStatus.textContent = "Données sauvegardées";
            elements.saveStatus.className = "save-status saved";
            
            setTimeout(() => {
                elements.saveStatus.style.display = "none";
            }, 3000);
        }, 1000);
    };

    /**
     * Charge les données sauvegardées
     * @function
     */
    const loadSavedData = () => {
        const elements = DOM.getElements();
        const state = AppState.getState();
        
        if (state.formData.nom) elements.registrationForm.nom.value = state.formData.nom;
        if (state.formData.prenom) elements.registrationForm.prenom.value = state.formData.prenom;
        if (state.formData.email) elements.registrationForm.email.value = state.formData.email;
        if (state.formData.date_naissance) elements.dateNaissanceInput.value = state.formData.date_naissance;
        if (state.formData.lieu_naissance) elements.lieuNaissanceInput.value = state.formData.lieu_naissance;
        if (state.formData.pays) {
            elements.paysSelect.value = state.formData.pays;
            elements.paysSelect.dispatchEvent(new Event('change'));
        }
        if (state.formData.telephone) elements.telephoneInput.value = state.formData.telephone;
        if (state.formData.profession) {
            document.querySelector(`input[name="profession"][value="${state.formData.profession}"]`).checked = true;
        }
        if (state.formData.objectifs) elements.objectifsTextarea.value = state.formData.objectifs;
        
        if (state.formData.formations && state.formData.formations.length > 0) {
            state.formData.formations.forEach(formation => {
                document.querySelector(`input[name="formations[]"][value="${formation}"]`).checked = true;
            });
            calculateTotal();
        }
        
        if (state.formData.session) {
            document.querySelector(`input[name="session"][value="${state.formData.session}"]`).checked = true;
        }
        
        if (state.formData.modeFormation) {
            elements.modeFormationSelect.value = state.formData.modeFormation;
            elements.modeFormationSelect.dispatchEvent(new Event('change'));
        }
        
        if (state.formData.paymentMethod) {
            document.querySelector(`input[name="payment_method"][value="${state.formData.paymentMethod}"]`).checked = true;
        }
        
        if (state.formData.consentement) {
            elements.registrationForm.consentement.checked = true;
        }
        
        DOM.showStep(state.currentStep);
    };

    /**
     * Valide l'étape finale avant soumission
     * @function
     * @returns {boolean}
     */
    const validateFinalStep = () => {
        const elements = DOM.getElements();
        
        if (!elements.registrationForm.consentement.checked) {
            alert('Veuillez accepter les conditions générales');
            return false;
        }
        
        if (!validateAllSteps()) {
            alert('Veuillez compléter toutes les étapes du formulaire');
            return false;
        }
        
        const checkedFormations = document.querySelectorAll('input[name="formations[]"]:checked');
        DOM.showConfirmationModal(checkedFormations);
        return true;
    };

    /**
     * Valide toutes les étapes du formulaire
     * @function
     * @returns {boolean}
     */
    const validateAllSteps = () => {
        for (let i = 1; i <= 5; i++) {
            if (!Validator.validateStep(i)) return false;
        }
        return true;
    };

    /**
     * Passe à l'étape suivante
     * @function
     * @param {number} current - Étape actuelle
     */
    const nextStep = (current) => {
        if (Validator.validateStep(current)) {
            AppState.setCurrentStep(current + 1);
            DOM.showStep(current + 1);
        }
    };

    /**
     * Retourne à l'étape précédente
     * @function
     * @param {number} current - Étape actuelle
     */
    const prevStep = (current) => {
        AppState.setCurrentStep(current - 1);
        DOM.showStep(current - 1);
    };

    /**
     * Confirme l'inscription
     * @function
     */
    const confirmRegistration = () => {
        const elements = DOM.getElements();
        
        elements.modal.style.display = 'none';
        elements.loadingIndicator.style.display = 'block';
        elements.submitBtn.disabled = true;
        
        sendFormData();
    };

    /**
     * Envoie les données du formulaire
     * @function
     */
    const sendFormData = () => {
        const elements = DOM.getElements();
        const formData = new FormData(elements.registrationForm);
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbw9LNZTz3TVV-omzZL4BBrpUJ2oyTjuTkcdQ9iiT9Cy/dev';
        
        fetch(scriptUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            showConfirmationPage();
            AppState.resetState();
        })
        .catch((error) => {
            console.error('Erreur:', error);
            saveToLocalStorage();
            showConfirmationPage();
        });
    };

    /**
     * Sauvegarde locale des données en cas d'échec d'envoi
     * @function
     */
    const saveToLocalStorage = () => {
        const elements = DOM.getElements();
        const formData = {
            nom: elements.registrationForm.nom.value,
            prenom: elements.registrationForm.prenom.value,
            email: elements.registrationForm.email.value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('pendingRegistration', JSON.stringify(formData));
        alert('Votre inscription a été enregistrée localement. Nous vous contacterons sous peu.');
    };

    /**
     * Affiche la page de confirmation
     * @function
     */
    const showConfirmationPage = () => {
        DOM.showConfirmationPage();
        displayUserSummary();
        simulateTracking();
    };

    /**
     * Affiche le résumé des informations utilisateur
     * @function
     */
    const displayUserSummary = () => {
        const elements = DOM.getElements();
        const nom = elements.registrationForm.nom.value;
        const prenom = elements.registrationForm.prenom.value;
        const email = elements.registrationForm.email.value;
        const dateNaissance = elements.dateNaissanceInput.value;
        const lieuNaissance = elements.lieuNaissanceInput.value;
        const pays = elements.paysSelect.value;
        const telephone = elements.telephoneInput.value;
        const profession = document.querySelector('input[name="profession"]:checked')?.value;
        const objectifs = elements.objectifsTextarea.value;
        const checkedFormations = Array.from(document.querySelectorAll('input[name="formations[]"]:checked')).map(cb => formationNames[cb.value]);
        const session = document.querySelector('input[name="session"]:checked')?.value;
        const modeFormation = elements.modeFormationSelect.value;
        const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
        
        let total = 0;
        document.querySelectorAll('input[name="formations[]"]:checked').forEach(checkbox => {
            total += formationPrices[checkbox.value];
        });
        const totalEur = (total / exchangeRate).toFixed(2);
        
        let html = `
            <h4>Récapitulatif de votre inscription</h4>
            <p><strong>Nom complet :</strong> ${prenom} ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Date de naissance :</strong> ${dateNaissance}</p>
            <p><strong>Lieu de naissance :</strong> ${lieuNaissance}</p>
            <p><strong>Téléphone :</strong> ${elements.phonePrefix.textContent} ${telephone}</p>
            <p><strong>Pays :</strong> ${elements.paysSelect.options[elements.paysSelect.selectedIndex].text}</p>
            <p><strong>Profession :</strong> ${profession}</p>
            <p><strong>Objectifs :</strong> ${objectifs}</p>
            <p><strong>Formations choisies :</strong> ${checkedFormations.join(', ')}</p>
            <p><strong>Session :</strong> ${session.charAt(0).toUpperCase() + session.slice(1)} 2025</p>
            <p><strong>Mode de formation :</strong> ${modeFormation === 'presentiel' ? 'Présentiel à Cotonou' : 'En ligne'}</p>
            <p><strong>Méthode de paiement :</strong> ${paymentMethodNames[paymentMethod] || paymentMethod}</p>
            <p><strong>Montant total :</strong> ${total.toLocaleString('fr-FR')} FCFA (≈ ${totalEur} €)</p>
        `;
        
        elements.userSummary.innerHTML = html;
    };

    /**
     * Simule le suivi de l'inscription
     * @function
     */
    const simulateTracking = () => {
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
    };

    /**
     * Bascule l'affichage du chat
     * @function
     */
    const toggleChat = () => {
        const elements = DOM.getElements();
        elements.chatContainer.style.display = elements.chatContainer.style.display === 'block' ? 'none' : 'block';
        if (elements.chatContainer.style.display === 'block') {
            elements.chatInput.focus();
        }
    };

    /**
     * Envoie un message dans le chat
     * @function
     */
    const sendChatMessage = () => {
        const elements = DOM.getElements();
        const message = elements.chatInput.value.trim();
        if (message) {
            addChatMessage(message, 'user');
            elements.chatInput.value = '';
            
            setTimeout(() => {
                addChatMessage('Merci pour votre message. Veuillez laisser votre adresse e-mail, Notre équipe vous répondra dans les plus brefs délais.', 'bot');
            }, 1000);
        }
    };

    /**
     * Ajoute un message dans le chat
     * @function
     * @param {string} text - Contenu du message
     * @param {string} sender - 'user' ou 'bot'
     */
    const addChatMessage = (text, sender) => {
        const elements = DOM.getElements();
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        elements.chatMessages.appendChild(messageDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    };

    /**
     * Gère le début d'un geste tactile
     * @function
     * @param {TouchEvent} e - Événement tactile
     */
    const handleTouchStart = (e) => {
        const state = AppState.getState();
        state.touchStartX = e.changedTouches[0].screenX;
    };

    /**
     * Gère la fin d'un geste tactile
     * @function
     * @param {TouchEvent} e - Événement tactile
     */
    const handleTouchEnd = (e) => {
        const state = AppState.getState();
        state.touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    };

    /**
     * Gère un geste de balayage (swipe)
     * @function
     */
    const handleSwipe = () => {
        const state = AppState.getState();
        const threshold = 50;
        
        if (state.touchEndX < state.touchStartX - threshold && state.currentStep < 5) {
            nextStep(state.currentStep);
        } else if (state.touchEndX > state.touchStartX + threshold && state.currentStep > 1) {
            prevStep(state.currentStep);
        }
    };

    /**
     * Initialise le calendrier des sessions
     * @function
     */
    const initCalendar = () => {
        const elements = DOM.getElements();
        const calendar = new FullCalendar.Calendar(elements.calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2025-07-01',
            locale: 'fr',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            views: {
                dayGridMonth: {
                    titleFormat: { year: 'numeric', month: 'long' }
                }
            },
            events: [
                // ... (tous les événements du calendrier existants)
            ],
            eventTimeFormat: { 
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            },
            height: 'auto',
            contentHeight: 'auto',
            dayMaxEvents: true,
            eventDisplay: 'block',
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
    };

    /**
     * Initialise le compteur de mots pour les objectifs
     * @function
     */
    const initWordCounter = () => {
        const elements = DOM.getElements();
        
        const updateWordCounter = () => {
            const wordCount = Validator.countWords(elements.objectifsTextarea.value);
            elements.objectifsCounter.textContent = `${wordCount}/100 mots`;
            
            if (wordCount > 100) {
                elements.objectifsCounter.style.color = '#e74c3c';
                elements.objectifsTextarea.style.borderColor = '#e74c3c';
            } else {
                elements.objectifsCounter.style.color = '#666';
                elements.objectifsTextarea.style.borderColor = '#ddd';
            }
        };
        
        elements.objectifsTextarea.addEventListener('input', updateWordCounter);
        updateWordCounter();
    };

    /**
     * Initialise la rotation des messages de rappel
     * @function
     */
    const initRappelMessages = () => {
        const elements = DOM.getElements();
        const state = AppState.getState();
        
        const rotateRappelMessages = () => {
            elements.rappelMessages.forEach(msg => msg.classList.remove('active'));
            elements.rappelMessages[state.currentRappelIndex].classList.add('active');
            state.currentRappelIndex = (state.currentRappelIndex + 1) % elements.rappelMessages.length;
        };
        
        setInterval(rotateRappelMessages, 2000);
    };

    /**
     * Initialise la validation de l'âge
     * @function
     */
    const initAgeValidation = () => {
        const elements = DOM.getElements();
        
        elements.dateNaissanceInput.addEventListener('change', () => {
            const isValid = Validator.validateAge(elements.dateNaissanceInput.value);
            if (!isValid) {
                elements.ageError.style.display = 'block';
                elements.dateNaissanceInput.style.borderColor = '#e74c3c';
            } else {
                elements.ageError.style.display = 'none';
                elements.dateNaissanceInput.style.borderColor = '#ddd';
            }
        });
    };

    return {
        init: () => {
            initEventListeners();
            initCalendar();
            initWordCounter();
            initRappelMessages();
            initAgeValidation();
            loadSavedData();
            calculateTotal();
        },
        nextStep,
        prevStep
    };
})();

// ==============================================
// INITIALISATION DE L'APPLICATION
// ==============================================

/**
 * Initialise l'application lorsque le DOM est chargé
 * @function
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les modules
    AppState.init();
    DOM.init();
    FormManager.init();
    
    // Configurer le mode de formation au chargement
    const elements = DOM.getElements();
    elements.modeFormationSelect.dispatchEvent(new Event('change'));
    
    // Protection contre le clic droit et le glisser-déposer
    document.addEventListener('contextmenu', (e) => {
        if (e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('logo') || e.target.classList.contains('no-download')) {
            e.preventDefault();
        }
    });
    
    // Animation pour le bouton de renvoi
    document.addEventListener('click', (e) => {
        if (e.target && e.target.matches('a[href="#resend"]')) {
            e.preventDefault();
            alert('Un nouvel email de confirmation vous a été envoyé.');
        }
    });
});

// ==============================================
// POLYFILLS POUR LA COMPATIBILITÉ
// ==============================================

// Polyfill pour Object.entries (IE11)
if (!Object.entries) {
    Object.entries = function(obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i);
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        
        return resArray;
    };
}

// Polyfill pour NodeList.forEach (IE11)
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Polyfill pour Element.closest (IE11)
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.msMatchesSelector || 
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}