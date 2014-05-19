module Sample.Prefab {

    export class IceSpike extends Phaser.Sprite {
        damagePoints: number = 50;

        target: Phaser.Sprite;
        distanceToTarget: number = Math.random() * 100 - 40; // from - 40 to 60 px to target

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'iceSpike');
            game.physics.arcade.enable(this);
            this.alive = true;
            this.checkWorldBounds = true;
            //this.outOfBoundsKill = true;

            game.physics.arcade.enable(this);
            game.add.existing(this);
        }

        update() {
            if (!this.inCamera) return;
            if (!this.alive) return;

            if (Math.abs(this.target.x - this.body.x) < this.distanceToTarget && this.target.y > this.body.y) {
                this.body.gravity.y = 100;
                this.body.acceleration.y = 1000;
            }
        }
    }
}