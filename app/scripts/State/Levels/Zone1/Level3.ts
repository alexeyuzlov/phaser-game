/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone1Level3 extends Level {
        currentLevel: Levels = Levels.Zone1Level3;
        nextLevel: string = Levels.Zone2Level1.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
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