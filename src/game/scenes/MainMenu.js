import React from 'react';
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Initialize variables
        this.crashHeight = 1000;
        this.fly = 200;
        this.value = 0;
        this.multiplier = this.value;

        // Generate a random crash value, ensuring it doesn't equal 5
        this.crashValue = Phaser.Math.RND.integerInRange(0, 200);
        while (this.crashValue === 5) {
            this.crashValue = Phaser.Math.RND.integerInRange(0, 100);
        }
        console.log("Target Value (crashValue):", this.crashValue);

        // Display multiplier text
        this.valueText = this.add.text(100, 100, `Multiplier: ${this.multiplier}`, {
            fontSize: '32px',
            stroke: '#000000',
            strokeThickness: 4,
            color: '#fff',
        }).setDepth(100);

        // Increment the multiplier value every 100ms
        this.time.addEvent({
            delay: 100,
            callback: this.incrementValue,
            callbackScope: this,
            loop: true,
        });

        // Create crash animation
        const animConfig = {
            key: 'crashPlane',
            frames: 'crash',
            frameRate: 5,
            repeat: -1,
        };
        this.anims.create(animConfig);

        // Score display
        this.score = this.add.text(112, 50, "0", {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);

        // Listen to score increase events
        EventBus.on("IncreaseScore", (gameState) => {
            this.score.setText(gameState.score);
            console.log(gameState.score, "This is my Score");
        });

        // Add game elements
        this.plane = this.add.image(86, 569, 'plane').setDepth(1);
        this.cloud = this.add.tileSprite(0, -22, 0, 490, 'cloud').setOrigin(0, 0).setScale(2.08, 0.84);
        this.road = this.add.tileSprite(0, 179, 0, 490, 'road').setOrigin(0, 0).setScale(2.11, 1.07);
        this.planeAudio = this.sound.add('planeSound');

        // Emit event signaling the scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        this.movePlane();
        this.road.tilePositionX += 2; // Move road tiles
        this.cloud.tilePositionX += 1; // Move cloud tiles

        // Check if crash condition is met
        if (this.crashValue === this.value) {
            console.log(this.crashValue, "crash Value", this.value, "this.value");
            this.replacePlaneWithCrash();
            this.value++;

            this.time.delayedCall(3000, () => {
                this.road.setVisible(false);
                this.cloud.setVisible(false);
                this.loader();
            });
            

            this.time.delayedCall(9000, () => {
                this.scene.restart("MainMenu");
            });
        }
    }

    movePlane() {
        // Play plane audio
        this.planeAudio.play({ loop: false });

        // Move the plane until it reaches crashHeight
        if (this.plane.x < this.crashHeight) {
            if (this.plane.x < this.fly) {
                this.plane.x += 0.9;
                this.plane.rotation = 0;
            } else {
                this.plane.x += 1.2;
                this.plane.y -= 0.64;
                this.plane.rotation = -0.28;
            }
        } else {
            this.plane.rotation = 0;
            this.planeAudio.stop();
        }
    }

    incrementValue() {
        // Increment the value until it reaches the crashValue
        if (this.value < this.crashValue) {
            this.value++;
            this.multiplier = parseFloat(this.value / 100).toFixed(2);
            console.log(this.multiplier, "multiplier value");
            this.valueText.setText(`Value: ${this.multiplier}`);
        } else {
            console.log("Reached target value:", this.crashValue);
        }
    }

    replacePlaneWithCrash() {
        // Replace plane with crash animation
        const crashSprite = this.add.sprite(this.plane.x, this.plane.y, "crash").setDepth(1);
        this.plane.destroy();
        crashSprite.play('crashPlane');

        this.time.delayedCall(1000, () => {
            crashSprite.destroy();
        });
    }

    loader(){
        this.cameras.main.setBackgroundColor('#000') // Set black background
        console.log("loader is working!!")
        const barWidth = 400;
        const barHeight = 50;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.LoadingText = this.add.text(centerX-70, centerY -10, `Loading...`, {
            fontSize: '32px',
            stroke: '#000000',
            strokeThickness: 4,
            color: '#fff',
        }).setDepth(100);

        // Create a border rectangle for the loading bar
        this.border = this.add.graphics();
        this.border.lineStyle(4, 0xffffff); // White border
        this.border.strokeRect(centerX - barWidth / 2, centerY - barHeight / 2, barWidth, barHeight);

        // Create the progress bar (starts empty)
        this.progressBar = this.add.graphics();

        // Simulate loading progress using a tween
        this.loadProgress = 0;
        this.time.addEvent({
            delay: 100, // Update every 50ms
            callback: this.updateProgress,
            callbackScope: this,
            loop: true,
        });
    }

    updateProgress() {
        const barWidth = 400;
        const barHeight = 50;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Increment the loading progress
        this.loadProgress += 2; // Adjust speed as needed

        // Draw the progress bar
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1); // White fill
        this.progressBar.fillRect(
            centerX - barWidth / 2, // X position
            centerY - barHeight / 2, // Y position
            (this.loadProgress / 100) * barWidth, // Width based on progress
            barHeight // Height
        );

        // Stop the progress at 100%
        if (this.loadProgress >= 100) {
            this.loadProgress = 98;
            // this.loadingEvent.remove();
            this.LoadingText.setText("Loading Complete");
            this.LoadingText.x = centerX - 130;
            this.time.delayedCall(5000, () => {
                console.log('Loading Complete!');
                // Transition to another scene or do something here
            });
        }
    }
}
