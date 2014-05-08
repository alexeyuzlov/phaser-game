/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone4Level1 extends Level {
        currentLevel: Levels = Levels.Zone4Level1;
        nextLevel: string = Levels.Zone4Level2.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
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