module Sample.Prefab {

    export class AbstractEnemy extends Phaser.Sprite {
        constructor(game:Phaser.Game, x:number, y:number, sprite:string) {
            super(game, x, y, sprite);

            game.physics.arcade.enable(this);
            this.alive = true;
            this.anchor.set(0, 0.5);

            game.add.existing(this);
        }

        makeDamage(damagePoint) {
            this.damage(damagePoint);

            var textStyle = {
                font: "20px Arial",
                fill: "#ffffff",
                stroke: '#0000ff',
                strokeThickness: 1
            };

            var text = this.game.add.text(this.x, this.y, damagePoint.toString(), textStyle);
            var tween = this.game.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

            tween.onComplete.add(()=> {
               text.destroy();
            });
        }
    }
}