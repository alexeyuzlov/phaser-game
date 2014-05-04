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

                this.load.image('player', 'assets/images/prefabs/player.png');
                this.load.image('runner', 'assets/images/prefabs/runner.png');
                this.load.image('flier', 'assets/images/prefabs/flier.png');
                this.load.image('bullet', 'assets/images/prefabs/bullet.png');
                this.load.image('shooter', 'assets/images/prefabs/shooter.png');
            };

            Preload.prototype.create = function () {
                this.game.state.start('zone1level1');
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
                    this.game.state.start('zone1level1');
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
                this.jumpHeight = 150;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;
                this.anchor.set(0.5, 0.5);

                game.add.existing(this);
            }
            Player.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.body.velocity.x = this.velocity;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.body.velocity.x = -this.velocity;
                } else {
                    this.body.velocity.x = 0;
                }

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.body.velocity.y = -this.jumpHeight;
                }
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
        (function (DIRECTION) {
            DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
            DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
            DIRECTION[DIRECTION["UP"] = 2] = "UP";
            DIRECTION[DIRECTION["DOWN"] = 3] = "DOWN";
        })(Prefab.DIRECTION || (Prefab.DIRECTION = {}));
        var DIRECTION = Prefab.DIRECTION;

        var Runner = (function (_super) {
            __extends(Runner, _super);
            function Runner(game, x, y) {
                _super.call(this, game, x, y, 'runner');
                this.gravity = 300;
                this.velocity = 100;
                this.direction = 1 /* RIGHT */;
                this.visibleDistance = 800;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;
                this.anchor.set(0.5, 0.5);

                game.add.existing(this);
            }
            Runner.prototype.update = function () {
                if (!this.inCamera)
                    return;

                if (this.body.blocked.left) {
                    this.direction = 1 /* RIGHT */;
                } else if (this.body.blocked.right) {
                    this.direction = 0 /* LEFT */;
                }

                switch (this.direction) {
                    case 0 /* LEFT */:
                        this.body.velocity.x = -this.velocity;
                        break;
                    case 1 /* RIGHT */:
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

                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);
                this.kill();

                this.checkWorldBounds = true;
                this.outOfBoundsKill = true;

                game.add.existing(this);
            }
            Bullet.prototype.update = function () {
            };
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

                game.add.existing(this);
            }
            Shooter.prototype.update = function () {
                if (!this.inCamera)
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
    (function (State) {
        var Zone1Level1 = (function (_super) {
            __extends(Zone1Level1, _super);
            function Zone1Level1() {
                _super.apply(this, arguments);
            }
            Zone1Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone1.png');
            };

            Zone1Level1.prototype.create = function () {
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

                this.game.camera.follow(this.player);
            };

            Zone1Level1.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);
                this.game.physics.arcade.collide(this.runners, this.layer);
                this.game.physics.arcade.collide(this.shooters, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone1level2');
                }
            };
            return Zone1Level1;
        })(Phaser.State);
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
            }
            Zone1Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/1-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone1.png');
            };

            Zone1Level2.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone1Level2.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone1level3');
                }
            };
            return Zone1Level2;
        })(Phaser.State);
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
            }
            Zone1Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/1-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone1.png');
            };

            Zone1Level3.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone1Level3.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone2level1');
                }
            };
            return Zone1Level3;
        })(Phaser.State);
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
            }
            Zone2Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone2.png');
            };

            Zone2Level1.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone2Level1.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone2level2');
                }
            };
            return Zone2Level1;
        })(Phaser.State);
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
            }
            Zone2Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/2-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone2.png');
            };

            Zone2Level2.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone2Level2.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone2level3');
                }
            };
            return Zone2Level2;
        })(Phaser.State);
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
            }
            Zone2Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/2-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone2.png');
            };

            Zone2Level3.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone2Level3.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone3level1');
                }
            };
            return Zone2Level3;
        })(Phaser.State);
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
            }
            Zone3Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/3-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone3.png');
            };

            Zone3Level1.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone3Level1.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone3level2');
                }
            };
            return Zone3Level1;
        })(Phaser.State);
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
            }
            Zone3Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/3-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone3.png');
            };

            Zone3Level2.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone3Level2.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone3level3');
                }
            };
            return Zone3Level2;
        })(Phaser.State);
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
            }
            Zone3Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/3-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone3.png');
            };

            Zone3Level3.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone3Level3.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone4level1');
                }
            };
            return Zone3Level3;
        })(Phaser.State);
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
            }
            Zone4Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone4.png');
            };

            Zone4Level1.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone4Level1.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone4level2');
                }
            };
            return Zone4Level1;
        })(Phaser.State);
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
            }
            Zone4Level2.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/4-2.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone4.png');
            };

            Zone4Level2.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone4Level2.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('zone4level3');
                }
            };
            return Zone4Level2;
        })(Phaser.State);
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
            }
            Zone4Level3.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/4-3.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('zone', 'assets/images/levels/zone4.png');
            };

            Zone4Level3.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('zone');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('main');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 120, 120);

                this.game.camera.follow(this.player);
            };

            Zone4Level3.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.game.state.start('gameOver');
                }
            };
            return Zone4Level3;
        })(Phaser.State);
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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 640, 480, Phaser.AUTO, 'game');

            this.state.add('boot', Sample.State.Boot);
            this.state.add('preload', Sample.State.Preload);
            this.state.add('menu', Sample.State.Menu);

            this.state.add('zone1level1', Sample.State.Zone1Level1);
            this.state.add('zone1level2', Sample.State.Zone1Level2);
            this.state.add('zone1level3', Sample.State.Zone1Level3);

            this.state.add('zone2level1', Sample.State.Zone2Level1);
            this.state.add('zone2level2', Sample.State.Zone2Level2);
            this.state.add('zone2level3', Sample.State.Zone2Level3);

            this.state.add('zone3level1', Sample.State.Zone3Level1);
            this.state.add('zone3level2', Sample.State.Zone3Level2);
            this.state.add('zone3level3', Sample.State.Zone3Level3);

            this.state.add('zone4level1', Sample.State.Zone4Level1);
            this.state.add('zone4level2', Sample.State.Zone4Level2);
            this.state.add('zone4level3', Sample.State.Zone4Level3);

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
