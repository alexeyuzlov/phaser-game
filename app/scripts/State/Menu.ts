module Sample.State {
    export class Menu extends Phaser.State {
        preload() {

        }

        create() {
            this.game.stage.backgroundColor = '#000000';
        }

        update() {
            //if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start(settings.storage.getCurrentLevel());
            //}
        }
    }
}