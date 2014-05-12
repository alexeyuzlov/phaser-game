/// <reference path='Zone2.ts'/>

module Sample.State {

    export class Zone2Level1 extends Zone2 {
        currentLevel: Levels = Levels.Zone2Level1;
        nextLevel: string = Levels.Zone2Level2.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}