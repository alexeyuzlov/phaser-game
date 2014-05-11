/// <reference path='../../Prefab/Player.ts'/>

/// <reference path='../../Prefab/Runner.ts'/>
/// <reference path='../../Prefab/Shooter.ts'/>
/// <reference path='../../Prefab/Flier.ts'/>

/// <reference path='../../Prefab/HUD.ts'/>

module Sample.State {

    export class Level extends Phaser.State {
        currentLevel: Levels;
        nextLevel: string;

        score: number = 0;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;

        allEnemies:Phaser.Group;
        shooters:Phaser.Group;
        runners:Phaser.Group;
        fliers:Phaser.Group;

        hud: Prefab.HUD;

        create() {
            // PRE-SETTINGS
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // MAP AND LAYERS
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('zone');
            this.map.setCollision(1);

            this.layer = this.map.createLayer('main');
            this.layer.resizeWorld();

            // PREFABS
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

            this.game.physics.arcade.collide(this.shooters, this.layer);
            this.game.physics.arcade.collide(this.runners, this.layer);

            // check weapon activity
            /*
            this.allEnemies.forEach((enemyGroup) => {
                this.game.physics.arcade.overlap(this.player.weapon, enemyGroup, (weapon, enemy)=> {
                    enemy.damage(weapon.damagePoint);
                    this.score++;
                    this.hud.setScoreState(this.score);
                });
            }, null);
            */

            // check bullets activity
            this.shooters.forEach((shooter)=> {
                this.game.physics.arcade.collide(this.player, shooter.bullets, (player, bullet)=> {
                    bullet.kill();

                    if (!this.player.immortalState) {
                        this.player.makeDamage(bullet.damagePoint);

                        this.hud.setHealthState(this.player.health);
                    }
                });
            }, null);
        }

        update() {
            this.doCollide();

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.game.state.start(this.nextLevel.toString());
            }
        }

        static GetLevelName(level: Levels) {
            switch (level) {
                case Levels.Zone1Level1: return '1-1';
                case Levels.Zone1Level2: return '1-2';
                case Levels.Zone1Level3: return '1-3';

                case Levels.Zone2Level1: return '2-1';
                case Levels.Zone2Level2: return '2-2';
                case Levels.Zone2Level3: return '2-3';

                case Levels.Zone3Level1: return '3-1';
                case Levels.Zone3Level2: return '3-2';
                case Levels.Zone3Level3: return '3-3';

                case Levels.Zone4Level1: return '4-1';
                case Levels.Zone4Level2: return '4-2';
                case Levels.Zone4Level3: return '4-3';

                default: return 'X-X';
            }
        }
    }
}