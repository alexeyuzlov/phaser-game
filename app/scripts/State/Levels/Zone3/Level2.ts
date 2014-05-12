/// <reference path='Zone3.ts'/>

module Sample.State {

    export class Zone3Level2 extends Zone3 {
        currentLevel: Levels = Levels.Zone3Level2;
        nextLevel: string = Levels.Zone3Level3.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/3-2.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}