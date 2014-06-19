module Sample.Prefab {

    export class Boss extends AbstractEnemy {
        bossTweens: Phaser.Group;
        activeTweenID: number;

        lastEventAt: number;
        inAction = false;
        isProtect: boolean = true;
        health: number = 100;

        lastBulletShotAt: number;
        bullets: Phaser.Group;
        countBullets: number;
        shotDelay: number;
        damagePoints: number = 10;
        defensePoints: number = 40;

        constructor(game:Phaser.Game, bossTweens: Phaser.Group) {
            super(game, bossTweens.children[0].x,
                bossTweens.children[0].y, 'boss');

            this.activeTweenID = 0;
            this.bossTweens = bossTweens;

            this.lastEventAt = this.game.time.now;
            this.lastBulletShotAt = this.game.time.now;
            this.countBullets = 10;
            this.shotDelay = Phaser.Timer.SECOND * 3;

            this.bullets = this.game.add.group();
            for(var i = 0; i < this.countBullets; i++) {
                var bullet = new Prefab.BulletReject(game, 0, 0);
                this.bullets.add(bullet);
            }

            this.game.onResume.add(()=> {
                this.lastBulletShotAt += this.game.time.pauseDuration;
            });

            this.animations.add('move', Phaser.Animation.generateFrameNames('boss-', 1, 4, '.png', 0), 20, true);
            this.animations.add('blue', Phaser.Animation.generateFrameNames('boss-blue-', 1, 4, '.png', 0), 20, true);
            this.animations.play('move');

            this.anchor.set(0.5, 1);

            this.events.onKilled.add(()=> {

                //this.level.startNextLevel();
            });
        }

        generateAction() {
            this.lastEventAt = this.game.time.now;

            var tween = this.game.add.tween(this);

            do {
                var rand = Math.floor(Math.random() * this.bossTweens.children.length);
            } while (rand == this.activeTweenID);
            this.activeTweenID = rand;

            tween.to({
                x: this.bossTweens.children[this.activeTweenID].x,
                y: this.bossTweens.children[this.activeTweenID].y
            }, Math.random() * 1000 + 2000, Phaser.Easing.Quadratic.In, true, 0, 0, false);

            tween.onComplete.add(()=> {
                this.inAction = false;
            });
        }

        update() {
            this.game.physics.arcade.overlap(this, this.bullets, (shooterReject, bulletReject)=> {
                if (bulletReject.rejectState) {
                    bulletReject.kill();
                    this.animations.play('blue');
                    this.isProtect = false;
                }
            });

            this.game.physics.arcade.overlap(this.level.player, this, (player, enemy)=> {
                if (player.attackState) {
                    if (this.isProtect) {
                        this.makeDamage(1);
                    }
                    else {
                        this.makeDamage(player.damagePoints);
                        this.isProtect = true;
                        this.animations.play('move');
                    }
                }

                else if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(enemy.damagePoints);
                    this.level.hud.updateHealthState();
                }
            });

            if (!this.inAction) {
                this.inAction = true;
                this.generateAction();
            }

            if (this.game.time.now - this.lastBulletShotAt < this.shotDelay) return;
            this.lastBulletShotAt = this.game.time.now;

            var bullet = this.bullets.getFirstDead();

            if (bullet === null || bullet === undefined) return;

            bullet.revive();
            bullet.reset(this.x, this.y);
            bullet.rejectState = false;

            if (this.x > this.level.player.x) {
                bullet.body.velocity.x = -bullet.speed;
                bullet.scale.x = -1;
                this.scale.x = -1;
            } else {
                bullet.body.velocity.x = bullet.speed;
                bullet.scale.x = 1;
                this.scale.x = 1;
            }

            if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
                this.immortalState = false;
            }
        }
    }
}