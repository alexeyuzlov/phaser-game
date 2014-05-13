/// <reference path='../Prefab/Bullet.ts'/>

module Sample.Prefab {
    export class Shooter extends Phaser.Sprite {
        gravity:number = 300;

        lastBulletShotAt: number = 0;
        bullets: Phaser.Group;
        countBullets: number = 1;
        shotDelay: number = 3000;

        damagePoints: number = 10;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'shooter');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;

            this.anchor.set(1, 0.5);

            this.bullets = this.game.add.group();
            for(var i = 0; i < this.countBullets; i++) {
                var bullet = new Prefab.Bullet(game, 0, 0);
                this.bullets.add(bullet);
            }

            this.alive = true;
            this.health = 10;

            game.add.existing(this);
        }

        update() {
            if (!this.inCamera) return;
            if (!this.alive) return;

            if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
            this.lastBulletShotAt = this.game.time.now;

            var bullet = this.bullets.getFirstDead();

            if (bullet === null || bullet === undefined) return;

            bullet.revive();
            bullet.reset(this.x, this.y);

            bullet.body.velocity.x = -bullet.speed;
        }
    }
}