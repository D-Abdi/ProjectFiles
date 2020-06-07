
let gameState = {
  required: [],
  enemy: [],
}

class MG1 extends Phaser.Scene {
  constructor() {
    super({ key: 'MG1'})
  }


   preload() {
    this.load.spritesheet('codey', 'assets/codey.png', { frameWidth: 72, frameHeight: 90 });
    this.load.tilemapTiledJSON('map', 'assets/indoorTest2.json');
    this.load.image('tiles', 'assets/RPGmap.png')
    this.load.image('wallet', 'assets/wallet.png')
    this.load.image('keys', 'assets/keys.png')
    this.load.image('phone', 'assets/phone.png')
    this.load.image('door', 'assets/door.png')
    this.load.image('yarn', 'assets/yarn.png')
  }

  

   create() {
    //new
    const map = this.make.tilemap({key: 'map'});

    const tileset = map.addTilesetImage('RPGmap', 'tiles')

    const worldLayer = map.createStaticLayer('Blocked', tileset, 0, 0);
    const belowLayer = map.createStaticLayer('UnBlocked', tileset, 0, 0);
    

    worldLayer.setCollisionByProperty({ collides: true });

    gameState.player = this.physics.add.sprite(220, 200, 'codey').setScale(.225)
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(gameState.player, worldLayer)
    //
    // minigame 1.0 code

    // Voeg vereiste objecten toe aan het scherm en maak ze doorzichtig
    gameState.requiredText = this.add.text(50, 20, 'Required: ', {fontSize: 12, fill: '#FFF', fontFamily: 'Verdana'})

    let reqWallet = this.add.sprite(150, 27, 'wallet').setScale(.050)
    reqWallet.alpha = 0.25;

    let reqKeys = this.add.sprite(200, 28, 'keys').setScale(.035)
    reqKeys.alpha = 0.25;

    let reqPhone = this.add.sprite(250, 27, 'phone').setScale(.050)
    reqPhone.alpha = 0.25

    let reqYarn = this.add.sprite(300, 28, 'yarn').setScale(.065)
    reqYarn.alpha = 0.25

    // Voeg statische objecten toe
    let wallet = this.physics.add.sprite(100, 300, 'wallet').setScale(.03)
    let keys = this.physics.add.sprite(340, 305, 'keys').setScale(.03)
    let phone = this.physics.add.sprite(425, 100, 'phone').setScale(.04)
    let yarn = this.physics.add.sprite(100, 170, 'yarn').setScale(.04)


    let door = this.physics.add.sprite(455, 190, 'door').setScale(.045)
    door.visible = false;
    

    // Collision tussen speler en objecten
    this.physics.add.collider(gameState.player, wallet, () => {
      wallet.destroy();

      reqWallet.alpha = 1;
      gameState.required.push('fill1')
    })

    this.physics.add.collider(gameState.player, keys, () => {
      keys.destroy();

      reqKeys.alpha = 1;
      gameState.required.push('fill2')
    })

    this.physics.add.collider(gameState.player, phone, () => {
      phone.destroy();

      reqPhone.alpha = 1;
      gameState.required.push('fill3')
    })

    this.physics.add.collider(gameState.player, yarn, () => {
      yarn.destroy();

      reqYarn.alpha = 1;
      gameState.required.push('fill4')
    })

    this.physics.add.overlap(gameState.player, door, () => {
      if(gameState.required.includes('fill1', 'fill2', 'fill3', 'fill4')) {
        console.log('Exit')
        this.cameras.main.fade(1100, 255, 255, 255, false, function(camera, progress) {
          if(progress > 0.9) {
            gameState.required = [];
            this.scene.stop('MG1')
            this.scene.start('MG2')
            
          } 
        })
      } else {
        console.log('Not yet')
        this.add.text(360, 20, '<---', {fontSize: 15, fill: '#FFF'})
      }
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
    
  }

   update() {
    const speed = 160;

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
  
  