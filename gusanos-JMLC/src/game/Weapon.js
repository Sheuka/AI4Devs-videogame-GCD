import { POINTER_DISTANCE, ANGLE_CHANGE_RATE } from '../utils/Constants.js';

export default class Weapon {
    constructor(scene, worm) {
        this.scene = scene;
        this.worm = worm;
        this.pointer = null;
        this.pointerDistance = POINTER_DISTANCE;
        this.angle = 0;
        this.minAngle = -90;
        this.maxAngle = 90;

        this.createPointer();
    }

    createPointer() {
        this.pointer = this.scene.add.circle(0, 0, 5, 0xff0000);
        this.updatePointerPosition();
    }

    updatePointerPosition() {
        const radians = Phaser.Math.DegToRad(this.angle);
        const direction = this.worm.direction;
        
        const x = this.worm.position.x + (this.worm.width / 2) + (Math.cos(radians) * this.pointerDistance * direction);
        const y = this.worm.position.y + (this.worm.height / 2) - Math.sin(radians) * this.pointerDistance;

        this.pointer.setPosition(x, y);
    }

    increaseAngle() {
        this.angle = Math.min(this.angle + ANGLE_CHANGE_RATE, this.maxAngle);
        this.updatePointerPosition();
    }

    decreaseAngle() {
        this.angle = Math.max(this.angle - ANGLE_CHANGE_RATE, this.minAngle);
        this.updatePointerPosition();
    }

    update(cursors) {
        if (cursors.up.isDown) {
            this.increaseAngle();
        } else if (cursors.down.isDown) {
            this.decreaseAngle();
        }
        this.updatePointerPosition();
    }
}