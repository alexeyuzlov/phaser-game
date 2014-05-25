module Sample.State {

    export class Zone3Level1 extends Zone3 {
        currentLevel: string = Levels[Levels.Zone3Level1];
        nextLevel:string = Levels[Levels.Zone3Level2];

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/3-1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}