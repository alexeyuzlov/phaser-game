/// <reference path="../vendor/phaser-official/build/phaser.d.ts"/>

/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>

/// <reference path='State/Menu.ts'/>

/// <reference path='State/Levels/AbstractZone.ts'/>

/// <reference path='State/Levels/Zone1/Zone1.ts'/>
/// <reference path='State/Levels/Zone1/Level1.ts'/>
/// <reference path='State/Levels/Zone1/Level2.ts'/>
/// <reference path='State/Levels/Zone1/Level3.ts'/>

/// <reference path='State/Levels/Zone2/Zone2.ts'/>
/// <reference path='State/Levels/Zone2/Level1.ts'/>
/// <reference path='State/Levels/Zone2/Level2.ts'/>
/// <reference path='State/Levels/Zone2/Level3.ts'/>

/// <reference path='State/Levels/Zone3/Zone3.ts'/>
/// <reference path='State/Levels/Zone3/Level1.ts'/>
/// <reference path='State/Levels/Zone3/Level2.ts'/>
/// <reference path='State/Levels/Zone3/Level3.ts'/>

/// <reference path='State/Levels/Zone4/Zone4.ts'/>
/// <reference path='State/Levels/Zone4/Level1.ts'/>
/// <reference path='State/Levels/Zone4/Level2.ts'/>
/// <reference path='State/Levels/Zone4/Level3.ts'/>

/// <reference path='State/GameOver.ts'/>

/// <reference path='Prefab/Player.ts'/>
/// <reference path='Prefab/HUD.ts'/>
/// <reference path='Prefab/BlackScreen.ts'/>

/// <reference path='Prefab/Spike.ts'/>
/// <reference path='Prefab/IceSpike.ts'/>
/// <reference path='Prefab/Bullet.ts'/>
/// <reference path='Prefab/Exit.ts'/>

/// <reference path='Prefab/Enemies/AbstractEnemy.ts'/>
/// <reference path='Prefab/Enemies/Runner.ts'/>
/// <reference path='Prefab/Enemies/Flier.ts'/>
/// <reference path='Prefab/Enemies/Shooter.ts'/>

module Sample {

    class SettingsClass  {
        keys: any;
        font = {
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

    export var settings: any = new SettingsClass();

    export enum Levels {
        Zone1Level1, Zone1Level2, Zone1Level3,
        Zone2Level1, Zone2Level2, Zone2Level3,
        Zone3Level1, Zone3Level2, Zone3Level3,
        Zone4Level1, Zone4Level2, Zone4Level3,
    }

    export enum Direction {
        Left,
        Right,
    }

    export interface IDirection extends Phaser.Sprite {
        direction: Direction;
    }
}
