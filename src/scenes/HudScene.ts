import { SceneBase } from './SceneBase';
import { Config } from './../config';
import { Tile } from './../Tile'
import { IFontStyle } from './../contracts/IFontStyle'

export default class HudScene extends SceneBase {
    constructor() {
        super({ key: 'HudScene' });
    }

    public elementIsHovered: boolean = false;

    private isMenuOpen: boolean = false;
    private menuFont: IFontStyle = { fontFamily: 'Arial', fontSize: 16, color: '#ffffff' };
    private itemFont: IFontStyle = { fontFamily: 'Arial', fontSize: 12, color: '#ffffff' }
    private menuButtonWidth: integer;
    private menuButtonHeight: integer;
    private menuButtons: Array<Phaser.GameObjects.Container> = [];
    private itemButtons: Array<Phaser.GameObjects.Container> = [];

    public create() {
        this.createMenuButton();
        this.createItemButton();
    }

    private createMenuButton() {
        this.menuButtonWidth = 150;
        this.menuButtonHeight = 40;
        let fillColor = Phaser.Display.Color.HexStringToColor('#222222').color
        let hoverColor = Phaser.Display.Color.HexStringToColor('#333333').color
        var button = this.add.rectangle(0, 0, this.menuButtonWidth, this.menuButtonHeight);
        button.setFillStyle(fillColor);
        button.setStrokeStyle(1, Phaser.Display.Color.HexStringToColor('#333333').color);
        var buttonText = this.add.text(0, 0, 'Build', { fontFamily: this.menuFont.fontFamily, fontSize: this.menuFont.fontSize, color: this.menuFont.color });
        buttonText.setOrigin(0.5);
        var container = this.add.container(
            this.menuButtonWidth / 2, window.innerHeight - this.menuButtonHeight / 2, [ button, buttonText ]);    
        container.setSize(this.menuButtonWidth, this.menuButtonHeight);    
        container.setInteractive({ cursor: 'pointer' });
        container.on('pointerover', function() {
            this.list[0].fillColor = hoverColor;
        });
        container.on('pointerout', function() {
            this.list[0].fillColor = fillColor;
        });
        container.on('pointerdown', function() {
            this.events.emit('hudPointerDown', true);
            this.isMenuOpen = !this.isMenuOpen
            for (let i = 0; i < this.itemButtons.length; i++) {
                this.itemButtons[i].setActive(this.isMenuOpen);
                this.itemButtons[i].setVisible(this.isMenuOpen);
            }
        }, this);
        container.on('pointerup', function() {
            this.events.emit('hudPointerDown', false);
        }, this);
        this.menuButtons.push(container);
    }

    private createItemButton() {
        let tiles = this.cache.json.get('testjson');
        let margin = 10;
        let padding = 10;    
        let itemSize = 42;
        let buttonHeight = itemSize + padding * 2 + this.itemFont.fontSize; 
        let buttonWidth = buttonHeight;
        let fillColor = Phaser.Display.Color.HexStringToColor('#222222').color;
        let hoverColor = Phaser.Display.Color.HexStringToColor('#333333').color;
        let tileY = (buttonHeight / 2 * -1) + itemSize / 2 + padding;
        let textY = tileY + itemSize / 2 + this.itemFont.fontSize / 2 + padding / 2;
        for (let i = 0; i < tiles.length; i++) {
            let button = this.add.rectangle(0, 0, buttonWidth, buttonHeight);
            button.setFillStyle(fillColor);      
            button.setStrokeStyle(1, Phaser.Display.Color.HexStringToColor('#333333').color); 
            button.alpha = 0.75;
            let tile = new Tile(this, 0, tileY, 'shipTiles', tiles[i].frame);
            tile.setOrigin(0.5);
            tile.displayWidth = itemSize;
            tile.scaleY = tile.scaleX;
            var buttonText = this.add.text(0, textY, tiles[i].name, 
                { fontFamily: this.itemFont.fontFamily, fontSize: this.itemFont.fontSize, color: this.itemFont.color });
            buttonText.setOrigin(0.5);
            let containerX = (buttonWidth / 2 + this.menuButtonWidth + margin) + (i * (buttonWidth + margin));
            var container = this.add.container(
                containerX, (window.innerHeight - buttonHeight / 2) - margin, 
                [ button, tile, buttonText ]);
            container.setSize(buttonWidth, buttonHeight);    
            container.setInteractive({ cursor: 'pointer' });
            container.on('pointerover', function() {
                this.list[0].fillColor = hoverColor;
            });
            container.on('pointerout', function() {
                this.list[0].fillColor = fillColor;
            });
            container.on('pointerdown', function() {
                this.events.emit('buildButton', tiles[i].id);
                this.events.emit('hudPointerDown', true);
            }, this);
            container.setActive(false);
            container.setVisible(false);
            this.itemButtons.push(container);
        }
    }
}
