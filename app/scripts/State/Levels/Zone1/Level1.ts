module Sample.State {

    export class Zone1Level1 extends Zone1 {

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}