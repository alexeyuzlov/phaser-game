module Sample.State {

    export class Zone1 extends AbstractZone {

        preload() {
            super.preload();
        }

        create() {
            super.create();

            this.game.stage.backgroundColor = "#D7F5FF";
        }

        update() {
            super.update();
        }
    }
}