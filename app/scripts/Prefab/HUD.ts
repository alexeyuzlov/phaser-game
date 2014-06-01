module Sample.Prefab {

    export class HUD extends AbstractPrefab {
        healthState: Phaser.Text;
        manaState: Phaser.Text;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'hud');

            this.fixedToCamera = true;

            this.healthState = game.add.text(8, 8, "", settings.font.whiteBig);
            this.updateHealthState();
            this.addChild(this.healthState);

            this.manaState = game.add.text(150, 8, "", settings.font.whiteBig);
            this.updateManaState();
            this.addChild(this.manaState);
        }

        updateHealthState() {
            this.healthState.text = "Health: " + this.level.player.health;
        }

        updateManaState() {
            this.manaState.text = "Mana: " + this.level.player.manaPoints;
        }

        update() {
            this.bringToTop();
        }
    }
}