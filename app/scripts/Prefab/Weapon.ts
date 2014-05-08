module Sample.Prefab {
    export class Weapon extends Phaser.Sprite {
        damagePoint: number = 30;

        isAttackState: boolean = false;
        isAttackKeyPressed: boolean = false;

        attackStateAt: number = Date.now();
        attackDuration: number = 100;

        owner: IDirection; // interface with direction

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'weapon');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            game.add.existing(this);
        }

        attack() {
            if (this.game.input.keyboard.isDown(settings.keys.attack)
                && !this.isAttackState
                && !this.isAttackKeyPressed) {
                this.isAttackKeyPressed = true;
                this.isAttackState = true;
                this.attackStateAt = Date.now();
                this.revive();

                if (this.isAttackState) {
                    if (this.owner.direction == Direction.Right) {
                        this.scale.x = 1;
                        this.reset(this.owner.x + this.width, this.owner.y);
                    }

                    if (this.owner.direction == Direction.Left) {
                        this.scale.x = -1;
                        this.reset(this.owner.x + this.width, this.owner.y);
                    }
                }
            }

            if (!this.game.input.keyboard.isDown(settings.keys.attack)) {
                this.isAttackKeyPressed = false;
            }

            if ((Date.now() - this.attackStateAt) > this.attackDuration) {
                this.kill();
                this.isAttackState = false;
            }
        }

        setOwner(owner: IDirection) {
            this.owner = owner;
        }

        update() {
            if (this.isAttackState) {
                this.x = this.owner.x + this.width;
                this.y = this.owner.y;
            }
        }
    }
}