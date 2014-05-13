module Sample.Prefab {

    export class Barb extends Phaser.Sprite {
        damagePoints: number = 50;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'barb');

            game.physics.arcade.enable(this);

            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}