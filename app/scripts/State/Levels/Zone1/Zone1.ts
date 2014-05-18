module Sample.State {

    export class Zone1 extends AbstractZone {

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