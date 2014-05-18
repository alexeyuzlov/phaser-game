module Sample.State {

    export class AbstractZone extends Phaser.State {
        currentLevel:Levels;
        nextLevel:string;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;
        hud:Prefab.HUD;

        barbs:Phaser.Group;
        ice:Phaser.Group;
        allEnemies:Phaser.Group;
        shooters:Phaser.Group;
        runners:Phaser.Group;
        fliers:Phaser.Group;
        exitDoors:Phaser.Group;

        create() {
            // PRE-SETTINGS
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // MAP AND LAYERS
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('zone');
            this.map.addTilesetImage('exitDoor');
            this.map.setCollision([1]);

            this.layer = this.map.createLayer('main');
            this.layer.resizeWorld();

            // PREFABS SINGLE
            this.player = new Prefab.Player(this, 220, this.game.world.height - 100);

            // PREFABS MULTIPLE
            var index:number;

            index = this.map.getTilesetIndex('exitDoor');
            if (index) {
                this.exitDoors = this.game.add.group();
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'exitDoor', 0, true, false, this.exitDoors, Prefab.ExitDoor);
            }

            index = this.map.getTilesetIndex('barb');
            if (index) {
                this.barbs = this.game.add.group();
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'barb', 0, true, false, this.barbs, Prefab.Barb);
            }

            index = this.map.getTilesetIndex('ice');
            if (index) {
                this.ice = this.game.add.group();
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'ice', 0, true, false, this.ice, Prefab.Ice);
                this.ice.forEach((iceOne) => {
                    iceOne.setTarget(this.player);
                }, null);
            }

            index = this.map.getTilesetIndex('shooter');
            if (index) {
                this.shooters = this.game.add.group();
                this.map.createFromObjects('enemies', this.map.tilesets[index].firstgid, 'shooter', 0, true, false, this.shooters, Prefab.Shooter);
            }

            index = this.map.getTilesetIndex('runner');
            if (index) {
                this.runners = this.game.add.group();
                this.map.createFromObjects('enemies', this.map.tilesets[index].firstgid, 'runner', 0, true, false, this.runners, Prefab.Runner);
            }

            index = this.map.getTilesetIndex('flier');
            if (index) {
                this.fliers = this.game.add.group();
                this.map.createFromObjects('enemies', this.map.tilesets[index].firstgid, 'flier', 0, true, false, this.fliers, Prefab.Flier);
                this.fliers.forEach((flier) => {
                    flier.setTarget(this.player);
                }, null);
            }

            this.allEnemies = this.game.add.group();
            this.allEnemies.add(this.runners);
            this.allEnemies.add(this.shooters);
            this.allEnemies.add(this.fliers);

            // HUD MANAGER
            this.hud = new Prefab.HUD(this.game, 0, 0);
            this.hud.setLevelState(this.currentLevel);

            // POST-SETTINGS
            this.game.camera.follow(this.player);
        }

        private doCollide() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.player, this.exitDoors, (player, exitDoor) => {
                this.startNextLevel();
            });

            this.game.physics.arcade.collide(this.player, this.barbs, (player, barb) => {
                if (!this.player.immortalState) {
                    this.player.makeDamage(barb.damagePoints);
                    this.hud.setHealthState(this.player.health);
                }
            });

            this.game.physics.arcade.overlap(this.player, this.ice, (player, ice) => {
                if (!this.player.immortalState) {
                    this.player.makeDamage(ice.damagePoints);
                    this.hud.setHealthState(this.player.health);
                }
            });

            this.game.physics.arcade.collide(this.shooters, this.layer);
            this.game.physics.arcade.collide(this.runners, this.layer);

            this.allEnemies.forEach((enemyGroup) => {
                this.game.physics.arcade.overlap(this.player, enemyGroup, (player, enemy)=> {
                    if (player.attackState) {
                        enemy.makeDamage(player.damagePoints);
                    } else if (!this.player.immortalState) {
                        this.player.makeDamage(enemy.damagePoints);
                        this.hud.setHealthState(this.player.health);
                    }
                });
            }, null);

            this.shooters.forEach((shooter)=> {
                this.game.physics.arcade.collide(this.player, shooter.bullets, (player, bullet)=> {
                    bullet.kill();
                    if (!this.player.immortalState) {
                        this.player.makeDamage(bullet.damagePoints);
                        this.hud.setHealthState(this.player.health);
                    }
                });
            }, null);
        }

        render() {
            //this.game.debug.spriteInfo(this.player, 100, 100);
        }

        update() {
            this.doCollide();

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.startNextLevel();
            }
        }

        startNextLevel() {
            this.game.state.start(this.nextLevel.toString());
        }

        static GetLevelName(level:Levels) {
            switch (level) {
                case Levels.Zone1Level1:
                    return '1-1';
                case Levels.Zone1Level2:
                    return '1-2';
                case Levels.Zone1Level3:
                    return '1-3';

                case Levels.Zone2Level1:
                    return '2-1';
                case Levels.Zone2Level2:
                    return '2-2';
                case Levels.Zone2Level3:
                    return '2-3';

                case Levels.Zone3Level1:
                    return '3-1';
                case Levels.Zone3Level2:
                    return '3-2';
                case Levels.Zone3Level3:
                    return '3-3';

                case Levels.Zone4Level1:
                    return '4-1';
                case Levels.Zone4Level2:
                    return '4-2';
                case Levels.Zone4Level3:
                    return '4-3';

                default:
                    return 'X-X';
            }
        }
    }
}