module Sample.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('menu-background', 'assets/images/menu-background.png');

            this.load.image('ground', 'assets/images/ground.png');
            this.load.image('exit', 'assets/images/prefabs/exit.png');
            this.load.image('spike', 'assets/images/prefabs/spike.png');

            this.load.atlasXML('player', 'assets/images/prefabs/player/player.png', 'assets/images/prefabs/player/player.xml');

            this.load.image('iceSpike', 'assets/images/prefabs/iceSpike.png');

            this.load.image('runner', 'assets/images/prefabs/runner.png');
            this.load.image('flier', 'assets/images/prefabs/flier.png');
            this.load.image('shooter', 'assets/images/prefabs/shooter.png');
            this.load.image('bullet', 'assets/images/prefabs/bullet.png');

            this.load.image('hud', 'assets/images/prefabs/hud.png');
            this.load.image('messageBox', 'assets/images/prefabs/messageBox.png');
        }

        create() {
            this.game.state.start(Levels.Zone1Level1.toString());
        }
    }
}