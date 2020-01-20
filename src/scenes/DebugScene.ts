import { SceneBase } from './SceneBase';
import { Config } from './../config';

export default class DebugScene extends SceneBase {
    constructor() {
        super({ key: 'DebugScene' });
    }

    worldCamera: Phaser.Cameras.Scene2D.Camera;
    cameraText: Phaser.GameObjects.Text;
    mouseText: Phaser.GameObjects.Text;
    pointerText: Phaser.GameObjects.Text;
    debugFont: object = { fontFamily: 'Monospace', fontSize: 12, color: '#ffffff' };
    tileCoordinates: Phaser.Geom.Point;

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
        if (this.sys.game.device.os.desktop) {
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
        if (!this.sys.game.device.os.desktop) {
            if (this.pointerText) {
                this.pointerText.destroy();
            }
            let pointerTextContent = ['---- Pointers ----']
            if (this.input.activePointer.isDown) {
                pointerTextContent.push('activePointer');
            }
            if (this.input.mousePointer.isDown) {
                pointerTextContent.push('mousePointer');
            }
            if (this.input.pointer1.isDown) {
                pointerTextContent.push('pointer1');
            }
            if (this.input.pointer2.isDown) {
                pointerTextContent.push('pointer2');
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
        if (this.sys.game.device.os.desktop) {
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
