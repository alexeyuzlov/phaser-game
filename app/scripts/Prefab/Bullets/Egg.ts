module Sample.Prefab {
    export class Egg extends Phaser.Sprite {
        speed: number = 200;
        damagePoints: number = 45;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'egg');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;

            this.animations.add('egg', ['egg.png'], 10, true);
            this.animations.add('egg-crash', ['egg-crash.png'], 10, true);

            this.animations.play('egg');
            this.body.width = this.animations.currentFrame.width;
            this.body.height = this.animations.currentFrame.height;

            game.add.existing(this);
        }

        setEggCrash() {
            this.animations.play('egg-crash');

            this.body.width = this.animations.currentFrame.width;
            this.body.height = this.animations.currentFrame.height;
        }
    }
}