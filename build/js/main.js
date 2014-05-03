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

                this.load.image('player', 'assets/images/player.png');
                this.load.image('runner', 'assets/images/runner.png');
            };

            Preload.prototype.create = function () {
                this.game.state.start('level1');
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
                var _this = this;
                this.background = this.add.sprite(80, 0, 'menu-background');
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('level1');
                });
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
                _super.call(this, game, x, y, 'player', 0);
                this.gravity = 300;
                this.velocity = 300;
                this.jumpHeight = 150;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;

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
                _super.call(this, game, x, y, 'runner', 0);
                this.gravity = 300;
                this.velocity = 100;
                this.direction = 1 /* RIGHT */;

                game.physics.arcade.enable(this);
                this.body.gravity.y = this.gravity;

                game.add.existing(this);
            }
            Runner.prototype.update = function () {
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
    (function (State) {
        var Level1 = (function (_super) {
            __extends(Level1, _super);
            function Level1() {
                _super.apply(this, arguments);
            }
            Level1.prototype.preload = function () {
                this.game.load.tilemap('map', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('tiles', 'assets/images/tiles.png');
            };

            Level1.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('tiles');

                this.map.setCollisionByIndex(1);

                this.layer = this.map.createLayer('mainLayer');
                this.layer.resizeWorld();

                this.player = new Sample.Prefab.Player(this.game, 610, 10);

                this.runner = new Sample.Prefab.Runner(this.game, 640, 230);

                this.game.camera.follow(this.player);
            };

            Level1.prototype.update = function () {
                this.game.physics.arcade.collide(this.player, this.layer);
                this.game.physics.arcade.collide(this.runner, this.layer);
            };
            return Level1;
        })(Phaser.State);
        State.Level1 = Level1;
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

            this.state.add('level1', Sample.State.Level1);

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
