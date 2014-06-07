module Sample.State {

    export class Story1 extends AbstractStory {
        nextLevel: string = Levels[Levels.Zone1Level1];
        content = [' ', 'Story Zone1'];

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