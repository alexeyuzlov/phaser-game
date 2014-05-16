/// <reference path='../../Levels/AbstractZone.ts'/>

module Sample.State {

    export class Zone4 extends AbstractZone {

        preload() {
            this.game.load.image('zone', 'assets/images/levels/zone4.png');
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}