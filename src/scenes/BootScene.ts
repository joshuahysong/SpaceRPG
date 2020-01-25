import { Config } from './../config';
import { SceneBase } from './SceneBase';
import * as test from './../importAssets/tiles.json'

export default class BootScene extends SceneBase {
    constructor() {
        super({ key: 'BootScene' });
    }

    public preload() {
        Config.isMobile = !this.sys.game.device.os.desktop;
        console.log(test);
        this.load.setBaseURL('./../assets/');
        this.load.multiatlas('shipTiles', 'shipTiles.json', '');
    }

    public create() {
        this.scene.start('ShipScene');
    }
}
