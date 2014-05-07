module Sample.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('menu-background', 'assets/images/menu-background.png');

            this.load.spritesheet('playerBIG', 'assets/images/prefabs/playerBIG.png', 52, 128, 4);
            this.load.spritesheet('player', 'assets/images/prefabs/player.png', 26, 64, 4);
            this.load.image('weapon', 'assets/images/prefabs/weapon.png');

            this.load.image('runner', 'assets/images/prefabs/runner.png');
            this.load.image('flier', 'assets/images/prefabs/flier.png');

            this.load.image('shooter', 'assets/images/prefabs/shooter.png');
            this.load.image('bullet', 'assets/images/prefabs/bullet.png');
        }

        create() {
            this.game.state.start(Levels.Zone1Level1.toString());
        }
    }
}