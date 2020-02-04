import { SceneBase } from './SceneBase';
import { Config } from './../config';
import { Constants } from './../constants';
import { Tile } from './../Tile';

export default class ShipScene extends SceneBase {
    constructor() {
        super({ key: 'ShipScene' })
    }

    private oldPointerPosition: Phaser.Math.Vector2;
    private debugObjects: Array<any>;
    private buildingTiles: Array<Tile>;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private ship: Array<Tile>;

    private pinchZoom: number = 1;
    private isHudPointerDown: boolean = false;
    private isBuilding: boolean = false;
    private shipArray: Array<Array<integer>> = [[0,1,0,0,0,0,0],
                                                [1,1,1,1,1,1,1],
                                                [0,1,0,0,0,0,0]];

    // Keys
    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;
    private keyEsc: Phaser.Input.Keyboard.Key;

    public create() {
        this.createKeys();
        this.bindDebugEvents();
        this.bindCameraEvents();
        this.bindHudEvents();
        this.bindTileEvents();
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
        if (Config.isMobile) {
            if(!this.isHudPointerDown && this.input.pointer1.isDown && !this.input.pointer2.isDown){
                if (this.oldPointerPosition) {
                    this.cameras.main.scrollX += (this.oldPointerPosition.x - this.input.pointer1.position.x) / this.cameras.main.zoom;
                    this.cameras.main.scrollY += (this.oldPointerPosition.y - this.input.pointer1.position.y) / this.cameras.main.zoom;
                }
                this.oldPointerPosition = this.input.pointer1.position.clone();
            } else {
                this.oldPointerPosition = null;
            }
        }

        // Arrow keys move map
        if (!Config.isMobile) {
            if (this.keyEsc.isDown && this.isBuilding && this.buildingTiles) {
                this.clearBuildingTiles();
            }
            let cameraMoveSpeed = 10;
            if (this.keyW.isDown || this.cursors.up.isDown) {
                this.cameras.main.scrollY -= cameraMoveSpeed / this.cameras.main.zoom;
            }
            if (this.keyA.isDown || this.cursors.left.isDown) {
                this.cameras.main.scrollX -= cameraMoveSpeed / this.cameras.main.zoom;
            }
            if (this.keyS.isDown || this.cursors.down.isDown) {
                this.cameras.main.scrollY += cameraMoveSpeed / this.cameras.main.zoom;
            }
            if (this.keyD.isDown || this.cursors.right.isDown) {
                this.cameras.main.scrollX += cameraMoveSpeed / this.cameras.main.zoom;
            }
        }
    }

