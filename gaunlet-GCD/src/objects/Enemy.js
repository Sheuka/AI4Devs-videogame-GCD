class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health = 50;
        this.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.scene.events.emit('enemyKilled', 50);
            this.explode();
        }
    }

    explode() {
        this.scene.sound.play('explosion');
        this.destroy();
    }
}