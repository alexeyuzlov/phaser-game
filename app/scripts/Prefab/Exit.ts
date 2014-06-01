module Sample.Prefab {

    export class Exit extends AbstractPrefab {
        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'exit');
            game.physics.arcade.enable(this);

            this.body.immovable = true;
        }

        update() {
            this.game.physics.arcade.collide(this.level.player, this.level.exits, (player, exit) => {
                this.level.startNextLevel();
            });
        }
    }
}