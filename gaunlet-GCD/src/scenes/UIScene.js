class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        this.scoreText = this.add.text(16, 16, 'Score: ' + this.registry.get('score'), { fontSize: '32px', fill: '#fff' });
        this.healthText = this.add.text(16, 48, 'Health: ' + this.registry.get('health'), { fontSize: '32px', fill: '#fff' });
        this.timeText = this.add.text(16, 80, 'Time: ' + this.registry.get('leftTime'), { fontSize: '32px', fill: '#fff' });

        this.registry.events.on('changedata', this.updateData, this);
    }

    updateData(parent, key, data) {
        if (key === 'score') {
            this.scoreText.setText('Score: ' + data);
        } else if (key === 'health') {
            this.healthText.setText('Health: ' + data);
        } else if (key === 'leftTime') {
            this.timeText.setText('Time: ' + data);
        }
    }
}