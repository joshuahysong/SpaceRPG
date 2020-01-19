import ship from './../assets/ship.png'
import { SceneBase } from './SceneBase';

export default class BootScene extends SceneBase {
    constructor() {
        super({ key: 'BootScene' });
    }

    public preload() {
        this.load.image('ship', ship);
    }

    public create() {
        this.scene.start('ShipScene');
    }
}
