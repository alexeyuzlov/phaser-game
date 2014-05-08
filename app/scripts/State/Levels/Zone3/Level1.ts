/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone3Level1 extends Level {
        currentLevel: Levels = Levels.Zone3Level1;
        nextLevel: string = Levels.Zone3Level2.toString();

        preload() {
            this.game.load.tilemap('map', 'assets/levels/3-1.json', null, Phaser.Tilemap.TILED_JSON);
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