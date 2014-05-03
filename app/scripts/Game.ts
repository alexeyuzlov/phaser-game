/// <reference path="../vendor/phaser-official/build/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>

/// <reference path='State/Level1.ts'/>

module Sample {
    export class Game extends Phaser.Game {
        constructor() {
            super(640, 480, Phaser.AUTO, 'game');

            this.state.add('boot', State.Boot);
            this.state.add('preload', State.Preload);
            this.state.add('menu', State.Menu);

            this.state.add('level1', State.Level1);

            this.state.start('boot');
        }
    }
}

window.onload = () => {
    var game = new Sample.Game();
};