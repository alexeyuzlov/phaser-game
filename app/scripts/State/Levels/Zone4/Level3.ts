module Sample.State {

    export class Zone4Level3 extends Zone4 {
        currentLevel: string = Levels[Levels.Zone4Level3];
        nextLevel: string = 'gameOver'; // TODO: change something here...

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/4-3.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}