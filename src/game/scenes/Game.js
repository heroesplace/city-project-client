import { EventBus } from '../index';
import { Scene, Tilemaps } from 'phaser';

import { socket } from "@/api/socket/socket.js";

export class Game extends Scene
{
    constructor ()
    {
        super('Game');

        this.player = undefined;
        this.cursors = undefined;

        this.fullMap = [[126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 149],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 149, 196],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 149, 196, 174],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 173, 174, 174],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 173, 174, 174],
                        [126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 173, 174, 174],
                        [126, 126, 149, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 126, 150, 150, 150, 150, 150, 151, 126, 126, 126, 126, 173, 174, 174],
                        [126, 126, 173, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 175, 126, 126, 126, 126, 197, 172, 174],
                        [126, 126, 173, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 174, 175, 126, 126, 126, 126, 126, 197, 172],
                        [126, 126, 173, 174, 174, 171, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 198, 199, 126, 126, 126, 126, 126, 126, 197],
                        [126, 126, 173, 174, 174, 175, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 173, 174, 174, 175, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 173, 174, 174, 175, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 173, 174, 174, 175, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126, 126],
                        [126, 126, 173, 174, 174, 195, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]
        ]
    }

    preload ()
    {
        this.load.image("tiles", "/game/assets/tileset.png");
        
        // Remove when server will be ready
        this.load.tilemapTiledJSON("map", "/game/data/emptymap.json");
    
        this.load.atlas("atlas", "/game/assets/character.png", "/game/data/character.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
      
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
      
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createLayer("World", tileset, 0, 0);
        const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });
      
        // By default, everything gets depth sorted on the screen in the order we created things. Here, we
        // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
        // Higher depths will sit on top of lower depth objects.
        aboveLayer.setDepth(10);
      
        // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
        // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
      
        // Create a sprite with physics enabled via the physics system. The image used for the sprite has
        // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front")
          .setSize(30, 40)
          .setOffset(0, 24);
      
        // Watch the player and worldLayer for collisions, for the duration of the scene:
        this.physics.add.collider(this.player, worldLayer);
      
        // Create the player's walking animations from the texture atlas. These are stored in the global
        // animation manager so any sprite can access them.
        const anims = this.anims;
        anims.create({
          key: "misa-left-walk",
          frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "misa-right-walk",
          frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "misa-front-walk",
          frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
          frameRate: 10,
          repeat: -1
        });
        anims.create({
          key: "misa-back-walk",
          frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
          frameRate: 10,
          repeat: -1
        });
      
        this.cursors = this.input.keyboard.createCursorKeys();
      
        // Help text that has a "fixed" position on the screen
        this.add
          .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
            font: "18px monospace",
            fill: "#000000",
            padding: { x: 20, y: 10 },
            backgroundColor: "#ffffff"
          })
          .setScrollFactor(0)
          .setDepth(30);
      
        // Debug graphics
        this.input.keyboard.once("keydown-D", event => {
          // Turn on physics debugging to show player's hitbox
          this.physics.world.createDebugGraphic();
      
          // Create worldLayer collision graphic above the player, but below the help text
          const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
          worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
          });
        });

        this.cursors.right.on("down", () => socket.emit("move", { direction: "right" }))
        this.cursors.left.on("down", () => socket.emit("move", { direction: "left" }))
        this.cursors.up.on("down", () => socket.emit("move", { direction: "up" }))
        this.cursors.down.on("down", () => socket.emit("move", { direction: "down" }))

        EventBus.emit('current-scene-ready', this)

        socket.on("move", (data) => {
            const { direction, map_part } = data

            if (direction === 'right') {
                // ADD ROW TO THE RIGHT
                this.fullMap.forEach((row, index) => {
                    this.fullMap[index].push(map_part[index])
                })

                // REMOVE FIRST ROW
                this.fullMap.forEach((row, index) => {
                    this.fullMap[index].shift()
                })
            }

            if (direction === 'left') {
                // ADD ROW TO THE LEFT
                this.fullMap.forEach((row, index) => {
                    this.fullMap[index].unshift(map_part[index])
                })

                // REMOVE LAST ROW
                this.fullMap.forEach((row, index) => {
                    this.fullMap[index].pop()
                })
            }

            if (direction === 'up') {
                // ADD ROW TO THE TOP
                this.fullMap.unshift(map_part[0])

                // REMOVE LAST ROW
                this.fullMap.pop()
            }

            if (direction === 'down') {
                // ADD ROW TO THE BOTTOM
                this.fullMap.push(map_part[0])

                // REMOVE FIRST ROW
                this.fullMap.shift()
            }

            belowLayer.putTilesAt(this.fullMap, 0, 0)
        })
      }

      update(time, delta) {
        const prevVelocity = this.player.body.velocity.clone();
      
        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
          this.player.anims.play("misa-left-walk", true);
        } else if (this.cursors.right.isDown) {
          this.player.anims.play("misa-right-walk", true);
        } else if (this.cursors.up.isDown) {
          this.player.anims.play("misa-back-walk", true);
        } else if (this.cursors.down.isDown) {
          this.player.anims.play("misa-front-walk", true);
        } else {
          this.player.anims.stop();
      
          // If we were moving, pick and idle frame to use
          if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
          else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
          else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
          else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
        }
    }
}