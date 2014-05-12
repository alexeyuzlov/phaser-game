/// <reference path='../../Levels/Level.ts'/>

module Sample.State {

    export class Zone1 extends Level {

        preload() {
            this.game.load.image('zone', 'assets/images/levels/zone1.png');
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}