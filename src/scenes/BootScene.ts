import { Scene } from 'phaser'
import ship from '../assets/ship.png'

export default class BootScene extends Scene {
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
