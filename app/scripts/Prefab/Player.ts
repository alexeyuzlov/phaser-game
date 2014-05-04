module Sample.Prefab {
    export class Player extends Phaser.Sprite {
        gravity: number = 300;
        velocity: number = 300;
        jumpHeight: number = 150;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'player');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;
            this.anchor.set(0.5, 0.5);

            game.add.existing(this);
        }

        update() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.body.velocity.x = this.velocity;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                this.body.velocity.x = -this.velocity;
            }
            else {
                this.body.velocity.x = 0;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -this.jumpHeight;
            }
        }
    }
}