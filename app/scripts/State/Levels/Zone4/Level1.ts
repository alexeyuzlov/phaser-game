module Sample.State {

    export class Zone4Level1 extends Zone4 {

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();

            this.player.x = 36;
            this.player.y = this.game.world.height - 97;
        }

        update() {
            super.update();
        }
    }
}