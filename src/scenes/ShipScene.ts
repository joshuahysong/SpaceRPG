import { SceneBase } from './SceneBase';
import { Config } from './../config';
import { Constants } from './../constants';
import { Tile } from './../Tile';

export default class ShipScene extends SceneBase {
    constructor() {
        super({ key: 'ShipScene' })
    }

    private oldPointerPosition: Phaser.Math.Vector2;
    private pinch: any;
    private pinchZoom: number = 1;
    private debugObjects: Array<any>;
    private isHudPointerDown: boolean = false;
    private isBuilding: boolean = false;
    private isBuildingTileAllowed: boolean = false;
    private buildingTiles: Array<Tile>;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private shipArray: Array<Array<integer>> = [[0,1,0,0,0,0,0],
                                                [1,1,1,1,1,1,1],
                                                [0,1,0,0,0,0,0]];
    private ship: Array<Tile>;

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
            this.pinch = pinchScene.rexGestures.add.pinch();
            this.pinch.enable;
            this.pinch.on('pinch', function(pinch: any) {
                this.pinchZoom *= pinch.scaleFactor;
                this.pinchZoom = this.pinchZoom > zoomInStop ? zoomInStop : this.pinchZoom < zoomOutStop ? zoomOutStop : this.pinchZoom;
                this.cameras.main.zoomTo(this.pinchZoom, 0);
            }, this);
        }
        else {
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
                let tiles = this.cache.json.get('testjson');
                let tileToBuild = tiles.filter(function(tile: any) { return tile.id === tileId })
                if (tileToBuild && tileToBuild.length === 1) {
                    this.buildingTiles = [];
                    let outsideBoundsCoordinates = (Constants.worldSize + 1) * Constants.tileSize;
                    let newTile = new Tile(this, outsideBoundsCoordinates, outsideBoundsCoordinates, 'shipTiles', tileToBuild[0].frame);
                    newTile.alpha = 0.5;
                    this.buildingTiles.push(newTile)
                    this.add.existing(newTile);
                    this.isBuilding = true;
                }
        }, this); 
        this.input.on('pointerup', function() {
            this.isHudPointerDown = false;
        }, this)
    }

    private bindTileEvents() {
        this.input.on('pointermove', function (pointer: any) {
            if (this.isBuilding && this.buildingTiles) {
                let worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                let tileCoordinates = this.getTileCoordinates(worldPoint.x, worldPoint.y);
                let tileX = tileCoordinates.x * Constants.tileSize;
                let tileY = tileCoordinates.y * Constants.tileSize;
                // If pointerdown then we are dragging so make a line
                if (pointer.isDown) {
                    this.isHudPointerDown = true;
                    // Add new square if needed
                    if (this.buildingTiles.filter((s: Tile) => s.location.x === tileCoordinates.x
                            && s.location.y === tileCoordinates.y).length <= 0) {
                        let currentFrame = this.buildingTiles[0].frame.name;
                        let newTile = new Tile(this, tileX, tileY, 'shipTiles', currentFrame);
                        newTile.alpha = 0.5;
                        if (this.ship.filter((s: Tile) => s.location.x === tileCoordinates.x
                            && s.location.y === tileCoordinates.y).length > 0) {
                            newTile.tint = Phaser.Display.Color.HexStringToColor('#ff0000').color;
                        }
                        this.buildingTiles.push(newTile);
                        this.add.existing(newTile);
                    }
                } else {
                    this.buildingTiles[0].x = tileX;
                    this.buildingTiles[0].y = tileY;
                    this.buildingTiles[0].updateLocation();
                    if (this.ship.filter((s: Tile) => s.location.x === tileCoordinates.x
                        && s.location.y === tileCoordinates.y).length > 0) {
                        this.isBuildingTileAllowed = false;
                        this.buildingTiles[0].tint = Phaser.Display.Color.HexStringToColor('#ff0000').color;
                    } else {
                        this.isBuildingTileAllowed = true;
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
        this.input.on('pointerup', function(pointer: any) {
            this.isHudPointerDown = false;
            if (this.isBuilding && this.buildingTiles) {
                if (this.isBuildingTileAllowed) {
                    for (let i = 0; i < this.buildingTiles.length; i++) {
                        if (this.ship.filter((s: Tile) => s.x === this.buildingTiles[i].x
                            && s.y === this.buildingTiles[i].y).length <= 0) {
                            let newTile = new Tile(this,
                                this.buildingTiles[i].x,
                                this.buildingTiles[i].y,
                                this.buildingTiles[i].texture.key,
                                this.buildingTiles[i].frame.name);
                            this.add.existing(newTile);
                            this.ship.push(newTile);
                        }
                    }
                    for (let x = 0; x < this.buildingTiles.length; x++) {
                        if (x !== this.buildingTiles.length - 1) {
                            this.buildingTiles[x].destroy();
                        }
                    }
                    this.buildingTiles = [this.buildingTiles[this.buildingTiles.length - 1]];
                    if (Config.isDebugging) {
                        this.destroyDebug();
                        this.drawDebug();
                    }
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
        for (let y = 0; y < this.shipArray.length; y++) {
            for (let x = 0; x < this.shipArray[y].length; x++){            
                if (this.shipArray[y][x] === 1) {
                    let worldX = x * Constants.tileSize + (Constants.tileSize / 2) - offsetX;
                    let worldY = y * Constants.tileSize + (Constants.tileSize / 2) - offsetY
                    let tile = new Tile(this, worldX, worldY, 'shipTiles', 'hull');
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
}
