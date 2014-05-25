module Sample.State {

    export class Zone3Level3 extends Zone3 {
        currentLevel: string = Levels[Levels.Zone3Level3];
        nextLevel:string = Stories[Stories.Story4];

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/3-3.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}