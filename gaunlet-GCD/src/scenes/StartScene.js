class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    create() {
        const { width, height } = this.scale;

        // Título del juego
        this.add.text(width / 2, height / 6, 'Gauntlet Archer', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Instrucciones
        const instructions = [
            'Cómo jugar:',
            '',
            '- Usa las flechas para mover al arquero',
            '- Presiona ESPACIO para disparar flechas',
            '- Elimina a los enemigos',
            '- Recoge la llave y encuentra la puerta',
            '- Sobrevive el mayor tiempo posible',
            '',
            'Objetivo:',
            'Consigue la mayor puntuación antes de que',
            'se acabe el tiempo o pierdas toda la vida'
        ];

        const instructionsText = this.add.text(width / 2, height / 3, instructions, {
            fontSize: '22px', // Reducido de 24px a 22px
            fill: '#fff',
            align: 'center',
            lineSpacing: 8 // Reducido de 10 a 8
        }).setOrigin(0.5, 0);

        // Calcular la altura total del texto de instrucciones
        const instructionsHeight = instructionsText.height;

        // Ajustar la posición vertical del texto de instrucciones
        instructionsText.setY(height / 2 - instructionsHeight / 2);

        // Texto para iniciar el juego
        this.add.text(width / 2, height - 50, 'Presiona ESPACIO para comenzar', {
            fontSize: '28px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Escuchar el evento de tecla espacio
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}