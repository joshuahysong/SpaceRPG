import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import ShipScene from './scenes/ShipScene'
import DebugScene from './scenes/DebugScene'

declare global {
    interface Window {
        game: Phaser.Game
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'app',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [BootScene, ShipScene, DebugScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
}

const game = new Phaser.Game(config)
window.game = game
