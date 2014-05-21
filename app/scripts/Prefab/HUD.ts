module Sample.Prefab {

    export class HUD extends Phaser.Sprite {
        healthState: Phaser.Text;
        manaState: Phaser.Text;

        constructor(public level:State.AbstractZone, x:number, y:number) {
            super(level.game, x, y, 'hud');

            this.fixedToCamera = true;

            this.healthState = level.game.add.text(8, 8, "", settings.font.whiteBig);
            this.updateHealthState();
            this.addChild(this.healthState);

            this.manaState = level.game.add.text(150, 8, "", settings.font.whiteBig);
            this.updateManaState();
            this.addChild(this.manaState);

            level.game.add.existing(this);
        }

        updateHealthState() {
            this.healthState.text = "Health: " + this.level.player.health.toString();
        }

        updateManaState() {
            this.manaState.text = "Mana: " + this.level.player.manaPoints.toString();
        }

        update() {
            this.bringToTop();
        }
    }
}