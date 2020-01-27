import * as Phaser from 'phaser'
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js'
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
    title: 'Phaser Test',
    version: '0.0.1',
    width: 1920,
    height: 1080,
    scene: [BootScene, ShipScene, DebugScene, HudScene],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    disableContextMenu: true,
    resolution: window.devicePixelRatio,
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
