module Sample.Prefab {
    export class Player extends Phaser.Sprite {
        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'player', 0);

            // Set prefab properties here

            game.add.existing(this);
        }

        update() {
            // Update prefab here
        }
    }
}