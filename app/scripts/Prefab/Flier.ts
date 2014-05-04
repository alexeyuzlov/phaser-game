module Sample.Prefab {

    export class Flier extends Phaser.Sprite {
        minDistance:number;
        speed:number = 150;

        constructor(game:Phaser.Game, x:number, y:number, private target:Phaser.Sprite) {
            super(game, x, y, 'flier');

            this.minDistance = target.width / 2;

            // this.target = target;
            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);

            game.add.existing(this);
        }

        update() {
            var distance = Phaser.Math.distance(this.x, this.y, this.target.x, this.target.y);

            if (distance > this.minDistance) {
                var rotation = Phaser.Math.angleBetween(this.x, this.y, this.target.x, this.target.y);

                this.body.velocity.x = Math.cos(rotation) * this.speed;
                this.body.velocity.y = Math.sin(rotation) * this.speed;
            } else {
                this.body.velocity.setTo(0, 0);
            }
        }
    }
}