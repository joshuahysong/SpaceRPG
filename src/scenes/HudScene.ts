import { SceneBase } from './SceneBase';
import { Config } from './../config';

export default class HudScene extends SceneBase {
    constructor() {
        super({ key: 'HudScene' });
    }

    private buttonFont: object = { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' };

    public create() {
        let buttonWidth = 150;
        let buttonHeight = 40;
        var button = this.add.rectangle(0, 0, buttonWidth, buttonHeight);
        button.setFillStyle(Phaser.Display.Color.HexStringToColor('#333333').color);
        button.setStrokeStyle(1, Phaser.Display.Color.HexStringToColor('#666666').color);
        var buttonText = this.add.text(0, 0, 'Build', this.buttonFont);
        buttonText.setOrigin(0.5);
        var container = this.add.container(buttonWidth / 2, window.innerHeight - buttonHeight / 2, [ button, buttonText ]);    
        container.setSize(buttonWidth, buttonHeight);    
        container.setInteractive({ cursor: 'pointer' });
        container.on('pointerdown', function() {
            this.events.emit('buildButton');
        }, this)
    }
}
