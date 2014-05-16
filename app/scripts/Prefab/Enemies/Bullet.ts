module Sample.Prefab {
    export class Bullet extends Phaser.Sprite {
        speed: number = 300;
        damagePoints: number = 30;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'bullet');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            game.add.existing(this);
        }
    }
}