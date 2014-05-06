module Sample.Prefab {
    export class Weapon extends Phaser.Sprite {
        damagePoint: number = 50;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'weapon');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            game.add.existing(this);
        }
    }
}