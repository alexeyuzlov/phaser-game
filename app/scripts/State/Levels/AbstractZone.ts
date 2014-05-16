/// <reference path='../../Prefab/Player.ts'/>

/// <reference path='../../Prefab/Barb.ts'/>
/// <reference path='../../Prefab/Ice.ts'/>

/// <reference path='../../Prefab/Enemies/Runner.ts'/>
/// <reference path='../../Prefab/Enemies/Shooter.ts'/>
/// <reference path='../../Prefab/Enemies/Flier.ts'/>

/// <reference path='../../Prefab/HUD.ts'/>

/// <reference path='../../Prefab/ExitDoor.ts'/>

module Sample.State {

    export class AbstractZone extends Phaser.State {
        currentLevel:Levels;
        nextLevel:string;

        score:number = 0;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;
        exitDoor:Prefab.ExitDoor;

        barbs:Phaser.Group;
        ice:Phaser.Group;

        allEnemies:Phaser.Group;
        shooters:Phaser.Group;
        runners:Phaser.Group;
        fliers:Phaser.Group;

        hud:Prefab.HUD;

        create() {
            // PRE-SETTINGS
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // MAP AND LAYERS
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('zone');
            this.map.setCollision(1);

            this.layer = this.map.createLayer('main');
            this.layer.resizeWorld();

            // PREFABS SINGLE
            this.exitDoor = new Prefab.ExitDoor(this.game, 10, this.game.world.height - 64 - 200);

            this.player = new Prefab.Player(this.game, 220, this.game.world.height - 100);

            // PREFABS MULTIPLE
            this.barbs = this.game.add.group();
            this.map.createFromObjects('objects', 6, 'barb', 0, true, false, this.barbs, Prefab.Barb);

            this.ice = this.game.add.group();
            this.map.createFromObjects('objects', 8, 'ice', 0, true, false, this.ice, Prefab.Ice);
            this.ice.forEach((iceOne) => {
                iceOne.setTarget(this.player);
            }, null);

            this.shooters = this.game.add.group();
            this.map.createFromObjects('enemies', 3, 'shooter', 0, true, false, this.shooters, Prefab.Shooter);

            this.runners = this.game.add.group();
            this.map.createFromObjects('enemies', 4, 'runner', 0, true, false, this.runners, Prefab.Runner);

            this.fliers = this.game.add.group();
            this.map.createFromObjects('enemies', 5, 'flier', 0, true, false, this.fliers, Prefab.Flier);
            this.fliers.forEach((flier) => {
                flier.setTarget(this.player);
            }, null);

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
            this.game.physics.arcade.collide(this.player, this.exitDoor, (player, exitDoor) => {
                this.startNextLevel();
            });

            this.game.physics.arcade.collide(this.player, this.barbs, (player, barb) => {
                if (!this.player.immortalState) {
                    this.player.makeDamage(barb.damagePoints);
                    this.hud.setHealthState(this.player.health);
                }
            });

            this.game.physics.arcade.collide(this.player, this.ice, (player, ice) => {
                if (!this.player.immortalState) {
                    this.player.makeDamage(ice.damagePoints);
                    this.hud.setHealthState(this.player.health);
                }
            });

            this.game.physics.arcade.collide(this.shooters, this.layer);
            this.game.physics.arcade.collide(this.runners, this.layer);

            // check weapon activity
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