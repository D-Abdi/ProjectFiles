const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 1000, // Canvas width in pixels
    height: 800, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
      }
    },
    scene: [MG1, MG2, MG3],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };
  
  const game = new Phaser.Game(config);