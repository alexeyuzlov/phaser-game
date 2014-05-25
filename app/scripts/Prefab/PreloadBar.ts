module Sample.Prefab {

    export class PreloadBar extends Phaser.Sprite {

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'preload-bar');

            this.anchor.setTo(1, 1);

            game.add.existing(this);
        }
    }
}