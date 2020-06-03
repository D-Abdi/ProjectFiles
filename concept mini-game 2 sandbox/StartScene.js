// Title screen
const gameState = {
  required: [],
}

let enemy

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }


  preload() {
    this.load.spritesheet('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Cave+Crisis/codey_sprite.png', { frameWidth: 72, frameHeight: 90 });
    this.load.image('door', 'assets/door.png')
    this.load.image('enemy', 'assets/enemy.png')
  }

  create() {

    // Voeg statische objecten toe
    let door = this.physics.add.sprite(950, 375, 'door').setScale(.20)
    enemy = this.physics.add.sprite(400, 375, 'enemy').setOrigin(0.5, 1)

    
    

    // Toevoegen van de spritesheet
    gameState.player = this.physics.add.sprite(400, 550, 'codey')


    this.physics.add.overlap(gameState.player, door, () => {
      if(gameState.required.includes('fill1', 'fill2', 'fill3')) {
        console.log('Exit')
      } else {
        console.log('Not yet')
      }
    })


    this.physics.add.overlap(gameState.player, enemy, () => {
      console.log('test')
      this.scene.restart();
    })


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

    // Zorgt ervoor dat de speler niet van het scherm af gaat
    gameState.player.setCollideWorldBounds(true);

    //tween voor rotatie
    let tween = this.tweens.add({
      targets: enemy,
      angle: 180,
      duration: 1500,
      yoyo: true,
      repeat: -1,
    });

    // Voegt het controle schema toe aan de playerSprite
    gameState.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {


    // Bewegingen + animaties voor het bewegen van de speler
    if(gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(250);
      gameState.player.anims.play('run', true)
      gameState.player.flipX = false;
    }else if(gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-250);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = true;
    }else if(gameState.cursors.up.isDown) {
      gameState.player.setVelocityY(-250);
      gameState.player.anims.play('run', true);
    }else if(gameState.cursors.down.isDown) {
      gameState.player.setVelocityY(250);
      gameState.player.anims.play('run', true);
    } else {
      gameState.player.setVelocityY(0);
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }
  
}

