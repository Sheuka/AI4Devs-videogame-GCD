class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.timeLeft = 60; // Tiempo inicial en segundos
    }

    create() {
        // Inicializar valores
        this.registry.set('score', 0);
        this.registry.set('health', 100);
        this.registry.set('leftTime', this.timeLeft);

        // Create the player
        this.archer = new Archer(this, 400, 300);
        this.archer.setScale(0.3); // Escala el tamaño del arquero al 50        // Create enemies group
        
        //Create the enemies
        this.enemies = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let enemy = new Enemy(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
            enemy.setScale(0.3); // Escala el tamaño de los enemigos al 50%
            this.enemies.add(enemy);
        }

        // Create key and door
        this.key = new Key(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
        this.key.setScale(0.1); // Escala el tamaño de la llave al 50%
        this.door = new Door(this, Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500));
        this.door.setScale(0.3); // Escala el tamaño de la puerta al 50%

        // Collisions
        this.physics.add.overlap(this.archer.arrows, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.archer, this.enemies, this.hitPlayer, null, this);
        this.physics.add.overlap(this.archer, this.key, this.collectKey, null, this);
        this.physics.add.overlap(this.archer, this.door, this.reachDoor, null, this);
        
        // UI
        this.scene.launch('UIScene');
        this.scene.bringToTop('UIScene');

        // Listen for enemy killed event
        this.events.on('enemyKilled', this.updateScore, this);

        // Crear el temporizador
        this.time.addEvent({
            delay: 1000, // 1000 ms = 1 segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    hitEnemy(arrow, enemy) {
        arrow.destroy();
        enemy.takeDamage(10);
    }

    hitPlayer(player, enemy) {
        enemy.explode();
        player.takeDamage(20);
    }

    collectKey(player, key) {
        key.collect();
        player.hasKey = true;
    }

    reachDoor(player, door) {
        if (player.hasKey) {
            this.scene.start('NextLevelScene'); // Cambia a la siguiente escena
        }
    }

    update(time) {
        this.archer.update(time);
        this.archer.arrows.children.each(function(arrow) {
            arrow.update();
        }, this);
    }

    updateScore(points) {
        let currentScore = this.registry.get('score') || 0;
        this.registry.set('score', currentScore + points);
    }

    updateTimer() {
        this.timeLeft--;
        this.registry.set('leftTime', this.timeLeft);

        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.scene.start('GameOverScene');
    }
}