module Sample.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('menu-background', 'assets/images/menu-background.png');

            this.load.atlasXML('player', 'assets/images/prefabs/player.png', 'assets/images/prefabs/player.xml');

            this.load.image('runner', 'assets/images/prefabs/runner.png');
            this.load.image('flier', 'assets/images/prefabs/flier.png');
            this.load.image('shooter', 'assets/images/prefabs/shooter.png');
            this.load.image('bullet', 'assets/images/prefabs/bullet.png');

            this.load.image('hud', 'assets/images/prefabs/hud.png');
        }

        create() {
            this.game.state.start(Levels.Zone2Level1.toString());
        }
    }
}