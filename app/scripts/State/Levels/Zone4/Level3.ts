/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone4Level3 extends Level {
        currentLevel: Levels = Levels.Zone4Level3;
        nextLevel: string = 'gameOver'; // TODO: change something here...

        preload() {
            this.game.load.tilemap('map', 'assets/levels/4-3.json', null, Phaser.Tilemap.TILED_JSON);
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