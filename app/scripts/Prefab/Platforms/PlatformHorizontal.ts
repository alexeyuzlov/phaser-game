module Sample.Prefab {

    export class PlatformHorizontal extends Platform {
        direction:Direction = Direction.Right;
        velocity:number = 100;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'platform-h');

            game.physics.arcade.enable(this);
            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}