import { Config } from './../config';
import { SceneBase } from './SceneBase';

export default class BootScene extends SceneBase {
    constructor() {
        super({ key: 'BootScene' });
    }

    public preload() {
        Config.isMobile = !this.sys.game.device.os.desktop;
        this.load.multiatlas('shipTiles', './../assets/shipTiles.json', './../assets');
    }

    public create() {
        this.scene.start('ShipScene');
    }
}
