import { Scene, Game, Cameras } from 'phaser'

export default class ShipScene extends Scene {
    constructor() {
        super({ key: 'ShipScene' })
    }
  
    oldPointerPosition: Phaser.Math.Vector2;
    tileSize: integer = 20;
    worldSize: integer = 200;
    shipArray: Array<Array<integer>> = [[0,1,0],
                                        [1,1,1],
                                        [0,1,0]];

    public create() {
        this.cameras.main.setBounds(
            -1 * this.tileSize * this.worldSize / 2, 
            -1 * this.tileSize * this.worldSize / 2, 
            this.tileSize * this.worldSize, 
            this.tileSize * this.worldSize);
        this.cameras.main.centerOn(0, 0);

        this.bindEvents();
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

    private bindEvents() {
        this.input.on('wheel', function(pointer: Phaser.Input.Pointer){
            // TODO Zoom to cursor
            let oldZoom = this.cameras.main.zoom;
            let newZoom = this.cameras.main.zoom;
            if (pointer.deltaY < 0) {
                newZoom += 0.2;
            } else {
                newZoom -= 0.2;
            }
            newZoom = newZoom > 3 ? 3 : newZoom < 0.5 ? 0.5 : newZoom;
            if (oldZoom !== newZoom) {
                this.cameras.main.zoomTo(newZoom, 0);
            }
        }, this);
        this.input.keyboard.on('keydown_F4', function () {
            if (this.scene.isSleeping('DebugScene')) {
                this.scene.wake('DebugScene');
            } else {
                this.scene.sleep('DebugScene');
            }
        }, this);
    }

    private drawGrid() {
        let bounds = this.cameras.main.getBounds();
        let targetWidth = bounds.width;
        let targetHeight = bounds.height;
        let currentX = (Math.floor((targetWidth / 2) / this.tileSize) * this.tileSize * -1) - this.tileSize / 2;
        let currentY = (Math.floor((targetHeight / 2) / this.tileSize) * this.tileSize * -1) - this.tileSize / 2;
        while (currentX < (targetWidth / 2)) {
            let graphics = this.add.graphics();
            var thickness = 1;
            var color = 16777215;
            var alpha = 0.1;
            graphics.lineStyle(thickness, color, alpha);
            graphics.lineBetween(currentX, targetHeight / 2 * -1, currentX, targetHeight / 2);
            graphics.lineBetween(targetWidth / 2 * -1, currentY, targetWidth / 2, currentY);
            currentY += this.tileSize;
            currentX += this.tileSize;
        }
    }

    private drawShip() {     
        let offsetX: integer = this.shipArray[0].length * this.tileSize / 2;
        let offsetY: integer = this.shipArray.length * this.tileSize / 2;
        for (var y = 0; y < this.shipArray.length; y++) {
            for (var x = 0; x < this.shipArray[y].length; x++){            
                if (this.shipArray[y][x] === 1) {
                    var tile = this.add.image(x * this.tileSize + (this.tileSize / 2) - offsetX, 
                        y * this.tileSize + (this.tileSize / 2)- offsetY, 'ship')
                    tile.displayWidth = this.tileSize;
                    tile.scaleY = tile.scaleX;
                };
            }
        }
    }
}
