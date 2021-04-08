document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const Dood= document.createElement('div')
    let doodLeftSpace = 50
    let startpoint = 150
    let doodBottomSpace = startpoint
    let platFormMaker = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isMovingLeft = false
    let isMovingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0
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
                if(platform.bottom < 10) {
                    let firstPlatform = platforms [0].visual
                    firstPlatform.classList.remove('platform')
                    platform.shift()
                    score++
                    console.log(platform)
                    let newPlatform =new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
            
    }
    function jump(){
        clearInterval(downTimerId)
        isJumping = true
        upTimerId =setInterval( function () {
            doodBottomSpace +=20
            Dood.style.bottom = doodBottomSpace + 'px'
            if(doodBottomSpace > startpoint + 200){
                fall ()

                
            }

        },30)

    }
     function fall(){ 
         clearInterval(upTimerId)
         isJumping =false
         downTimerId =setInterval(function(){
             doodBottomSpace -= 5
             Dood.style.bottom = doodBottomSpace +'px'
             if(doodBottomSpace <= 0){
                 GameOver()
                 GameOver = true
                 clearInterval(upTimerId)
                 clearInterval(downTimerId)

             }

             platforms.forEach(platform=>{
                 if(
                     (doodBottomSpace >= platform.bottom) &&
                     (doodBottomSpace <= platform.bottom +15)&&
                     ((doodLeftSpace + 50 >= platform.left) &&
                     (doodLeftSpace <= platform.left +85)) &&
                     !isJumping
                 ) {
                     console.log('didnt die')
                     startpoint = doodBottomSpace
                     jump()
                 }
             })

         },30)

     }
     function control(e){
         if (e.key === "ArrowLeft"){
             moveLeft ()
         }
         else if(e.key=== "ArrowRight"){
             moveRight ()
         }
         else if(e.key==="ArrowUp"){
             moveStraight() 
         }
         
     }
      function moveLeft(){
          if(isMovingRight){
              clearInterval(rightTimerId)
              isMovingRight = false
          }
          let isMovingLeft = true
          leftTimerId = setInterval(function () {
             if(doodLeftSpace >= 0){
                doodLeftSpace -=5 
                Dood.style.left = doodLeftSpace + 'px'
             } else moveRight ()

          },30)
      }
      function moveRight (){
          if(isMovingLeft){
              clearInterval(leftTimerId)
              isMovingLeft = false
          }
          let isMovingRight = true
          rightTimerId = setInterval(function (){
              if(doodLeftSpace <= 350){
                  doodLeftSpace +=5
                  Dood.style.left= doodLeftSpace +'px'

              } else moveLeft ()
          },30)
      }
      function moveStraight (){
          isMovingLeft = false
          isMovingRight = false
          clearInterval(rightTimerId)
          clearInterval(leftTimerId)

      }

     function GameOver(){
         console.log('Game Over')
         GameOver = true
         while(grid.firstChild){
             grid.removeChild(grid.firstChild)
         }
         grid.innerHTML= score
         clearInterval(upTimerId)
         clearInterval(downTimerId)
         clearInterval(leftTimerId)
         clearInterval(rightTimerId)

     }
    
    function Start(){
        if(!GameOver)
            {createPlatform()
                createDood()
               setInterval (movePlatforms,30)
               jump()
               document.addEventListener('keyup', control)
        }
    }
    //propbably should place a button to start the game
    Start()
    
})
