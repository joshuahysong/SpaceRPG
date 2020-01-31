import { Config } from './../config';
import { SceneBase } from './SceneBase';

export default class BootScene extends SceneBase {
    constructor() {
        super({ key: 'BootScene' });
    }

    public preload() {
        Config.isMobile = !this.sys.game.device.os.desktop;
        this.load.setBaseURL('./../assets/');
        this.load.multiatlas('shipTiles', 'atlas/shipTiles.json', 'atlas/');        
        this.load.json('itemData', 'itemData.json');
    }

    public create() {
        this.scene.start('ShipScene');
    }
}
