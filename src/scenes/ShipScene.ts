import { SceneBase } from './SceneBase';
import { Config } from './../config';
import { Constants } from './../constants'

export default class ShipScene extends SceneBase {
    constructor() {
        super({ key: 'ShipScene' })
    }

    private oldPointerPosition: Phaser.Math.Vector2;
    private oldPointer2Position: Phaser.Math.Vector2;
    private debugObjects: Array<any>;
    private shipArray: Array<Array<integer>> = [[0,1,0,0,0,0,0],
                                                [1,1,1,1,1,1,1],
                                                [0,1,0,0,0,0,0]];
    
    public create() {
        this.bindEvents();
        this.setupCameras();
        this.drawGrid();
        this.drawShip();
        if (Config.isDebugging) {
            this.drawDebug();
            this.scene.run('DebugScene');
        }
    }

    public update(time: number, delta: number) {
        if(this.input.activePointer.isDown){
            if (this.oldPointerPosition) {
                this.cameras.main.scrollX += (this.oldPointerPosition.x - this.input.activePointer.position.x) / this.cameras.main.zoom;
                this.cameras.main.scrollY += (this.oldPointerPosition.y - this.input.activePointer.position.y) / this.cameras.main.zoom;
            }
            this.oldPointerPosition = this.input.activePointer.position.clone();
        } else {
            this.oldPointerPosition = null;
        }
        if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
            if (this.oldPointerPosition && this.oldPointer2Position) {
                let deltaOld = Phaser.Math.Distance.BetweenPoints(this.oldPointerPosition, this.oldPointer2Position);
                let deltaNew = Phaser.Math.Distance.BetweenPoints(this.input.pointer1.position, this.input.pointer2.position);
                this.zoomCamera(deltaOld - deltaNew);
            }
            this.oldPointerPosition = this.input.pointer1.position;
            this.oldPointer2Position = this.input.pointer2.position;
        }
    }

    private setupCameras() {
        this.cameras.main.setBounds(
            -1 * Constants.tileSize * Constants.worldSize / 2, 
            -1 * Constants.tileSize * Constants.worldSize / 2, 
            Constants.tileSize * Constants.worldSize,
            Constants.tileSize * Constants.worldSize);
        let offsetX = (this.shipArray[0].length * Constants.tileSize / 2);
        let offsetY = (this.shipArray.length * Constants.tileSize / 2);
        let centerX = (offsetX - (Constants.tileSize / 2)) % Constants.tileSize;
        let centerY = (offsetY - (Constants.tileSize / 2)) % Constants.tileSize;
        this.cameras.main.centerOn(centerX, centerY);
    }

    private bindEvents() {
        // Mouse Wheel Zoom
        this.input.on('wheel', function(pointer: Phaser.Input.Pointer){
            this.zoomCamera(pointer.deltaY);
        }, this);
        // Toggle Debug
        this.input.keyboard.on('keydown_F4', function () {
            Config.isDebugging = !Config.isDebugging;
            if (Config.isDebugging) {
                this.drawDebug();
                this.scene.run('DebugScene');
            } else {
                if (this.debugObjects) {
                    for (var i = 0; i < this.debugObjects.length; i++) {
                        this.debugObjects[i].destroy();
                    }
                }
                this.scene.stop('DebugScene');
            }
        }, this);
        // Tile Coordinates
        if (this.sys.game.device.os.desktop) {
            this.input.on('pointermove', function (pointer: any) {
                let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                this.events.emit('tileCoordinates', this.getTileCoordinates(worldPoint.x, worldPoint.y));
            }, this);
        }     
    }

    private drawGrid() {
        // TODO Non-square world grid
        let bounds = this.cameras.main.getBounds();
        let targetWidth = bounds.width;
        let targetHeight = bounds.height;
        let currentX = (Math.floor((targetWidth / 2) / Constants.tileSize) * Constants.tileSize * -1) - Constants.tileSize / 2;
        let currentY = (Math.floor((targetHeight / 2) / Constants.tileSize) * Constants.tileSize * -1) - Constants.tileSize / 2;
        while (currentX < (targetWidth / 2)) {
            this.drawLine(currentX, targetHeight / 2 * -1, currentX, targetHeight / 2, '#ffffff', 0.1);
            this.drawLine(targetWidth / 2 * -1, currentY, targetWidth / 2, currentY, '#ffffff', 0.1);
            currentY += Constants.tileSize;
            currentX += Constants.tileSize;
        }
    }

    private drawShip() {
        let offsetX = (this.shipArray[0].length * Constants.tileSize / 2);
        let offsetY = (this.shipArray.length * Constants.tileSize / 2);
        offsetX -= (offsetX - (Constants.tileSize / 2)) % Constants.tileSize;
        offsetY -= (offsetY - (Constants.tileSize / 2)) % Constants.tileSize;
        for (let y = 0; y < this.shipArray.length; y++) {
            for (let x = 0; x < this.shipArray[y].length; x++){            
                if (this.shipArray[y][x] === 1) {
                    let tile = this.add.image(x * Constants.tileSize + (Constants.tileSize / 2) - offsetX, 
                        y * Constants.tileSize + (Constants.tileSize / 2)- offsetY, 'ship').setOrigin(0.5)
                    tile.displayWidth = Constants.tileSize;
                    tile.scaleY = tile.scaleX;
                };
            }
        }
    }

    private drawDebug() {
        // Center lines
        this.debugObjects = [];
        let bounds = this.cameras.main.getBounds();
        let targetWidth = bounds.width;
        let targetHeight = bounds.height;
        this.debugObjects.push(this.drawLine(0, targetHeight / 2 * -1, 0, targetHeight / 2, '#0000ff', 0.5));
        this.debugObjects.push(this.drawLine(targetWidth / 2 * -1, 0, targetWidth / 2, 0, '#0000ff', 0.5));
    }

    private getTileCoordinates(x: number, y: number): Phaser.Geom.Point {   
        let offset = Constants.tileSize / 2;  
        return new Phaser.Geom.Point(Math.floor((x + offset) / Constants.tileSize), Math.floor((y + offset) / Constants.tileSize))
    }

    private zoomCamera(delta: number) {
        // TODO Zoom to Mouse Cursor (Like Google Maps)
        let oldZoom = this.cameras.main.zoom;
        let newZoom = this.cameras.main.zoom;
        if (delta < 0) {
            newZoom += newZoom * 0.5;
        } else {
            newZoom -= newZoom * 0.5;
        }
        newZoom = newZoom > 2 ? 2 : newZoom < 0.25 ? 0.25 : newZoom;
        if (oldZoom !== newZoom) {
            this.cameras.main.zoomTo(newZoom, 250);
        }
    }
}
