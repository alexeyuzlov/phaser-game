module Sample.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('menu-background', 'assets/images/menu-background.png');

            this.load.image('player', 'assets/images/player.png');

            this.load.image('runner', 'assets/images/runner.png');
            this.load.image('flier', 'assets/images/flier.png');
            this.load.image('bullet', 'assets/images/bullet.png');
            this.load.image('shooter', 'assets/images/shooter.png');

        }

        create() {
            this.game.state.start('level1');
        }
    }
}