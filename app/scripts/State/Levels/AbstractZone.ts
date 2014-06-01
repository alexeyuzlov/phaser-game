module Sample.State {

    export class AbstractZone extends Phaser.State {
        currentLevel:string;
        nextLevel:string;

        map:Phaser.Tilemap;
        layer:Phaser.TilemapLayer;

        player:Prefab.Player;
        hud:Prefab.HUD;
        blackScreen:Prefab.BlackScreen;

        transparents:Phaser.Group;
        spikes:Phaser.Group;
        iceSpikes:Phaser.Group;
        exits:Phaser.Group;

        platformsHorizontal:Phaser.Group;
        platformsVertical:Phaser.Group;

        shooters:Phaser.Group;
        shootersReject:Phaser.Group;
        runners:Phaser.Group;
        fliers:Phaser.Group;
        fliersCrash:Phaser.Group;

        bottlesHP:Phaser.Group;
        bottlesMP:Phaser.Group;
        bottlesSuper:Phaser.Group;

        preload() {
            // All in preload file
            // Don't delete this function
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
            this.player = new Prefab.Player(this.game, 220, 100);
            this.hud = new Prefab.HUD(this.game, 0, 0);
            this.hud.alpha = 0;

            this.transparents = this.getPrefabsFromMap('transparent', Prefab.Transparent);
            this.exits = this.getPrefabsFromMap('exit', Prefab.Exit);
            this.spikes = this.getPrefabsFromMap('spike', Prefab.Spike);
            this.iceSpikes = this.getPrefabsFromMap('ice-spike', Prefab.IceSpike);
            this.bottlesHP = this.getPrefabsFromMap('bottle-hp', Prefab.BottleHP);
            this.bottlesMP = this.getPrefabsFromMap('bottle-mp', Prefab.BottleMP);
            this.bottlesSuper = this.getPrefabsFromMap('bottle-super', Prefab.BottleSuper);
            this.shooters = this.getPrefabsFromMap('shooter', Prefab.Shooter);
            this.shootersReject = this.getPrefabsFromMap('shooter-reject', Prefab.ShooterReject);
            this.runners = this.getPrefabsFromMap('runner', Prefab.Runner);
            this.fliers = this.getPrefabsFromMap('flier', Prefab.Flier);
            this.fliersCrash = this.getPrefabsFromMap('flier-crash', Prefab.FlierCrash);
            this.platformsHorizontal = this.getPrefabsFromMap('platform-h', Prefab.PlatformHorizontal);
            this.platformsVertical = this.getPrefabsFromMap('platform-v', Prefab.PlatformVertical);

            // POST-SETTINGS
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

            this.blackScreen = new Prefab.BlackScreen(this.game);
            this.blackScreen.setText(this.currentLevel);
            this.game.add.tween(this.blackScreen)
                .to({ alpha: 0 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                .onComplete.add(()=> {
                    this.hud.alpha = 1;
                });
        }

        getPrefabsFromMap(name: string, className: Object): Phaser.Group {
            var group = this.game.add.group();

            var index = this.map.getTilesetIndex(name);

            if (index) {
                this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, name, 0, true, false, group, className);
            }

            return group;
        }

        render() {
            //this.game.debug.spriteInfo(this.player, 100, 100);
        }

        update() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.blackScreen.setText("");
                this.game.add.tween(this.blackScreen)
                    .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                    .onComplete.add(()=> {
                        this.startNextLevel();
                    });
            }
        }

        gameOver() {
            this.blackScreen.setText("Game Over. Reload Level.");
            this.game.add.tween(this.blackScreen)
                .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                .onComplete.add(()=> {
                    this.game.state.start(this.currentLevel);
                });
        }

        startNextLevel() {
            settings.storage.setHealthPoints(this.player.health.toString());
            settings.storage.setManaPoints(this.player.manaPoints.toString());
            this.game.state.start(this.nextLevel);
        }
    }
}