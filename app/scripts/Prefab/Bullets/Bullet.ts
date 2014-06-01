module Sample.Prefab {
    export class Bullet extends AbstractPrefab {
        speed: number = 300;
        damagePoints: number = 30;

        constructor(game:Phaser.Game, x:number, y:number) {
            super(game, x, y, 'bullet');

            game.physics.arcade.enable(this);
            this.anchor.set(0.5, 0.5);
            this.kill();

            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
        }

        update() {
            this.game.physics.arcade.collide(this, this.level.player, (bullet, player)=> {
                bullet.kill();
                if (!this.level.player.immortalState) {
                    this.level.player.makeDamage(bullet.damagePoints);
                    this.level.hud.updateHealthState();
                }
            });
        }
    }
}