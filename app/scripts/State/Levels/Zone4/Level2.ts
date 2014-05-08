/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone4Level2 extends Level {
        currentLevel: Levels = Levels.Zone4Level2;
        nextLevel: string = Levels.Zone4Level3.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/4-2.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('zone', 'assets/images/levels/zone4.png');
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}