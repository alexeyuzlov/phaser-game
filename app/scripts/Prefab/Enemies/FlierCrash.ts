module Sample.Prefab {

    export class FlierCrash extends AbstractEnemy {
        isActive:boolean = false;
        isAttackOver:boolean = false;

        minDistance:number;
        damagePoints:number = 10;
        speed:number = 100;

        defensePoints:number = 5;

        lastEggShotAt:number = 0;
        eggs:Phaser.Group;
        countEggs:number = 10;
        shotDelay:number = 1000;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'flier-crash');

            this.anchor.set(0.5, 0.5);
            this.health = 100;

            this.eggs = this.game.add.group();
            for (var i = 0; i < this.countEggs; i++) {
                var egg = new Prefab.Egg(game, 0, 0);
                this.eggs.add(egg);
            }

            this.minDistance = this.level.player.width / 2;
            this.isActive = true;
        }

        update() {
            super.update();

            this.game.physics.arcade.collide(this.eggs, this.level.player, (player, egg)=> {
                egg.kill();
                if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(egg.damagePoints);
                    this.level.hud.updateHealthState();
                }
            });

            this.game.physics.arcade.collide(this.eggs, this.level.layer, (egg, layer)=> {
                egg.setEggCrash();
            });

            if (!this.inCamera || !this.alive) {
                this.body.velocity.setTo(0,0);
                return;
            }

            if (!this.isAttackOver) {
                var distance = Phaser.Math.distance(this.x, this.y, this.level.player.x, this.level.player.y - this.level.player.body.height * 4);

                if (distance > this.minDistance && !this.isAttackOver) {
                    var rotation = Phaser.Math.angleBetween(this.x, this.y, this.level.player.x, this.level.player.y - this.level.player.body.height * 4);

                    this.body.velocity.x = Math.cos(rotation) * this.speed;
                    this.body.velocity.y = Math.sin(rotation) * this.speed;
                } else {
                    this.isAttackOver = true;
                    this.body.velocity.y = -30;

                    if (this.level.player.x > this.x) {
                        this.body.velocity.x = this.speed;
                    } else {
                        this.body.velocity.x = -this.speed;
                    }
                }
            }

            if (this.game.time.now - this.lastEggShotAt < this.shotDelay) return;
            this.lastEggShotAt = this.game.time.now;

            var egg = this.eggs.getFirstDead();
            if (egg === null || egg === undefined) return;

            egg.revive();
            egg.reset(this.x, this.y);
            egg.body.velocity.y = egg.speed;
            egg.animations.play('egg');
        }
    }
}