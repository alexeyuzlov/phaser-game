module Sample.Prefab {
    export enum DIRECTION {
        LEFT,
        RIGHT,
        UP,
        DOWN
    }

    export class Runner extends Phaser.Sprite {
        gravity:number = 300;
        velocity:number = 100;
        direction:DIRECTION = DIRECTION.RIGHT;
        visibleDistance:number = 800;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'runner');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;
            this.anchor.set(0.5, 0.5);

            game.add.existing(this);
        }

        update() {
            if (!this.inCamera) return;

            if (this.body.blocked.left) {
                this.direction = DIRECTION.RIGHT;
            } else if (this.body.blocked.right) {
                this.direction = DIRECTION.LEFT;
            }

            switch (this.direction) {
                case DIRECTION.LEFT :
                    this.body.velocity.x = -this.velocity;
                    break;
                case DIRECTION.RIGHT :
                    this.body.velocity.x = this.velocity;
                    break;
                default :
                    this.body.velocity.x = 0;
            }
        }
    }
}