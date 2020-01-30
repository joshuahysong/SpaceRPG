import { Constants } from './constants';

export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.displayWidth = Constants.tileSize;
        this.scaleY = this.scaleX;
        this.setOrigin(0.5);
        this.location = new Phaser.Geom.Point(x / Constants.tileSize, y / Constants.tileSize);
    }

    public location: Phaser.Geom.Point;

    public updateLocation() {
        this.location = new Phaser.Geom.Point(this.x / Constants.tileSize, this.y / Constants.tileSize);
    }
}