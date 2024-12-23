import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        // Get the center coordinates of the camera
        const { width, height } = this.cameras.main;
        const x = width * 0.5;
        const y = height * 0.5;
        const Orange = 0xffa500; // Define the color orange

        // Create animated rectangles (bars) for the loading animation
        const left = this.add.rectangle(x - 50, y, 40, 75, Orange, 1);
        const middle = this.add.rectangle(x, y, 40, 75, Orange, 1);
        const right = this.add.rectangle(x + 50, y, 40, 75, Orange, 1);

        // Add tween animations for the rectangles
        this.add.tween({
            targets: left,
            scaleY: 2,
            duration: 300,
            repeat: -1,
            repeatDelay: 300,
            yoyo: true,
            ease: Phaser.Math.Easing.Bounce,
        });

        this.add.tween({
            targets: middle,
            scaleY: 2,
            duration: 300,
            delay: 100,
            repeat: -1,
            repeatDelay: 300,
            yoyo: true,
            ease: Phaser.Math.Easing.Bounce,
        });

        this.add.tween({
            targets: right,
            scaleY: 2,
            duration: 300,
            delay: 200,
            repeat: -1,
            repeatDelay: 300,
            yoyo: true,
            ease: Phaser.Math.Easing.Bounce,
        });
    }

    preload() {
        const { width, height } = this.cameras.main;

        // Add a progress text
        const progressText = this.add.text(width * 0.5, height * 0.5 + 100, 'Loading...', {
            fontSize: '20px',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Handle the loading progress
        this.load.on('progress', (progress) => {
            progressText.setText(`Loading... ${Math.floor(progress * 100)}%`);
        });

        // Handle the loading complete event
        this.load.on('complete', () => {
            progressText.setText('Loading complete!');
        });
        this.load.path = '../../assets/';
        // Load your assets
        this.load.setPath('assets');
        this.load.image('plane', 'images/plane.png');
        this.load.image('logo', 'images/logo.png');
        this.load.image('star', 'images/star.png');
        this.load.image('cloud', 'images/cloud.png');
        this.load.image('road', 'images/road.png');
        this.load.audio('planeSound', 'audio/planeSound.mp3');
        this.load.atlas('crash', 'images/crash/blast.png', 'images/crash/blast.json');

        // Simulate longer loading for visual effect (optional)
        for (let i = 0; i < 100; i++) {
            this.load.image(`dummy${i}`, 'images/plane.png');
        }
    }

    create() {
        // Add a delay before transitioning to the next scene
        this.time.delayedCall(1500, () => {
            this.scene.start('MainMenu'); // Replace 'MainMenu' with your next scene
        });
    }
}
