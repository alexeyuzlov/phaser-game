/// <reference path="../vendor/phaser-official/build/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>

/// <reference path='State/Menu.ts'/>

/// <reference path='State/Levels/AbstractZone.ts'/>
/// <reference path='State/Levels/AbstractStory.ts'/>

/// <reference path='State/Levels/Zone1/Zone1.ts'/>
/// <reference path='State/Levels/Zone1/Story1.ts'/>
/// <reference path='State/Levels/Zone1/Level1.ts'/>
/// <reference path='State/Levels/Zone1/Level2.ts'/>
/// <reference path='State/Levels/Zone1/Level3.ts'/>

/// <reference path='State/Levels/Zone2/Zone2.ts'/>
/// <reference path='State/Levels/Zone2/Story2.ts'/>
/// <reference path='State/Levels/Zone2/Level1.ts'/>
/// <reference path='State/Levels/Zone2/Level2.ts'/>
/// <reference path='State/Levels/Zone2/Level3.ts'/>

/// <reference path='State/Levels/Zone3/Zone3.ts'/>
/// <reference path='State/Levels/Zone3/Story3.ts'/>
/// <reference path='State/Levels/Zone3/Level1.ts'/>
/// <reference path='State/Levels/Zone3/Level2.ts'/>
/// <reference path='State/Levels/Zone3/Level3.ts'/>

/// <reference path='State/Levels/Zone4/Zone4.ts'/>
/// <reference path='State/Levels/Zone4/Story4.ts'/>
/// <reference path='State/Levels/Zone4/Level1.ts'/>
/// <reference path='State/Levels/Zone4/Level2.ts'/>
/// <reference path='State/Levels/Zone4/Level3.ts'/>

/// <reference path='State/GameOver.ts'/>

/// <reference path='Prefab/Player.ts'/>
/// <reference path='Prefab/HUD.ts'/>
/// <reference path='Prefab/BlackScreen.ts'/>
/// <reference path='Prefab/PreloadBar.ts'/>

/// <reference path='Prefab/Transparent.ts'/>

/// <reference path='Prefab/Spike.ts'/>
/// <reference path='Prefab/IceSpike.ts'/>
/// <reference path='Prefab/Exit.ts'/>

/// <reference path='Prefab/Platforms/Platform.ts'/>
/// <reference path='Prefab/Platforms/PlatformHorizontal.ts'/>
/// <reference path='Prefab/Platforms/PlatformVertical.ts'/>

/// <reference path='Prefab/Bottles/Bottle.ts'/>
/// <reference path='Prefab/Bottles/BottleHP.ts'/>
/// <reference path='Prefab/Bottles/BottleMP.ts'/>
/// <reference path='Prefab/Bottles/BottleSuper.ts'/>

/// <reference path='Prefab/Enemies/AbstractEnemy.ts'/>
/// <reference path='Prefab/Enemies/Runner.ts'/>
/// <reference path='Prefab/Enemies/Flier.ts'/>
/// <reference path='Prefab/Enemies/Shooter.ts'/>
/// <reference path='Prefab/Enemies/ShooterReject.ts'/>
/// <reference path='Prefab/Enemies/Bullet.ts'/>
/// <reference path='Prefab/Enemies/BulletReject.ts'/>

module Sample {

    export enum Stories {
        Story1, Story2, Story3, Story4
    }

    export enum Levels {
        Zone1Level1, Zone1Level2, Zone1Level3,
        Zone2Level1, Zone2Level2, Zone2Level3,
        Zone3Level1, Zone3Level2, Zone3Level3,
        Zone4Level1, Zone4Level2, Zone4Level3,
    }

    export enum Direction {
        Left,
        Right,
        Up,
        Down
    }

    export interface IDirection extends Phaser.Sprite {
        direction: Direction;
    }

    class Init {
        static HealthPoints = 100;
        static ManaPoints = 500;
        static FirstState: string = Stories[Stories.Story1];
    }

    class Storage {
        private healthPoints:string;
        private manaPoints:string;
        private currentLevel:string;

        constructor() {
        }

        getCurrentLevel():string {
            var currentLevel = localStorage.getItem('currentLevel');
            if (currentLevel) {
                return currentLevel;
            } else {
                this.setCurrentLevel(Init.FirstState);
                return Init.FirstState;
            }
        }

        setCurrentLevel(currentLevel:string) {
            localStorage.setItem('currentLevel', currentLevel);
        }

        getHealthPoints():string {
            var healthPoints = localStorage.getItem('healthPoints');
            if (healthPoints) {
                return healthPoints;
            } else {
                healthPoints = Init.HealthPoints.toString();
                this.setHealthPoints(healthPoints);
                return healthPoints;
            }
        }

        setHealthPoints(healthPoints:string) {
            localStorage.setItem('healthPoints', healthPoints);
        }

        getManaPoints():string {
            var manaPoints = localStorage.getItem('manaPoints');
            if (manaPoints) {
                return manaPoints;
            } else {
                manaPoints = Init.ManaPoints.toString();
                this.setManaPoints(manaPoints);
                return manaPoints;
            }
        }

        setManaPoints(manaPoints:string) {
            localStorage.setItem('manaPoints', manaPoints);
        }
    }

    class SettingsClass {
        storage = new Storage();

        keys:any;
        font = {
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

        constructor() {
            this.keys = {
                moveLeft: Phaser.Keyboard.LEFT,
                moveRight: Phaser.Keyboard.RIGHT,
                sit: Phaser.Keyboard.DOWN,
                jump: Phaser.Keyboard.Z,
                attack: Phaser.Keyboard.X,
                superAttack: Phaser.Keyboard.A,
                superSpeed: Phaser.Keyboard.S,
                superkey: Phaser.Keyboard.SPACEBAR
            }
        }
    }

    export var settings:any = new SettingsClass();
}
