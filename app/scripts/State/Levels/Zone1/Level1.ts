/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone1Level1 extends Level {
        nextLevel: string = Levels.Zone1Level2.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('zone', 'assets/images/levels/zone1.png');
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}