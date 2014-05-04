/// <reference path='../../../Prefab/Player.ts'/>

module Sample.State {

    export class Zone1Level1 extends Phaser.State {
        player:Prefab.Player;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        preload() {
            this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('zone', 'assets/images/levels/zone1.png');
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('zone');

            this.map.setCollisionByIndex(1);

            this.layer = this.map.createLayer('main');
            this.layer.resizeWorld();

            //

            this.player = new Prefab.Player(this.game, 120, 120);

            //

            //

            this.game.camera.follow(this.player);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.layer);

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start('zone1level2');
            }
        }
    }
}