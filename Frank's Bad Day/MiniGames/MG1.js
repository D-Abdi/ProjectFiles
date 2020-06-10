
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

    const worldLayer = map.createStaticLayer('Blocked', tileset, 50, 20).setScale(1.8);
    const belowLayer = map.createStaticLayer('UnBlocked', tileset, 50, 20).setScale(1.8);
    

    worldLayer.setCollisionByProperty({ collides: true });

    gameState.player = this.physics.add.sprite(500, 400, 'codey').setScale(.4)
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(gameState.player, worldLayer)

    // Voeg vereiste objecten toe aan het scherm en maak ze doorzichtig
    gameState.requiredText = this.add.text(150, 35, 'Required: ', {fontSize: 40, fill: '#FFF', fontFamily: 'VT323'})

    let reqWallet = this.add.sprite(350, 59, 'wallet').setScale(.080)
    reqWallet.alpha = 0.25;

    let reqKeys = this.add.sprite(430, 60, 'keys').setScale(.065)
    reqKeys.alpha = 0.25;

    let reqPhone = this.add.sprite(510, 60, 'phone').setScale(.080)
    reqPhone.alpha = 0.25

    let reqYarn = this.add.sprite(590, 62, 'yarn').setScale(.095)
    reqYarn.alpha = 0.25

    // Voeg statische objecten toe
    let wallet = this.physics.add.sprite(250, 550, 'wallet').setScale(.06)
    let keys = this.physics.add.sprite(650, 570, 'keys').setScale(.05)
    let phone = this.physics.add.sprite(800, 200, 'phone').setScale(.07)
    let yarn = this.physics.add.sprite(250, 320, 'yarn').setScale(.07)


    let door = this.physics.add.sprite(870, 365, 'door').setScale(.065)
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
      if(gameState.required.includes('fill1') && gameState.required.includes('fill2') && gameState.required.includes('fill3') && gameState.required.includes('fill4')) {
        console.log('Exit')
        this.cameras.main.fade(1100, 0, 0, 0, false, function(camera, progress) {
          if(progress > 0.9) {
            gameState.required = [];
            this.scene.stop('MG1')
            this.scene.start('MG2')
            
          } 
        })
      } else {
        console.log('Not yet')
        this.add.text(650, 50, '<---', {fontSize: 25, fill: '#FFF'})
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
  }
  
}
  
  