module Sample.Prefab {

    export class BottleHP extends Bottle {
        amount: number = 50;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'bottle-hp');
            game.physics.arcade.enable(this);
        }

        makeAction() {
            this.level.player.getHP(this.amount);
        }
    }
}