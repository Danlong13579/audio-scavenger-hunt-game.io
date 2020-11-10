// Devices
let platform = navigator.platform
let gameStart = false

// Elements
let GameSpace = document.getElementsByTagName('body')[0]
let darkModeSwitch = document.getElementById('dark-mode')
let startButton = document.getElementById('start')
let gameButton = document.createElement('button')

// Hidden button class setup
gameButton.className = "game-button"
let buttonX = Math.floor(Math.random() * (document.body.clientWidth - 32))
let buttonY = Math.floor(Math.random() * (document.body.clientHeight - 32))
gameButton.style.top = buttonY + "px"
gameButton.style.left = buttonX + "px"


// Audio Setup
let heartAudio = document.getElementById('game-audio')
heartAudio.loop = true;

// Game Start Button and Game Loop
startButton.addEventListener('click', function(e) {
    console.log("Game Started")
    // Remove game-root from the screen and setup
    document.getElementById('game-root').style = "display: none;"
    document.body.appendChild(gameButton)
    NormalizeAudio()

    // Check Platform for devices
    if (platform === 'iPad' || platform === 'iPod' || platform === 'iPhone' || platform === 'Android') {

        // Logic for touchscreen devices
        document.body.addEventListener("touchstart", function(e) {  
            heartAudio.play()     
        } )
        document.body.addEventListener('touchmove', function(e) {
            MouseUpdate(e)
        } )
        document.body.addEventListener("touchend", function(e) { 
            heartAudio.pause()   
        } )
    } else {

        //Logic for the web
        document.body.addEventListener("mousemove", function(e) {
            MouseUpdate(e)
            heartAudio.play() 
        } )
            
        document.body.addEventListener("mouseout", function(e) {
            heartAudio.pause()
        } )
    }
} )

// Dark Mode Doggle
darkModeSwitch.addEventListener('click', function(e){
    if (document.getElementById('checkbox').checked){
        console.log("off")
        GameSpace.style = "background-color: #eeeeee;"
    }else {
        console.log("on")
        GameSpace.style = "background-color: #333333;"
    }
} )

// Functions
function MouseUpdate(e){

    // calculate the distance between the mouse or finger to the button on screen
    let deltaX = Math.abs(e.clientX - buttonX)
    let deltaY = Math.abs(e.clientY - buttonY)
    let distance = Math.floor(Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2)))
    console.log(distance)

    // TODO calc distance % to button area including screen space
    let dist = ""
    console.log ("the distance in % is " + dist + "%")

}

function NormalizeAudio(vol = 0.4){
    heartAudio.volume = vol
}