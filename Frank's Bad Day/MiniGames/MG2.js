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

  const tileset2 = map2.addTilesetImage('rpg', 'tiles2')

  map2.createStaticLayer('Floor', tileset2, 130, 40)
  const worldLayer2 = map2.createStaticLayer('Blocked', tileset2, 130, 40)
  const otherLayer = map2.createStaticLayer('UnBlocked', tileset2, 130, 40)
  map2.createStaticLayer('Misc', tileset2, 130, 40)

  worldLayer2.setCollisionByProperty({ collides: true });
  otherLayer.setCollisionByProperty({ collides: true });
  
  // Speler aanmaken
  gameState.player = this.physics.add.sprite(275, 150, 'codey').setScale(.4)
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
  gameState.enemy[0] = this.physics.add.sprite(213, 285, 'snowman').setScale(.6)

  gameState.enemy[1] = this.physics.add.sprite(313, 291, 'snowman').setScale(.6)
  gameState.enemy[2] = this.physics.add.sprite(441, 698, 'snowman').setScale(.6)

  gameState.enemy[3] = this.physics.add.sprite(568, 285, 'snowman').setScale(.6) 
  gameState.enemy[4] = this.physics.add.sprite(712, 675, 'snowman').setScale(.6)

  gameState.enemy[5] = this.physics.add.sprite(785, 580, 'snowman').setScale(.6) 
  gameState.enemy[6] = this.physics.add.sprite(232, 435, 'snowman').setScale(.6)
  gameState.enemy[7] = this.physics.add.sprite(250, 720, 'snowman').setScale(.6)


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

  
  // Tweens Toevoegen
    this.tweens.add({
    targets: gameState.enemy[0],
    x: 564,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});
    this.tweens.add({
    targets: gameState.enemy[1],
    y: 698,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});

    this.tweens.add({
    targets: gameState.enemy[2],
    y: 293,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});  

    this.tweens.add({
    targets: gameState.enemy[3],
    y: 698,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});    

    this.tweens.add({
    targets: gameState.enemy[4],
    y: 293,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});  
    this.tweens.add({
    targets: gameState.enemy[5],
    x: 225,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});

    this.tweens.add({
    targets: gameState.enemy[6],
    x: 800,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    onRepeat: function () {
      gameState.enemy.flipX = true;
    }
});  

this.tweens.add({
  targets: gameState.enemy[7],
  x: 710,
  duration: 3000,
  yoyo: true,
  repeat: -1,
  onRepeat: function () {
    gameState.enemy.flipX = true;
  }
});  
  // Maak enemies gevaarlijk
  this.physics.add.overlap(gameState.player, gameState.enemy[0], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  })

  this.physics.add.overlap(gameState.player, gameState.enemy[1], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  })    

  this.physics.add.overlap(gameState.player, gameState.enemy[2], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  })
  
  this.physics.add.overlap(gameState.player, gameState.enemy[3], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  }) 

  this.physics.add.overlap(gameState.player, gameState.enemy[4], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  })
  
  this.physics.add.overlap(gameState.player, gameState.enemy[5], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  })      

  this.physics.add.overlap(gameState.player, gameState.enemy[6], () => {
    this.scene.restart()
    this.cameras.main.shake(50, .025, true)
  })

  
  // Win condition maken
  let door = this.physics.add.sprite(780, 690, 'door').setScale(.07)
  door.visible = false;

  this.physics.add.overlap(gameState.player, door, () => {
    this.cameras.main.fade(1100, 0, 0, 0, false, function(camera, progress) {
        if(progress > 0.9) {
          this.scene.stop('MG2')
          this.scene.start('MG3')
        }
    })
  })

  // Laat de game objective zien
  let objText2 = this.add.text(350,250, "Avoid your colleagues \nand get to your desk!", {fontSize: 40, fontFamily: "VT323"})
  
  const goal = this.add.circle(780, 690, 35);

  goal.setStrokeStyle(3.5, 0xC3615C);

  // fade hem na tonen
  this.tweens.add({
    targets: objText2,
    alpha: 0,
    delay: 3000,
    duration: 1000,
    repeat: 0,
    yoyo: false
  })
  
  this.tweens.add({
    targets: goal,
    alpha: 0,
    duration: 750,
    repeat: 3,
    yoyo: true,
    onComplete: () => {
      goal.setAlpha(0)
    }
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