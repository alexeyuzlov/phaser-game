module Sample.Prefab {

    export class Bottle extends Phaser.Sprite {

        constructor(game:Phaser.Game, x:number, y:number, texture) {
            super(game, x, y, texture);
            game.physics.arcade.enable(this);

            game.add.existing(this);
        }
    }
}