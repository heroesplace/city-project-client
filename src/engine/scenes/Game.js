import { EventBus } from '../index'
import { Scene } from 'phaser'

import { socket } from '@/api/socket/socket.js'
import { onCharacterMove } from '@/engine/objects/Character.js'
import { onCharacterSpawn } from '../objects/Character'

export class Game extends Scene {
  constructor () {
    super('Game')

    this.player = undefined
    this.cursors = undefined

    this.mapFrame = []

  }

  preload () {
    this.load.image('tiles', '/engine/assets/tileset.png')

    this.load.tilemapTiledJSON('map', '/engine/data/emptytileset.json')

    this.load.atlas('atlas', '/engine/assets/character.png', '/engine/data/character.json')
  }

  create () {
    this.cursors = this.input.keyboard.createCursorKeys()

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
    const belowLayer = map.createBlankLayer("Below Player", tileset, 0, 0)

    const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point')

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'atlas', 'misa-front')
      .setSize(30, 40)
      .setOffset(0, 24)

    const anims = this.anims
    anims.create({
      key: 'misa-left-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-left-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'misa-right-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-right-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'misa-front-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-front-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'misa-back-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-back-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.cursors.right.on('down', () => socket.emit('character_move', { direction: 'right' }))
    this.cursors.left.on('down', () => socket.emit('character_move', { direction: 'left' }))
    this.cursors.up.on('down', () => socket.emit('character_move', { direction: 'up' }))
    this.cursors.down.on('down', () => socket.emit('character_move', { direction: 'down' }))

    EventBus.emit('current-scene-ready', this)

    socket.emit('character_spawn')

    socket.on('character_spawn', (content) => onCharacterSpawn({ content, layer: belowLayer, mapFrame: this.mapFrame }))
    socket.on('character_move', (content) => onCharacterMove({ content, layer: belowLayer, mapFrame: this.mapFrame }))
  }

  update (time, delta) {
    const prevVelocity = this.player.body.velocity.clone()

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play('misa-left-walk', true)
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('misa-right-walk', true)
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('misa-back-walk', true)
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('misa-front-walk', true)
    } else {
      this.player.anims.stop()

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) this.player.setTexture('atlas', 'misa-left')
      else if (prevVelocity.x > 0) this.player.setTexture('atlas', 'misa-right')
      else if (prevVelocity.y < 0) this.player.setTexture('atlas', 'misa-back')
      else if (prevVelocity.y > 0) this.player.setTexture('atlas', 'misa-front')
    }
  }
}
