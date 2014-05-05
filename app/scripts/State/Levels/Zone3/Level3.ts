/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone3Level3 extends Level {
        nextLevel: string = Levels.Zone4Level1.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/3-3.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('zone', 'assets/images/levels/zone3.png');
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}