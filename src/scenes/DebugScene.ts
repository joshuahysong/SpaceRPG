import { SceneBase } from './SceneBase';

export default class DebugScene extends SceneBase {
    constructor() {
        super({ key: 'DebugScene' });
    }

    worldCamera: Phaser.Cameras.Scene2D.Camera;
    cameraText: Phaser.GameObjects.Text;
    mouseText: Phaser.GameObjects.Text;

    public create() {
        this.worldCamera = this.scene.get('ShipScene').cameras.main;
        this.drawStartingText();
        this.drawCameraCenter();
        this.bindEvents();
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
    }

    private bindEvents() {
        if (this.sys.game.device.os.desktop) {
            this.input.on('pointermove', function (pointer: any) {
                let worldPosition = this.worldCamera.getWorldPoint(pointer.x, pointer.y);
                this.mouseText.setText([
                    '---- Mouse ----',
                    'Screen: ' + Math.round(pointer.x) + ', ' + Math.round(pointer.y),
                    'World: ' + Math.round(worldPosition.x) + ', ' + Math.round(worldPosition.y)
                ]);
            }, this); 
        }   
        // Tile Coordinates Listener
        this.scene.get('ShipScene').events.on('tileCoordinates', 
            function (coordinates: Phaser.Geom.Point) {
                let currentText = [this.mouseText.text];
                currentText.push('Tile: ' + coordinates.x + ', ' + coordinates.y);
                this.mouseText.setText(currentText);
        }, this); 
    }

    private drawStartingText() {
        let debugFont = { fontFamily: 'Monospace', fontSize: 12, color: '#ffffff' }
        this.cameraText = this.add.text(0, 0, ['Camera', 'Center: 0, 0', 'Zoom: 0'], debugFont);
        this.mouseText = this.add.text(200, 0, ['---- Mouse ----', 'Screen: 0, 0', 'World: 0, 0'], debugFont);
    }

    private drawCameraCenter() {
        let bounds = this.worldCamera.getBounds();
        let targetWidth = bounds.width;
        let targetHeight = bounds.height;
        this.drawLine(this.worldCamera.centerX, targetHeight / 2 * -1, this.worldCamera.centerX, targetHeight / 2, '#ff0000', 0.25);
        this.drawLine(targetWidth / 2 * -1, this.worldCamera.centerY, targetWidth / 2, this.worldCamera.centerY, '#ff0000', 0.25);
    }
}
