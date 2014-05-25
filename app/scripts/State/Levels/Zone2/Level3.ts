module Sample.State {

    export class Zone2Level3 extends Zone2 {
        currentLevel: string = Levels[Levels.Zone2Level3];
        nextLevel:string = Stories[Stories.Story3];

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/2-3.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}