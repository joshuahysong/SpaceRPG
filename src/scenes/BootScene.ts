import { Config } from './../config';
import { SceneBase } from './SceneBase';
import ship from './../assets/ship.png'

export default class BootScene extends SceneBase {
    constructor() {
        super({ key: 'BootScene' });
    }

    public preload() {
        Config.isMobile = !this.sys.game.device.os.desktop;
        this.load.image('ship', ship);
    }

    public create() {
        this.scene.start('ShipScene');
    }
}
