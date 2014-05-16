/// <reference path='../../Levels/AbstractZone.ts'/>

module Sample.State {

    export class Zone2 extends AbstractZone {
        lightRadius:number = 100;
        shadowTexture:Phaser.BitmapData;
        lightSprite:Phaser.Image;

        preload() {
            this.game.load.image('zone', 'assets/images/levels/zone2.png');
        }

        create() {
            super.create();

            this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

            this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
            this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;
            this.lightSprite.fixedToCamera = true;
        }

        update() {
            super.update();

            //this.shadowUpdate();
        }

        shadowUpdate() {
            this.shadowTexture.context.fillStyle = '#000000';
            this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

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

            // This just tells the engine it should update the texture cache
            this.shadowTexture.dirty = true;
        }
    }
}