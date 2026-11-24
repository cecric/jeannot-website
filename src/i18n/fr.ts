import type { Messages } from './lang'

export const fr: Messages = {
  meta: {
    title: 'Jeannot – Plan du jardin, calendrier lunaire et assistant de jardinage',
    description:
      'Dessinez le plan de votre jardin, jardinez avec la Lune et suivez chaque culture du semis à la récolte. Jeannot, l’assistant du jardin sur iPhone, Android et le web.',
  },
  nav: {
    features: 'Fonctionnalités',
    web: 'Version web',
    pricing: 'Gratuit et Premium',
    help: 'Aide',
    openWeb: 'Ouvrir la version web',
    getApp: 'Télécharger',
    menu: 'Ouvrir le menu',
    close: 'Fermer le menu',
    language: 'Langue',
    home: 'Jeannot, page d’accueil',
    main: 'Menu principal',
    skip: 'Aller au contenu',
  },
  cta: {
    appStoreSmall: 'Télécharger dans l’',
    appStore: 'App Store',
    playSmall: 'Disponible sur',
    play: 'Google Play',
    webSmall: 'Dans votre navigateur',
    openWeb: 'Ouvrir la version web',
  },
  hero: {
    eyebrow: 'L’assistant du jardin',
    title: ['Votre jardin, ', 'au rythme de la Lune'],
    lead: 'Jeannot vous aide à dessiner votre jardin, à choisir le bon jour pour chaque geste et à suivre chaque plante du semis à la récolte, avec un assistant de jardinage toujours à portée de main.',
    note: 'Gratuit pour commencer. Sur iPhone, iPad, Android et le web, en français et en anglais.',
    chips: ['Calendrier lunaire', 'Plan du jardin', 'Encyclopédie'],
    videoLabel:
      'Visite de l’application Jeannot : aujourd’hui au jardin, le plan du jardin, le calendrier et l’assistant',
    gardenerAlt: 'Jeannot, un jardinier au chapeau de paille tenant un transplantoir, dessiné en gravure',
  },
  highlights: [
    {
      title: 'Calendrier lunaire et biodynamique',
      text: 'Jour racine, feuille, fleur ou fruit : le bon geste chaque matin.',
    },
    {
      title: 'Le plan de votre jardin, à l’échelle',
      text: 'Carrés, serre, verger : voyez d’un coup d’œil ce qui pousse et où.',
    },
    {
      title: 'Un assistant qui connaît votre jardin',
      text: 'Posez vos questions, ou identifiez une plante ou une maladie en photo.',
    },
    {
      title: 'Des alertes météo pour vos cultures',
      text: 'Gel, canicule, vent et fortes pluies, annoncés à temps.',
    },
  ],
  features: {
    eyebrow: 'Fonctionnalités',
    title: 'Tout ce qu’il faut au jardin, dans une seule application',
    plan: {
      eyebrow: 'Plan du jardin',
      title: ['Dessinez votre jardin, ', 'carré par carré'],
      text: 'Mettez tout votre jardin sur un plan, à l’échelle. Tracez son contour sur la vue satellite ou saisissez simplement ses dimensions, puis ajoutez vos carrés, votre serre, vos allées et vos arbres.',
      points: [
        'Placez un pied, une ligne ou toute une surface, avec l’espacement affiché à côté de l’espacement conseillé',
        'Bons voisinages et rotations des cultures, vérifiés carré par carré, avec la raison à chaque fois',
        'Parcourez les saisons semaine après semaine et préparez la suivante dans un projet',
      ],
      chips: ['Vue du ciel', 'Carotte + poireau'],
      alts: [
        'Le plan du jardin dans Jeannot : deux carrés potagers dessinés à l’échelle sur une pelouse, avec la frise de la saison',
        'Un carré du plan du jardin : ses plantes, ses bons voisinages et l’historique de ses rotations',
      ],
    },
    garden: {
      eyebrow: 'Mon jardin',
      title: ['Votre potager, ', 'suivi au quotidien'],
      text: 'Chaque plante, du semis à la récolte, avec ses tâches à venir. Notez ce que vous cultivez, suivez chaque stade et laissez Jeannot vous rappeler les gestes à venir.',
      points: [
        'Une frise de progression pour chaque culture, de la prévision à la récolte',
        'Des tâches proposées pour chaque plante, à planifier ou à cocher',
        'Recherchez, filtrez et triez vos plantes par stade ou par espèce',
      ],
      chips: ['En croissance', 'Du semis à la récolte'],
      alts: [
        'Mon jardin dans Jeannot : les tâches à faire et les plantes de la saison',
        'La fiche d’un noyer dans Jeannot : son stade, son emplacement sur le plan et ses tâches',
      ],
    },
    calendar: {
      eyebrow: 'Calendrier',
      title: ['Chaque tâche, ', 'au meilleur jour'],
      text: 'Lune, jours biodynamiques et météo dans un seul calendrier. Jeannot vous indique les meilleurs moments pour semer, repiquer, tailler ou récolter, pour que vos gestes suivent les cycles naturels.',
      points: [
        'Jours racine, feuille, fleur et fruit en un coup d’œil',
        'Phases de la Lune, lune montante et descendante',
        'Les prévisions locales et leurs alertes, à côté de vos tâches planifiées',
      ],
      chips: ['Jour racine', 'Lune montante'],
      alts: [
        'Le calendrier lunaire et biodynamique de Jeannot, avec la phase de la Lune et la météo de chaque jour',
        'Aujourd’hui au jardin : un jour fruit, le dicton du jour et les tâches prévues',
      ],
    },
    assistant: {
      eyebrow: 'Assistant',
      title: ['Un expert jardin ', 'dans votre poche'],
      text: 'Posez vos questions, Jeannot répond avec votre jardin en tête. De la taille aux ravageurs, obtenez une réponse personnalisée à toute heure, en mots simples.',
      points: [
        'Prenez une photo pour identifier une plante en un instant',
        'Reconnaissez une maladie et recevez des conseils de traitement respectueux de l’environnement',
        'Photographiez un arbre et faites-vous montrer où tailler',
      ],
      chips: ['Prenez une photo', 'Quand semer mes tomates ?'],
      alts: [
        'Jeannot identifiant une lavande à partir d’une photo, avec un indice de confiance',
        'Une conversation avec l’assistant Jeannot sur la période et la façon de semer les tomates',
      ],
    },
    encyclopedia: {
      eyebrow: 'Encyclopédie',
      title: ['Semis, entretien, récolte : ', 'tout sur chaque légume'],
      text: 'Quand, comment, où et avec quoi, mois par mois. Des fiches détaillées pour les légumes, les aromatiques, les fleurs et les fruitiers, pensées pour le potager.',
      points: [
        'Un calendrier annuel des semis, des repiquages et des récoltes',
        'Plantes compagnes, conseils de permaculture et niveau d’entretien',
        'Ajoutez une plante à votre jardin en un geste',
      ],
      chips: ['Ajouter à mon jardin', 'Mois par mois'],
      alts: [
        'La fiche de la patate douce dans l’encyclopédie de Jeannot, avec son calendrier annuel',
        'L’encyclopédie des plantes de Jeannot, triée par plantes racine, feuille, fleur et fruit',
      ],
    },
    journal: {
      eyebrow: 'Journal et guildes',
      title: ['Votre carnet de jardin, ', 'saison après saison'],
      text: 'Récoltes, gestes et guildes de permaculture, tout est noté. Revenez sur ce qui a marché, et commencez la saison suivante en sachant plus que la précédente.',
      points: [
        'Notez chaque récolte, avec sa date et sa quantité',
        'Gardez une trace des arrosages, des paillages et des repiquages',
        'Composez des guildes autour d’un arbre : fixateur d’azote, couvre-sol, accumulateur dynamique',
      ],
      chips: ['Guildes de permaculture', 'Récoltes 2026'],
      alts: [
        'Le journal du jardin dans Jeannot : récoltes, arrosages et repiquages, avec leurs notes',
        'Les guildes de permaculture dans Jeannot : une guilde du pommier avec haricots, fraisier et blette',
      ],
    },
  },
  web: {
    badge: 'Nouveau',
    eyebrow: 'Version web',
    title: ['Jeannot, désormais ', 'dans votre navigateur'],
    text: 'Plus à l’aise sur grand écran ? Ouvrez Jeannot sur votre ordinateur et dessinez votre jardin à la souris et au clavier. Rien à installer, et c’est le même compte que sur votre téléphone.',
    points: [
      'Votre jardin, vos plantes et vos tâches, synchronisés avec l’application',
      'Un grand espace pour dessiner et réorganiser votre plan',
      'L’encyclopédie et le calendrier, en grand',
    ],
    cta: 'Ouvrir my.jeannot.app',
    note: 'Connectez-vous avec votre compte Jeannot. Premium se souscrit dans l’application mobile et s’applique aussi sur le web.',
    alt: 'Jeannot dans un navigateur : le plan du jardin avec ses carrés potagers, à côté du menu de navigation',
  },
  pricing: {
    eyebrow: 'Gratuit et Premium',
    title: 'Commencez gratuitement, allez plus loin avec Premium',
    free: {
      name: 'Gratuit',
      text: 'Pour installer votre jardin et jardiner avec la Lune, jour après jour.',
      items: [
        'Le dessin du plan de votre jardin, à l’échelle',
        'La Lune et le jour biodynamique du jour',
        'Sans publicité',
      ],
    },
    premium: {
      name: 'Jeannot Premium',
      text: 'Tout l’assistant, pour toute la saison.',
      items: [
        'L’assistant IA, à toute heure',
        'Le calendrier lunaire et biodynamique complet',
        'Les tâches planifiées, au meilleur jour',
        'Les conseils sur votre plan : voisinages et rotations',
      ],
    },
    note: 'Premium est un abonnement à renouvellement automatique, souscrit dans l’application sur iPhone, iPad ou Android. Son prix et ce qu’il comprend sont affichés dans l’application avant que vous vous abonniez.',
    terms: 'Lire les conditions d’utilisation',
  },
  values: {
    title: 'Pourquoi jardiner avec Jeannot',
    items: [
      { title: 'Simple', text: 'Tout ce qu’il vous faut pour la journée, en un coup d’œil.' },
      { title: 'Naturel', text: 'Zéro produit chimique : cultivez en accord avec la terre.' },
      {
        title: 'Sans publicité',
        text: 'Un endroit clair et serein pour celles et ceux qui aiment leur jardin.',
      },
      {
        title: 'Pour tous les jardins',
        text: 'Légumes, aromatiques, fleurs ou fruitiers, au jardin comme sur un balcon.',
      },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Bon à savoir avant de commencer',
    more: 'Toutes les questions et l’aide',
  },
  download: {
    title: ['Lancez votre première saison ', 'avec Jeannot'],
    text: 'Dessinez votre jardin, planifiez avec la Lune et recevez des conseils chaque jour.',
  },
  footer: {
    tagline:
      'Jeannot est l’assistant du jardin : plan du jardin, calendrier lunaire et biodynamique, alertes météo, encyclopédie des plantes et assistant IA, dans une application sereine.',
    product: 'Jeannot',
    legal: 'Informations légales',
    getApp: 'Obtenir Jeannot',
    contact: 'Contact',
    rights: 'Tous droits réservés.',
    madeWith: 'Fait avec soin pour les jardiniers.',
    publishedBy: 'Édité par',
  },
  legal: {
    updated: 'Dernière mise à jour :',
    plain: 'Version HTML simple',
    markdown: 'Version Markdown',
    otherPages: 'Aide et pages légales',
    contactTitle: 'Encore besoin d’un coup de main ?',
    contactText: 'Écrivez-nous, nous vous répondons dès que possible.',
  },
  notFound: {
    title: 'Rien ne pousse ici',
    text: 'Cette page n’existe pas, ou elle a été déplacée.',
    back: 'Retour à l’accueil',
  },
}
