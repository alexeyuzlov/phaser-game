module Sample.Prefab {

    export class BottleMP extends Bottle {
        amount: number = 50;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'bottle-mp');
            game.physics.arcade.enable(this);
        }

        makeAction() {
            this.level.player.getMP(this.amount);
        }
    }
}