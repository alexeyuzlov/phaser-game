module Sample.Prefab {

    export class HUD extends AbstractPrefab {
        healthState: Phaser.Text;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'hud');

            this.fixedToCamera = true;

            this.healthState = game.add.text(8, 8, "", settings.font.whiteBig);
            this.updateHealthState();
            this.addChild(this.healthState);
        }

        updateHealthState() {
            this.healthState.text = "Health: " + this.level.player.health;
        }

        update() {
            this.bringToTop();
        }
    }
}