module Sample.State {

    export class Story2 extends AbstractStory {
        nextLevel: string = Levels[Levels.Zone2Level1];
        content = [' ', 'Story Zone2'];

        preload() {
            super.preload();
        }

        create() {
            super.create();
        }

        update() {
            super.update();
        }
    }
}