/// <reference path='../../Levels/AbstractZone.ts'/>

module Sample.State {

    export class Zone2 extends AbstractZone {
        lightRadius:number = 100;
        shadowTexture:Phaser.BitmapData;
        lightSprite:Phaser.Image;

        preload() {
            super.preload();
        }

        create() {
            super.create();
            this.game.stage.backgroundColor = "#330169";
            console.log(this.map.widthInPixels);
            this.shadowTexture = this.game.add.bitmapData(this.map.widthInPixels, this.map.heightInPixels);

            this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
            this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;
            //this.lightSprite.fixedToCamera = true;
        }

        update() {
            super.update();

            this.shadowUpdate();
        }

        shadowUpdate() {
            this.shadowTexture.context.fillStyle = '#444444';
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