/// <reference path='../../Prefab/Player.ts'/>

/// <reference path='../../Prefab/Runner.ts'/>
/// <reference path='../../Prefab/Shooter.ts'/>
/// <reference path='../../Prefab/Flier.ts'/>

module Sample.State {

    export class Level extends Phaser.State {
        nextLevel: string;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;

        runners:Phaser.Group;
        fliers:Phaser.Group;
        shooters:Phaser.Group;
        bullets:Phaser.Group;

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

        private checkCollide() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.runners, this.layer);
            this.game.physics.arcade.collide(this.shooters, this.layer);

            this.shooters.forEach((shooter)=> {
                this.game.physics.arcade.collide(this.player, shooter.bullets, (player, bullet)=> {
                    bullet.kill();
                    this.player.damage(50);
                });
            }, null);
        }

        update() {
            this.checkCollide();

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start(this.nextLevel.toString());
            }
        }
    }
}