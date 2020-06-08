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

    const worldLayer2 = map2.createStaticLayer('Blocked', tileset2, 50, 50).setScale(1.8)

    worldLayer2.setCollisionByProperty({ collides: true });
    
    // Speler aanmaken
    gameState.player = this.physics.add.sprite(220, 230, 'codey').setScale(.4)
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
    gameState.enemy[0] = this.physics.add.sprite(175, 365, 'snowman').setScale(.6)

    gameState.enemy[1] = this.physics.add.sprite(325, 225, 'snowman').setScale(.6)
    gameState.enemy[2] = this.physics.add.sprite(700, 310, 'snowman').setScale(.6)

    gameState.enemy[3] = this.physics.add.sprite(435, 395, 'snowman').setScale(.6) 
    gameState.enemy[4] = this.physics.add.sprite(840, 455, 'snowman').setScale(.6)

    gameState.enemy[5] = this.physics.add.sprite(190, 450, 'snowman').setScale(.6) 
    gameState.enemy[6] = this.physics.add.sprite(250, 600, 'snowman').setScale(.6)

    gameState.enemy[7] = this.physics.add.sprite(520, 600, 'snowman').setScale(.6)
    gameState.enemy[8] = this.physics.add.sprite(620, 535, 'snowman').setScale(.6)
    gameState.enemy[9] = this.physics.add.sprite(720, 600, 'snowman').setScale(.6)

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
        x: 375,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onRepeat: function () {
          gameState.enemy.flipX = true;
        }
    });

    let tween1 = this.tweens.add({
        targets: gameState.enemy[1],
        x: 550,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween2 = this.tweens.add({
        targets: gameState.enemy[2],
        x: 435,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween3 = this.tweens.add({
        targets: gameState.enemy[3],
        x: 840,
        duration: 2500,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween4 = this.tweens.add({
        targets: gameState.enemy[4],
        x: 435,
        duration: 2500,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween5 = this.tweens.add({
        targets: gameState.enemy[5],
        y: 600,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });

    let tween6 = this.tweens.add({
        targets: gameState.enemy[6],
        y: 450,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });

    let tween7 = this.tweens.add({
        targets: gameState.enemy[7],
        y: 535,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });
    
    let tween8 = this.tweens.add({
        targets: gameState.enemy[8],
        y: 600,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });  

    let tween9 = this.tweens.add({
        targets: gameState.enemy[9],
        y: 535,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onYoyo: function () {
          gameState.enemy.flipX = true;
        }
    });

    // Maak enemies gevaarlijk
    this.physics.add.overlap(gameState.player, gameState.enemy[0], () => {
      gameState.player.x = 220;
      gameState.player.y = 230;
        this.cameras.main.shake(50, .025, true)
    })

    this.physics.add.overlap(gameState.player, gameState.enemy[1], () => {
      gameState.player.x = 220;
      gameState.player.y = 230;
        this.cameras.main.shake(50, .025, true)
    })    

    this.physics.add.overlap(gameState.player, gameState.enemy[2], () => {
      gameState.player.x = 220;
      gameState.player.y = 230;
      this.cameras.main.shake(50, .025, true)
    })
    
    this.physics.add.overlap(gameState.player, gameState.enemy[3], () => {
      gameState.player.x = 800;
      gameState.player.y = 300;
      this.cameras.main.shake(50, .025, true)
    }) 

    this.physics.add.overlap(gameState.player, gameState.enemy[4], () => {
      gameState.player.x = 800;
      gameState.player.y = 300;
      this.cameras.main.shake(50, .025, true)
    })
    
    this.physics.add.overlap(gameState.player, gameState.enemy[5], () => {
      gameState.player.x = 800;
      gameState.player.y = 300;
      this.cameras.main.shake(50, .025, true)
    })      

    this.physics.add.overlap(gameState.player, gameState.enemy[6], () => {
      gameState.player.x = 800;
      gameState.player.y = 300;
      this.cameras.main.shake(50, .025, true)
    })

    this.physics.add.overlap(gameState.player, gameState.enemy[7], () => {
      gameState.player.x = 400;
      gameState.player.y = 535;
      this.cameras.main.shake(50, .025, true)
    })
 
    this.physics.add.overlap(gameState.player, gameState.enemy[8], () => {
      gameState.player.x = 400;
      gameState.player.y = 535;
      this.cameras.main.shake(50, .025, true)
    })

    this.physics.add.overlap(gameState.player, gameState.enemy[9], () => {
      gameState.player.x = 400;
      gameState.player.y = 535;
      this.cameras.main.shake(50, .025, true)
    })
    
    // Win condition maken
    let door = this.physics.add.sprite(860, 570, 'door').setScale(.07)
    door.visible = false;

    this.physics.add.overlap(gameState.player, door, () => {
      this.cameras.main.fade(1100, 255, 255, 255, false, function(camera, progress) {
          if(progress > 0.9) {
            this.scene.stop('MG2')
            this.scene.start('MG3')
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