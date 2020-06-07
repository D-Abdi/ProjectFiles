class MG2 extends Phaser.Scene {
    constructor() {
      super({ key: 'MG2'})
    }

    preload(){
     this.load.spritesheet('codey', 'assets/codey.png', { frameWidth: 72, frameHeight: 90 });
     this.load.spritesheet('snowman', 'assets/snowman.png', { frameWidth: 50, frameHeight: 70 });
     this.load.image('door', 'assets/door.png')
     this.load.image('tiles2', 'assets/RPGmap.png')
     this.load.tilemapTiledJSON('map2', 'assets/miniGame2.json');
    }

    create(){
    // Map maken
    const map2 = this.make.tilemap({key: 'map2'});

    const tileset2 = map2.addTilesetImage('RPGmap', 'tiles2')

    const worldLayer2 = map2.createStaticLayer('Blocked', tileset2, 0, 0);

    worldLayer2.setCollisionByProperty({ collides: true });
    
    // Speler aanmaken
    gameState.player = this.physics.add.sprite(95, 95, 'codey').setScale(.225)
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(gameState.player, worldLayer2)

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
      
    // Enemies toevoegen
    gameState.enemy[0] = this.physics.add.sprite(75, 175, 'snowman').setScale(.3)

    gameState.enemy[1] = this.physics.add.sprite(275, 95, 'snowman').setScale(.3)
    gameState.enemy[2] = this.physics.add.sprite(220, 145, 'snowman').setScale(.3)

    gameState.enemy[3] = this.physics.add.sprite(220, 190, 'snowman').setScale(.3) 
    gameState.enemy[4] = this.physics.add.sprite(420, 225, 'snowman').setScale(.3)

    gameState.enemy[5] = this.physics.add.sprite(80, 225, 'snowman').setScale(.3) 
    gameState.enemy[6] = this.physics.add.sprite(110, 305, 'snowman').setScale(.3)

    gameState.enemy[7] = this.physics.add.sprite(255, 305, 'snowman').setScale(.3)
    gameState.enemy[8] = this.physics.add.sprite(305, 270, 'snowman').setScale(.3)
    gameState.enemy[9] = this.physics.add.sprite(355, 305, 'snowman').setScale(.3)

    // Sneeuwman animaties
    this.anims.create({
        key: 'snowmanAlert',
        frames: this.anims.generateFrameNumbers('snowman', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
    });    

    // Enemy animatie afspelen
    gameState.enemy[0].anims.play('snowmanAlert', true)
    gameState.enemy[1].anims.play('snowmanAlert', true);
    gameState.enemy[2].anims.play('snowmanAlert', true);
    gameState.enemy[3].anims.play('snowmanAlert', true);
    gameState.enemy[4].anims.play('snowmanAlert', true);
    gameState.enemy[5].anims.play('snowmanAlert', true);
    gameState.enemy[6].anims.play('snowmanAlert', true);
    gameState.enemy[7].anims.play('snowmanAlert', true);
    gameState.enemy[8].anims.play('snowmanAlert', true);
    gameState.enemy[9].anims.play('snowmanAlert', true);
    
    // Tweens Toevoegen
    let tween0 = this.tweens.add({
        targets: gameState.enemy[0],
        x: 180,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onRepeat: function () {
          gameState.enemy.flipX = true;
        }
    });

    let tween1 = this.tweens.add({
        targets: gameState.enemy[1],
        x: 155,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween2 = this.tweens.add({
        targets: gameState.enemy[2],
        x: 350,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween3 = this.tweens.add({
        targets: gameState.enemy[3],
        x: 430,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween4 = this.tweens.add({
        targets: gameState.enemy[4],
        x: 220,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween5 = this.tweens.add({
        targets: gameState.enemy[5],
        y: 305,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });

    let tween6 = this.tweens.add({
        targets: gameState.enemy[6],
        y: 225,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });

    let tween7 = this.tweens.add({
        targets: gameState.enemy[7],
        y: 270,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween8 = this.tweens.add({
        targets: gameState.enemy[8],
        y: 305,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });  

    let tween9 = this.tweens.add({
        targets: gameState.enemy[9],
        y: 270,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });

    // Maak enemies gevaarlijk
    this.physics.add.overlap(gameState.player, gameState.enemy[0], () => {
      gameState.player.x = 95;
      gameState.player.y = 95;
        this.cameras.main.shake(50, .025, true)
    })

    this.physics.add.overlap(gameState.player, gameState.enemy[1], () => {
      gameState.player.x = 95;
      gameState.player.y = 95;
        this.cameras.main.shake(50, .025, true)
    })    

    this.physics.add.overlap(gameState.player, gameState.enemy[2], () => {
      gameState.player.x = 95;
      gameState.player.y = 95;
      this.cameras.main.shake(50, .025, true)
    })
    
    this.physics.add.overlap(gameState.player, gameState.enemy[3], () => {
      gameState.player.x = 410;
      gameState.player.y = 130;
      this.cameras.main.shake(50, .025, true)
    }) 

    this.physics.add.overlap(gameState.player, gameState.enemy[4], () => {
      gameState.player.x = 410;
      gameState.player.y = 130;
      this.cameras.main.shake(50, .025, true)
    })
    
    this.physics.add.overlap(gameState.player, gameState.enemy[5], () => {
      gameState.player.x = 410;
      gameState.player.y = 130;
      this.cameras.main.shake(50, .025, true)
    })      

    this.physics.add.overlap(gameState.player, gameState.enemy[6], () => {
      gameState.player.x = 410;
      gameState.player.y = 130;
      this.cameras.main.shake(50, .025, true)
    })

    this.physics.add.overlap(gameState.player, gameState.enemy[7], () => {
      gameState.player.x = 200;
      gameState.player.y = 270;
      this.cameras.main.shake(50, .025, true)
    })
 
    this.physics.add.overlap(gameState.player, gameState.enemy[8], () => {
      gameState.player.x = 200;
      gameState.player.y = 270;
      this.cameras.main.shake(50, .025, true)
    })

    this.physics.add.overlap(gameState.player, gameState.enemy[9], () => {
      gameState.player.x = 200;
      gameState.player.y = 270;
      this.cameras.main.shake(50, .025, true)
    })
    
    // Win condition maken
    let door = this.physics.add.sprite(455, 290, 'door').setScale(.045)
    door.visible = false;

    this.physics.add.overlap(gameState.player, door, () => {
      this.cameras.main.fade(1100, 255, 255, 255, false, function(camera, progress) {
          if(progress > 0.9) {
             this.scene.restart();
          }
      })
    })
    }
    

    update(){
      const speed = 160;
      const prevVelocity = gameState.player.body.velocity.clone();
  
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
}

}