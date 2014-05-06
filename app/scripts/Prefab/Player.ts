/// <reference path='../Prefab/Weapon.ts'/>

module Sample.Prefab {
    export class Player extends Phaser.Sprite {
        gravity:number = 300;
        velocity:number = 300;
        jumpHeight:number = 150;
        weapon: Prefab.Weapon;

        // healhPoints - Phaser include health points
        manaPoints:number = 100;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'player');

            game.physics.arcade.enable(this);
            this.body.gravity.y = this.gravity;
            this.anchor.set(0.5, 0.5);

            //this.alive = true;
            //this.health = 101;

            this.weapon =  new Prefab.Weapon(game, 0, 0);

            game.add.existing(this);
        }

        jump() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -this.jumpHeight;
            }
        }

        move() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = this.velocity;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -this.velocity;
            }
            else {
                this.body.velocity.x = 0;
            }
        }

        attack() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
                this.weapon.revive();
                this.weapon.reset(this.x + this.weapon.width, this.y);
            }
        }

        superspeed() {

        }

        superattack() {

        }

        update() {
            this.move();

            this.jump();

            this.attack();
        }
    }
}