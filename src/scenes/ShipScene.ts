import { SceneBase } from './SceneBase';

export default class ShipScene extends SceneBase {
    constructor() {
        super({ key: 'ShipScene' })
    }

    tileSize: integer = 32;
    worldSize: integer = 200;
    oldPointerPosition: Phaser.Math.Vector2;
    debugObjects: Array<any>;
    shipArray: Array<Array<integer>> = [[0,1,0,0,0,0,0],
                                        [1,1,1,1,1,1,1],
                                        [0,1,0,0,0,0,0]];
    
    public create() {
        this.bindEvents();
        this.setupCameras();
        this.drawGrid();
        this.drawShip();
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
    }

    private setupCameras() {
        this.cameras.main.setBounds(
            -1 * this.tileSize * this.worldSize / 2, 
            -1 * this.tileSize * this.worldSize / 2, 
            this.tileSize * this.worldSize,
            this.tileSize * this.worldSize);
        let offsetX = (this.shipArray[0].length * this.tileSize / 2);
        let offsetY = (this.shipArray.length * this.tileSize / 2);
        let centerX = (offsetX - (this.tileSize / 2)) % this.tileSize;
        let centerY = (offsetY - (this.tileSize / 2)) % this.tileSize;
        this.cameras.main.centerOn(centerX, centerY);
    }

    private bindEvents() {
        // Mouse Wheel Zoom
        this.input.on('wheel', function(pointer: Phaser.Input.Pointer){
            // TODO Zoom to Mouse Cursor (Like Google Maps)
            let oldZoom = this.cameras.main.zoom;
            let newZoom = this.cameras.main.zoom;
            if (pointer.deltaY < 0) {
                newZoom += newZoom * 0.5;
            } else {
                newZoom -= newZoom * 0.5;
            }
            newZoom = newZoom > 3 ? 3 : newZoom < 0.5 ? 0.5 : newZoom;
            if (oldZoom !== newZoom) {
                this.cameras.main.zoomTo(newZoom, 250);
            }
        }, this);
        // Toggle Debug
        this.input.keyboard.on('keydown_F4', function () {
            this.isDebugging = !this.isDebugging;
            if (this.isDebugging) {
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
        let currentX = (Math.floor((targetWidth / 2) / this.tileSize) * this.tileSize * -1) - this.tileSize / 2;
        let currentY = (Math.floor((targetHeight / 2) / this.tileSize) * this.tileSize * -1) - this.tileSize / 2;
        while (currentX < (targetWidth / 2)) {
            this.drawLine(currentX, targetHeight / 2 * -1, currentX, targetHeight / 2, '#ffffff', 0.1);
            this.drawLine(targetWidth / 2 * -1, currentY, targetWidth / 2, currentY, '#ffffff', 0.1);
            currentY += this.tileSize;
            currentX += this.tileSize;
        }
    }

    private drawShip() {
        let offsetX = (this.shipArray[0].length * this.tileSize / 2);
        let offsetY = (this.shipArray.length * this.tileSize / 2);
        offsetX -= (offsetX - (this.tileSize / 2)) % this.tileSize;
        offsetY -= (offsetY - (this.tileSize / 2)) % this.tileSize;
        for (let y = 0; y < this.shipArray.length; y++) {
            for (let x = 0; x < this.shipArray[y].length; x++){            
                if (this.shipArray[y][x] === 1) {
                    let tile = this.add.image(x * this.tileSize + (this.tileSize / 2) - offsetX, 
                        y * this.tileSize + (this.tileSize / 2)- offsetY, 'ship').setOrigin(0.5)
                    tile.displayWidth = this.tileSize;
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
        let offset = this.tileSize / 2;  
        return new Phaser.Geom.Point(Math.floor((x + offset) / this.tileSize), Math.floor((y + offset) / this.tileSize))
    }
}
