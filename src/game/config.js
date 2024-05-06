import Phaser from 'phaser'
import { Game } from './scenes/Game'

export const config = {
  type: Phaser.AUTO,
  width: 16 * 2 * 32,
  height: 9 * 2 * 32,
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [
    Game
  ]
}
