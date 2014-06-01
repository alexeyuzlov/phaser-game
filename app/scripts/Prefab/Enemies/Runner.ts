module Sample.Prefab {

    export class Runner extends AbstractEnemy {
        gravity:number;
        velocity:number;
        direction:Direction;
        damagePoints:number;
        defensePoints:number;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'runner');

            this.gravity = 300;
            this.velocity = 100;

            this.direction = Direction.Right;
            this.body.velocity.x = this.velocity;

            this.damagePoints = 10;
            this.defensePoints = 5;

            this.body.gravity.y = this.gravity;
            this.body.collideWorldBounds = true;
            this.health = 200;
        }

        toggleDirection() {
            switch (this.direction) {
                case Direction.Left:
                    this.direction = Direction.Right;
                    this.body.velocity.x = this.velocity;
                    break;
                case Direction.Right:
                    this.direction = Direction.Left;
                    this.body.velocity.x = -this.velocity;
                    break;
                default:
            }
        }

        update() {
            super.update();

            this.game.physics.arcade.collide(this, this.level.layer);

            this.game.physics.arcade.collide(this, this.level.transparents, (runner, transparent) => {
                runner.toggleDirection();
            });

            if (this.body.blocked.left || this.body.blocked.right) {
                this.toggleDirection();
            }
        }
    }
}