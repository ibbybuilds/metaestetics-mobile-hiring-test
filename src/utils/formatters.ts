export const formatPhoneNumber = (
  phone: string,
  countryCode: string
): string => {
  return `${countryCode} ${phone}`;
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const callingCodeToCountryCode = (callingCode: string): string => {
  const code = callingCode.replace(/^\+/, '').trim();

  const callingCodeToCountry: Record<string, string> = {
    '1': 'US', // US/Canada (defaulting to US)
    '7': 'RU', // Russia/Kazakhstan
    '20': 'EG', // Egypt
    '27': 'ZA', // South Africa
    '30': 'GR', // Greece
    '31': 'NL', // Netherlands
    '32': 'BE', // Belgium
    '33': 'FR', // France
    '34': 'ES', // Spain
    '36': 'HU', // Hungary
    '39': 'IT', // Italy
    '40': 'RO', // Romania
    '41': 'CH', // Switzerland
    '43': 'AT', // Austria
    '44': 'GB', // United Kingdom
    '45': 'DK', // Denmark
    '46': 'SE', // Sweden
    '47': 'NO', // Norway
    '48': 'PL', // Poland
    '49': 'DE', // Germany
    '51': 'PE', // Peru
    '52': 'MX', // Mexico
    '53': 'CU', // Cuba
    '54': 'AR', // Argentina
    '55': 'BR', // Brazil
    '56': 'CL', // Chile
    '57': 'CO', // Colombia
    '58': 'VE', // Venezuela
    '60': 'MY', // Malaysia
    '61': 'AU', // Australia
    '62': 'ID', // Indonesia
    '63': 'PH', // Philippines
    '64': 'NZ', // New Zealand
    '65': 'SG', // Singapore
    '66': 'TH', // Thailand
    '81': 'JP', // Japan
    '82': 'KR', // South Korea
    '84': 'VN', // Vietnam
    '86': 'CN', // China
    '90': 'TR', // Turkey
    '91': 'IN', // India
    '92': 'PK', // Pakistan
    '93': 'AF', // Afghanistan
    '94': 'LK', // Sri Lanka
    '95': 'MM', // Myanmar
    '98': 'IR', // Iran
    '212': 'MA', // Morocco
    '213': 'DZ', // Algeria
    '216': 'TN', // Tunisia
    '218': 'LY', // Libya
    '220': 'GM', // Gambia
    '221': 'SN', // Senegal
    '222': 'MR', // Mauritania
    '223': 'ML', // Mali
    '224': 'GN', // Guinea
    '225': 'CI', // Ivory Coast
    '226': 'BF', // Burkina Faso
    '227': 'NE', // Niger
    '228': 'TG', // Togo
    '229': 'BJ', // Benin
    '230': 'MU', // Mauritius
    '231': 'LR', // Liberia
    '232': 'SL', // Sierra Leone
    '233': 'GH', // Ghana
    '234': 'NG', // Nigeria
    '235': 'TD', // Chad
    '236': 'CF', // Central African Republic
    '237': 'CM', // Cameroon
    '238': 'CV', // Cape Verde
    '239': 'ST', // São Tomé and Príncipe
    '240': 'GQ', // Equatorial Guinea
    '241': 'GA', // Gabon
    '242': 'CG', // Republic of the Congo
    '243': 'CD', // Democratic Republic of the Congo
    '244': 'AO', // Angola
    '245': 'GW', // Guinea-Bissau
    '246': 'IO', // British Indian Ocean Territory
    '248': 'SC', // Seychelles
    '249': 'SD', // Sudan
    '250': 'RW', // Rwanda
    '251': 'ET', // Ethiopia
    '252': 'SO', // Somalia
    '253': 'DJ', // Djibouti
    '254': 'KE', // Kenya
    '255': 'TZ', // Tanzania
    '256': 'UG', // Uganda
    '257': 'BI', // Burundi
    '258': 'MZ', // Mozambique
    '260': 'ZM', // Zambia
    '261': 'MG', // Madagascar
    '262': 'RE', // Réunion
    '263': 'ZW', // Zimbabwe
    '264': 'NA', // Namibia
    '265': 'MW', // Malawi
    '266': 'LS', // Lesotho
    '267': 'BW', // Botswana
    '268': 'SZ', // Eswatini
    '269': 'KM', // Comoros
    '290': 'SH', // Saint Helena
    '291': 'ER', // Eritrea
    '297': 'AW', // Aruba
    '298': 'FO', // Faroe Islands
    '299': 'GL', // Greenland
    '350': 'GI', // Gibraltar
    '351': 'PT', // Portugal
    '352': 'LU', // Luxembourg
    '353': 'IE', // Ireland
    '354': 'IS', // Iceland
    '355': 'AL', // Albania
    '356': 'MT', // Malta
    '357': 'CY', // Cyprus
    '358': 'FI', // Finland
    '359': 'BG', // Bulgaria
    '370': 'LT', // Lithuania
    '371': 'LV', // Latvia
    '372': 'EE', // Estonia
    '373': 'MD', // Moldova
    '374': 'AM', // Armenia
    '375': 'BY', // Belarus
    '376': 'AD', // Andorra
    '377': 'MC', // Monaco
    '378': 'SM', // San Marino
    '380': 'UA', // Ukraine
    '381': 'RS', // Serbia
    '382': 'ME', // Montenegro
    '383': 'XK', // Kosovo
    '385': 'HR', // Croatia
    '386': 'SI', // Slovenia
    '387': 'BA', // Bosnia and Herzegovina
    '389': 'MK', // North Macedonia
    '420': 'CZ', // Czech Republic
    '421': 'SK', // Slovakia
    '423': 'LI', // Liechtenstein
    '500': 'FK', // Falkland Islands
    '501': 'BZ', // Belize
    '502': 'GT', // Guatemala
    '503': 'SV', // El Salvador
    '504': 'HN', // Honduras
    '505': 'NI', // Nicaragua
    '506': 'CR', // Costa Rica
    '507': 'PA', // Panama
    '508': 'PM', // Saint Pierre and Miquelon
    '509': 'HT', // Haiti
    '590': 'GP', // Guadeloupe
    '591': 'BO', // Bolivia
    '592': 'GY', // Guyana
    '593': 'EC', // Ecuador
    '594': 'GF', // French Guiana
    '595': 'PY', // Paraguay
    '596': 'MQ', // Martinique
    '597': 'SR', // Suriname
    '598': 'UY', // Uruguay
    '599': 'CW', // Curaçao
    '670': 'TL', // East Timor
    '672': 'NF', // Norfolk Island
    '673': 'BN', // Brunei
    '674': 'NR', // Nauru
    '675': 'PG', // Papua New Guinea
    '676': 'TO', // Tonga
    '677': 'SB', // Solomon Islands
    '678': 'VU', // Vanuatu
    '679': 'FJ', // Fiji
    '680': 'PW', // Palau
    '681': 'WF', // Wallis and Futuna
    '682': 'CK', // Cook Islands
    '683': 'NU', // Niue
    '685': 'WS', // Samoa
    '686': 'KI', // Kiribati
    '687': 'NC', // New Caledonia
    '688': 'TV', // Tuvalu
    '689': 'PF', // French Polynesia
    '690': 'TK', // Tokelau
    '691': 'FM', // Micronesia
    '692': 'MH', // Marshall Islands
    '850': 'KP', // North Korea
    '852': 'HK', // Hong Kong
    '853': 'MO', // Macau
    '855': 'KH', // Cambodia
    '856': 'LA', // Laos
    '880': 'BD', // Bangladesh
    '886': 'TW', // Taiwan
    '960': 'MV', // Maldives
    '961': 'LB', // Lebanon
    '962': 'JO', // Jordan
    '963': 'SY', // Syria
    '964': 'IQ', // Iraq
    '965': 'KW', // Kuwait
    '966': 'SA', // Saudi Arabia
    '967': 'YE', // Yemen
    '968': 'OM', // Oman
    '970': 'PS', // Palestine
    '971': 'AE', // United Arab Emirates
    '972': 'IL', // Israel
    '973': 'BH', // Bahrain
    '974': 'QA', // Qatar
    '975': 'BT', // Bhutan
    '976': 'MN', // Mongolia
    '977': 'NP', // Nepal
    '992': 'TJ', // Tajikistan
    '993': 'TM', // Turkmenistan
    '994': 'AZ', // Azerbaijan
    '995': 'GE', // Georgia
    '996': 'KG', // Kyrgyzstan
    '998': 'UZ', // Uzbekistan
  };

  return callingCodeToCountry[code] || 'US';
};

/**
 * Maps country ISO code (e.g., 'US', 'PK') to calling code (e.g., '+1', '+92')
 * This is the reverse of callingCodeToCountryCode
 */
export const countryCodeToCallingCode = (countryCode: string): string => {
  const countryToCallingCode: Record<string, string> = {
    US: '+1',
    CA: '+1',
    RU: '+7',
    KZ: '+7',
    EG: '+20',
    ZA: '+27',
    GR: '+30',
    NL: '+31',
    BE: '+32',
    FR: '+33',
    ES: '+34',
    HU: '+36',
    IT: '+39',
    RO: '+40',
    CH: '+41',
    AT: '+43',
    GB: '+44',
    DK: '+45',
    SE: '+46',
    NO: '+47',
    PL: '+48',
    DE: '+49',
    PE: '+51',
    MX: '+52',
    CU: '+53',
    AR: '+54',
    BR: '+55',
    CL: '+56',
    CO: '+57',
    VE: '+58',
    MY: '+60',
    AU: '+61',
    ID: '+62',
    PH: '+63',
    NZ: '+64',
    SG: '+65',
    TH: '+66',
    JP: '+81',
    KR: '+82',
    VN: '+84',
    CN: '+86',
    TR: '+90',
    IN: '+91',
    PK: '+92',
    AF: '+93',
    LK: '+94',
    MM: '+95',
    IR: '+98',
    MA: '+212',
    DZ: '+213',
    TN: '+216',
    LY: '+218',
    GM: '+220',
    SN: '+221',
    MR: '+222',
    ML: '+223',
    GN: '+224',
    CI: '+225',
    BF: '+226',
    NE: '+227',
    TG: '+228',
    BJ: '+229',
    MU: '+230',
    LR: '+231',
    SL: '+232',
    GH: '+233',
    NG: '+234',
    TD: '+235',
    CF: '+236',
    CM: '+237',
    CV: '+238',
    ST: '+239',
    GQ: '+240',
    GA: '+241',
    CG: '+242',
    CD: '+243',
    AO: '+244',
    GW: '+245',
    IO: '+246',
    SC: '+248',
    SD: '+249',
    RW: '+250',
    ET: '+251',
    SO: '+252',
    DJ: '+253',
    KE: '+254',
    TZ: '+255',
    UG: '+256',
    BI: '+257',
    MZ: '+258',
    ZM: '+260',
    MG: '+261',
    RE: '+262',
    ZW: '+263',
    NA: '+264',
    MW: '+265',
    LS: '+266',
    BW: '+267',
    SZ: '+268',
    KM: '+269',
    SH: '+290',
    ER: '+291',
    AW: '+297',
    FO: '+298',
    GL: '+299',
    GI: '+350',
    PT: '+351',
    LU: '+352',
    IE: '+353',
    IS: '+354',
    AL: '+355',
    MT: '+356',
    CY: '+357',
    FI: '+358',
    BG: '+359',
    LT: '+370',
    LV: '+371',
    EE: '+372',
    MD: '+373',
    AM: '+374',
    BY: '+375',
    AD: '+376',
    MC: '+377',
    SM: '+378',
    UA: '+380',
    RS: '+381',
    ME: '+382',
    XK: '+383',
    HR: '+385',
    SI: '+386',
    BA: '+387',
    MK: '+389',
    CZ: '+420',
    SK: '+421',
    LI: '+423',
    FK: '+500',
    BZ: '+501',
    GT: '+502',
    SV: '+503',
    HN: '+504',
    NI: '+505',
    CR: '+506',
    PA: '+507',
    PM: '+508',
    HT: '+509',
    GP: '+590',
    BO: '+591',
    GY: '+592',
    EC: '+593',
    GF: '+594',
    PY: '+595',
    MQ: '+596',
    SR: '+597',
    UY: '+598',
    CW: '+599',
    TL: '+670',
    NF: '+672',
    BN: '+673',
    NR: '+674',
    PG: '+675',
    TO: '+676',
    SB: '+677',
    VU: '+678',
    FJ: '+679',
    PW: '+680',
    WF: '+681',
    CK: '+682',
    NU: '+683',
    WS: '+685',
    KI: '+686',
    NC: '+687',
    TV: '+688',
    PF: '+689',
    TK: '+690',
    FM: '+691',
    MH: '+692',
    KP: '+850',
    HK: '+852',
    MO: '+853',
    KH: '+855',
    LA: '+856',
    BD: '+880',
    TW: '+886',
    MV: '+960',
    LB: '+961',
    JO: '+962',
    SY: '+963',
    IQ: '+964',
    KW: '+965',
    SA: '+966',
    YE: '+967',
    OM: '+968',
    PS: '+970',
    AE: '+971',
    IL: '+972',
    BH: '+973',
    QA: '+974',
    BT: '+975',
    MN: '+976',
    NP: '+977',
    TJ: '+992',
    TM: '+993',
    AZ: '+994',
    GE: '+995',
    KG: '+996',
    UZ: '+998',
  };

  return countryToCallingCode[countryCode.toUpperCase()] || '+1';
};
