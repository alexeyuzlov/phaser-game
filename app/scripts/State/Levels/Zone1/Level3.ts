module Sample.State {

    export class Zone1Level3 extends Zone1 {
        currentLevel: Levels = Levels.Zone1Level3;
        nextLevel: string = Levels.Zone2Level1.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet('snowflake', 'assets/images/snowflake.png', 16, 16);
        }

        create() {
            super.create();
            this.rainCreate();
        }

        update() {
            super.update();
        }
    }
}