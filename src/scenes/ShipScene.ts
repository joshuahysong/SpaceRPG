import { Scene, Game, Cameras } from 'phaser'

export default class ShipScene extends Scene {
    constructor() {
        super({ key: 'ShipScene' })
    }
  
    cursors: Phaser.Input.Keyboard.CursorKeys;
    cameraControls: Phaser.Cameras.Controls.SmoothedKeyControl;
    tileSize: integer = 20;
    worldSize: integer = 200;
    shipArray: Array<Array<integer>> = [[0,1,0],
                                        [1,1,1],
                                        [0,1,0]];

    public create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(
            -1 * this.tileSize * this.worldSize / 2, 
            -1 * this.tileSize * this.worldSize / 2, 
            this.tileSize * this.worldSize, 
            this.tileSize * this.worldSize);
        this.cameras.main.centerOn(0, 0);

        var controlConfig = {
            camera: this.cameras.main,
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            acceleration: 0.5,
            drag: 0.1,
            maxSpeed: 0.5
        };
    
        this.cameraControls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.bindEvents();
        this.drawGrid();
        this.drawShip();
    }

    public update(time: number, delta: number) {
        this.cameraControls.update(delta);
    }

    private bindEvents() {
        this.input.on('wheel', function(pointer: any){
            // TODO Zoom to cursor
            let newZoom = this.cameras.main.zoom;
            if (pointer.deltaY < 0) {
                newZoom += 0.2;
            } else {
                newZoom -= 0.2;
            }
            newZoom = newZoom > 3 ? 3 : newZoom < 0.5 ? 0.5 : newZoom;
            this.cameras.main.zoomTo(newZoom, 0);
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
