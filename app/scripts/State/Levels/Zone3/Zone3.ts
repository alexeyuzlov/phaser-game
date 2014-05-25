module Sample.State {

    export class Zone3 extends AbstractZone {

        preload() {
            super.preload();
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

            this.player.body.drag.x = 10;
            this.createSnowFlakes();
        }

        update() {
            super.update();
        }
    }
}