import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { config } from '../main';

export class MainMenu extends Scene
{
    logoTween;
    
    constructor ()
    {
        super('MainMenu');
        this.crash = 1000;
        this.fly = 200;
    }

    create ()
    {
        // this.add.image(512, 384, 'background');
        // this.logo = this.add.image(512, 300, 'logo').setDepth(100);
        // this.add.text(512, 460, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setDepth(100).setOrigin(0.5);
        this.plane = this.add.image(86, 569, 'plane').setDepth(1);
        this.cloud = this.add.tileSprite(0, -22, 0, 490,'cloud').setOrigin(0,0);
        this.road = this.add.tileSprite(0, 179,0, 490,'road').setOrigin(0,0);
        this.road.scaleX = 2.11;
        this.road.scaleY = 1.07;
        this.cloud.scaleX = 2.08;
        this.cloud.scaleY = 0.84;

        this.planeAudio = this.sound.add('planeSound')
        EventBus.emit('current-scene-ready', this);
    }

    update(){
        this.movePlane()
        this.road.tilePositionX += 2;
        this.cloud.tilePositionX += 1;
    }

    movePlane(){
        this.planeAudio.play();
        this.planeAudio.loop = false;
        if (this.plane.x < this.crash ) {
            if(this.plane.x < this.fly){
                this.plane.x += 0.9;
                this.plane.rotation = 0;
                
            }else{
                this.plane.x += 1.2;
                this.plane.y -= 0.64;
                this.plane.rotation = -0.28;
                
            }
        }
        else{
            this.plane.rotation = 0;
            this.planeAudio.stop();
        }
    }



}
