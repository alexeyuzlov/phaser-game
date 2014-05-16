/// <reference path='../../Levels/AbstractZone.ts'/>

module Sample.State {

    export class Zone3 extends AbstractZone {

        preload() {
            this.game.load.image('zone', 'assets/images/levels/zone3.png');
        }

        create() {
            super.create();

            this.player.body.drag.x = 10;
        }

        update() {
            super.update();
        }
    }
}