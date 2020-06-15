class RouteAnim {
    constructor() {
        this.runRoutes = []
        this.runRoutes.push([{
          x: 310,
          ease: 'linear',
          duration: 1000,
        },
      {
        y: 240,
        ease: 'linear',
        duration: 2000,
      },{
        x: 680,
        ease: 'linear',
        duration: 1500,
      },{
        y: 385,
        ease: 'linear',
        duration: 500
      },{
        x: 310,
        ease: 'linear',
        duration: 2000,
      },{
        y: 670,
        ease: 'linear',
        duration: 1500,
      },{
        x: 400,
        ease: 'linear',
        duration: 250,
      },{
        x: 260,
        ease: 'linear',
        duration: 500,
      },{
        y: 560,
        ease: 'linear',
        duration: 500,
      },{
        x: 505,
        ease: 'linear',
        duration: 500,
      }])
      
      this.runRoutes.push([{
        x: 670,
        ease: 'linear',
        duration: 1000
      },{
        y: 240,
        ease: 'linear',
        duration: 2000
      },{
        x: 530,
        ease: 'linear',
        duration: 500
      },{
        y: 380,
        ease: 'linear',
        duration: 1000
      },{
        x: 320,
        ease: 'linear',
        duration: 1000
      },{
        y: 450,
        ease: 'linear',
        duration: 500
      },{
        y: 240,
        ease: 'linear',
        duration: 1000
      },{
        x: 670,
        ease: 'linear',
        duration: 1000
      },{
        y: 380,
        ease: 'linear',
        duration: 750
      },{
        x: 565,
        ease: 'linear',
        duration: 750
      },{
        y: 560,
        ease: 'linear',
        duration: 750
      },{
        x: 505,
        ease: 'linear',
        duration: 500
      }])

      this.runRoutes.push([{
        x: 450,
        ease: 'linear',
        duration: 250
      },{
        y: 390,
        ease: 'linear',
        duration: 600
      },{
        x: 530,
        ease: 'linear',
        duration: 600
      },{
        y: 240,
        ease: 'linear',
        duration: 500
      },{
        x: 310,
        ease: 'linear',
        duration: 1500
      },{
        y: 390,
        ease: 'linear',
        duration: 750
      },{
        x: 670,
        ease: 'linear',
        duration: 1500
      },{
        y: 560,
        ease: 'linear',
        duration: 1000
      },{
        x: 505,
        ease: 'linear',
        duration: 1000
      }])
    }

    // Geef een random animatie
    returnRoute() {
        return this.runRoutes[Math.floor(Math.random() * this.runRoutes.length)]
    }
}
