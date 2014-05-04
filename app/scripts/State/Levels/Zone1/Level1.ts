/// <reference path='../../../Prefab/Player.ts'/>

/// <reference path='../../../Prefab/Runner.ts'/>
/// <reference path='../../../Prefab/Shooter.ts'/>
/// <reference path='../../../Prefab/Flier.ts'/>

module Sample.State {

    export class Zone1Level1 extends Phaser.State {
        player:Prefab.Player;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        runners: Phaser.Group;
        shooters: Phaser.Group;
        fliers: Phaser.Group;

        preload() {
            this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('zone', 'assets/images/levels/zone1.png');
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('zone');
            this.map.setCollision(1);

            this.layer = this.map.createLayer('main');
            this.layer.resizeWorld();

            this.player = new Prefab.Player(this.game, 120, 120);

            this.shooters = this.game.add.group();
            this.map.createFromObjects('enemies', 3, 'shooter', 0, true, false, this.shooters, Prefab.Shooter);

            this.runners = this.game.add.group();
            this.map.createFromObjects('enemies', 4, 'runner', 0, true, false, this.runners, Prefab.Runner);

            this.fliers = this.game.add.group();
            this.map.createFromObjects('enemies', 5, 'flier', 0, true, false, this.fliers, Prefab.Flier);
            this.fliers.forEach((flier) => {
                flier.setTarget(this.player);
            }, null);


            this.game.camera.follow(this.player);
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.runners, this.layer);
            this.game.physics.arcade.collide(this.shooters, this.layer);

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start('zone1level2');
            }
        }
    }
}