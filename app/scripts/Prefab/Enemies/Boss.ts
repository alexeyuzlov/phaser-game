module Sample.Prefab {

    export class Boss extends AbstractEnemy {
        bossTweens: Phaser.Group;
        activeTweenID: number;

        lastEventAt: number = 0;
        eventDuration: number = Phaser.Timer.SECOND * 3;
        inAction = false;

        health: number = 1000;

        constructor(game:Phaser.Game, bossTweens: Phaser.Group) {
            super(game, bossTweens.children[0].x,
                bossTweens.children[0].y, 'boss');

            this.activeTweenID = 0;
            this.bossTweens = bossTweens;

            this.anchor.set(0.5, 1);
        }

        generateAction() {
            var actionRandom = Math.random() * 100;

            if (actionRandom > 90) {
                // vulnerability
                this.alpha = 0.5;

                this.inAction = false;
            }
            else if (actionRandom > 70 && actionRandom <= 90) {
                // shot
                this.inAction = false;
            } else {
                // move
                this.lastEventAt = this.game.time.now;

                var tween = this.game.add.tween(this);

                do {
                    var rand = Math.floor(Math.random() * this.bossTweens.children.length);
                } while (rand == this.activeTweenID);
                this.activeTweenID = rand;

                tween.to({
                    x: this.bossTweens.children[this.activeTweenID].x,
                    y: this.bossTweens.children[this.activeTweenID].y
                }, Math.random() * 1000 + 2000, Phaser.Easing.Quadratic.In, true, 0, 0, false);

                tween.onComplete.add(()=> {
                    this.inAction = false;
                });
            }
        }

        update() {
            super.update();

            if (!this.inAction) {
                this.inAction = true;
                this.generateAction();
            }
        }
    }
}