    private createKeys() {
        if (!Config.isMobile) {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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

    private bindDebugEvents() {
        // Toggle Debug
        this.input.keyboard.on('keydown_F4', function () {
            Config.isDebugging = !Config.isDebugging;
            if (Config.isDebugging) {
                this.drawDebug();
                this.scene.run('DebugScene');
            } else {
                this.destroyDebug();
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
    }

    private bindCameraEvents() {
        // Zoom events
        let zoomInStop = 2;
        let zoomOutStop = 0.25;
        if (Config.isMobile) {
            // Pinch Zoom
            // This unneeded pinchScene variable is done becuase intellisense does not find rexGestures
            let pinchScene: any = this;
            let pinch = pinchScene.rexGestures.add.pinch();
            pinch.enable;
            pinch.on('pinch', function(pinch: any) {
                this.pinchZoom *= pinch.scaleFactor;
                this.pinchZoom = this.pinchZoom > zoomInStop ? zoomInStop : this.pinchZoom < zoomOutStop ? zoomOutStop : this.pinchZoom;
                this.cameras.main.zoomTo(this.pinchZoom, 0);
            }, this);
        } else {
            // Mouse Wheel Zoom
            this.input.on('wheel', function(pointer: Phaser.Input.Pointer){
                let oldZoom = this.cameras.main.zoom;
                let newZoom = this.cameras.main.zoom;
                if (pointer.deltaY < 0) {
                    newZoom += oldZoom < 1 ? 0.25 : 0.5;
                } else if (pointer.deltaY > 0) {
                    newZoom -= oldZoom <= 1 ? 0.25 : 0.5;
                }
                newZoom = newZoom > zoomInStop ? zoomInStop : newZoom < zoomOutStop ? zoomOutStop : newZoom;
                if (oldZoom !== newZoom) {
                    this.cameras.main.zoomTo(newZoom, 150);
                }
            }, this);
        }
    }

    private bindHudEvents() {
        // Hud Events
        var hudScene = this.scene.get('HudScene');
        hudScene.events.on('hudPointerDown', 
            function (isHudPointerDown: boolean) {
                this.isHudPointerDown = isHudPointerDown;
        }, this); 
        hudScene.events.on('buildButton', 
            function (tileId: integer) {
                let tiles = this.cache.json.get('itemData');
                let tileToBuild = tiles.filter(function(tile: any) { return tile.id === tileId })
                if (tileToBuild && tileToBuild.length === 1) {
                    this.buildingTiles = [];
                    let outsideBoundsCoordinates = (Constants.worldSize + 1) * Constants.tileSize;
                    let newTile = new Tile(this, outsideBoundsCoordinates, outsideBoundsCoordinates, 'shipTiles', tileToBuild[0], true);
                    newTile.alpha = 0.9;
                    this.buildingTiles.push(newTile);
                    this.add.existing(newTile);
                    this.isBuilding = true;
                }
        }, this);
    }

    private bindTileEvents() {
        this.input.on('pointermove', function (pointer: any) {
            if (this.isBuilding && this.buildingTiles) {
                let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                // If pointerdown then we are dragging so make a line
                if (pointer.isDown) {
                    this.isHudPointerDown = true;
                    let xTilesCount: integer = 0;
                    let yTilesCount: integer = 0;
                    let angle = Phaser.Math.Angle.Between(this.buildingTiles[0].x, this.buildingTiles[0].y, pointer.worldX, pointer.worldY);
                    if (this.buildingTiles[0].item.buildType === "line") {
                        let angleSnapped = Phaser.Math.Snap.To(angle, Math.PI / 2);
                        if (angleSnapped === 0) {
                            // Right
                            xTilesCount += Math.abs(Math.round((worldPoint.x - this.buildingTiles[0].x) / Constants.tileSize));
                        } else if (angleSnapped === Math.PI / 2) {
                            // Down
                            yTilesCount += Math.abs(Math.round((worldPoint.y - this.buildingTiles[0].y) / Constants.tileSize));
                        } else if (angleSnapped === (-Math.PI / 2)) {
                            // Up
                            yTilesCount -= Math.abs(Math.round((worldPoint.y - this.buildingTiles[0].y) / Constants.tileSize));
                        } else {
                            // Left
                            xTilesCount -= Math.abs(Math.round((worldPoint.x - this.buildingTiles[0].x) / Constants.tileSize));
                        }
                    } else if (this.buildingTiles[0].item.buildType === "area") {
                        let angleSnapped = Phaser.Math.Snap.To(angle, Math.PI / 2, Math.PI / 4);
                        if (angleSnapped === -Math.PI / 4) {
                            // Upper Right
                            xTilesCount += Math.abs(Math.round((worldPoint.x - this.buildingTiles[0].x) / Constants.tileSize));
                            yTilesCount -= Math.abs(Math.round((worldPoint.y - this.buildingTiles[0].y) / Constants.tileSize));
                        } else if (angleSnapped === Math.PI / 4) {
                            // Bottom Right
                            xTilesCount += Math.abs(Math.round((worldPoint.x - this.buildingTiles[0].x) / Constants.tileSize));
                            yTilesCount += Math.abs(Math.round((worldPoint.y - this.buildingTiles[0].y) / Constants.tileSize));
                        } else if (angleSnapped === ((Math.PI / 2) + (Math.PI / 4)) * -1) {
                            // Upper Left
                            xTilesCount -= Math.abs(Math.round((worldPoint.x - this.buildingTiles[0].x) / Constants.tileSize));
                            yTilesCount -= Math.abs(Math.round((worldPoint.y - this.buildingTiles[0].y) / Constants.tileSize));
                        } else if (angleSnapped === (Math.PI / 2) + (Math.PI / 4)) {
                            // Bottom Left
                            xTilesCount -= Math.abs(Math.round((worldPoint.x - this.buildingTiles[0].x) / Constants.tileSize));
                            yTilesCount += Math.abs(Math.round((worldPoint.y - this.buildingTiles[0].y) / Constants.tileSize));
                        }
                    }
                    this.createBuildTiles(xTilesCount, yTilesCount);
                } else {
                    let tileCoordinates = this.getTileCoordinates(worldPoint.x, worldPoint.y);
                    this.buildingTiles[0].x = tileCoordinates.x * Constants.tileSize;
                    this.buildingTiles[0].y = tileCoordinates.y * Constants.tileSize;
                    this.buildingTiles[0].updateLocation();
                    if (this.ship.filter((s: Tile) => s.location.x === tileCoordinates.x
                        && s.location.y === tileCoordinates.y).length > 0) {
                        this.buildingTiles[0].tint = Phaser.Display.Color.HexStringToColor('#ff0000').color;
                    } else {
                        this.buildingTiles[0].clearTint();
                    }
                }
            }
        }, this);
        this.input.on('pointerdown', function(pointer: any) {
            if (this.isBuilding && this.buildingTiles) {
                if (pointer.rightButtonDown()) {
                    this.clearBuildingTiles();
                }
            }
        }, this);
        this.input.on('pointerup', function() {
            this.isHudPointerDown = false;
            if (this.isBuilding && this.buildingTiles) {
                for (let i = 0; i < this.buildingTiles.length; i++) {
                    if (this.ship.filter((s: Tile) => s.x === this.buildingTiles[i].x
                        && s.y === this.buildingTiles[i].y).length <= 0) {
                        let newTile = new Tile(this,
                            this.buildingTiles[i].x,
                            this.buildingTiles[i].y,
                            this.buildingTiles[i].texture.key,
                            this.buildingTiles[i].item);
                        this.add.existing(newTile);
                        this.ship.push(newTile);
                    }
                }
                for (let x = 1; x < this.buildingTiles.length; x++) {
                    this.buildingTiles[x].destroy();
                }
                this.buildingTiles.length = 1;
                this.buildingTiles[0].setDepth(1);
                if (Config.isDebugging) {
                    this.destroyDebug();
                    this.drawDebug();
                }
            }
        }, this)
    }

    private drawGrid() {
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
        let tiles = this.cache.json.get('itemData');
        for (let y = 0; y < this.shipArray.length; y++) {
            for (let x = 0; x < this.shipArray[y].length; x++){            
                if (this.shipArray[y][x] === 1) {
                    let worldX = x * Constants.tileSize + (Constants.tileSize / 2) - offsetX;
                    let worldY = y * Constants.tileSize + (Constants.tileSize / 2) - offsetY
                    let tile = new Tile(this, worldX, worldY, 'shipTiles', tiles[1]);
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

    private destroyDebug() {        
        if (this.debugObjects) {
            for (var i = 0; i < this.debugObjects.length; i++) {
                this.debugObjects[i].destroy();
            }
            this.debugObjects = null;
        }
    }

    private getTileCoordinates(x: number, y: number): Phaser.Geom.Point {   
        let offset = Constants.tileSize / 2;  
        return new Phaser.Geom.Point(Math.floor((x + offset) / Constants.tileSize), Math.floor((y + offset) / Constants.tileSize))
    }

    private clearBuildingTiles() {
        for (var i = 0; i < this.buildingTiles.length; i++) {
            this.buildingTiles[i].destroy();
        }
        this.buildingTiles = [];
        this.isBuilding = false;
    }

    private createBuildTiles(xTilesCount: integer, yTilesCount: integer) {
        // Reset build tiles
        for (let x = 1; x < this.buildingTiles.length; x++) {
            this.buildingTiles[x].destroy();
        }
        this.buildingTiles.length = 1;

        // Recreate all build tiles
        let startLoopX = xTilesCount >= 0 ? 0 : xTilesCount;
        let startLoopY = yTilesCount >= 0 ? 0 : yTilesCount;
        let endLoopX = xTilesCount >= 0 ? xTilesCount : 0;
        let endLoopY = yTilesCount >= 0 ? yTilesCount : 0;
        let originX = this.buildingTiles[0].x;
        let originY = this.buildingTiles[0].y;
        for (let y = startLoopY; y <= endLoopY; y++) {
            for (let x = startLoopX; x <= endLoopX; x++) {
                if (!(y === 0 && x === 0)) {
                    let tileX = originX + Constants.tileSize * x;
                    let tileY = originY + Constants.tileSize * y;
                    let newTile = new Tile(this, tileX, tileY, 'shipTiles', this.buildingTiles[0].item, true);
                    newTile.alpha = 0.9;
                    if (this.ship.filter((s: Tile) => s.location.x === newTile.location.x
                        && s.location.y === newTile.location.y).length <= 0) {
                        this.buildingTiles.push(newTile);
                        this.add.existing(newTile);
                    }
                }
            }
        }
    }
}
