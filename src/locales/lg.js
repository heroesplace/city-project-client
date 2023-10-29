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
        "create_village": "Nouveau village",
    }
}

const currentLanguage = "fr"

const lg = (key) => {
    return translation[currentLanguage][key] || key;
}

export default lg