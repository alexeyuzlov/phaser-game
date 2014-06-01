module Sample.Prefab {

    export class Runner extends AbstractEnemy {
        gravity:number = 300;
        velocity:number = 100;
        direction:Direction = Direction.Right;
        damagePoints: number = 10;
        defensePoints:number = 5;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'runner');

            this.body.gravity.y = this.gravity;
            this.body.collideWorldBounds = true;
            this.health = 200;
        }

        toggleDirection() {
            switch (this.direction) {
                case Direction.Left:
                    this.direction = Direction.Right;
                    break;
                case Direction.Right:
                    this.direction = Direction.Left;
                    break;
                default:
            }
        }

        update() {
            super.update();

            this.game.physics.arcade.collide(this, this.level.layer);

            this.game.physics.arcade.overlap(this, this.level.transparents, (runner, transparent) => {
                runner.toggleDirection();
            });

            if (!this.inCamera || !this.alive) {
                this.body.velocity.setTo(0,0);
                return;
            }

            if (this.body.blocked.left) {
                this.direction = Direction.Right;
            } else if (this.body.blocked.right) {
                this.direction = Direction.Left;
            }

            switch (this.direction) {
                case Direction.Left :
                    this.body.velocity.x = -this.velocity;
                    break;
                case Direction.Right :
                    this.body.velocity.x = this.velocity;
                    break;
                default :
                    this.body.velocity.x = 0;
            }
        }
    }
}