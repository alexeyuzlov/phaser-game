module Sample.State {

    export class Zone2 extends AbstractZone {
        bg: Phaser.TileSprite;
        lightRadius:number = 100;
        shadowTexture:Phaser.BitmapData;
        lightSprite:Phaser.Image;

        preload() {
            this.game.load.image('bg', 'assets/images/zone2.png');
            super.preload();
        }

        create() {
            this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
            this.bg.fixedToCamera = true;

            super.create();

            this.game.stage.backgroundColor = "#330169";

            this.shadowTexture = this.game.add.bitmapData(this.map.widthInPixels, this.map.heightInPixels);
            this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
            this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;
        }

        update() {
            super.update();
            this.shadowUpdate();

            this.bg.tilePosition.x = -this.player.x / 5;
        }

        shadowUpdate() {
            this.shadowTexture.context.fillStyle = '#222222';
            this.shadowTexture.context.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);

            var gradient = this.shadowTexture.context.createRadialGradient(
                this.player.body.x, this.player.body.y, this.lightRadius * 0.75,
                this.player.body.x, this.player.body.y, this.lightRadius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

            this.shadowTexture.context.beginPath();
            this.shadowTexture.context.fillStyle = gradient;
            this.shadowTexture.context.arc(this.player.body.x, this.player.body.y,
                this.lightRadius, 0, Math.PI * 2);
            this.shadowTexture.context.fill();

            this.shadowTexture.dirty = true;
        }
    }
}