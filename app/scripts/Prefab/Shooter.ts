/// <reference path='../Prefab/Bullet.ts'/>

module Sample.Prefab {
    export class Shooter extends Phaser.Sprite {
        gravity:number = 300;

        lastBulletShotAt: number = 0;
        bullets: Phaser.Group;
        countBullets: number = 1;
        shotDelay: number = 3000;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'shooter');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;

            this.anchor.set(0.5, 0.5);

            this.bullets = this.game.add.group();
            for(var i = 0; i < this.countBullets; i++) {
                var bullet = new Prefab.Bullet(game, 0, 0);
                this.bullets.add(bullet);
            }

            game.add.existing(this);
        }

        update() {
            if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
            this.lastBulletShotAt = this.game.time.now;

            // Get a dead bullet from the pool
            var bullet = this.bullets.getFirstDead();

            // If there aren't any bullets available then don't shoot
            if (bullet === null || bullet === undefined) return;

            // Revive the bullet
            // This makes the bullet "alive"
            bullet.revive();

            // Bullets should kill themselves when they leave the world.
            // Phaser takes care of this for me by setting this flag
            // but you can do it yourself by killing the bullet if
            // its x,y coordinates are outside of the world.


            // Set the bullet position to the gun position.
            bullet.reset(this.x, this.y);

            // Shoot it
            bullet.body.velocity.x = -bullet.speed;
            bullet.body.velocity.y = 0;
        }
    }
}