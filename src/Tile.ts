import { Constants } from './constants';
import { IItem } from './contracts/IItem'

export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, item: IItem, isBuilding?: boolean) {
        super(scene, x, y, texture, isBuilding ? item.buildFrame : item.frame);
        this.displayWidth = Constants.tileSize;
        this.scaleY = this.scaleX;
        this.setOrigin(0.5);
        this.item = item;
        this.location = new Phaser.Geom.Point(x / Constants.tileSize, y / Constants.tileSize);
    }

    public item: IItem;
    public location: Phaser.Geom.Point;

    public updateLocation() {
        this.location = new Phaser.Geom.Point(this.x / Constants.tileSize, this.y / Constants.tileSize);
    }
}