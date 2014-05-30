module Sample.Prefab {
    export class BulletReject extends Phaser.Sprite {
        speed: number = 300;
        damagePoints: number = 30;
        damageRejectPoints: number = 300;
        rejectState: boolean = false;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'bullet-reject');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            game.add.existing(this);
        }
    }
}