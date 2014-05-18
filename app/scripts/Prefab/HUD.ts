module Sample.Prefab {

    export class HUD extends Phaser.Sprite {
        healthState: Phaser.Text;
        manaState: Phaser.Text;
        currentLevelState: Phaser.Text;

        textStyle = {
            font: "20px Arial",
            fill: "#ffffff"
        };

        constructor(public level:State.AbstractZone, x:number, y:number) {
            super(level.game, x, y, 'hud');

            this.fixedToCamera = true;

            this.healthState = level.game.add.text(8, 8, "", this.textStyle);
            this.updateHealthState();
            this.addChild(this.healthState);

            this.manaState = level.game.add.text(150, 8, "", this.textStyle);
            this.updateManaState();
            this.addChild(this.manaState);

            this.currentLevelState = level.game.add.text(280, 8, "", this.textStyle);
            this.updateLevelState();
            this.addChild(this.currentLevelState);

            level.game.add.existing(this);
        }

        updateHealthState() {
            this.healthState.text = "Health: " + this.level.player.health.toString();
        }

        updateManaState() {
            this.manaState.text = "Mana: " + this.level.player.manaPoints.toString();
        }

        updateLevelState() {
            this.currentLevelState.text = "Level: " + Sample.State.AbstractZone.GetLevelName(this.level.currentLevel);
        }
    }
}