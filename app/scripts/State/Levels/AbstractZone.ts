module Sample.State {

    export class AbstractZone extends Phaser.State {
        currentLevel:Levels;
        nextLevel:string;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;
        hud:Prefab.HUD;
        blackScreen: Prefab.BlackScreen;

        spikes:Phaser.Group;
        iceSpikes:Phaser.Group;
        allEnemies:Phaser.Group;
        shooters:Phaser.Group;
        runners:Phaser.Group;
        fliers:Phaser.Group;
        exits:Phaser.Group;

        preload() {
            // All in preload file
        }

        create() {
            settings.storage.setCurrentLevel(this.currentLevel.toString());
            this.game.stage.backgroundColor = "#000000";

            // MAP AND LAYERS
            this.map = this.game.add.tilemap('map');
            this.map.addTilesetImage('ground');
            this.map.setCollisionBetween(1, 5);

            this.layer = this.map.createLayer('layer');
            this.layer.resizeWorld();

            // PREFABS SINGLE
            this.player = new Prefab.Player(this, 220, this.game.world.height - 100);
            this.hud = new Prefab.HUD(this, 0, 0);
            this.hud.alpha = 0;

            // PREFABS MULTIPLE
            var index:number;

            this.exits = this.game.add.group();
            index = this.map.getTilesetIndex('exit');
            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'exit', 0, true, false, this.exits, Prefab.Exit);
            }

            this.spikes = this.game.add.group();
            index = this.map.getTilesetIndex('spike');
            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'spike', 0, true, false, this.spikes, Prefab.Spike);
            }

            this.iceSpikes = this.game.add.group();
            index = this.map.getTilesetIndex('iceSpike');
            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'iceSpike', 0, true, false, this.iceSpikes, Prefab.IceSpike);
                this.iceSpikes.forEach((ice) => {
                    ice.target = this.player;
                }, null);
            }

            this.shooters = this.game.add.group();
            index = this.map.getTilesetIndex('shooter');
            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'shooter', 0, true, false, this.shooters, Prefab.Shooter);
                this.shooters.forEach((shooter) => {
                    shooter.setTarget(this.player);
                }, null);
            }

            this.runners = this.game.add.group();
            index = this.map.getTilesetIndex('runner');
            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'runner', 0, true, false, this.runners, Prefab.Runner);
            }

            this.fliers = this.game.add.group();
            index = this.map.getTilesetIndex('flier');
            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'flier', 0, true, false, this.fliers, Prefab.Flier);
                this.fliers.forEach((flier) => {
                    flier.setTarget(this.player);
                }, null);
            }

            this.allEnemies = this.game.add.group();
            this.allEnemies.add(this.runners);
            this.allEnemies.add(this.shooters);
            this.allEnemies.add(this.fliers);

            // POST-SETTINGS
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

            this.blackScreen = new Prefab.BlackScreen(this);
            this.blackScreen.setText(AbstractZone.GetLevelName(this.currentLevel));
            this.game.add.tween(this.blackScreen)
                .to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true)
                .onComplete.add(()=> {
                    this.hud.alpha = 1;
                });
        }

        private doCollide() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.player, this.exits, (player, exit) => {
                this.startNextLevel();
            });

            this.game.physics.arcade.collide(this.player, this.spikes, (player, spike) => {
                if (!this.player.immortalState) {
                    this.player.makeDamage(spike.damagePoints);
                    this.hud.updateHealthState();
                }
            });

            this.game.physics.arcade.overlap(this.player, this.iceSpikes, (player, ice) => {
                if (!this.player.immortalState) {
                    this.player.makeDamage(ice.damagePoints);
                    this.hud.updateHealthState();
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
                        this.hud.updateHealthState();
                    }
                });
            }, null);

            this.shooters.forEach((shooter)=> {
                this.game.physics.arcade.collide(this.player, shooter.bullets, (player, bullet)=> {
                    bullet.kill();
                    if (!this.player.immortalState) {
                        this.player.makeDamage(bullet.damagePoints);
                        this.hud.updateHealthState();
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
                this.blackScreen.setText("");
                this.game.add.tween(this.blackScreen)
                    .to({ alpha: 1 }, 3000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(()=> {
                        this.startNextLevel();
                    });
            }
        }

        startNextLevel() {
            settings.storage.setHealthPoints(this.player.health.toString());
            settings.storage.setManaPoints(this.player.manaPoints.toString());
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