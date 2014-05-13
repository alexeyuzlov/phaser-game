module Sample.Prefab {

    export class Ice extends Phaser.Sprite {

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'ice');

            game.physics.arcade.enable(this);
            game.add.existing(this);
        }
    }
}