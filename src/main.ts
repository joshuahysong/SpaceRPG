import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/ShipScene'
import HudScene from './scenes/HudScene'

declare global {
  interface Window {
    game: Phaser.Game
  }
}

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BootScene, PlayScene, HudScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
}

const game = new Phaser.Game(config)
window.game = game
