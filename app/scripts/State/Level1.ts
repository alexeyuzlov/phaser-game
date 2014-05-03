/// <reference path='../Prefab/Player.ts'/>

module Sample.State {
    export class Level1 extends Phaser.State {
        player: Prefab.Player;

        create() {
            this.stage.backgroundColor = '#99CCFF';
            this.player = new Prefab.Player(this.game, 10, 10);
        }
    }
}