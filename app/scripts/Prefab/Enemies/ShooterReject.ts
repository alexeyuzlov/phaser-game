module Sample.Prefab {
    export class ShooterReject extends AbstractEnemy {
        lastBulletShotAt: number;
        bullets: Phaser.Group;
        countBullets: number;
        shotDelay: number;
        damagePoints: number;
        defensePoints:number;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'shooter-reject');

            this.body.gravity.y = 300;
            this.damagePoints = 10;
            this.defensePoints = 50;
            this.lastBulletShotAt = this.game.time.now;
            this.countBullets = 10;
            this.shotDelay = Phaser.Timer.SECOND * 3;

            this.bullets = this.game.add.group();
            for(var i = 0; i < this.countBullets; i++) {
                var bullet = new Prefab.BulletReject(game, 0, 0);
                this.bullets.add(bullet);
            }
            this.health = 100;
        }

        update() {
            super.update();

            this.game.physics.arcade.collide(this, this.level.layer);

            this.game.physics.arcade.overlap(this, this.bullets, (shooterReject, bulletReject)=> {
                if (bulletReject.rejectState) {
                    bulletReject.kill();
                    this.makeDamage(bulletReject.damageRejectPoints);
                }
            });

            if (!this.inCamera || !this.alive) {
                this.body.velocity.setTo(0,0);
                return;
            }

            if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
            this.lastBulletShotAt = this.game.time.now;

            var bullet = this.bullets.getFirstDead();

            if (bullet === null || bullet === undefined) return;

            bullet.revive();
            bullet.reset(this.x, this.y);

            if (this.x > this.level.player.x) {
                bullet.body.velocity.x = -bullet.speed;
            } else {
                bullet.body.velocity.x = bullet.speed;
            }
        }
    }
}