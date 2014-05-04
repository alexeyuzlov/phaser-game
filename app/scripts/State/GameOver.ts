module Sample.State {
    export class GameOver extends Phaser.State {
        background:Phaser.Sprite;

        create() {
            this.background = this.add.sprite(80, 0, 'menu-background');
        }
    }
}