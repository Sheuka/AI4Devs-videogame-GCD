class NextLevelScene extends Phaser.Scene {
    constructor() {
        super('NextLevelScene');
    }

    create() {
        this.add.text(400, 300, 'Next Level', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene'); // Inicia el siguiente nivel
        });
    }
}
