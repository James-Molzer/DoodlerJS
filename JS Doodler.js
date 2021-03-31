document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const Dood= document.createElement('div')
    let doodLeftSpace = 50
    let doodBottomSpace = 150
    let platFormMaker = 5
    let platforms = []
    let upTimerId
    let downTimerId
    function createDood(){
        grid.appendChild(Dood)
        doodLeftSpace = platform[0].left
        Dood.classList.add('dood')
        Dood.style.left = doodLeftSpace +'px'
        Dood.style.bottom= doodBottomSpace +'px'
        let GameOver= false
    }
    class Platform{
        constructor(platFormBottom){
            this.bottom =platFormBottom
            this.left=Math.random()* 315
            this.visual=document.createElement('div')
            const visual = this.visual
            visual.classList.add('Platfrom')
            visual.style.left = this.left + 'px'
            visual.style.bottom =this.bottom + 'px'
            grid.appendChild(visual)
        }
    }
    function createPlatform(){
        for(let i = 0; i < platFormMaker; i++){
            let platFormSpacer = 600 / platFormMaker
            let platFormBottom = 100 + i * platFormSpacer
            let newPlatform = new Platform(platFormBottom)
            platforms.push(newPlatform)



        }

    }
    function movePlatforms(){
        if(doodBottomSpace > 200){
            platforms.forEach(platform => {
                platform.bottom -=4
                let visual = platform.visual
                visual.style.bottom= platform.bottom + 'px'
            })
        }
            
    }
    function jump(){
        clearInterval(downTimerId)
        upTimerId =setInterval( function () {
            doodBottomSpace +=20
            Dood.style.bottom = doodBottomSpace + 'px'
            if(doodBottomSpace > 350){
                fall ()

                
            }

        },30)

    }
     function fall(){ 
         clearInterval(upTimerId)
         downTimerId =setInterval(function(){
             doodBottomSpace -= 5
             Dood.style.bottom = doodBottomSpace +'px'
             if(doodBottomSpace <= 0){
                 GameOver()
                 GameOver = true
                 clearInterval(upTimerId)
                 clearInterval(downTimerId)

             }

         },30)

     }
     function GameOver(){
         console.log('Game Over')

     }
    
    function Start(){
        if(!GameOver)
            {createPlatform()
                createDood()
               setInterval (movePlatforms,30)
               jump()
        }
    }
    //propbably should place a button to start the game
    Start()
    
})
