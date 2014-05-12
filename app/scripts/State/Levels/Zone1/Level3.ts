/// <reference path='Zone1.ts'/>

module Sample.State {

    export class Zone1Level3 extends Zone1 {
        currentLevel: Levels = Levels.Zone1Level3;
        nextLevel: string = Levels.Zone2Level1.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}