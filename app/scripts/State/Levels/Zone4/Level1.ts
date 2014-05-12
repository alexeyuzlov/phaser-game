/// <reference path='Zone4.ts'/>

module Sample.State {

    export class Zone4Level1 extends Zone4 {
        currentLevel: Levels = Levels.Zone4Level1;
        nextLevel: string = Levels.Zone4Level2.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}