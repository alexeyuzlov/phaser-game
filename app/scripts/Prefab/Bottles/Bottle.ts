module Sample.Prefab {

    export class Bottle extends Phaser.Sprite {
        level: State.AbstractZone;

        constructor(game:Phaser.Game, x:number, y:number, texture) {
            super(game, x, y, texture);
            game.physics.arcade.enable(this);

            this.level = this.game.state.states[this.game.state.current];
            game.add.existing(this);
        }

        update() {
            this.game.physics.arcade.overlap(this.level.player, this, (player, bottle) => {
                bottle.makeAction();
                bottle.kill();
            });
        }
    }
}