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

    this.mapFrame = [
      [],
      [],
      []
    ]

    this.otherPlayers = []
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

    const belowLayer = map.createBlankLayer("Below Player", tileset, 0, 0)
    const worldLayer = map.createBlankLayer("World Layer", tileset, 0, 0)
    const aboveLayer = map.createBlankLayer("Above Player", tileset, 0, 0)

    // worldLayer.setCollisionByProperty({ collides: true })

    this.player = this.physics.add.sprite(464, 256, 'atlas', 'misa-front').setSize(30, 40).setOffset(0, 24)

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

    EventBus.emit('current-scene-ready', this)

    socket.emit('character_spawn')

    socket.on('character_spawn', (content) => onCharacterSpawn({ content, layers: [belowLayer, worldLayer, aboveLayer], mapFrame: this.mapFrame }))
    socket.on('character_move', (content) => onCharacterMove({ content, layers: [belowLayer, worldLayer, aboveLayer], mapFrame: this.mapFrame }))

    socket.on('other_character_spawn', (content) => {
      this.otherPlayers.push(
        this.physics.add.sprite(604, 256, 'atlas', 'misa-front')
          .setSize(30, 40)
          .setOffset(0, 24)
      )

      console.log(content, "est apparu !")
    })

    socket.on('other_character_dispawn', (content) => {

    })
  }

  update (time, delta) {
    const prevVelocity = this.player.body.velocity.clone()

    if (time - this.lastMove < 130) return

    this.lastMove = time

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      socket.emit('character_move', { direction: 'left' })

      this.player.anims.play('misa-left-walk', true)
    } else if (this.cursors.right.isDown) {
      socket.emit('character_move', { direction: 'right' })

      this.player.anims.play('misa-right-walk', true)
    } else if (this.cursors.up.isDown) {
      socket.emit('character_move', { direction: 'up' })

      this.player.anims.play('misa-back-walk', true)
    } else if (this.cursors.down.isDown) {
      socket.emit('character_move', { direction: 'down' })

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
