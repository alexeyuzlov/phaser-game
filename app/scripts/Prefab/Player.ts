module Sample.Prefab {

    export class Player extends Phaser.Sprite implements IDirection {
        private gravity:number = 300;

        acceleration:number = 1500;
        private maxSpeed:number = 300;

        damagePoint:number = 30;
        jumpHeight:number = 300;

        isJumpState:boolean = false;
        immortalState:boolean = false;
        attackState:boolean = false;
        isMoveState:boolean = false;

        direction:Direction = Direction.Right;

        manaPoints:number = 100;

        immortalStateAt:number = Date.now();
        attackStateAt:number = Date.now();

        immortalDuration:number = 3000;
        attackDuration:number = 300;

        isActiveJumpKey:boolean = false;
        isAttackKeyPressed:boolean = false;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'player');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;
            this.anchor.set(0.5, 0.5);

            this.body.drag.x = this.acceleration;
            this.body.maxVelocity.x = this.maxSpeed;

            this.alive = true;
            this.health = 100;

            //this.smoothed = true;

            this.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-', 1, 4, '.png', 0), 10, true);
            this.animations.add('attack', Phaser.Animation.generateFrameNames('player-attack-', 1, 3, '.png', 0), 10, true);

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
                this.isMoveState = true;
                this.body.acceleration.x = this.acceleration;
                this.direction = Direction.Right;
                this.scale.x = 1;
            }
            else if (this.game.input.keyboard.isDown(settings.keys.moveLeft)) {
                this.isMoveState = true;
                this.body.acceleration.x = -this.acceleration;
                this.direction = Direction.Left;
                this.scale.x = -1;
            }
            else {
                this.isMoveState = false;
                this.body.acceleration.x = 0;
            }
        }

        attack() {
            if (this.game.input.keyboard.isDown(settings.keys.attack) && !this.attackState && !this.isAttackKeyPressed) {
                this.isAttackKeyPressed = true;
                this.attackState = true;
                this.attackStateAt = Date.now();
            }

            if (!this.game.input.keyboard.isDown(settings.keys.attack)) {
                this.isAttackKeyPressed = false;
            }

            if ((Date.now() - this.attackStateAt) > this.attackDuration) {
                this.attackState = false;
            }
        }

        superspeed() {
            // for big jump
        }

        superattack() {
            // distance attack
        }

       state() {
            if (this.immortalState && (Date.now() - this.immortalStateAt) > this.immortalDuration) {
                this.alpha = 1;
                this.immortalState = false;
            }

            if (this.attackState) {
                this.animations.play('attack');
            } else if (this.isMoveState) {
                this.animations.play('walk');
            } else {
                this.animations.stop();
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