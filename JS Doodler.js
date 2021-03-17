document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const Dood= document.createElement('div')
    let doodLeftSpace = 50
    let doodBottomSpace = 150
    let platFormMaker = 5
    function createDood(){
        grid.appendChild(Dood)
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
        }
    }
    function createPlatform(){
        for(let i = 0; i < platFormMaker; i++){
            let platFormSpacer = 600 / platFormMaker
            let platFormBottom = 100 + i * platFormSpacer
            let newPlatform = new Platform(platFormBottom)


        }

    }
    
    function Start(){
        if(!GameOver)
            {createDood()
                createPlatform()
        }
    }
    //propbably should place a button to start the game
    Start()
    
})
