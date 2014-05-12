/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone2 extends Level {
        LIGHT_RADIUS : number = 100;
        shadowTexture: any;
        lightSprite: any;


        preload() {
            this.game.load.image('zone', 'assets/images/levels/zone2.png');
        }

        create() {
            super.create();

            // Create the shadow texture
            this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

            // Create an object that will use the bitmap as a texture
            this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);

            // Set the blend mode to MULTIPLY. This will darken the colors of
            // everything below this sprite.
            this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;

            // Simulate a pointer click/tap input at the center of the stage
            // when the example begins running.
            this.game.input.activePointer.x = this.game.width/2;
            this.game.input.activePointer.y = this.game.height/2;
        }

        update() {
            super.update();
            this.updateShadowTexture();
        }

        updateShadowTexture() {
            // This function updates the shadow texture (this.shadowTexture).
            // First, it fills the entire texture with a dark shadow color.
            // Then it draws a white circle centered on the pointer position.
            // Because the texture is drawn to the screen using the MULTIPLY
            // blend mode, the dark areas of the texture make all of the colors
            // underneath it darker, while the white area is unaffected.

            // Draw shadow
            this.shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';
            this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

            // Draw circle of light with a soft edge
            var gradient = this.shadowTexture.context.createRadialGradient(
                this.game.input.activePointer.x, this.game.input.activePointer.y, this.LIGHT_RADIUS * 0.75,
                this.game.input.activePointer.x, this.game.input.activePointer.y, this.LIGHT_RADIUS);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

            this.shadowTexture.context.beginPath();
            this.shadowTexture.context.fillStyle = gradient;
            this.shadowTexture.context.arc(this.game.input.activePointer.x, this.game.input.activePointer.y,
                this.LIGHT_RADIUS, 0, Math.PI*2);
            this.shadowTexture.context.fill();

            // This just tells the engine it should update the texture cache
            this.shadowTexture.dirty = true;
        }
    }
}