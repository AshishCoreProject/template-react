import { Scene } from 'phaser';

export default class Coin extends Scene {
    constructor(scene){
        super("Coin");
        this.scene = scene;
        this.init();
        this.add();

        // Example usage of the context
        // if (this.context.playerHealth !== undefined) {
        //     console.log("Player Health from context:", this.context.playerHealth);
        // } else {
        //     console.warn("No playerHealth found in context.");
        // }
    }
    init(data){
        console.log(data, "ashish");
        this.context = data.context || {}
    }

    add(){
        this.scene.add.text(512, 460, this.context.playerHealth, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
    }

}