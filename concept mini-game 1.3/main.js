const gameState = {
  required: [],
}

const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 500, // Canvas width in pixels
    height: 400, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);

  function preload() {
    this.load.spritesheet('codey', 'assets/codey.png', { frameWidth: 72, frameHeight: 90 });
    this.load.tilemapTiledJSON('map', 'assets/indoorTest2.json');
    this.load.image('tiles', 'assets/RPGmap.png')
    this.load.image('wallet', 'assets/wallet.png')
    this.load.image('keys', 'assets/keys.png')
    this.load.image('phone', 'assets/phone.png')
    this.load.image('door', 'assets/door.png')
    this.load.image('yarn', 'assets/yarn.png')
  }

  function create() {
    //new
    const map = this.make.tilemap({key: 'map'});

    const tileset = map.addTilesetImage('RPGmap', 'tiles')

    const belowLayer = map.createStaticLayer('UnBlocked', tileset, 0, 0);
    const worldLayer = map.createStaticLayer('Blocked', tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    gameState.player = this.physics.add.sprite(220, 200, 'codey').setScale(.25)
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
    let door = this.physics.add.sprite(455, 190, 'door').setScale(.045)
    let yarn = this.physics.add.sprite(100, 170, 'yarn').setScale(.04)

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
            this.scene.restart();
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

  function update() {
    // Bewegingen + animaties voor het bewegen van de speler
    if(gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(150);
      gameState.player.anims.play('run', true)
      gameState.player.flipX = false;
    }else if(gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-150);
      gameState.player.anims.play('run', true);
      gameState.player.flipX = true;
    }else if(gameState.cursors.up.isDown) {
      gameState.player.setVelocityY(-150);
      gameState.player.anims.play('run', true);
    }else if(gameState.cursors.down.isDown) {
      gameState.player.setVelocityY(150);
      gameState.player.anims.play('run', true);
    } else {
      gameState.player.setVelocityY(0);
      gameState.player.setVelocityX(0);
      gameState.player.anims.play('idle', true);
    }
  }

  