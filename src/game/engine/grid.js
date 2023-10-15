export class MapGrid {
    constructor(engine) {
        this.tile_width = 16
        this.tile_height = 16

        this.map = []

        this.engine = engine
    }

    drawMap(data) {
        this.map = data

        this.engine.loadTexturesList(["grass", "dirt", "stone", "water", "snow"]).then((list) => {
            let t = {"grass": list[0], "dirt": list[1], "stone": list[2], "water": list[3], "snow": list[4]}

            for (let xi=0;xi < 31;xi++) {
                for (let yi=0;yi < 17;yi++) {
                    this.engine.drawImage("background", t[this.map[yi][xi]], xi * this.tile_width, yi * this.tile_height)
                    // this.engine.drawImage("background", list[3], xi * this.tile_width, yi * this.tile_height)
                }
            }
        })

    }
}

export default MapGrid