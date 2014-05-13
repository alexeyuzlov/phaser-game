module Sample.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('menu-background', 'assets/images/menu-background.png');

            this.load.atlasXML('player', 'assets/images/prefabs/player/player.png', 'assets/images/prefabs/player/player.xml');
            this.load.image('exitDoor', 'assets/images/prefabs/exitDoor.png');

            this.load.image('barb', 'assets/images/prefabs/barb.png');
            this.load.image('ice', 'assets/images/prefabs/ice.png');

            this.load.image('runner', 'assets/images/prefabs/runner.png');
            this.load.image('flier', 'assets/images/prefabs/flier.png');
            this.load.image('shooter', 'assets/images/prefabs/shooter.png');
            this.load.image('bullet', 'assets/images/prefabs/bullet.png');

            this.load.image('hud', 'assets/images/prefabs/hud.png');
        }

        create() {
            this.game.state.start(Levels.Zone1Level1.toString());
        }
    }
}