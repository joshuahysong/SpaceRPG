import { SceneBase } from './SceneBase';
import { Config } from './../config';
import { Constants } from './../constants'
import { Tile } from './../Tile'

export default class ShipScene extends SceneBase {
    constructor() {
        super({ key: 'ShipScene' })
    }

    private oldPointerPosition: Phaser.Math.Vector2;
    private pinch: any;
    private pinchZoom: number = 1;
    private debugObjects: Array<any>;
    private isBuilding: boolean = false;
    private isBuildingTileAllowed: boolean = false;
    private buildingTile: Tile;
    private shipArray: Array<Array<integer>> = [[0,1,0,0,0,0,0],
                                                [1,1,1,1,1,1,1],
                                                [0,1,0,0,0,0,0]];
    private ship: Array<Tile>;

    public create() {
        this.bindEvents();
        this.setupCameras();
        this.drawGrid();
        this.drawShip();
        if (Config.isDebugging) {
            this.drawDebug();
            this.scene.run('DebugScene');
        }
        this.scene.run('HudScene');
    }

    public update(time: number, delta: number) {
        // Drag and move map
        if((this.input.activePointer.isDown && !Config.isMobile)
            || (this.input.pointer1.isDown && Config.isMobile && !this.input.pointer2.isDown)){
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
        // This unneeded pinchScene variable is done becuase intellisense does not find rexGestures
        let pinchScene: any = this;
        this.pinch = pinchScene.rexGestures.add.pinch();
        this.pinch.enable;
        // Zoom events
        let zoomInStop = 2;
        let zoomOutStop = 0.25; 
        //      Pinch Zoom
        this.pinch.on('pinch', function(pinch: any) {
            this.pinchZoom *= pinch.scaleFactor;
            this.pinchZoom = this.pinchZoom > zoomInStop ? zoomInStop : this.pinchZoom < zoomOutStop ? zoomOutStop : this.pinchZoom;
            this.cameras.main.zoomTo(this.pinchZoom, 0);
        }, this);
        //      Mouse Wheel Zoom
        this.input.on('wheel', function(pointer: Phaser.Input.Pointer){            
            let oldZoom = this.cameras.main.zoom;
            let newZoom = this.cameras.main.zoom;
            let zoomRate = 0.5;
            if (pointer.deltaY < 0) {
                newZoom += newZoom * zoomRate;
            } else if (pointer.deltaY > 0) {
                newZoom -= newZoom * zoomRate;
            }
            newZoom = newZoom > zoomInStop ? zoomInStop : newZoom < zoomOutStop ? zoomOutStop : newZoom;
            if (oldZoom !== newZoom) {
                this.cameras.main.zoomTo(newZoom, 0);
            }
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
        if (!Config.isMobile) {
            this.input.on('pointermove', function (pointer: any) {
                let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                this.events.emit('tileCoordinates', this.getTileCoordinates(worldPoint.x, worldPoint.y));
            }, this);
        }
        this.bindTileEvents();
    }

    private bindTileEvents() {
        this.scene.get('HudScene').events.on('buildButton', 
            function () {
                this.isBuilding = true;
        }, this); 
        this.input.on('pointermove', function (pointer: any) {
            if (this.isBuilding) {
                let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                let tileCoordinates = this.getTileCoordinates(worldPoint.x, worldPoint.y);
                if (this.buildingTile) {
                    this.buildingTile.x = tileCoordinates.x * Constants.tileSize;
                    this.buildingTile.y = tileCoordinates.y * Constants.tileSize;
                    if (this.ship.filter((s: Tile) => s.location.x === tileCoordinates.x 
                        && s.location.y === tileCoordinates.y).length > 0) {
                        this.isBuildingTileAllowed = false;
                        this.buildingTile.tint = Phaser.Display.Color.HexStringToColor('#ff0000').color;
                    } else {
                        this.isBuildingTileAllowed = true;
                        this.buildingTile.tint = Phaser.Display.Color.HexStringToColor('#33cc33').color;
                    }
                } else {
                    this.buildingTile = new Tile(this, tileCoordinates.x * Constants.tileSize, 
                        tileCoordinates.y * Constants.tileSize, 'shipTiles', 0)
                    this.buildingTile.setOrigin(0.5)
                    this.buildingTile.displayWidth = Constants.tileSize;
                    this.buildingTile.scaleY = this.buildingTile.scaleX;
                    this.buildingTile.alpha = 0.5;
                    this.add.existing(this.buildingTile);
                }
            }
        }, this);
        this.input.on('pointerdown', function(pointer: any) {
            if (this.isBuilding && this.buildingTile && this.isBuildingTileAllowed) {
                let newTile = new Tile(this, 
                    this.buildingTile.x,
                    this.buildingTile.y,
                    this.buildingTile.texture.key,
                    this.buildingTile.frame.name)
                newTile.scale = this.buildingTile.scale;
                this.add.existing(newTile);
                this.buildingTile.destroy();
                this.buildingTile = null;
                this.isBuilding = false;
            }
        }, this)
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
        this.ship = [];
        let offsetX = (this.shipArray[0].length * Constants.tileSize / 2);
        let offsetY = (this.shipArray.length * Constants.tileSize / 2);
        offsetX -= (offsetX - (Constants.tileSize / 2)) % Constants.tileSize;
        offsetY -= (offsetY - (Constants.tileSize / 2)) % Constants.tileSize;
        for (let y = 0; y < this.shipArray.length; y++) {
            for (let x = 0; x < this.shipArray[y].length; x++){            
                if (this.shipArray[y][x] === 1) {
                    let worldX = x * Constants.tileSize + (Constants.tileSize / 2) - offsetX;
                    let worldY = y * Constants.tileSize + (Constants.tileSize / 2) - offsetY
                    let tile = new Tile(this, worldX, worldY, 'shipTiles', 0);
                    tile.setOrigin(0.5);
                    tile.displayWidth = Constants.tileSize;
                    tile.scaleY = tile.scaleX;
                    tile.location = new Phaser.Geom.Point(worldX / Constants.tileSize, worldY / Constants.tileSize);
                    this.add.existing(tile);
                    this.ship.push(tile);
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

    private getTileNeighbors(x: number, y: number) {
        
    }
}
