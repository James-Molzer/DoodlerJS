document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid')
    const Dood = document.createElement('div')
    let isGameOver = false
    let platFormMaker = 5
    let platforms = []
    let score = 0
    let doodLeftSpace = 50
    let startpoint = 150
    let doodBottomSpace = startpoint
    let upTimerId
    let downTimerId
    let isJumping = true
    let isMovingLeft = false
    let isMovingRight = false
    let leftTimerId
    let rightTimerId
    

 class Platform {
        constructor(platFormBottom) {
           this.left = Math.random()* 315
            this.bottom =platFormBottom
            this.visual=document.createElement('div')
            
            const visual = this.visual
            visual.classList.add('platform')
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
            console.log(platforms)



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
                    platforms.shift()
                    console.log(platforms)
                    score++
                    let newPlatform =new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
            
    }
    
    function createDood() {
        grid.appendChild(Dood)
        Dood.classList.add('Dood')
        doodLeftSpace = platforms[0].left
        Dood.style.left = doodLeftSpace + 'px'
        Dood.style.bottom = doodBottomSpace + 'px'
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
         isJumping =false
         clearInterval(upTimerId)
         downTimerId =setInterval(function(){
             doodBottomSpace -= 5
             Dood.style.bottom = doodBottomSpace +'px'
             if(doodBottomSpace <= 0){
                 GameOver()
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
                     console.log('starting', startpoint)
                     isJumping= true
                 }
             })

         },20)

     }
     function control(e){
         Dood.style.bottom = doodBottomSpace + 'px'
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
           isMovingLeft = true
          leftTimerId = setInterval(function () {
             if(doodLeftSpace >= 0){
                doodLeftSpace -=5 
                Dood.style.left = doodLeftSpace + 'px'
             } else moveRight ()

          },20)
      }
      function moveRight (){
          if(isMovingLeft){
              clearInterval(leftTimerId)
              isMovingLeft = false
          }
           isMovingRight = true
          rightTimerId = setInterval(function (){
              if(doodLeftSpace <= 350){
                  doodLeftSpace +=5
                  Dood.style.left= doodLeftSpace +'px'

              } else moveLeft ()
          },20)
      }
      function moveStraight (){
          isMovingLeft = false
          isMovingRight = false
          clearInterval(rightTimerId)
          clearInterval(leftTimerId)

      }

     function GameOver(){
         isGameOver = true
         while(grid.firstChild){
            console.log('Dead')
            grid.removeChild(grid.firstChild)
         }
         grid.innerHTML= score
         clearInterval(upTimerId)
         clearInterval(downTimerId)
         clearInterval(leftTimerId)
         clearInterval(rightTimerId)

     }
    
    function Start(){
        if(!isGameOver)
            {
                createPlatform()
                createDood()
               setInterval (movePlatforms,30)
               jump(startpoint)
               document.addEventListener('keyup', control)
        }
    }
    //propbably should place a button to start the game
    Start()
    
})
