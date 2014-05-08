/// <reference path='../Prefab/Weapon.ts'/>

module Sample.Prefab {

    export class Player extends Phaser.Sprite implements IDirection {
        private gravity:number = 300;
        private velocity:number = 300;

        jumpHeight:number = 300;
        isJumpState:boolean = false;
        isActiveJumpKey:boolean = false;

        weapon:Prefab.Weapon;
        direction:Direction = Direction.Right;

        manaPoints:number = 100;

        immortalState: boolean = false;
        immortalStateAt: number = Date.now();
        immortalDuration: number = 3000;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'player');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;
            this.anchor.set(0.5, 0.5);

            this.alive = true;
            this.health = 100;
            this.smoothed = true;
            this.animations.add('walk', null, 10, true);

            this.weapon = new Prefab.Weapon(game, 0, 0);
            this.weapon.setOwner(this);

            game.add.existing(this);
        }

        makeDamage(damagePoint) {
            this.damage(damagePoint);
            this.immortalStateAt = Date.now();
            this.immortalState = true;
            this.alpha = 0.5;
        }

        jump() {
            if (this.game.input.keyboard.isDown(settings.keys.jump)
                && !this.isJumpState
                && this.body.blocked.down
                && !this.isActiveJumpKey) {
                this.isActiveJumpKey = true;
                this.isJumpState = true;
                this.body.velocity.y = -this.jumpHeight;
            }

            if (!this.game.input.keyboard.isDown(settings.keys.jump)) {
                this.isActiveJumpKey = false;
            }

            if (this.body.blocked.down) {
                this.isJumpState = false;
            }
        }

        move() {
            if (this.game.input.keyboard.isDown(settings.keys.moveRight)) {
                this.body.velocity.x = this.velocity;
                this.animations.play('walk');
                this.direction = Direction.Right;
                this.scale.x = 1;
            }
            else if (this.game.input.keyboard.isDown(settings.keys.moveLeft)) {
                this.body.velocity.x = -this.velocity;
                this.animations.play('walk');
                this.direction = Direction.Left;
                this.scale.x = -1;
            }
            else {
                this.body.velocity.x = 0;
                this.animations.stop('walk', true);
            }
        }

        attack() {
            this.weapon.attack();
        }

        superspeed() {

        }

        superattack() {

        }

        state() {
            if (this.immortalState && (Date.now() - this.immortalStateAt) > this.immortalDuration) {
                this.alpha = 1;
                this.immortalState = false;
            }
        }

        update() {
            this.move();
            this.jump();
            this.attack();
            this.state();
        }
    }
}