module Sample.Prefab {

    export class ExitDoor extends Phaser.Sprite {

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'exitDoor');

            game.physics.arcade.enable(this);
            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}