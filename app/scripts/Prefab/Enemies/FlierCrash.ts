module Sample.Prefab {

    export class FlierCrash extends AbstractEnemy {
        target:Phaser.Sprite;
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
        }

        setTarget(target:Phaser.Sprite) {
            this.minDistance = target.width / 2;

            this.target = target;
            this.isActive = true;
        }

        update() {
            super.update();

            if (!this.inCamera) return;
            if (!this.isActive) return;

            if (!this.isAttackOver) {
                var distance = Phaser.Math.distance(this.x, this.y, this.target.x, this.target.y - this.target.body.height * 4);

                if (distance > this.minDistance && !this.isAttackOver) {
                    var rotation = Phaser.Math.angleBetween(this.x, this.y, this.target.x, this.target.y - this.target.body.height * 4);

                    this.body.velocity.x = Math.cos(rotation) * this.speed;
                    this.body.velocity.y = Math.sin(rotation) * this.speed;
                } else {
                    this.isAttackOver = true;
                    this.body.velocity.y = -30;

                    if (this.target.x > this.x) {
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
        }
    }
}