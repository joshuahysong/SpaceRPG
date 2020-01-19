export class SceneBase extends Phaser.Scene {

    isDebugging: boolean;

    public drawLine(x1: number, 
        y1: number, 
        x2: number, 
        y2: number, 
        colorHex?: string, 
        alpha?: number, 
        thickness?: number) : Phaser.GameObjects.Graphics {        
            colorHex = colorHex || '#ffffff';
            alpha = alpha || 1;
            thickness = thickness || 1;
            let graphics = this.add.graphics();
            let color = Phaser.Display.Color.HexStringToColor(colorHex).color;
            graphics.lineStyle(thickness, color, alpha);
            graphics.lineBetween(x1, y1, x2, y2);
            return graphics;
    }
}