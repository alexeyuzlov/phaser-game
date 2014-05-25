module Sample.State {

    export class Zone1Level2 extends Zone1 {
        currentLevel: string = Levels[Levels.Zone1Level2];
        nextLevel:string = Levels[Levels.Zone1Level3];

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-2.json', null, Phaser.Tilemap.TILED_JSON);
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