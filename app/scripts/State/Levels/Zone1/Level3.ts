module Sample.State {

    export class Zone1Level3 extends Zone1 {
        currentLevel: string = Levels[Levels.Zone1Level3];
        nextLevel:string = Stories[Stories.Story2];

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
            this.rainCreate();
        }

        update() {
            super.update();
        }
    }
}