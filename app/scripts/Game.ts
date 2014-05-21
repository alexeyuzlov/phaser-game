/// <reference path='GlobalConfig.ts'/>

module Sample {
    export class Game extends Phaser.Game {
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
    /* Check localStorage */
    (() => {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    })();

    /* Start instance game */
    new Sample.Game();
};