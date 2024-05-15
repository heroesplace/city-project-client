import Phaser from 'phaser'
import { config } from './config.js'

export const EventBus = new Phaser.Events.EventEmitter()

export const StartGame = (parent) => new Phaser.Game({ ...config, parent })
