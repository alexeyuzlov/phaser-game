module Sample.Prefab {

    export class Spike extends Phaser.Sprite {
        damagePoints: number = 10;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'spike');

            game.physics.arcade.enable(this);

            this.body.immovable = true;

            game.add.existing(this);
        }
    }
}