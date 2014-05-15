module Sample.Prefab {

    export class MessageBox extends Phaser.Sprite {
        contentText: string = "Hello world";
        contentState: Phaser.Text;

        textStyle = {
            font: "20px Arial",
            fill: "#cdcdcd"
        };

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'messageBox');

            this.fixedToCamera = true;

            this.contentState = this.game.add.text(this.x + 550, this.y + 8, this.contentText, this.textStyle);
            this.addChild(this.contentState);

            game.add.existing(this);
        }

        setContentState(content: string) {
            this.contentState.text = content;
        }
    }
}