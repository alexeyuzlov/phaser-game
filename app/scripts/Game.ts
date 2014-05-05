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
    export enum Levels {
        Zone1Level1, Zone1Level2, Zone1Level3,
        Zone2Level1, Zone2Level2, Zone2Level3,
        Zone3Level1, Zone3Level2, Zone3Level3,
        Zone4Level1, Zone4Level2, Zone4Level3,
    }

    export class Game extends Phaser.Game {
        currentLevel: number = 1;

        constructor() {
            super(640, 480, Phaser.AUTO, 'game');

            this.state.add('boot', State.Boot);
            this.state.add('preload', State.Preload);
            this.state.add('menu', State.Menu);

            this.state.add(Levels.Zone1Level1.toString(), State.Zone1Level1);
            this.state.add(Levels.Zone1Level2.toString(), State.Zone1Level2);
            this.state.add(Levels.Zone1Level3.toString(), State.Zone1Level3);

            this.state.add(Levels.Zone2Level1.toString(), State.Zone2Level1);
            this.state.add(Levels.Zone2Level2.toString(), State.Zone2Level2);
            this.state.add(Levels.Zone2Level3.toString(), State.Zone2Level3);

            this.state.add(Levels.Zone3Level1.toString(), State.Zone3Level1);
            this.state.add(Levels.Zone3Level2.toString(), State.Zone3Level2);
            this.state.add(Levels.Zone3Level3.toString(), State.Zone3Level3);

            this.state.add(Levels.Zone4Level1.toString(), State.Zone4Level1);
            this.state.add(Levels.Zone4Level2.toString(), State.Zone4Level2);
            this.state.add(Levels.Zone4Level3.toString(), State.Zone4Level3);

            this.state.add('gameOver', State.GameOver);

            this.state.start('boot');
        }
    }
}

window.onload = () => {
    var game = new Sample.Game();
};