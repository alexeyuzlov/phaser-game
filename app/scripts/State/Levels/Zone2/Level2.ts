module Sample.State {

    export class Zone2Level2 extends Zone2 {
        currentLevel: string = Levels[Levels.Zone2Level2];
        nextLevel:string = Levels[Levels.Zone2Level3];

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/2-2.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}