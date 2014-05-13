module Sample.Prefab {

    export class Barb extends Phaser.Sprite {

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'barb');

            game.physics.arcade.enable(this);
            game.add.existing(this);
        }
    }
}