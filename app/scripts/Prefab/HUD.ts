module Sample.Prefab {

    export class HUD extends Phaser.Sprite {

        healthText: string = "Health: 100";
        healthState: Phaser.Text;

        manaText: string = "Mana: 100";
        manaState: Phaser.Text;

        currentLevelText: string = "Level: 1-1";
        currentLevelState: Phaser.Text;

        textStyle = {
            font: "20px Arial",
            fill: "#ffffff"
        };

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'hud');

            this.fixedToCamera = true;

            this.healthState = game.add.text(8, 8, this.healthText, this.textStyle);
            this.addChild(this.healthState);

            this.manaState = game.add.text(150, 8, this.manaText, this.textStyle);
            this.addChild(this.manaState);

            this.currentLevelState = game.add.text(280, 8, this.currentLevelText, this.textStyle);
            this.addChild(this.currentLevelState);

            game.add.existing(this);
        }

        setHealthState(health: number) {
            this.healthState.text = "Health: " + health.toString();
        }

        setManaState(mana: number) {
            this.manaState.text = "Mana: " + mana.toString();
        }

        setLevelState(level) {
            this.currentLevelState.text = "Level: " + Sample.State.AbstractZone.GetLevelName(level); /* Sample.State.Level.GetLevelByName() */
        }
    }
}