var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sample;
(function (Sample) {
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/prefabs/preload-bar.png');
            };

            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                var preloadBar = new Sample.Prefab.PreloadBar(this.game, this.game.world.width - 10, this.game.world.height - 10);
                this.load.setPreloadSprite(preloadBar);

                this.load.atlasXML('player', 'assets/images/prefabs/player/player.png', 'assets/images/prefabs/player/player.xml');

                this.load.image('hud', 'assets/images/prefabs/hud.png');
                this.load.image('ground', 'assets/images/ground.png');

                this.load.image('platform-h', 'assets/images/prefabs/platform-h.png');
                this.load.image('platform-v', 'assets/images/prefabs/platform-v.png');

                this.load.image('bottle-hp', 'assets/images/prefabs/bottles/bottle-hp.png');
                this.load.image('bottle-mp', 'assets/images/prefabs/bottles/bottle-mp.png');
                this.load.image('bottle-super', 'assets/images/prefabs/bottles/bottle-super.png');

                this.load.image('transparent', 'assets/images/prefabs/transparent.png');
                this.load.image('exit', 'assets/images/prefabs/exit.png');
                this.load.image('spike', 'assets/images/prefabs/spike.png');
                this.load.image('ice-spike', 'assets/images/prefabs/ice-spike.png');

                this.load.image('runner', 'assets/images/prefabs/enemies/runner.png');
                this.load.image('flier', 'assets/images/prefabs/enemies/flier.png');
                this.load.image('shooter', 'assets/images/prefabs/enemies/shooter.png');
                this.load.image('bullet', 'assets/images/prefabs/enemies/bullet.png');

                this.load.image('shooter-reject', 'assets/images/prefabs/enemies/shooter-reject.png');
                this.load.image('bullet-reject', 'assets/images/prefabs/enemies/bullet-reject.png');
            };

            Preload.prototype.create = function () {
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.preload = function () {
            };

            Menu.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';
            };

            Menu.prototype.update = function () {
                this.game.state.start(Sample.settings.storage.getCurrentLevel());
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var AbstractZone = (function (_super) {
            __extends(AbstractZone, _super);
            function AbstractZone() {
                _super.apply(this, arguments);
            }
            AbstractZone.prototype.preload = function () {
            };

            AbstractZone.prototype.create = function () {
                var _this = this;
                Sample.settings.storage.setCurrentLevel(this.currentLevel.toString());
                this.game.stage.backgroundColor = "#000000";

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('ground');
                this.map.setCollisionBetween(1, 5);

                this.layer = this.map.createLayer('layer');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this, 220, this.game.world.height - 100);
                this.hud = new Sample.Prefab.HUD(this, 0, 0);
                this.hud.alpha = 0;

                this.getPrefabsFromMap();

                this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

                this.blackScreen = new Sample.Prefab.BlackScreen(this);
                this.blackScreen.setText(this.currentLevel);
                this.game.add.tween(this.blackScreen).to({ alpha: 0 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                    _this.hud.alpha = 1;
                });
            };

            AbstractZone.prototype.getPrefabsFromMap = function () {
                var _this = this;
                var index;

                this.transparents = this.game.add.group();
                index = this.map.getTilesetIndex('transparent');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'transparent', 0, true, false, this.transparents, Sample.Prefab.Transparent);
                }

                this.exits = this.game.add.group();
                index = this.map.getTilesetIndex('exit');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'exit', 0, true, false, this.exits, Sample.Prefab.Exit);
                }

                this.spikes = this.game.add.group();
                index = this.map.getTilesetIndex('spike');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'spike', 0, true, false, this.spikes, Sample.Prefab.Spike);
                }

                this.iceSpikes = this.game.add.group();
                index = this.map.getTilesetIndex('ice-spike');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'ice-spike', 0, true, false, this.iceSpikes, Sample.Prefab.IceSpike);
                    this.iceSpikes.forEach(function (ice) {
                        ice.target = _this.player;
                    }, null);
                }

                this.getBottlesPrefabsFromMap();
                this.getEnemiesPrefabsFromMap();
                this.getPlatformsPrefabsFromMap();
            };

            AbstractZone.prototype.getEnemiesPrefabsFromMap = function () {
                var _this = this;
                this.allEnemies = this.game.add.group();
                var index;

                this.shooters = this.game.add.group();
                index = this.map.getTilesetIndex('shooter');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'shooter', 0, true, false, this.shooters, Sample.Prefab.Shooter);
                    this.shooters.forEach(function (shooter) {
                        shooter.setTarget(_this.player);
                    }, null);
                }
                this.allEnemies.add(this.shooters);

                this.shootersReject = this.game.add.group();
                index = this.map.getTilesetIndex('shooter-reject');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'shooter-reject', 0, true, false, this.shootersReject, Sample.Prefab.ShooterReject);
                    this.shootersReject.forEach(function (shooterReject) {
                        shooterReject.setTarget(_this.player);
                    }, null);
                }
                this.allEnemies.add(this.shootersReject);

                this.runners = this.game.add.group();
                index = this.map.getTilesetIndex('runner');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'runner', 0, true, false, this.runners, Sample.Prefab.Runner);
                }
                this.allEnemies.add(this.runners);

                this.fliers = this.game.add.group();
                index = this.map.getTilesetIndex('flier');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'flier', 0, true, false, this.fliers, Sample.Prefab.Flier);
                    this.fliers.forEach(function (flier) {
                        flier.setTarget(_this.player);
                    }, null);
                }
                this.allEnemies.add(this.fliers);
            };

            AbstractZone.prototype.getPlatformsPrefabsFromMap = function () {
                var index;

                this.platformsHorizontal = this.game.add.group();
                index = this.map.getTilesetIndex('platform-h');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'platform-h', 0, true, false, this.platformsHorizontal, Sample.Prefab.PlatformHorizontal);
                }

                this.platformsVertical = this.game.add.group();
                index = this.map.getTilesetIndex('platform-v');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'platform-v', 0, true, false, this.platformsVertical, Sample.Prefab.PlatformVertical);
                }

                this.allPlatforms = this.game.add.group();
                this.allPlatforms.add(this.platformsHorizontal);
                this.allPlatforms.add(this.platformsVertical);
            };

            AbstractZone.prototype.getBottlesPrefabsFromMap = function () {
                var index;

                this.bottlesHP = this.game.add.group();
                index = this.map.getTilesetIndex('bottle-hp');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'bottle-hp', 0, true, false, this.bottlesHP, Sample.Prefab.BottleHP);
                }

                this.bottlesMP = this.game.add.group();
                index = this.map.getTilesetIndex('bottle-mp');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'bottle-mp', 0, true, false, this.bottlesMP, Sample.Prefab.BottleMP);
                }

                this.bottlesSuper = this.game.add.group();
                index = this.map.getTilesetIndex('bottle-super');
                if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, 'bottle-super', 0, true, false, this.bottlesSuper, Sample.Prefab.BottleSuper);
                }

                this.allBottles = this.game.add.group();
                this.allBottles.add(this.bottlesHP);
                this.allBottles.add(this.bottlesMP);
                this.allBottles.add(this.bottlesSuper);
            };

            AbstractZone.prototype.doCollide = function () {
                var _this = this;
                this.game.physics.arcade.collide(this.player, this.layer);

                this.game.physics.arcade.collide(this.player, this.exits, function (player, exit) {
                    _this.startNextLevel();
                });

                this.game.physics.arcade.collide(this.player, this.spikes, function (player, spike) {
                    if (!_this.player.immortalState) {
                        _this.player.makeDamage(spike.damagePoints);
                        _this.hud.updateHealthState();
                    }
                });

                this.game.physics.arcade.overlap(this.player, this.iceSpikes, function (player, ice) {
                    if (!_this.player.immortalState) {
                        _this.player.makeDamage(ice.damagePoints);
                        _this.hud.updateHealthState();
                    }
                });

                this.game.physics.arcade.collide(this.shootersReject, this.layer);
                this.game.physics.arcade.collide(this.shooters, this.layer);
                this.game.physics.arcade.collide(this.runners, this.layer);

                this.allEnemies.forEach(function (enemiesGroup) {
                    _this.game.physics.arcade.overlap(_this.player, enemiesGroup, function (player, enemy) {
                        if (player.attackState) {
                            enemy.makeDamage(player.damagePoints);
                        } else if (!_this.player.immortalState) {
                            _this.player.makeDamage(enemy.damagePoints);
                            _this.hud.updateHealthState();
                        }
                    });
                }, null);

                this.shooters.forEach(function (shooter) {
                    _this.game.physics.arcade.collide(_this.player, shooter.bullets, function (player, bullet) {
                        bullet.kill();
                        if (!_this.player.immortalState) {
                            _this.player.makeDamage(bullet.damagePoints);
                            _this.hud.updateHealthState();
                        }
                    });
                }, null);

                this.shootersReject.forEach(function (shooterReject) {
                    _this.game.physics.arcade.overlap(_this.player, shooterReject.bullets, function (player, bulletReject) {
                        if (bulletReject.rejectState)
                            return;

                        if (_this.player.attackState) {
                            bulletReject.body.velocity.x = -bulletReject.body.velocity.x;
                            bulletReject.rejectState = true;
                        } else {
                            bulletReject.kill();
                            if (!_this.player.immortalState) {
                                _this.player.makeDamage(bulletReject.damagePoints);
                                _this.hud.updateHealthState();
                            }
                        }
                    });

                    _this.game.physics.arcade.overlap(shooterReject, shooterReject.bullets, function (_shooterReject, bulletReject) {
                        if (bulletReject.rejectState) {
                            bulletReject.kill();
                            shooterReject.makeDamage(bulletReject.damageRejectPoints);
                        }
                    });
                }, null);

                this.allPlatforms.forEach(function (platformsGroup) {
                    _this.game.physics.arcade.collide(_this.player, platformsGroup);
                    _this.game.physics.arcade.overlap(platformsGroup, _this.transparents, function (platform, transparent) {
                        platform.toggleDirection();
                    });
                }, null);

                this.allBottles.forEach(function (bottlesGroup) {
                    _this.game.physics.arcade.overlap(_this.player, bottlesGroup, function (player, bottle) {
                        bottle.makeAction(player);
                        bottle.kill();
                    });
                }, null);
            };

            AbstractZone.prototype.render = function () {
            };

            AbstractZone.prototype.update = function () {
                var _this = this;
                this.doCollide();

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.blackScreen.setText("");
                    this.game.add.tween(this.blackScreen).to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                        _this.startNextLevel();
                    });
                }
            };

            AbstractZone.prototype.gameOver = function () {
                var _this = this;
                this.blackScreen.setText("Game Over. Reload Level.");
                this.game.add.tween(this.blackScreen).to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                    _this.game.state.start(_this.currentLevel);
                });
            };

            AbstractZone.prototype.startNextLevel = function () {
                Sample.settings.storage.setHealthPoints(this.player.health.toString());
                Sample.settings.storage.setManaPoints(this.player.manaPoints.toString());
                this.game.state.start(this.nextLevel);
            };
            return AbstractZone;
        })(Phaser.State);
        State.AbstractZone = AbstractZone;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var AbstractStory = (function (_super) {
            __extends(AbstractStory, _super);
            function AbstractStory() {
                _super.apply(this, arguments);
                this.index = 0;
                this.line = '';
            }
            AbstractStory.prototype.preload = function () {
            };

            AbstractStory.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';

                this.text = this.game.add.text(10, 10, '', Sample.settings.font.whiteBig);
                this.nextLine();
            };

            AbstractStory.prototype.nextLine = function () {
                this.index++;

                if (this.index < this.content.length) {
                    this.line = '';
                    this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
                } else {
                    this.game.state.start(this.nextLevel);
                }
            };

            AbstractStory.prototype.updateLine = function () {
                if (this.line.length < this.content[this.index].length) {
                    this.line = this.content[this.index].substr(0, this.line.length + 1);
                    this.text.setText(this.line);
                } else {
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
                }
            };
            return AbstractStory;
        })(Phaser.State);
        State.AbstractStory = AbstractStory;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone1 = (function (_super) {
            __extends(Zone1, _super);
            function Zone1() {
                _super.apply(this, arguments);
            }
            Zone1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.spritesheet('rain', 'assets/images/rain.png', 8, 8);
            };

            Zone1.prototype.create = function () {
                _super.prototype.create.call(this);
                this.game.stage.backgroundColor = "#D7F5FF";
            };

            Zone1.prototype.update = function () {
                _super.prototype.update.call(this);
            };

            Zone1.prototype.rainCreate = function () {
                var emitter = this.game.add.emitter(this.game.world.centerX, 0, 1000);

                emitter.width = this.game.world.width + this.game.world.width * 0.2;
                emitter.angle = 20;

                emitter.makeParticles('rain');

                emitter.minParticleScale = 0.2;
                emitter.maxParticleScale = 0.7;

                emitter.setYSpeed(100, 700);
                emitter.setXSpeed(-5, 5);

                emitter.minRotation = 0;
                emitter.maxRotation = 0;

                emitter.start(false, 3000, 5, 0);
            };
            return Zone1;
        })(State.AbstractZone);
        State.Zone1 = Zone1;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Story1 = (function (_super) {
            __extends(Story1, _super);
            function Story1() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[0 /* Zone1Level1 */];
                this.content = [' ', 'Story Zone1'];
            }
            Story1.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };

            Story1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Story1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story1;
        })(State.AbstractStory);
        State.Story1 = Story1;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone1Level1 = (function (_super) {
            __extends(Zone1Level1, _super);
            function Zone1Level1() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[0 /* Zone1Level1 */];
                this.nextLevel = Sample.Levels[1 /* Zone1Level2 */];
            }
            Zone1Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone1Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone1Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level1;
        })(State.Zone1);
        State.Zone1Level1 = Zone1Level1;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone1Level2 = (function (_super) {
            __extends(Zone1Level2, _super);
            function Zone1Level2() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[1 /* Zone1Level2 */];
                this.nextLevel = Sample.Levels[2 /* Zone1Level3 */];
            }
            Zone1Level2.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/1-2.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone1Level2.prototype.create = function () {
                _super.prototype.create.call(this);
                this.rainCreate();
            };

            Zone1Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level2;
        })(State.Zone1);
        State.Zone1Level2 = Zone1Level2;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone1Level3 = (function (_super) {
            __extends(Zone1Level3, _super);
            function Zone1Level3() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[2 /* Zone1Level3 */];
                this.nextLevel = Sample.Stories[1 /* Story2 */];
            }
            Zone1Level3.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone1Level3.prototype.create = function () {
                _super.prototype.create.call(this);
                this.rainCreate();
            };

            Zone1Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level3;
        })(State.Zone1);
        State.Zone1Level3 = Zone1Level3;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone2 = (function (_super) {
            __extends(Zone2, _super);
            function Zone2() {
                _super.apply(this, arguments);
                this.lightRadius = 100;
            }
            Zone2.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };

            Zone2.prototype.create = function () {
                _super.prototype.create.call(this);
                this.game.stage.backgroundColor = "#330169";
                this.shadowTexture = this.game.add.bitmapData(this.map.widthInPixels, this.map.heightInPixels);

                this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
                this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;
            };

            Zone2.prototype.update = function () {
                _super.prototype.update.call(this);
                this.shadowUpdate();
            };

            Zone2.prototype.shadowUpdate = function () {
                this.shadowTexture.context.fillStyle = '#444444';
                this.shadowTexture.context.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);

                var gradient = this.shadowTexture.context.createRadialGradient(this.player.body.x, this.player.body.y, this.lightRadius * 0.75, this.player.body.x, this.player.body.y, this.lightRadius);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

                this.shadowTexture.context.beginPath();
                this.shadowTexture.context.fillStyle = gradient;
                this.shadowTexture.context.arc(this.player.body.x, this.player.body.y, this.lightRadius, 0, Math.PI * 2);
                this.shadowTexture.context.fill();

                this.shadowTexture.dirty = true;
            };
            return Zone2;
        })(State.AbstractZone);
        State.Zone2 = Zone2;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Story2 = (function (_super) {
            __extends(Story2, _super);
            function Story2() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[3 /* Zone2Level1 */];
                this.content = [' ', 'Story Zone2'];
            }
            Story2.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };

            Story2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Story2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story2;
        })(State.AbstractStory);
        State.Story2 = Story2;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone2Level1 = (function (_super) {
            __extends(Zone2Level1, _super);
            function Zone2Level1() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[3 /* Zone2Level1 */];
                this.nextLevel = Sample.Levels[4 /* Zone2Level2 */];
            }
            Zone2Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone2Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone2Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level1;
        })(State.Zone2);
        State.Zone2Level1 = Zone2Level1;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone2Level2 = (function (_super) {
            __extends(Zone2Level2, _super);
            function Zone2Level2() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[4 /* Zone2Level2 */];
                this.nextLevel = Sample.Levels[5 /* Zone2Level3 */];
            }
            Zone2Level2.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/2-2.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone2Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone2Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level2;
        })(State.Zone2);
        State.Zone2Level2 = Zone2Level2;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone2Level3 = (function (_super) {
            __extends(Zone2Level3, _super);
            function Zone2Level3() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[5 /* Zone2Level3 */];
                this.nextLevel = Sample.Stories[2 /* Story3 */];
            }
            Zone2Level3.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/2-3.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone2Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone2Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level3;
        })(State.Zone2);
        State.Zone2Level3 = Zone2Level3;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone3 = (function (_super) {
            __extends(Zone3, _super);
            function Zone3() {
                _super.apply(this, arguments);
            }
            Zone3.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.spritesheet('snowflake', 'assets/images/snowflake.png', 16, 16);
            };

            Zone3.prototype.createSnowFlakes = function () {
                var emitter = this.game.add.emitter(this.game.world.centerX, 0, 500);

                emitter.width = this.game.world.width;

                emitter.makeParticles('snowflake');

                emitter.minParticleScale = 0.2;
                emitter.maxParticleScale = 1.5;
                emitter.gravity = 5;

                emitter.setYSpeed(5, 10);
                emitter.setXSpeed(-15, 15);

                emitter.minRotation = 0;
                emitter.maxRotation = 0;

                emitter.start(false, 20000, 200, 0);
            };

            Zone3.prototype.create = function () {
                _super.prototype.create.call(this);

                this.player.body.drag.x = 10;
                this.createSnowFlakes();
            };

            Zone3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3;
        })(State.AbstractZone);
        State.Zone3 = Zone3;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Story3 = (function (_super) {
            __extends(Story3, _super);
            function Story3() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[6 /* Zone3Level1 */];
                this.content = [' ', 'Story Zone3'];
            }
            Story3.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };

            Story3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Story3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story3;
        })(State.AbstractStory);
        State.Story3 = Story3;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone3Level1 = (function (_super) {
            __extends(Zone3Level1, _super);
            function Zone3Level1() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[6 /* Zone3Level1 */];
                this.nextLevel = Sample.Levels[7 /* Zone3Level2 */];
            }
            Zone3Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/3-1.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone3Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone3Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level1;
        })(State.Zone3);
        State.Zone3Level1 = Zone3Level1;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone3Level2 = (function (_super) {
            __extends(Zone3Level2, _super);
            function Zone3Level2() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[7 /* Zone3Level2 */];
                this.nextLevel = Sample.Levels[8 /* Zone3Level3 */];
            }
            Zone3Level2.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/3-2.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone3Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone3Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level2;
        })(State.Zone3);
        State.Zone3Level2 = Zone3Level2;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone3Level3 = (function (_super) {
            __extends(Zone3Level3, _super);
            function Zone3Level3() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[8 /* Zone3Level3 */];
                this.nextLevel = Sample.Stories[3 /* Story4 */];
            }
            Zone3Level3.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/3-3.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone3Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone3Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level3;
        })(State.Zone3);
        State.Zone3Level3 = Zone3Level3;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone4 = (function (_super) {
            __extends(Zone4, _super);
            function Zone4() {
                _super.apply(this, arguments);
            }
            Zone4.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };

            Zone4.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4;
        })(State.AbstractZone);
        State.Zone4 = Zone4;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Story4 = (function (_super) {
            __extends(Story4, _super);
            function Story4() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[9 /* Zone4Level1 */];
                this.content = [' ', 'Story Zone4'];
            }
            Story4.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };

            Story4.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Story4.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story4;
        })(State.AbstractStory);
        State.Story4 = Story4;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone4Level1 = (function (_super) {
            __extends(Zone4Level1, _super);
            function Zone4Level1() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[9 /* Zone4Level1 */];
                this.nextLevel = Sample.Levels[10 /* Zone4Level2 */];
            }
            Zone4Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone4Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level1;
        })(State.Zone4);
        State.Zone4Level1 = Zone4Level1;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone4Level2 = (function (_super) {
            __extends(Zone4Level2, _super);
            function Zone4Level2() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[10 /* Zone4Level2 */];
                this.nextLevel = Sample.Levels[11 /* Zone4Level3 */];
            }
            Zone4Level2.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/4-2.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone4Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level2;
        })(State.Zone4);
        State.Zone4Level2 = Zone4Level2;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Zone4Level3 = (function (_super) {
            __extends(Zone4Level3, _super);
            function Zone4Level3() {
                _super.apply(this, arguments);
                this.currentLevel = Sample.Levels[11 /* Zone4Level3 */];
                this.nextLevel = 'gameOver';
            }
            Zone4Level3.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/4-3.json', null, Phaser.Tilemap.TILED_JSON);
            };

            Zone4Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level3;
        })(State.Zone4);
        State.Zone4Level3 = Zone4Level3;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver() {
                _super.apply(this, arguments);
                this.content = [' ', 'You win!', 'You win!!!'];
                this.index = 0;
                this.line = '';
            }
            GameOver.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';

                this.text = this.game.add.text(10, 10, '', Sample.settings.font.whiteBig);
                this.nextLine();
            };

            GameOver.prototype.nextLine = function () {
                this.index++;

                if (this.index < this.content.length) {
                    this.line = '';
                    this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
                } else {
                }
            };

            GameOver.prototype.updateLine = function () {
                if (this.line.length < this.content[this.index].length) {
                    this.line = this.content[this.index].substr(0, this.line.length + 1);
                    this.text.setText(this.line);
                } else {
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
                }
            };
            return GameOver;
        })(Phaser.State);
        State.GameOver = GameOver;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(level, x, y) {
                var _this = this;
                _super.call(this, level.game, x, y, 'player');
                this.level = level;
                this.gravity = 500;
                this.acceleration = 500;
                this.drag = 500;
                this.maxSpeed = 270;
                this.superSpeedPower = 390;
                this.jumpPower = 350;
                this.immortalState = false;
                this.attackState = false;
                this.moveState = false;
                this.sitState = false;
                this.superSpeedState = false;
                this.superAttakState = false;
                this.defensePoints = 5;
                this.direction = 1 /* Right */;
                this.damagePoints = 50;
                this.manaPoints = +Sample.settings.storage.getManaPoints();
                this.immortalStateAt = Date.now();
                this.attackStateAt = Date.now();
                this.immortalDuration = Phaser.Timer.SECOND * 3;
                this.immortalDefaultDuration = Phaser.Timer.SECOND * 3;
                this.attackDuration = Phaser.Timer.SECOND / 3;
                this.isActiveJumpKey = false;
                this.isAttackKeyPressed = false;

                this.level.game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;
                this.anchor.set(0.5, 1);

                this.body.drag.x = this.drag;
                this.body.maxVelocity.x = this.maxSpeed;

                this.body.collideWorldBounds = true;
                this.alive = true;

                this.health = +Sample.settings.storage.getHealthPoints();

                this.animations.add('stay', ['player-walk-1.png'], 10, true);
                this.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-', 1, 4, '.png', 0), 15, true);
                this.animations.add('attack', Phaser.Animation.generateFrameNames('player-attack-', 1, 3, '.png', 0), 10, true);
                this.animations.add('sit', ['player-sit-1.png'], 10, true);

                this.events.onKilled.add(function () {
                    _this.level.gameOver();
                });

                this.level.game.add.existing(this);
            }
            Player.prototype.getHP = function (healthPoints) {
                this.health += +healthPoints;
                this.level.hud.updateHealthState();
                this.write(healthPoints.toString() + 'HP', Sample.settings.font.whiteWithBlue);
            };

            Player.prototype.getMP = function (manaPoints) {
                this.manaPoints += +manaPoints;
                this.level.hud.updateManaState();
                this.write(manaPoints.toString() + 'MP', Sample.settings.font.whiteWithRed);
            };

            Player.prototype.immortal = function (duration) {
                this.immortalDuration = duration;
                this.immortalStateAt = Date.now();
                this.immortalState = true;
                this.alpha = 0.5;
            };

            Player.prototype.write = function (text, style) {
                var textSprite = this.game.add.text(this.x, this.y, text, style);
                var tween = this.game.add.tween(textSprite).to({ alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true, 0, 0, false);

                tween.onComplete.add(function () {
                    textSprite.destroy();
                });
            };

            Player.prototype.makeDamage = function (damagePoint) {
                if (damagePoint < this.defensePoints) {
                    damagePoint = 1;
                } else {
                    damagePoint = damagePoint - this.defensePoints;
                }

                this.damage(damagePoint);
                this.write(damagePoint.toString(), Sample.settings.font.whiteWithRed);
                this.immortal(this.immortalDefaultDuration);
            };

            Player.prototype.jump = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.jump) && (this.body.blocked.down || this.body.touching.down) && !this.isActiveJumpKey) {
                    this.isActiveJumpKey = true;
                    this.body.velocity.y = -this.jumpPower;
                }

                if (!this.game.input.keyboard.isDown(Sample.settings.keys.jump)) {
                    this.isActiveJumpKey = false;
                }
            };

            Player.prototype.move = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.moveRight)) {
                    this.moveState = true;
                    this.body.acceleration.x = this.acceleration;
                    this.direction = 1 /* Right */;
                    this.scale.x = 1;
                } else if (this.game.input.keyboard.isDown(Sample.settings.keys.moveLeft)) {
                    this.moveState = true;
                    this.body.acceleration.x = -this.acceleration;
                    this.direction = 0 /* Left */;
                    this.scale.x = -1;
                } else {
                    this.moveState = false;
                    this.body.acceleration.x = 0;
                }
            };

            Player.prototype.attack = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.attack) && !this.attackState && !this.isAttackKeyPressed) {
                    this.isAttackKeyPressed = true;
                    this.attackState = true;
                    this.attackStateAt = Date.now();
                }

                if (!this.game.input.keyboard.isDown(Sample.settings.keys.attack)) {
                    this.isAttackKeyPressed = false;
                }

                if ((Date.now() - this.attackStateAt) > this.attackDuration) {
                    this.attackState = false;
                }
            };

            Player.prototype.superSpeed = function () {
                if (this.manaPoints >= 0 && this.game.input.keyboard.isDown(Sample.settings.keys.superSpeed) && this.body.blocked.down && !this.attackState) {
                    this.superSpeedState = true;
                }

                if (this.manaPoints <= 0 || !this.game.input.keyboard.isDown(Sample.settings.keys.superSpeed)) {
                    this.superSpeedState = false;
                }

                if (this.superSpeedState) {
                    this.manaPoints--;
                    this.level.hud.updateManaState();
                    this.body.maxVelocity.x = this.superSpeedPower;
                } else {
                    this.body.maxVelocity.x = this.maxSpeed;
                }
            };

            Player.prototype.superAttack = function () {
            };

            Player.prototype.sit = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.sit)) {
                    this.sitState = true;
                }

                if (!this.body.touching.up && !this.game.input.keyboard.isDown(Sample.settings.keys.sit)) {
                    this.sitState = false;
                }
            };

            Player.prototype.state = function () {
                if (this.immortalState && (Date.now() - this.immortalStateAt) > this.immortalDuration) {
                    this.alpha = 1;
                    this.immortalState = false;
                }

                if (this.attackState) {
                    this.animations.play('attack');
                } else if (this.moveState) {
                    this.animations.play('walk');
                } else if (this.sitState) {
                    this.animations.play('sit');
                } else {
                    this.animations.play('stay');
                }

                this.body.width = this.animations.currentFrame.width;
                this.body.height = this.animations.currentFrame.height;
            };

            Player.prototype.update = function () {
                this.move();
                this.jump();
                this.attack();
                this.sit();
                this.superSpeed();
                this.superAttack();

                this.state();
            };
            return Player;
        })(Phaser.Sprite);
        Prefab.Player = Player;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var HUD = (function (_super) {
            __extends(HUD, _super);
            function HUD(level, x, y) {
                _super.call(this, level.game, x, y, 'hud');
                this.level = level;

                this.fixedToCamera = true;

                this.healthState = level.game.add.text(8, 8, "", Sample.settings.font.whiteBig);
                this.updateHealthState();
                this.addChild(this.healthState);

                this.manaState = level.game.add.text(150, 8, "", Sample.settings.font.whiteBig);
                this.updateManaState();
                this.addChild(this.manaState);

                level.game.add.existing(this);
            }
            HUD.prototype.updateHealthState = function () {
                this.healthState.text = "Health: " + this.level.player.health.toString();
            };

            HUD.prototype.updateManaState = function () {
                this.manaState.text = "Mana: " + this.level.player.manaPoints.toString();
            };

            HUD.prototype.update = function () {
                this.bringToTop();
            };
            return HUD;
        })(Phaser.Sprite);
        Prefab.HUD = HUD;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var BlackScreen = (function (_super) {
            __extends(BlackScreen, _super);
            function BlackScreen(level) {
                var blackTexture = level.game.add.bitmapData(level.game.width, level.game.height);
                blackTexture.ctx.beginPath();
                blackTexture.ctx.rect(0, 0, level.game.width, level.game.height);
                blackTexture.ctx.fillStyle = '#000000';
                blackTexture.ctx.fill();

                _super.call(this, level.game, 0, 0, blackTexture);

                this.alpha = 1;
                this.fixedToCamera = true;

                this.text = level.game.add.text(10, level.game.height - 30, "", Sample.settings.font.whiteBig);
                this.addChild(this.text);

                level.game.add.existing(this);
            }
            BlackScreen.prototype.setText = function (text) {
                this.text.text = text;
            };
            return BlackScreen;
        })(Phaser.Sprite);
        Prefab.BlackScreen = BlackScreen;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var PreloadBar = (function (_super) {
            __extends(PreloadBar, _super);
            function PreloadBar(game, x, y) {
                _super.call(this, game, x, y, 'preload-bar');

                this.anchor.setTo(1, 1);

                game.add.existing(this);
            }
            return PreloadBar;
        })(Phaser.Sprite);
        Prefab.PreloadBar = PreloadBar;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Transparent = (function (_super) {
            __extends(Transparent, _super);
            function Transparent(game, x, y) {
                _super.call(this, game, x, y, 'transparent');

                game.physics.arcade.enable(this);
                this.body.immovable = true;

                game.add.existing(this);
            }
            return Transparent;
        })(Phaser.Sprite);
        Prefab.Transparent = Transparent;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Spike = (function (_super) {
            __extends(Spike, _super);
            function Spike(game, x, y) {
                _super.call(this, game, x, y, 'spike');
                this.damagePoints = 50;

                game.physics.arcade.enable(this);

                this.body.immovable = true;

                game.add.existing(this);
            }
            return Spike;
        })(Phaser.Sprite);
        Prefab.Spike = Spike;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var IceSpike = (function (_super) {
            __extends(IceSpike, _super);
            function IceSpike(game, x, y) {
                _super.call(this, game, x, y, 'ice-spike');
                this.damagePoints = 50;
                this.distanceToTarget = Math.random() * 100 - 40;
                game.physics.arcade.enable(this);
                this.alive = true;
                this.checkWorldBounds = true;

                game.physics.arcade.enable(this);
                game.add.existing(this);
            }
            IceSpike.prototype.update = function () {
                if (!this.inCamera)
                    return;
                if (!this.alive)
                    return;

                if (Math.abs(this.target.x - this.body.x) < this.distanceToTarget && this.target.y > this.body.y) {
                    this.body.gravity.y = 100;
                    this.body.acceleration.y = 1000;
                }

                if (this.y > this.game.world.height) {
                    this.kill();
                }
            };
            return IceSpike;
        })(Phaser.Sprite);
        Prefab.IceSpike = IceSpike;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Exit = (function (_super) {
            __extends(Exit, _super);
            function Exit(game, x, y) {
                _super.call(this, game, x, y, 'exit');

                game.physics.arcade.enable(this);
                this.body.immovable = true;

                game.add.existing(this);
            }
            return Exit;
        })(Phaser.Sprite);
        Prefab.Exit = Exit;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Platform = (function (_super) {
            __extends(Platform, _super);
            function Platform(game, x, y, texture) {
                _super.call(this, game, x, y, texture);
                this.velocity = 100;

                game.physics.arcade.enable(this);
                this.body.immovable = true;

                game.add.existing(this);
            }
            Platform.prototype.toggleDirection = function () {
                switch (this.direction) {
                    case 2 /* Up */:
                        this.direction = 3 /* Down */;
                        break;
                    case 3 /* Down */:
                        this.direction = 2 /* Up */;
                        break;
                    case 0 /* Left */:
                        this.direction = 1 /* Right */;
                        break;
                    case 1 /* Right */:
                        this.direction = 0 /* Left */;
                        break;
                    default:
                        break;
                }
            };

            Platform.prototype.update = function () {
                switch (this.direction) {
                    case 0 /* Left */:
                        this.body.velocity.x = -this.velocity;
                        break;
                    case 1 /* Right */:
                        this.body.velocity.x = this.velocity;
                        break;
                    case 2 /* Up */:
                        this.body.velocity.y = -this.velocity;
                        break;
                    case 3 /* Down */:
                        this.body.velocity.y = this.velocity;
                        break;
                    default:
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                }
            };
            return Platform;
        })(Phaser.Sprite);
        Prefab.Platform = Platform;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var PlatformHorizontal = (function (_super) {
            __extends(PlatformHorizontal, _super);
            function PlatformHorizontal(game, x, y) {
                _super.call(this, game, x, y, 'platform-h');
                this.direction = 1 /* Right */;
                this.velocity = 100;

                game.physics.arcade.enable(this);
                this.body.immovable = true;

                game.add.existing(this);
            }
            return PlatformHorizontal;
        })(Prefab.Platform);
        Prefab.PlatformHorizontal = PlatformHorizontal;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var PlatformVertical = (function (_super) {
            __extends(PlatformVertical, _super);
            function PlatformVertical(game, x, y) {
                _super.call(this, game, x, y, 'platform-v');
                this.direction = 3 /* Down */;
                this.velocity = 100;

                game.physics.arcade.enable(this);
                this.body.immovable = true;

                game.add.existing(this);
            }
            return PlatformVertical;
        })(Prefab.Platform);
        Prefab.PlatformVertical = PlatformVertical;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Bottle = (function (_super) {
            __extends(Bottle, _super);
            function Bottle(game, x, y, texture) {
                _super.call(this, game, x, y, texture);
                game.physics.arcade.enable(this);

                game.add.existing(this);
            }
            return Bottle;
        })(Phaser.Sprite);
        Prefab.Bottle = Bottle;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var BottleHP = (function (_super) {
            __extends(BottleHP, _super);
            function BottleHP(game, x, y) {
                _super.call(this, game, x, y, 'bottle-hp');
                this.amount = 50;
                game.physics.arcade.enable(this);

                game.add.existing(this);
            }
            BottleHP.prototype.makeAction = function (player) {
                player.getHP(this.amount);
            };
            return BottleHP;
        })(Prefab.Bottle);
        Prefab.BottleHP = BottleHP;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var BottleMP = (function (_super) {
            __extends(BottleMP, _super);
            function BottleMP(game, x, y) {
                _super.call(this, game, x, y, 'bottle-mp');
                this.amount = 50;
                game.physics.arcade.enable(this);

                game.add.existing(this);
            }
            BottleMP.prototype.makeAction = function (player) {
                player.getMP(this.amount);
            };
            return BottleMP;
        })(Prefab.Bottle);
        Prefab.BottleMP = BottleMP;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var BottleSuper = (function (_super) {
            __extends(BottleSuper, _super);
            function BottleSuper(game, x, y) {
                _super.call(this, game, x, y, 'bottle-super');
                this.duration = 10000;
                game.physics.arcade.enable(this);

                game.add.existing(this);
            }
            BottleSuper.prototype.makeAction = function (player) {
                player.immortal(this.duration);
            };
            return BottleSuper;
        })(Prefab.Bottle);
        Prefab.BottleSuper = BottleSuper;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var AbstractEnemy = (function (_super) {
            __extends(AbstractEnemy, _super);
            function AbstractEnemy(game, x, y, sprite) {
                _super.call(this, game, x, y, sprite);
                this.immortalState = false;
                this.immortalStateAt = Date.now();
                this.immortalStateDuration = Phaser.Timer.SECOND / 3;
                this.defensePoints = 0;

                game.physics.arcade.enable(this);
                this.alive = true;
                this.anchor.set(0, 0.5);

                game.add.existing(this);
            }
            AbstractEnemy.prototype.makeDamage = function (damagePoint) {
                if (!this.immortalState) {
                    if (damagePoint < this.defensePoints) {
                        damagePoint = 1;
                    } else {
                        damagePoint = damagePoint - this.defensePoints;
                    }

                    this.damage(damagePoint);

                    var textStyle = {
                        font: "20px Arial",
                        fill: "#ffffff",
                        stroke: '#0000ff',
                        strokeThickness: 1
                    };

                    var text = this.game.add.text(this.x, this.y, damagePoint.toString(), textStyle);
                    var tween = this.game.add.tween(text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

                    tween.onComplete.add(function () {
                        text.destroy();
                    });

                    this.immortalStateAt = Date.now();
                    this.immortalState = true;
                }
            };

            AbstractEnemy.prototype.update = function () {
                if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
                    this.immortalState = false;
                }
            };
            return AbstractEnemy;
        })(Phaser.Sprite);
        Prefab.AbstractEnemy = AbstractEnemy;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Runner = (function (_super) {
            __extends(Runner, _super);
            function Runner(game, x, y) {
                _super.call(this, game, x, y, 'runner');
                this.gravity = 300;
                this.velocity = 100;
                this.direction = 1 /* Right */;
                this.damagePoints = 10;
                this.defensePoints = 5;

                this.body.gravity.y = this.gravity;
                this.body.collideWorldBounds = true;
                this.health = 200;
            }
            Runner.prototype.update = function () {
                _super.prototype.update.call(this);

                if (!this.inCamera)
                    return;
                if (!this.alive)
                    return;

                if (this.body.blocked.left) {
                    this.direction = 1 /* Right */;
                } else if (this.body.blocked.right) {
                    this.direction = 0 /* Left */;
                }

                switch (this.direction) {
                    case 0 /* Left */:
                        this.body.velocity.x = -this.velocity;
                        break;
                    case 1 /* Right */:
                        this.body.velocity.x = this.velocity;
                        break;
                    default:
                        this.body.velocity.x = 0;
                }
            };
            return Runner;
        })(Prefab.AbstractEnemy);
        Prefab.Runner = Runner;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Flier = (function (_super) {
            __extends(Flier, _super);
            function Flier(game, x, y) {
                _super.call(this, game, x, y, 'flier');
                this.isActive = false;
                this.damagePoints = 10;
                this.speed = 150;
                this.defensePoints = 5;

                this.anchor.set(0.5, 0.5);
                this.health = 100;
            }
            Flier.prototype.setTarget = function (target) {
                this.minDistance = target.width / 2;

                this.target = target;
                this.isActive = true;
            };

            Flier.prototype.update = function () {
                _super.prototype.update.call(this);

                if (!this.inCamera)
                    return;
                if (!this.isActive)
                    return;

                var distance = Phaser.Math.distance(this.x, this.y, this.target.x, this.target.y);

                if (distance > this.minDistance) {
                    var rotation = Phaser.Math.angleBetween(this.x, this.y, this.target.x, this.target.y);

                    this.body.velocity.x = Math.cos(rotation) * this.speed;
                    this.body.velocity.y = Math.sin(rotation) * this.speed;
                } else {
                    this.body.velocity.setTo(0, 0);
                }
            };
            return Flier;
        })(Prefab.AbstractEnemy);
        Prefab.Flier = Flier;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Shooter = (function (_super) {
            __extends(Shooter, _super);
            function Shooter(game, x, y) {
                _super.call(this, game, x, y, 'shooter');
                this.gravity = 300;
                this.lastBulletShotAt = 0;
                this.countBullets = 1;
                this.shotDelay = 3000;
                this.damagePoints = 10;
                this.defensePoints = 5;

                this.body.gravity.y = this.gravity;

                this.bullets = this.game.add.group();
                for (var i = 0; i < this.countBullets; i++) {
                    var bullet = new Prefab.Bullet(game, 0, 0);
                    this.bullets.add(bullet);
                }
                this.health = 100;
            }
            Shooter.prototype.setTarget = function (target) {
                this.target = target;
            };

            Shooter.prototype.update = function () {
                _super.prototype.update.call(this);

                if (!this.inCamera)
                    return;
                if (!this.alive)
                    return;

                if (this.game.time.now - this.lastBulletShotAt < this.shotDelay)
                    return;
                this.lastBulletShotAt = this.game.time.now;

                var bullet = this.bullets.getFirstDead();

                if (bullet === null || bullet === undefined)
                    return;

                bullet.revive();
                bullet.reset(this.x, this.y);

                if (this.x > this.target.x) {
                    bullet.body.velocity.x = -bullet.speed;
                } else {
                    bullet.body.velocity.x = bullet.speed;
                }
            };
            return Shooter;
        })(Prefab.AbstractEnemy);
        Prefab.Shooter = Shooter;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var ShooterReject = (function (_super) {
            __extends(ShooterReject, _super);
            function ShooterReject(game, x, y) {
                _super.call(this, game, x, y, 'shooter-reject');
                this.gravity = 300;
                this.lastBulletShotAt = 0;
                this.countBullets = 1;
                this.shotDelay = 3000;
                this.damagePoints = 10;
                this.defensePoints = 50;

                this.body.gravity.y = this.gravity;

                this.bullets = this.game.add.group();
                for (var i = 0; i < this.countBullets; i++) {
                    var bullet = new Prefab.BulletReject(game, 0, 0);
                    this.bullets.add(bullet);
                }
                this.health = 100;
            }
            ShooterReject.prototype.setTarget = function (target) {
                this.target = target;
            };

            ShooterReject.prototype.update = function () {
                _super.prototype.update.call(this);

                if (!this.inCamera)
                    return;
                if (!this.alive)
                    return;

                if (this.game.time.now - this.lastBulletShotAt < this.shotDelay)
                    return;
                this.lastBulletShotAt = this.game.time.now;

                var bullet = this.bullets.getFirstDead();

                if (bullet === null || bullet === undefined)
                    return;

                bullet.revive();
                bullet.reset(this.x, this.y);

                if (this.x > this.target.x) {
                    bullet.body.velocity.x = -bullet.speed;
                } else {
                    bullet.body.velocity.x = bullet.speed;
                }
            };
            return ShooterReject;
        })(Prefab.AbstractEnemy);
        Prefab.ShooterReject = ShooterReject;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Bullet = (function (_super) {
            __extends(Bullet, _super);
            function Bullet(game, x, y) {
                _super.call(this, game, x, y, 'bullet');
                this.speed = 300;
                this.damagePoints = 30;

                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);
                this.kill();

                this.checkWorldBounds = true;
                this.outOfBoundsKill = true;

                game.add.existing(this);
            }
            return Bullet;
        })(Phaser.Sprite);
        Prefab.Bullet = Bullet;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var BulletReject = (function (_super) {
            __extends(BulletReject, _super);
            function BulletReject(game, x, y) {
                _super.call(this, game, x, y, 'bullet-reject');
                this.speed = 300;
                this.damagePoints = 30;
                this.damageRejectPoints = 300;
                this.rejectState = false;

                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);
                this.kill();

                this.checkWorldBounds = true;
                this.outOfBoundsKill = true;

                game.add.existing(this);
            }
            return BulletReject;
        })(Phaser.Sprite);
        Prefab.BulletReject = BulletReject;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Stories) {
        Stories[Stories["Story1"] = 0] = "Story1";
        Stories[Stories["Story2"] = 1] = "Story2";
        Stories[Stories["Story3"] = 2] = "Story3";
        Stories[Stories["Story4"] = 3] = "Story4";
    })(Sample.Stories || (Sample.Stories = {}));
    var Stories = Sample.Stories;

    (function (Levels) {
        Levels[Levels["Zone1Level1"] = 0] = "Zone1Level1";
        Levels[Levels["Zone1Level2"] = 1] = "Zone1Level2";
        Levels[Levels["Zone1Level3"] = 2] = "Zone1Level3";
        Levels[Levels["Zone2Level1"] = 3] = "Zone2Level1";
        Levels[Levels["Zone2Level2"] = 4] = "Zone2Level2";
        Levels[Levels["Zone2Level3"] = 5] = "Zone2Level3";
        Levels[Levels["Zone3Level1"] = 6] = "Zone3Level1";
        Levels[Levels["Zone3Level2"] = 7] = "Zone3Level2";
        Levels[Levels["Zone3Level3"] = 8] = "Zone3Level3";
        Levels[Levels["Zone4Level1"] = 9] = "Zone4Level1";
        Levels[Levels["Zone4Level2"] = 10] = "Zone4Level2";
        Levels[Levels["Zone4Level3"] = 11] = "Zone4Level3";
    })(Sample.Levels || (Sample.Levels = {}));
    var Levels = Sample.Levels;

    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["Up"] = 2] = "Up";
        Direction[Direction["Down"] = 3] = "Down";
    })(Sample.Direction || (Sample.Direction = {}));
    var Direction = Sample.Direction;

    var Init = (function () {
        function Init() {
        }
        Init.HealthPoints = 100;
        Init.ManaPoints = 500;
        Init.FirstState = Stories[0 /* Story1 */];
        return Init;
    })();

    var Storage = (function () {
        function Storage() {
        }
        Storage.prototype.getCurrentLevel = function () {
            var currentLevel = localStorage.getItem('currentLevel');
            if (currentLevel) {
                return currentLevel;
            } else {
                this.setCurrentLevel(Init.FirstState);
                return Init.FirstState;
            }
        };

        Storage.prototype.setCurrentLevel = function (currentLevel) {
            localStorage.setItem('currentLevel', currentLevel);
        };

        Storage.prototype.getHealthPoints = function () {
            var healthPoints = localStorage.getItem('healthPoints');
            if (healthPoints) {
                return healthPoints;
            } else {
                healthPoints = Init.HealthPoints.toString();
                this.setHealthPoints(healthPoints);
                return healthPoints;
            }
        };

        Storage.prototype.setHealthPoints = function (healthPoints) {
            localStorage.setItem('healthPoints', healthPoints);
        };

        Storage.prototype.getManaPoints = function () {
            var manaPoints = localStorage.getItem('manaPoints');
            if (manaPoints) {
                return manaPoints;
            } else {
                manaPoints = Init.ManaPoints.toString();
                this.setManaPoints(manaPoints);
                return manaPoints;
            }
        };

        Storage.prototype.setManaPoints = function (manaPoints) {
            localStorage.setItem('manaPoints', manaPoints);
        };
        return Storage;
    })();

    var SettingsClass = (function () {
        function SettingsClass() {
            this.storage = new Storage();
            this.font = {
                whiteWithRed: {
                    font: "20px Arial",
                    fill: "#ffffff",
                    stroke: "ff0000",
                    strokeThickness: 2
                },
                whiteWithBlue: {
                    font: "20px Arial",
                    fill: "#ffffff",
                    stroke: "0000ff",
                    strokeThickness: 2
                },
                whiteWithGreen: {
                    font: "20px Arial",
                    fill: "#ffffff",
                    stroke: "00ff00",
                    strokeThickness: 2
                },
                whiteBig: {
                    font: "20px Arial",
                    fill: "#ffffff"
                },
                blackBig: {
                    font: "20px Arial",
                    fill: "#000000"
                }
            };
            this.keys = {
                moveLeft: Phaser.Keyboard.LEFT,
                moveRight: Phaser.Keyboard.RIGHT,
                sit: Phaser.Keyboard.DOWN,
                jump: Phaser.Keyboard.Z,
                attack: Phaser.Keyboard.X,
                superAttack: Phaser.Keyboard.A,
                superSpeed: Phaser.Keyboard.S,
                superkey: Phaser.Keyboard.SPACEBAR
            };
        }
        return SettingsClass;
    })();

    Sample.settings = new SettingsClass();
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 640, 480, Phaser.AUTO, 'game');

            this.state.add('boot', Sample.State.Boot);
            this.state.add('preload', Sample.State.Preload);
            this.state.add('menu', Sample.State.Menu);

            this.state.add(Sample.Stories[0 /* Story1 */], Sample.State.Story1);
            this.state.add(Sample.Levels[0 /* Zone1Level1 */], Sample.State.Zone1Level1);
            this.state.add(Sample.Levels[1 /* Zone1Level2 */], Sample.State.Zone1Level2);
            this.state.add(Sample.Levels[2 /* Zone1Level3 */], Sample.State.Zone1Level3);

            this.state.add(Sample.Stories[1 /* Story2 */], Sample.State.Story2);
            this.state.add(Sample.Levels[3 /* Zone2Level1 */], Sample.State.Zone2Level1);
            this.state.add(Sample.Levels[4 /* Zone2Level2 */], Sample.State.Zone2Level2);
            this.state.add(Sample.Levels[5 /* Zone2Level3 */], Sample.State.Zone2Level3);

            this.state.add(Sample.Stories[2 /* Story3 */], Sample.State.Story3);
            this.state.add(Sample.Levels[6 /* Zone3Level1 */], Sample.State.Zone3Level1);
            this.state.add(Sample.Levels[7 /* Zone3Level2 */], Sample.State.Zone3Level2);
            this.state.add(Sample.Levels[8 /* Zone3Level3 */], Sample.State.Zone3Level3);

            this.state.add(Sample.Stories[3 /* Story4 */], Sample.State.Story4);
            this.state.add(Sample.Levels[9 /* Zone4Level1 */], Sample.State.Zone4Level1);
            this.state.add(Sample.Levels[10 /* Zone4Level2 */], Sample.State.Zone4Level2);
            this.state.add(Sample.Levels[11 /* Zone4Level3 */], Sample.State.Zone4Level3);

            this.state.add('gameOver', Sample.State.GameOver);

            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Sample.Game = Game;
})(Sample || (Sample = {}));

window.onload = function () {
    (function () {
        try  {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    })();

    new Sample.Game();
};
//# sourceMappingURL=main.js.map
