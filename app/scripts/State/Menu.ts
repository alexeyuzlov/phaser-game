module Sample.State {
    export class Menu extends Phaser.State {
        background:Phaser.Sprite;

        create() {
            this.background = this.add.sprite(80, 0, 'menu-background');
        }

        update() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start('zone1level1');
            }
        }
    }
}