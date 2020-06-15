const config = {
    type: Phaser.AUTO, 
    width: 1000, 
    height: 800, 
    parent: "game-container", 
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      }
    },
    scene: [MG3, MG2, MG1, Title],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);