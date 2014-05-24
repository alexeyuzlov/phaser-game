module Sample.State {
    export class Preload extends Phaser.State {
        private preloadBar:Phaser.Sprite;

        preload() {
            this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('menu-background', 'assets/images/menu-background.png');

            this.load.atlasXML('player', 'assets/images/prefabs/player/player.png', 'assets/images/prefabs/player/player.xml');

            this.load.image('ground', 'assets/images/ground.png');

            this.load.image('platform-h', 'assets/images/prefabs/platform-h.png');
            this.load.image('platform-v', 'assets/images/prefabs/platform-v.png');

            this.load.image('bottle-hp', 'assets/images/prefabs/bottles/bottle-hp.png');
            this.load.image('bottle-mp', 'assets/images/prefabs/bottles/bottle-mp.png');
            this.load.image('bottle-super', 'assets/images/prefabs/bottles/bottle-super.png');

            //this.load.image('transparent', 'assets/images/prefabs/transparent-debug.png');
            this.load.image('transparent', 'assets/images/prefabs/transparent.png');
            this.load.image('exit', 'assets/images/prefabs/exit.png');
            this.load.image('spike', 'assets/images/prefabs/spike.png');
            this.load.image('iceSpike', 'assets/images/prefabs/iceSpike.png');

            this.load.image('runner', 'assets/images/prefabs/enemies/runner.png');
            this.load.image('flier', 'assets/images/prefabs/enemies/flier.png');
            this.load.image('shooter', 'assets/images/prefabs/enemies/shooter.png');
            this.load.image('bullet', 'assets/images/prefabs/enemies/bullet.png');

            this.load.image('hud', 'assets/images/prefabs/hud.png');
        }

        create() {
            this.game.state.start(settings.storage.getCurrentLevel());
        }
    }
}