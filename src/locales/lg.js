const translation = {
    "fr": {
        "settings": "Paramètres",
        "audio": "Audio",
        "general": "Général",
        "keybinds": "Commandes",
        "gameplay": "Jeu",
        "language": "Langue",
        "interface": "Interface",
        "social": "Social",
        "video": "Vidéo",
    }
}

const currentLanguage = "fr"

const lg = (key) => {
    return translation[currentLanguage][key]
}

export default lg