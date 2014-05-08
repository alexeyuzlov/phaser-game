/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone2Level1 extends Level {
        currentLevel: Levels = Levels.Zone2Level1;
        nextLevel: string = Levels.Zone2Level2.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('zone', 'assets/images/levels/zone2.png');
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}