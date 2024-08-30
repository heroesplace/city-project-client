const en = {
  global: {
    slogan: 'Where every choice builds a world',
    or: 'or',
    cancel: 'Cancel',
  },
  chat: {
    systemName: 'System',
    gm: 'GM',
    HELP_COMMAND: 'Available commands: /help, /clear',
    UNKNOWN_COMMAND: 'Unknown command. Type /help to see available commands.',
  },
  account: {
    accountName: 'Username',
    password: 'PASSWORD',
    login: {
      submit: 'Login',
      register: 'Register ?',
    },
    register: {
      emailAddress: 'Email address',
      confirmPassword: 'CONFIRM PASSWORD',
      characterName: 'Character name',
      submit: 'Register',
      login: 'Login ?',
    },
    error: {
      WRONG_CREDENTIALS: 'Wrong credentials',
    }
  },
  settings: {
    name: 'Settings',
    audio: 'Audio',
    controls: 'Controls',
    gameplay: 'Gameplay',
    general: 'General',
    interface: 'Interface',
    social: 'Social',
    video: 'Video',
  },
  mailbox: {
    name: 'Mailbox',
    empty: 'No messages',
    chart: '{ characterName } has invited you to join his village !'
  },
  village: {
    name: 'Village',
    join: {
      name: 'Join a village'
    },
    create: {
      name: 'Create village',
      newVillageName: 'Village name',
      submit: 'Create',
      invite: {
        name: 'Invite a player',
        search: 'Search for a player',
        submit: 'Invite'
      },
    }
  }
}

const fr = {
  global: {
    slogan: 'Où chaque choix construit un monde',
    or: 'ou',
    cancel: 'Annuler',
  },
  chat: {
    systemName: 'Système',
    gm: 'MJ',
    HELP_COMMAND: 'Commandes disponibles : /help, /clear',
    UNKNOWN_COMMAND: 'Commande inconnue. Tapez /help pour voir les commandes disponibles',
  },
  account: {
    accountName: 'Identifiant',
    password: 'MOT DE PASSE',
    login: {
      submit: 'Connexion',
      register: 'S\'inscrire ?',
    },
    register: {
      emailAddress: 'Adresse email',
      confirmPassword: 'CONFIRMER LE MOT DE PASSE',
      characterName: 'Personnage',
      submit: 'S\'inscrire',
      login: 'Connexion ?',
    },
    error: {
      WRONG_CREDENTIALS: 'Identifiants incorrects',
    }
  },
  settings: {
    name: 'Paramètres',
    audio: 'Audio',
    controls: 'Contrôles',
    gameplay: 'Jouabilité',
    general: 'Général',
    interface: 'Interface',
    social: 'Social',
    video: 'Vidéo',
  },
  mailbox: {
    name: 'Boîte aux lettres',
    empty: 'Pas de messages',
    chart: '{ characterName } vous invite à rejoindre son village !'
  },
  village: {
    name: 'Village',
    join: {
      name: 'Rejoindre un village'
    },
    create: {
      name: 'Créer un village',
      newVillageName: 'Nom du village',
      submit: 'Créer',
      invite: {
        name: 'Inviter un joueur',
        search: 'Rechercher un joueur',
        submit: 'Inviter'
      },
    }
  }
}

export function getLocale() {
  if (!localStorage.getItem('last-locale')) return 'en'

  return localStorage.getItem('last-locale')
}

export function setLocale(locale) {
  localStorage.setItem('last-locale', locale)
}

export function getSupportedLocales() {
  return Object.keys(messages)
}

export const messages = { fr, en }
