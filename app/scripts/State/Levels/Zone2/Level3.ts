/// <reference path='Zone2.ts'/>

module Sample.State {

    export class Zone2Level3 extends Zone2 {
        currentLevel: Levels = Levels.Zone2Level3;
        nextLevel: string = Levels.Zone3Level1.toString();

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