module Sample.Prefab {

    export class BottleSuper extends Bottle {
        duration:number = 10000;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'bottle-super');
            game.physics.arcade.enable(this);

            game.add.existing(this);
        }

        makeAction(player:Prefab.Player) {
            player.immortal(this.duration);
        }
    }
}