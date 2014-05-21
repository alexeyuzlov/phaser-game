module Sample.Prefab {

    export class Player extends Phaser.Sprite {
        gravity:number = 500;

        acceleration:number = 500;
        drag:number = 500;

        maxSpeed:number = 270;
        superSpeedPower:number = 390;

        jumpPower:number = 350;

        immortalState:boolean = false;
        attackState:boolean = false;
        moveState:boolean = false;
        sitState:boolean = false;
        superSpeedState:boolean = false;
        superAttakState:boolean = false;
        viewAroundState:boolean = false;

        direction:Direction = Direction.Right;

        damagePoints:number = 50;
        manaPoints:number = settings.storage.getManaPoints();

        immortalStateAt:number = Date.now();
        attackStateAt:number = Date.now();

        immortalDuration:number = 3000;
        attackDuration:number = 300;

        isActiveJumpKey:boolean = false;
        isAttackKeyPressed:boolean = false;

        constructor(public level:State.AbstractZone, x:number, y:number) {
            super(level.game, x, y, 'player');

            this.level.game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;
            this.anchor.set(0.5, 1);

            this.body.drag.x = this.drag;
            this.body.maxVelocity.x = this.maxSpeed;

            this.body.collideWorldBounds = true;
            this.alive = true;

            this.health = +settings.storage.getHealthPoints();

            this.animations.add('stay', ['player-walk-1.png'], 10, true)
            this.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-', 1, 4, '.png', 0), 15, true);
            this.animations.add('attack', Phaser.Animation.generateFrameNames('player-attack-', 1, 3, '.png', 0), 10, true);
            this.animations.add('sit', ['player-sit-1.png'], 10, true);

            this.level.game.add.existing(this);
        }

        makeDamage(damagePoint) {
            this.damage(damagePoint);
            this.immortalStateAt = Date.now();
            this.immortalState = true;
            this.alpha = 0.5;

            var textStyle = {
                font: "20px Arial",
                fill: "#ffffff",
                stroke: "ff0000",
                strokeThickness: 2
            };

            var text = this.game.add.text(this.x, this.y, damagePoint.toString(), textStyle);
            var tween = this.game.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

            tween.onComplete.add(()=> {
                text.destroy();
            });
        }

        jump() {
            if (this.game.input.keyboard.isDown(settings.keys.jump)
                && (this.body.blocked.down || this.body.touching.down)
                && !this.isActiveJumpKey) {
                this.isActiveJumpKey = true;
                this.body.velocity.y = -this.jumpPower;
            }

            if (!this.game.input.keyboard.isDown(settings.keys.jump)) {
                this.isActiveJumpKey = false;
            }
        }

        move() {
            if (this.game.input.keyboard.isDown(settings.keys.moveRight)) {
                this.moveState = true;
                this.body.acceleration.x = this.acceleration;
                this.direction = Direction.Right;
                this.scale.x = 1;
            }
            else if (this.game.input.keyboard.isDown(settings.keys.moveLeft)) {
                this.moveState = true;
                this.body.acceleration.x = -this.acceleration;
                this.direction = Direction.Left;
                this.scale.x = -1;
            }
            else {
                this.moveState = false;
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

        superSpeed() {
            if (this.game.input.keyboard.isDown(settings.keys.superSpeed) && this.body.blocked.down && !this.attackState) {
                this.superSpeedState = true;
            }

            if (!this.game.input.keyboard.isDown(settings.keys.superSpeed)) {
                this.superSpeedState = false;
            }

            if (this.superSpeedState) {
                this.body.maxVelocity.x = this.superSpeedPower;
            } else {
                this.body.maxVelocity.x = this.maxSpeed;
            }
        }

        superAttack() {
            // distance attack
        }

        sit() {
            this.sitState = this.game.input.keyboard.isDown(settings.keys.sit);
        }

        state() {
            if (this.immortalState && (Date.now() - this.immortalStateAt) > this.immortalDuration) {
                this.alpha = 1;
                this.immortalState = false;
            }

            if (this.attackState) {
                this.animations.play('attack');
            } else if (this.moveState) {
                this.animations.play('walk');
            } else if (this.sitState) {
                this.animations.play('sit');
            } else {
                this.animations.play('stay');
            }

            this.body.width = this.animations.currentFrame.width;
            this.body.height = this.animations.currentFrame.height;
        }

        update() {
            this.move();
            this.jump();
            this.attack();
            this.sit();
            this.superSpeed();
            this.superAttack();

            this.state();
        }
    }
}