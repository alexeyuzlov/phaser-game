module Sample.Prefab {

    export class Runner extends AbstractEnemy {
        gravity:number = 300;
        velocity:number = 100;
        direction:Direction = Direction.Right;
        damagePoints: number = 10;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'runner');

            this.body.gravity.y = this.gravity;
            this.health = 10;
        }

        update() {
            if (!this.inCamera) return;
            if (!this.alive) return;

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