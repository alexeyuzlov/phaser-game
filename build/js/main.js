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
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };

            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0xFFFFFF;

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
                this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
                this.load.setPreloadSprite(this.preloadBar);

                this.load.image('menu-background', 'assets/images/menu-background.png');

                this.load.atlasXML('player', 'assets/images/prefabs/player.png', 'assets/images/prefabs/player.xml');

                this.load.image('runner', 'assets/images/prefabs/runner.png');
                this.load.image('flier', 'assets/images/prefabs/flier.png');
                this.load.image('shooter', 'assets/images/prefabs/shooter.png');
                this.load.image('bullet', 'assets/images/prefabs/bullet.png');

                this.load.image('hud', 'assets/images/prefabs/hud.png');
            };

            Preload.prototype.create = function () {
                this.game.state.start(0 /* Zone1Level1 */.toString());
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
            Menu.prototype.create = function () {
                this.background = this.add.sprite(80, 0, 'menu-background');
            };

            Menu.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start(0 /* Zone1Level1 */.toString());
                }
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                _super.call(this, game, x, y, 'player');
                this.gravity = 300;
                this.velocity = 300;
                this.damagePoint = 30;
                this.jumpHeight = 300;
                this.isJumpState = false;
                this.immortalState = false;
                this.attackState = false;
                this.isMoveState = false;
                this.direction = 1 /* Right */;
                this.manaPoints = 100;
                this.immortalStateAt = Date.now();
                this.attackStateAt = Date.now();
                this.immortalDuration = 3000;
                this.attackDuration = 300;
                this.isActiveJumpKey = false;
                this.isAttackKeyPressed = false;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;
                this.anchor.set(0.5, 0.5);

                this.alive = true;
                this.health = 100;

                this.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-', 1, 4, '.png', 0), 10, true);
                this.animations.add('attack', Phaser.Animation.generateFrameNames('player-attack-', 1, 3, '.png', 0), 10, true);

                game.add.existing(this);
            }
            Player.prototype.makeDamage = function (damagePoint) {
                this.damage(damagePoint);
                this.immortalStateAt = Date.now();
                this.immortalState = true;
                this.alpha = 0.5;
            };

            Player.prototype.jump = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.jump) && !this.isJumpState && this.body.blocked.down && !this.isActiveJumpKey) {
                    this.isActiveJumpKey = true;
                    this.isJumpState = true;
                    this.body.velocity.y = -this.jumpHeight;
                }

                if (!this.game.input.keyboard.isDown(Sample.settings.keys.jump)) {
                    this.isActiveJumpKey = false;
                }

                if (this.body.blocked.down) {
                    this.isJumpState = false;
                }
            };

            Player.prototype.move = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.moveRight)) {
                    this.isMoveState = true;
                    this.body.velocity.x = this.velocity;
                    this.direction = 1 /* Right */;
                    this.scale.x = 1;
                } else if (this.game.input.keyboard.isDown(Sample.settings.keys.moveLeft)) {
                    this.isMoveState = true;
                    this.body.velocity.x = -this.velocity;
                    this.direction = 0 /* Left */;
                    this.scale.x = -1;
                } else {
                    this.isMoveState = false;
                    this.body.velocity.x = 0;
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

            Player.prototype.superspeed = function () {
            };

            Player.prototype.superattack = function () {
            };

            Player.prototype.state = function () {
                if (this.immortalState && (Date.now() - this.immortalStateAt) > this.immortalDuration) {
                    this.alpha = 1;
                    this.immortalState = false;
                }

                if (this.attackState) {
                    this.animations.play('attack');
                } else if (this.isMoveState) {
                    this.animations.play('walk');
                } else {
                    this.animations.stop();
                }
            };

            Player.prototype.update = function () {
                this.move();
                this.jump();
                this.attack();

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
        var Runner = (function (_super) {
            __extends(Runner, _super);
            function Runner(game, x, y) {
                _super.call(this, game, x, y, 'runner');
                this.gravity = 300;
                this.velocity = 100;
                this.direction = 1 /* Right */;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;
                this.anchor.set(0.5, 0.5);

                this.alive = true;
                this.health = 10;

                game.add.existing(this);
            }
            Runner.prototype.update = function () {
                if (!this.inCamera)
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
        })(Phaser.Sprite);
        Prefab.Runner = Runner;
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
                this.damagePoint = 30;

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
        var Shooter = (function (_super) {
            __extends(Shooter, _super);
            function Shooter(game, x, y) {
                _super.call(this, game, x, y, 'shooter');
                this.gravity = 300;
                this.lastBulletShotAt = 0;
                this.countBullets = 1;
                this.shotDelay = 3000;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;

                this.anchor.set(0.5, 0.5);

                this.bullets = this.game.add.group();
                for (var i = 0; i < this.countBullets; i++) {
                    var bullet = new Prefab.Bullet(game, 0, 0);
                    this.bullets.add(bullet);
                }

                this.alive = true;
                this.health = 10;

                game.add.existing(this);
            }
            Shooter.prototype.update = function () {
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

                bullet.body.velocity.x = -bullet.speed;
            };
            return Shooter;
        })(Phaser.Sprite);
        Prefab.Shooter = Shooter;
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
                this.speed = 150;

                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);

                this.alive = true;
                this.health = 10;

                game.add.existing(this);
            }
            Flier.prototype.setTarget = function (target) {
                this.minDistance = target.width / 2;

                this.target = target;
                this.isActive = true;
            };

            Flier.prototype.update = function () {
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
        })(Phaser.Sprite);
        Prefab.Flier = Flier;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (Prefab) {
        var HUD = (function (_super) {
            __extends(HUD, _super);
            function HUD(game, x, y) {
                _super.call(this, game, x, y, 'hud');
                this.healthText = "Health: 100";
                this.manaText = "Mana: 100";
                this.currentLevelText = "Level: 1-1";
                this.scoreText = "Score: 0";
                this.textStyle = {
                    font: "20px Arial",
                    fill: "#ffffff"
                };

                this.fixedToCamera = true;

                this.healthState = this.game.add.text(this.x + 10, this.y + 8, this.healthText, this.textStyle);
                this.addChild(this.healthState);

                this.manaState = this.game.add.text(this.x + 150, this.y + 8, this.manaText, this.textStyle);
                this.addChild(this.manaState);

                this.currentLevelState = this.game.add.text(this.x + 280, this.y + 8, this.currentLevelText, this.textStyle);
                this.addChild(this.currentLevelState);

                this.scoreState = this.game.add.text(this.x + 550, this.y + 8, this.scoreText, this.textStyle);
                this.addChild(this.scoreState);

                game.add.existing(this);
            }
            HUD.prototype.setHealthState = function (health) {
                this.healthState.text = "Health: " + health.toString();
            };

            HUD.prototype.setManaState = function (mana) {
                this.manaState.text = "Mana: " + mana.toString();
            };

            HUD.prototype.setLevelState = function (level) {
                this.currentLevelState.text = "Level: " + Sample.State.Level.GetLevelName(level);
            };

            HUD.prototype.setScoreState = function (score) {
                this.scoreState.text = "Score: " + score.toString();
            };
            return HUD;
        })(Phaser.Sprite);
        Prefab.HUD = HUD;
    })(Sample.Prefab || (Sample.Prefab = {}));
    var Prefab = Sample.Prefab;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    (function (State) {
        var Level = (function (_super) {
            __extends(Level, _super);
            function Level() {
                _super.apply(this, arguments);
                this.score = 0;
            }
            Level.prototype.create = function () {
                var _this = this;
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');
                this.map.setCollision(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.shooters = this.game.add.group();
                this.map.createFromObjects('enemies', 3, 'shooter', 0, true, false, this.shooters, Sample.Prefab.Shooter);

                this.runners = this.game.add.group();
                this.map.createFromObjects('enemies', 4, 'runner', 0, true, false, this.runners, Sample.Prefab.Runner);

                this.fliers = this.game.add.group();
                this.map.createFromObjects('enemies', 5, 'flier', 0, true, false, this.fliers, Sample.Prefab.Flier);
                this.fliers.forEach(function (flier) {
                    flier.setTarget(_this.player);
                }, null);

                this.allEnemies = this.game.add.group();
                this.allEnemies.add(this.runners);
                this.allEnemies.add(this.shooters);
                this.allEnemies.add(this.fliers);

                this.hud = new Sample.Prefab.HUD(this.game, 0, 0);
                this.hud.setLevelState(this.currentLevel);

                this.game.camera.follow(this.player);
            };

            Level.prototype.doCollide = function () {
                var _this = this;
                this.game.physics.arcade.collide(this.player, this.layer);

                this.game.physics.arcade.collide(this.shooters, this.layer);
                this.game.physics.arcade.collide(this.runners, this.layer);

                this.shooters.forEach(function (shooter) {
                    _this.game.physics.arcade.collide(_this.player, shooter.bullets, function (player, bullet) {
                        bullet.kill();

                        if (!_this.player.immortalState) {
                            _this.player.makeDamage(bullet.damagePoint);

                            _this.hud.setHealthState(_this.player.health);
                        }
                    });
                }, null);
            };

            Level.prototype.update = function () {
                this.doCollide();

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start(this.nextLevel.toString());
                }
            };

            Level.GetLevelName = function (level) {
                switch (level) {
                    case 0 /* Zone1Level1 */:
                        return '1-1';
                    case 1 /* Zone1Level2 */:
                        return '1-2';
                    case 2 /* Zone1Level3 */:
                        return '1-3';

                    case 3 /* Zone2Level1 */:
                        return '2-1';
                    case 4 /* Zone2Level2 */:
                        return '2-2';
                    case 5 /* Zone2Level3 */:
                        return '2-3';

                    case 6 /* Zone3Level1 */:
                        return '3-1';
                    case 7 /* Zone3Level2 */:
                        return '3-2';
                    case 8 /* Zone3Level3 */:
                        return '3-3';

                    case 9 /* Zone4Level1 */:
                        return '4-1';
                    case 10 /* Zone4Level2 */:
                        return '4-2';
                    case 11 /* Zone4Level3 */:
                        return '4-3';

                    default:
                        return 'X-X';
                }
            };
            return Level;
        })(Phaser.State);
        State.Level = Level;
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
                this.currentLevel = 0 /* Zone1Level1 */;
                this.nextLevel = 1 /* Zone1Level2 */.toString();
            }
            Zone1Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone1.png');
            };

            Zone1Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone1Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level1;
        })(State.Level);
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
                this.currentLevel = 1 /* Zone1Level2 */;
                this.nextLevel = 2 /* Zone1Level3 */.toString();
            }
            Zone1Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/1-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone1.png');
            };

            Zone1Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone1Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level2;
        })(State.Level);
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
                this.currentLevel = 2 /* Zone1Level3 */;
                this.nextLevel = 3 /* Zone2Level1 */.toString();
            }
            Zone1Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone1.png');
            };

            Zone1Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone1Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level3;
        })(State.Level);
        State.Zone1Level3 = Zone1Level3;
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
                this.currentLevel = 3 /* Zone2Level1 */;
                this.nextLevel = 4 /* Zone2Level2 */.toString();
            }
            Zone2Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone2.png');
            };

            Zone2Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone2Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level1;
        })(State.Level);
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
                this.currentLevel = 4 /* Zone2Level2 */;
                this.nextLevel = 5 /* Zone2Level3 */.toString();
            }
            Zone2Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/2-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone2.png');
            };

            Zone2Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone2Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level2;
        })(State.Level);
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
                this.currentLevel = 5 /* Zone2Level3 */;
                this.nextLevel = 6 /* Zone3Level1 */.toString();
            }
            Zone2Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/2-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone2.png');
            };

            Zone2Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone2Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level3;
        })(State.Level);
        State.Zone2Level3 = Zone2Level3;
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
                this.currentLevel = 6 /* Zone3Level1 */;
                this.nextLevel = 7 /* Zone3Level2 */.toString();
            }
            Zone3Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/3-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone3.png');
            };

            Zone3Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone3Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level1;
        })(State.Level);
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
                this.currentLevel = 7 /* Zone3Level2 */;
                this.nextLevel = 8 /* Zone3Level3 */.toString();
            }
            Zone3Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/3-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone3.png');
            };

            Zone3Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone3Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level2;
        })(State.Level);
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
                this.currentLevel = 8 /* Zone3Level3 */;
                this.nextLevel = 9 /* Zone4Level1 */.toString();
            }
            Zone3Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/3-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone3.png');
            };

            Zone3Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone3Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level3;
        })(State.Level);
        State.Zone3Level3 = Zone3Level3;
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
                this.currentLevel = 9 /* Zone4Level1 */;
                this.nextLevel = 10 /* Zone4Level2 */.toString();
            }
            Zone4Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone4.png');
            };

            Zone4Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level1;
        })(State.Level);
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
                this.currentLevel = 10 /* Zone4Level2 */;
                this.nextLevel = 11 /* Zone4Level3 */.toString();
            }
            Zone4Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/4-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone4.png');
            };

            Zone4Level2.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4Level2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level2;
        })(State.Level);
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
                this.currentLevel = 11 /* Zone4Level3 */;
                this.nextLevel = 'gameOver';
            }
            Zone4Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/4-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone4.png');
            };

            Zone4Level3.prototype.create = function () {
                _super.prototype.create.call(this);
            };

            Zone4Level3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level3;
        })(State.Level);
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
            }
            GameOver.prototype.create = function () {
                this.background = this.add.sprite(80, 0, 'menu-background');
            };
            return GameOver;
        })(Phaser.State);
        State.GameOver = GameOver;
    })(Sample.State || (Sample.State = {}));
    var State = Sample.State;
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var SettingsClass = (function () {
        function SettingsClass() {
            this.keys = {
                moveLeft: Phaser.Keyboard.LEFT,
                moveRight: Phaser.Keyboard.RIGHT,
                jump: Phaser.Keyboard.UP,
                attack: Phaser.Keyboard.Z,
                superkey: Phaser.Keyboard.SPACEBAR
            };
        }
        return SettingsClass;
    })();

    Sample.settings = new SettingsClass();

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
    })(Sample.Direction || (Sample.Direction = {}));
    var Direction = Sample.Direction;
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

            this.state.add(0 /* Zone1Level1 */.toString(), Sample.State.Zone1Level1);
            this.state.add(1 /* Zone1Level2 */.toString(), Sample.State.Zone1Level2);
            this.state.add(2 /* Zone1Level3 */.toString(), Sample.State.Zone1Level3);

            this.state.add(3 /* Zone2Level1 */.toString(), Sample.State.Zone2Level1);
            this.state.add(4 /* Zone2Level2 */.toString(), Sample.State.Zone2Level2);
            this.state.add(5 /* Zone2Level3 */.toString(), Sample.State.Zone2Level3);

            this.state.add(6 /* Zone3Level1 */.toString(), Sample.State.Zone3Level1);
            this.state.add(7 /* Zone3Level2 */.toString(), Sample.State.Zone3Level2);
            this.state.add(8 /* Zone3Level3 */.toString(), Sample.State.Zone3Level3);

            this.state.add(9 /* Zone4Level1 */.toString(), Sample.State.Zone4Level1);
            this.state.add(10 /* Zone4Level2 */.toString(), Sample.State.Zone4Level2);
            this.state.add(11 /* Zone4Level3 */.toString(), Sample.State.Zone4Level3);

            this.state.add('gameOver', Sample.State.GameOver);

            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Sample.Game = Game;
})(Sample || (Sample = {}));

window.onload = function () {
    var game = new Sample.Game();
};
//# sourceMappingURL=main.js.map
