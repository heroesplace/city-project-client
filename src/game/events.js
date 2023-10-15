export function keydownHandler(event, socket) {
    let direction = null

    switch (event.code) {
        case "ArrowLeft": // Touche de gauche
            direction = "left"
            break;
        case "ArrowUp": // Touche du haut
            direction = "top"
            break;
        case "ArrowRight": // Touche de droite
            direction = "right"
            break;
        case "ArrowDown": // Touche du bas
            direction = "bottom"
            break;
    }

    // iterate over entities_list
    if (direction != null) {
       socket.emit('ask_map_part', { "direction": direction })
    }
}