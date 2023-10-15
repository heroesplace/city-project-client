class Sprite {
    constructor(engine) {
        this.tile_width = 16
        this.tile_height = 16

        this.map = []

        this.engine = engine
    }

    draw() {
        this.engine.loadTexturesList(["none"]).then((list) => {

            this.engine.drawImage("player", list[0], 240, 128)
        })

    }
}

export default Sprite