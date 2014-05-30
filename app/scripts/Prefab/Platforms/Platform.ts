module Sample.Prefab {

    export class Platform extends Phaser.Sprite {
        direction:Direction;
        velocity:number = 100;

        constructor(game:Phaser.Game, x:number, y:number, texture) {
            super(game, x, y, texture);

            game.physics.arcade.enable(this);
            this.body.immovable = true;


            game.add.existing(this);
        }

        toggleDirection(transparent) {
            switch (this.direction) {
                case Direction.Up :
                    this.direction = Direction.Down;
                    break;
                case Direction.Down :
                    this.direction = Direction.Up;
                    break;
                case Direction.Left :
                    this.direction = Direction.Right;
                    break;
                case Direction.Right :
                    this.direction = Direction.Left;
                    break;
                default :
                    // Don't doing something
                    break;
            }
        }

        update() {
            switch (this.direction) {
                case Direction.Left :
                    this.body.velocity.x = -this.velocity;
                    break;
                case Direction.Right :
                    this.body.velocity.x = this.velocity;
                    break;
                case Direction.Up :
                    this.body.velocity.y = -this.velocity;
                    break;
                case Direction.Down :
                    this.body.velocity.y = this.velocity;
                    break;
                default :
                //
            }
        }
    }
}