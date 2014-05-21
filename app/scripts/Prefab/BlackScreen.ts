module Sample.Prefab {
    export class BlackScreen extends Phaser.Sprite {
        text:Phaser.Text;

        constructor(level:State.AbstractZone) {
            var blackTexture = level.game.add.bitmapData(level.game.width, level.game.height);
            blackTexture.ctx.beginPath();
            blackTexture.ctx.rect(0, 0, level.game.width, level.game.height);
            blackTexture.ctx.fillStyle = '#000000';
            blackTexture.ctx.fill();

            super(level.game, 0, 0, blackTexture);

            this.alpha = 1;
            this.fixedToCamera = true;

            this.text = level.game.add.text(10, level.game.height - 30, "", settings.font.whiteBig);
            this.addChild(this.text);

            level.game.add.existing(this);
        }

        setText(text: string) {
            this.text.text = text;
        }
    }
}