module Sample.Prefab {

    export class Transparent extends Phaser.Sprite {
        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'transparent');

            game.physics.arcade.enable(this);
            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}