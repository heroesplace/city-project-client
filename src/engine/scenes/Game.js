import { EventBus } from '../index'
import { Scene } from 'phaser'

import { socket } from '@/api/socket/socket.js'
import { onCharacterSpawn, onCharacterMove } from '@/engine/objects/Character.js'
// import { onCharacterMove } from '@/engine/objects/Character.js'

import MapCache from '@/engine/objects/MapCache.js'
import Player from '@/engine/objects/Player.js'

export class Game extends Scene {
  constructor () {
    super('Game')

    this.mapCache = new MapCache()
    this.layers = []
    this.player = new Player()
    this.otherPlayers = []

    this.cursors = undefined

    this.lastMove = 0
  }

  preload () {
    this.load.image('tiles', '/engine/assets/tileset.png')

    this.load.tilemapTiledJSON('map', '/engine/data/emptytileset.json')

    this.load.atlas('atlas', '/engine/assets/character.png', '/engine/data/character.json')
  }

  create () {
    this.cursors = this.input.keyboard.createCursorKeys()

    this.input.keyboard.enabled = false
    this.input.keyboard.disableGlobalCapture()

    // Gestion du focus
    this.input.on('pointerdownoutside', () => {
      this.input.keyboard.enabled = false
      this.input.keyboard.disableGlobalCapture()
    })

    this.input.on('pointerdown', () => {
      document.activeElement.blur()

      this.input.keyboard.enabled = true
      this.input.keyboard.enableGlobalCapture()
    })

    const map = this.make.tilemap({ key: 'map' })

    const tileset = map.addTilesetImage('custom-texture', 'tiles')
    const belowLayer = map.createBlankLayer('Below', tileset, 0, 0)
    const worldLayer = map.createBlankLayer('World', tileset, 0, 0)
    const aboveLayer = map.createBlankLayer('Above', tileset, 0, 0)

    this.layers = [belowLayer, worldLayer, aboveLayer]

    // worldLayer.setCollisionByProperty({ collides: true })

    // 480, 256
    this.player.setSprite(this.physics.add.sprite((15 * 32) + 16, (8 * 32) + 8, 'atlas', 'misa-front').setSize(32, 32).setOffset(0, 24))
    this.player.initAnimations(this.anims)

    EventBus.emit('current-scene-ready', this)

    socket.emit('character_spawn')

    socket.on('character_spawn', (content) => onCharacterSpawn({ content, game: this }))
    socket.on('character_move', (content) => onCharacterMove({ content, game: this }))
  }

  update (time, delta) {
    if (time - this.lastMove < 130) return

    this.lastMove = time

    let direction = null

    if (this.cursors.left.isDown) direction = 'left'
    if (this.cursors.right.isDown) direction = 'right'
    if (this.cursors.up.isDown) direction = 'up'
    if (this.cursors.down.isDown) direction = 'down'

    this.player.animateMove(direction)

    if (direction != null) socket.emit('character_move', { direction: direction })
  }
}
