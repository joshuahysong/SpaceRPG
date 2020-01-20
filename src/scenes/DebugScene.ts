import { SceneBase } from './SceneBase';
import { Config } from './../config';

export default class DebugScene extends SceneBase {
    constructor() {
        super({ key: 'DebugScene' });
    }

    private worldCamera: Phaser.Cameras.Scene2D.Camera;
    private cameraText: Phaser.GameObjects.Text;
    private mouseText: Phaser.GameObjects.Text;
    private pointerText: Phaser.GameObjects.Text;
    private debugFont: object = { fontFamily: 'Monospace', fontSize: 12, color: '#ffffff' };
    private tileCoordinates: Phaser.Geom.Point;

    private oldPointerPosition: Phaser.Math.Vector2;
    private oldPointer2Position: Phaser.Math.Vector2;

    public create() {
        this.worldCamera = this.scene.get('ShipScene').cameras.main;
        this.drawStartingText();
        this.drawCameraCenter();
        this.bindEvents();
        this.input.addPointer(1);
    }

    public update() {
        let cameraBounds = this.worldCamera.getBounds();  
        this.cameraText.setText([
            '---- Camera ----',
            'Size: ' + cameraBounds.width + ', ' + cameraBounds.height,
            'View: ' + Math.round(this.worldCamera.worldView.width) + ', ' + Math.round(this.worldCamera.worldView.height),
            'Center: ' + Math.round(this.worldCamera.worldView.centerX) + ', ' + Math.round(this.worldCamera.worldView.centerY),
            'Zoom: ' + this.worldCamera.zoom.toFixed(2)
        ]);
        if (!Config.isMobile) {
            let worldPosition = this.worldCamera.getWorldPoint(this.input.activePointer.x, this.input.activePointer.y);
            let mouseTextContent = [
                '---- Mouse ----',
                'Screen: ' + Math.round(this.input.activePointer.x) + ', ' + Math.round(this.input.activePointer.y),
                'World: ' + Math.round(worldPosition.x) + ', ' + Math.round(worldPosition.y)
            ]
            if (this.tileCoordinates) {
                mouseTextContent.push('Tile: ' + this.tileCoordinates.x + ', ' + this.tileCoordinates.y);
            }
            this.mouseText.setText(mouseTextContent);
        }
        if (Config.isMobile) {
            if (this.pointerText) {
                this.pointerText.destroy();
            }
            let pointerTextContent = ['---- Pointers ----']
            if (this.input.activePointer.isDown) {
                pointerTextContent.push('activePointer: ' +
                    Math.round(this.input.activePointer.position.x) + ', ' +
                    Math.round(this.input.activePointer.position.y));
            }
            if (this.input.pointer1.isDown) {
                pointerTextContent.push('pointer1: ' +
                    Math.round(this.input.pointer1.position.x) + ', ' +
                    Math.round(this.input.pointer1.position.y));
            }
            if (this.input.pointer2.isDown) {
                pointerTextContent.push('pointer2: ' +
                    Math.round(this.input.pointer2.position.x) + ', ' +
                    Math.round(this.input.pointer2.position.y));
            }
            this.pointerText = this.add.text(200, 0, pointerTextContent, this.debugFont);
        }
    }

    private bindEvents() {
        this.scene.get('ShipScene').events.on('tileCoordinates', 
            function (coordinates: Phaser.Geom.Point) {
                this.tileCoordinates = coordinates;
        }, this); 
    }

    private drawStartingText() {
        this.cameraText = this.add.text(0, 0, ['Camera', 'Center: 0, 0', 'Zoom: 0'], this.debugFont);
        if (!Config.isMobile) {
            this.mouseText = this.add.text(200, 0, ['---- Mouse ----', 'Screen: 0, 0', 'World: 0, 0', 'Tile: 0, 0'], this.debugFont);
        } else {
            this.pointerText = this.add.text(200, 0, '---- Pointer ----', this.debugFont);
        }
    }

    private drawCameraCenter() {
        let bounds = this.worldCamera.getBounds();
        let targetWidth = bounds.width;
        let targetHeight = bounds.height;
        this.drawLine(this.worldCamera.centerX, targetHeight / 2 * -1, this.worldCamera.centerX, targetHeight / 2, '#ff0000', 0.25);
        this.drawLine(targetWidth / 2 * -1, this.worldCamera.centerY, targetWidth / 2, this.worldCamera.centerY, '#ff0000', 0.25);
    }
}
