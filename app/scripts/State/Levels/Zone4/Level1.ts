module Sample.State {

    export class Zone4Level1 extends Zone4 {
        boss: Prefab.Boss;

        lightningBitmap: any;
        lightning: any;
        flash: any;

        preload() {
            super.preload();
            this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            super.create();

            this.player.x = this.game.world.width - 600;

            var bossTweens = this.getPrefabsFromMap('tween');
            this.boss = new Prefab.Boss(this.game, bossTweens);

            this.lightningBitmap = this.game.add.bitmapData(200, 1000);
            this.lightning = this.game.add.image(this.game.width / 2, 0, this.lightningBitmap);
            this.lightning.anchor.setTo(0.5, 0);
            this.lightning.fixedToCamera = true;

            this.flash = this.game.add.graphics(0, 0);
            this.flash.beginFill(0xffffff, 1);
            this.flash.drawRect(0, 0, this.game.width, this.game.height);
            this.flash.endFill();
            this.flash.alpha = 0;
            this.flash.fixedToCamera = true;
        }

        update() {
            super.update();

            if (this.game.input.activePointer.justPressed(20)) {
                // Rotate the lightning sprite so it goes in the
                // direction of the pointer
                this.lightning.rotation =
                    Phaser.Math.angleBetween(
                        this.lightning.x,
                        this.lightning.y,
                        this.camera.x + this.game.input.activePointer.x,
                        this.camera.y + this.game.input.activePointer.y
                    ) - Math.PI/2;

                // Calculate the distance from the lightning source to the pointer
                var distance = Phaser.Math.distance(
                    this.lightning.x, this.lightning.y,
                        this.camera.x + this.game.input.activePointer.x,
                        this.camera.y + this.game.input.activePointer.y
                );

                // Create the lightning texture
                this.createLightningTexture(this.lightningBitmap.width/2, 0, 100, 3, false, distance);

                // Make the lightning sprite visible
                this.lightning.alpha = 1;

                // Fade out the lightning sprite using a tween on the alpha property.
                // Check out the "Easing function" examples for more info.
                this.game.add.tween(this.lightning)
                    .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
                    .start();

                // Create the flash
                this.flash.alpha = 1;
                this.game.add.tween(this.flash)
                    .to({ alpha: 0 }, 100, Phaser.Easing.Cubic.In)
                    .start();
            }
        }

        createLightningTexture(x, y, segments, boltWidth, branch, distance) {
            // Get the canvas drawing context for the lightningBitmap
            var ctx = this.lightningBitmap.context;
            var width = this.lightningBitmap.width;
            var height = this.lightningBitmap.height;

            // Our lightning will be made up of several line segments starting at
            // the center of the top edge of the bitmap and ending at the target.

            // Clear the canvas
            if (!branch) ctx.clearRect(0, 0, width, height);

            // Draw each of the segments
            for(var i = 0; i < segments; i++) {
                // Set the lightning color and bolt width
                ctx.strokeStyle = 'rgb(255, 255, 255)';
                ctx.lineWidth = boltWidth;

                ctx.beginPath();
                ctx.moveTo(x, y);

                // Calculate an x offset from the end of the last line segment and
                // keep it within the bounds of the bitmap
                if (branch) {
                    // For a branch
                    x += this.game.rnd.integerInRange(-10, 10);
                } else {
                    // For the main bolt
                    x += this.game.rnd.integerInRange(-30, 30);
                }
                if (x <= 10) x = 10;
                if (x >= width-10) x = width-10;

                // Calculate a y offset from the end of the last line segment.
                // When we've reached the target or there are no more segments left,
                // set the y position to the distance to the target. For branches, we
                // don't care if they reach the target so don't set the last coordinate
                // to the target if it's hanging in the air.
                if (branch) {
                    // For a branch
                    y += this.game.rnd.integerInRange(10, 20);
                } else {
                    // For the main bolt
                    y += this.game.rnd.integerInRange(20, distance/segments);
                }
                if ((!branch && i == segments - 1) || y > distance) {
                    // This causes the bolt to always terminate at the center
                    // lightning bolt bounding box at the correct distance to
                    // the target. Because of the way the lightning sprite is
                    // rotated, this causes this point to be exactly where the
                    // player clicked or tapped.
                    y = distance;
                    if (!branch) x = width/2;
                }

                // Draw the line segment
                ctx.lineTo(x, y);
                ctx.stroke();

                // Quit when we've reached the target
                if (y >= distance) break;

                // Draw a branch 20% of the time off the main bolt only
                if (!branch) {
                    if (Phaser.Math.chanceRoll(20)) {
                        // Draws another, thinner, bolt starting from this position
                        this.createLightningTexture(x, y, 10, 1, true, distance);
                    }
                }
            }

            // This just tells the engine it should update the texture cache
            this.lightningBitmap.dirty = true;
        }
    }
}