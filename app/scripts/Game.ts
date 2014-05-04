/// <reference path="../vendor/phaser-official/build/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>

/// <reference path='State/Menu.ts'/>

/// <reference path='State/Levels/Zone1/Level1.ts'/>
/// <reference path='State/Levels/Zone1/Level2.ts'/>
/// <reference path='State/Levels/Zone1/Level3.ts'/>

/// <reference path='State/Levels/Zone2/Level1.ts'/>
/// <reference path='State/Levels/Zone2/Level2.ts'/>
/// <reference path='State/Levels/Zone2/Level3.ts'/>

/// <reference path='State/Levels/Zone3/Level1.ts'/>
/// <reference path='State/Levels/Zone3/Level2.ts'/>
/// <reference path='State/Levels/Zone3/Level3.ts'/>

/// <reference path='State/Levels/Zone4/Level1.ts'/>
/// <reference path='State/Levels/Zone4/Level2.ts'/>
/// <reference path='State/Levels/Zone4/Level3.ts'/>

/// <reference path='State/GameOver.ts'/>

module Sample {
    export class Game extends Phaser.Game {
        constructor() {
            super(640, 480, Phaser.AUTO, 'game');

            this.state.add('boot', State.Boot);
            this.state.add('preload', State.Preload);
            this.state.add('menu', State.Menu);

            this.state.add('zone1level1', State.Zone1Level1);
            this.state.add('zone1level2', State.Zone1Level2);
            this.state.add('zone1level3', State.Zone1Level3);

            this.state.add('zone2level1', State.Zone2Level1);
            this.state.add('zone2level2', State.Zone2Level2);
            this.state.add('zone2level3', State.Zone2Level3);

            this.state.add('zone3level1', State.Zone3Level1);
            this.state.add('zone3level2', State.Zone3Level2);
            this.state.add('zone3level3', State.Zone3Level3);

            this.state.add('zone4level1', State.Zone4Level1);
            this.state.add('zone4level2', State.Zone4Level2);
            this.state.add('zone4level3', State.Zone4Level3);

            this.state.add('gameOver', State.GameOver);

            this.state.start('boot');
        }
    }
}

window.onload = () => {
    var game = new Sample.Game();
};