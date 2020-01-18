import { Scene } from 'phaser'

export default class DebugScene extends Scene {
    constructor() {
        super({ key: 'DebugScene', active: true });
    }

    worldCamera: Phaser.Cameras.Scene2D.Camera;
    cameraText: Phaser.GameObjects.Text;
    mouseText: Phaser.GameObjects.Text;

    public preload() {        
        //this.scene.sleep('DebugScene');
    }

    public create() {
        this.worldCamera = this.scene.get('ShipScene').cameras.main; 
        this.drawStartingText();
        this.bindEvents();
    }

    public update() {
        let cameraBounds = this.worldCamera.getBounds()   ;  
        this.cameraText.setText([
            '---- Camera ----',
            'Size: ' + cameraBounds.width + ', ' + cameraBounds.height,
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
    }

    private drawStartingText() {
        let debugFont = { fontFamily: 'Monospace', fontSize: 12, color: '#ffffff' }
        this.cameraText = this.add.text(0, 0, ['Camera', 'Center: 0, 0', 'Zoom: 0'], debugFont);
        this.mouseText = this.add.text(200, 0, ['---- Mouse ----', 'Screen: 0, 0', 'World: 0, 0'], debugFont);
    }
}
