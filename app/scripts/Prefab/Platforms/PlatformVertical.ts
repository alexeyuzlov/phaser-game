module Sample.Prefab {

    export class PlatformVertical extends Platform {
        direction:Direction = Direction.Down;
        velocity:number = 100;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'platform-v');

            game.physics.arcade.enable(this);
            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}