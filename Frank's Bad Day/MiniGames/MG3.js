let text; 
class MG3 extends Phaser.Scene {
    constructor() {
      super({ key: 'MG3'})
    }

    preload() {
        this.load.spritesheet('codey', 'assets/codey.png', { frameWidth: 72, frameHeight: 90 });
        this.load.spritesheet('snowman', 'assets/snowman.png', { frameWidth: 50, frameHeight: 70 });
        this.load.image('tiles3', 'assets/RPGmap.png');
        this.load.tilemapTiledJSON('map3', 'assets/miniGame3.json');
        this.load.image('door', 'assets/door.png')
    }
    create() {
        // Maak een class aan voor de animaties
        this.routes = new RouteAnim() 

        // Map maken
        const map3 = this.make.tilemap({key: 'map3'});

        const tileset3 = map3.addTilesetImage('rpg', 'tiles3')
        
        map3.createStaticLayer('Floor', tileset3, 125, 40)
        map3.createStaticLayer('Carpet', tileset3, 125, 40)
        const worldLayer3 = map3.createStaticLayer('Blocked', tileset3, 125, 40)
        const belowLayer3 = map3.createStaticLayer('UnBlocked', tileset3, 125, 40)
        

        worldLayer3.setCollisionByProperty({ collides: true });
        
        
        // Speler aanmaken
        gameState.player = this.physics.add.sprite(450, 670, 'codey').setScale(.4)

        gameState.player.setCollideWorldBounds(true);
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // Animaties toevoegen voor bewegingen
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('codey', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
          });
      
          this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('codey', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: -1
          });
      
          this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('codey', {start: 0, end: 3}),
            frameRate: 5,
            repeat: -1
          }); 
                
        this.physics.add.collider(gameState.player, worldLayer3)

        // Enemy toevoegen 
        gameState.enemy = this.physics.add.sprite(495, 605, 'snowman').setScale(.4)

        // Sneeuwman animaties
        this.anims.create({
          key: 'snowmanAlert',
          frames: this.anims.generateFrameNumbers('snowman', { start: 0, end: 3 }),
          frameRate: 4,
          repeat: -1
        });

        // Laat de game objective zien
        let objText = this.add.text(325, 300, "Get Him! Quick!", {fontSize: 70, fontFamily: "VT323",})
  
        // fade hem na tonen
        this.tweens.add({
          targets: objText,
          alpha: 0,
          delay: 2500,
          duration: 1500,
          repeat: 0,
          yoyo: false
        })    

        gameState.enemy.anims.play('snowmanAlert', true);

        // Routes voor de AI 
        let timeline = this.tweens.timeline({
  
          targets: gameState.enemy,
          
  
          tweens: this.routes.returnRoute()
        })

        // Overlap tussen enemy en speler
        this.physics.add.overlap(gameState.player, gameState.enemy, () => {
          timeline.stop()
          this.anims.pauseAll()
          this.cameras.main.fade(1100, 0, 0, 0, false, function(camera, progress) {
            if(progress > 0.99) {
              this.scene.restart()
            }
          }
        )})

        // Lose condition maken
        let door = this.physics.add.sprite(495, 700, 'door').setScale(.075)
        door.visible = false;

        this.physics.add.overlap(gameState.enemy, door, () => {
          this.physics.pause()
          this.anims.pauseAll()

          this.add.text(375, 300, "He Escaped!", {fontSize: 80, fill: '#FFF', fontFamily: 'VT323'})
          this.add.text(330, 400, "Press Space too try again", {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})                   
        })        
    }

    update() {
        const speed = 200;

        gameState.player.setVelocity(0);
    
        // Horizontale beweging
        if (gameState.cursors.left.isDown) {
          gameState.player.body.setVelocityX(-speed);
          gameState.player.flipX = true;
        }else if (gameState.cursors.right.isDown) {
          gameState.player.body.setVelocityX(speed);
          gameState.player.flipX = false;
        }
    
        // Verticale beweging
        if (gameState.cursors.up.isDown) {
          gameState.player.body.setVelocityY(-speed);
        }else if (gameState.cursors.down.isDown) {
          gameState.player.body.setVelocityY(speed);
        }
         
         // Normalize de snelheid van de speler en scale de snelheid altijd met de variabele die eerder is gegeven
        gameState.player.body.velocity.normalize().scale(speed);
    
        // Voeg animaties toe
        if (gameState.cursors.left.isDown) {
           gameState.player.anims.play('run', true);
        }else if (gameState.cursors.right.isDown) {
           gameState.player.anims.play('run', true);
        }else if (gameState.cursors.up.isDown) {
           gameState.player.anims.play('run', true);
        }else if (gameState.cursors.down.isDown) {
           gameState.player.anims.play('run', true);
        } else {
           gameState.player.anims.play('idle', true);
       }

       if(gameState.cursors.space.isDown) {
        this.anims.resumeAll();
        this.scene.restart()
       }
    } 
}
