module Sample.State {

    export class Zone1Level2 extends Zone1 {
        currentLevel:Levels = Levels.Zone1Level2;
        nextLevel:string = Levels.Zone1Level3.toString();

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/1-2.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.spritesheet('rain', 'assets/images/rain.png', 8, 8);
        }

        rainCreate() {
            var emitter = this.game.add.emitter(this.game.world.centerX, 0, 1000);

            emitter.width = this.game.world.width + this.game.world.width * 0.2;
            emitter.angle = 20;

            emitter.makeParticles('rain');

            emitter.minParticleScale = 0.2;
            emitter.maxParticleScale = 0.7;

            emitter.setYSpeed(100, 700);
            emitter.setXSpeed(-5, 5);

            emitter.minRotation = 0;
            emitter.maxRotation = 0;

            emitter.start(false, 3000, 5, 0);
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