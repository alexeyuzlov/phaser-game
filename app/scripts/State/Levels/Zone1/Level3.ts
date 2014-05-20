module Sample.State {

    export class Zone1Level3 extends Zone1 {
        currentLevel: Levels = Levels.Zone1Level3;
        nextLevel: string = Levels.Zone2Level1.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet('snowflake', 'assets/images/snowflake.png', 16, 16);
        }

        createSnowFlakes() {
            var emitter = this.game.add.emitter(this.game.world.centerX, 0, 500);

            emitter.width = this.game.world.width;

            emitter.makeParticles('snowflake');

            emitter.minParticleScale = 0.2;
            emitter.maxParticleScale = 1.5;
            emitter.gravity = 5;

            emitter.setYSpeed(5, 10);
            emitter.setXSpeed(-15, 15);

            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            emitter.start(false, 20000, 200, 0);
        }

        create() {
            super.create();
            this.game.stage.backgroundColor = "#333333";

            this.createSnowFlakes();
        }

        update() {
            super.update();
        }
    }
}