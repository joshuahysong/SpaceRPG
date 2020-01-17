import { Scene } from 'phaser'

export default class HudScene extends Scene {
    constructor() {
        super({ key: 'HudScene', active: true });
    }

    debugText: Phaser.GameObjects.Text;

    public preload() {
    }

    public create() {
        this.drawDebugMouseText();
        this.bindEvents();
    }

    private bindEvents() {
        let worldCamera = this.scene.get('ShipScene').cameras.main;
        this.input.on('pointermove', function (pointer: any) {
            let worldPosition = worldCamera.getWorldPoint(pointer.x, pointer.y);
            this.debugText.setText([
                'Mouse',
                'Screen: ' + Math.round(pointer.x) + ', ' + Math.round(pointer.y),
                'World: ' + Math.round(worldPosition.x) + ', ' + Math.round(worldPosition.y)
            ]);
        }, this);
    }

    private drawDebugMouseText() {
        this.debugText = this.add.text(0, 0, ['Mouse', 'Screen: 0, 0', 'World: 0, 0'], { font: 'Arial 12' });
    }
}
