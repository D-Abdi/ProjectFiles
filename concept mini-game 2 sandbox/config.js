const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 750,
    backgroundColor: "cccccc",
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [StartScene]
  };
  
  const game = new Phaser.Game(config);