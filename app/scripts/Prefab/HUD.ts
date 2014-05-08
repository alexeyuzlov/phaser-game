module Sample.Prefab {

    export class HUD extends Phaser.Sprite {

        healthText: string = "Health: 100";
        healthState: Phaser.Text;

        manaText: string = "Mana: 100";
        manaState: Phaser.Text;

        currentLevelText: string = "Level: 1-1";
        currentLevelState: Phaser.Text;

        scoreText: string = "Score: 0";
        scoreState: Phaser.Text;

        textStyle = {
            font: "20px Arial",
            fill: "#ffffff"
        };

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'hud');

            this.fixedToCamera = true;

            this.healthState = this.game.add.text(this.x + 10, this.y + 8, this.healthText, this.textStyle);
            this.addChild(this.healthState);

            this.manaState = this.game.add.text(this.x + 150, this.y + 8, this.manaText, this.textStyle);
            this.addChild(this.manaState);

            this.currentLevelState = this.game.add.text(this.x + 280, this.y + 8, this.currentLevelText, this.textStyle);
            this.addChild(this.currentLevelState);

            this.scoreState = this.game.add.text(this.x + 550, this.y + 8, this.scoreText, this.textStyle);
            this.addChild(this.scoreState);

            game.add.existing(this);
        }

        setHealthState(health: number) {
            this.healthState.text = "Health: " + health.toString();
        }

        setManaState(mana: number) {
            this.manaState.text = "Mana: " + mana.toString();
        }

        setLevelState(level) {
            this.currentLevelState.text = "Level: " + Sample.State.Level.GetLevelName(level); /* Sample.State.Level.GetLevelByName() */
        }

        setScoreState(score: number) {
            this.scoreState.text = "Score: " + score.toString();
        }
    }
}