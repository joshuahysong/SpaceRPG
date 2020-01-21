import { Config } from './../config';
import { SceneBase } from './SceneBase';
import shipTiles from './../assets/shipTiles.png'

export default class BootScene extends SceneBase {
    constructor() {
        super({ key: 'BootScene' });
    }

    public preload() {
        Config.isMobile = !this.sys.game.device.os.desktop;
        this.load.spritesheet('shipTiles', shipTiles, { frameWidth: 64, frameHeight: 64 });    
    }

    public create() {
        this.scene.start('ShipScene');
    }
}
