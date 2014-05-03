/// <reference path='../Prefab/Player.ts'/>
/// <reference path='../Prefab/Runner.ts'/>

module Sample.State {
    export class Level1 extends Phaser.State {
        player:Prefab.Player;
        runner:Prefab.Runner;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        preload() {
            this.game.load.tilemap('map', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'assets/images/tiles.png');
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('tiles');

            this.map.setCollisionByIndex(1);

            this.layer = this.map.createLayer('mainLayer');
            this.layer.resizeWorld();

            this.player = new Prefab.Player(this.game, 610, 10);

            this.runner = new Prefab.Runner(this.game, 640, 230);

            this.game.camera.follow(this.player);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.runner, this.layer);
        }
    }
}