const translation = {
  fr: {
    settings: 'Paramètres',
    audio: 'Audio',
    general: 'Général',
    keybinds: 'Commandes',
    gameplay: 'Jeu',
    language: 'Langue',
    interface: 'Interface',
    social: 'Social',
    video: 'Vidéo',
    create_village: 'Nouveau village',
    CHARACTER_NOT_FOUND: "Ce personnage n'existe pas.",
    SELF_INVITE: 'Vous ne pouvez pas vous inviter vous même.',
    ALREADY_INVITED: 'Vous avez déjà invité ce personnage.',
    mailbox: 'Messagerie'
  }
}

const currentLanguage = 'fr'

const lg = (key) => {
  return translation[currentLanguage][key] || key
}

export default lg
