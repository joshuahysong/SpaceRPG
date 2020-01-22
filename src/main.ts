import * as Phaser from 'phaser'
import GesturesPlugin from './plugins/gestures-plugin.js';
import BootScene from './scenes/BootScene'
import ShipScene from './scenes/ShipScene'
import DebugScene from './scenes/DebugScene'
import HudScene from './scenes/HudScene';

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
    scene: [BootScene, ShipScene, DebugScene, HudScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        }]
    }
}

const game = new Phaser.Game(config)
window.game = game
