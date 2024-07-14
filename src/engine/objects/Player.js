export default class Player {
  constructor() {
    this.speed = 200
    this.sprite = null
    this.anims = null
  }

  setSprite(sprite) {
    this.sprite = sprite
  }

  getSprite() {
    return this.sprite
  }

  // fast call
  animateMove(direction, delta) {
    const prevVelocity = this.sprite.body.velocity.clone()

    switch (direction) {
      case 'left':
        this.sprite.anims.play('misa-left-walk', true)
        break
      case 'right':
        this.sprite.anims.play('misa-right-walk', true)
        break
      case 'up':
        this.sprite.anims.play('misa-back-walk', true)
        break
      case 'down':
        this.sprite.anims.play('misa-front-walk', true)
        break
      default:
        this.sprite.anims.stop()

        if (prevVelocity.x < 0) this.sprite.setTexture('atlas', 'misa-left')
        else if (prevVelocity.x > 0) this.sprite.setTexture('atlas', 'misa-right')
        else if (prevVelocity.y < 0) this.sprite.setTexture('atlas', 'misa-back')
        else if (prevVelocity.y > 0) this.sprite.setTexture('atlas', 'misa-front')

        break
    }
  }

  initAnimations(anims) {
    this.anims = anims

    this.anims.create({
      key: 'misa-left-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-left-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'misa-right-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-right-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'misa-front-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-front-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'misa-back-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-back-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
  }
}