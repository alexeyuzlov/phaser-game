/// <reference path='../../Levels/AbstractZone.ts'/>

module Sample.State {

    export class Zone3 extends AbstractZone {

        preload() {
            super.preload();
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