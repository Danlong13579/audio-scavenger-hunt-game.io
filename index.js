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
gameButton.id = "game-button"


// Audio Setup
let heartAudio = document.getElementById('game-audio')
heartAudio.loop = true

// Game Start Button and Game Loop
startButton.addEventListener('click', function(e) {
    console.log("Game Started")
    NormalizeAudio()
    // Remove game-root from the screen and setup
    document.getElementById('game-root').style = "display: none;"
    document.body.appendChild(gameButton)

    // Check Platform for devices
    if (platform === 'Win32' || platform === 'Win16' || platform === '' || platform === '') {
        //Logic for the web
        document.body.addEventListener("mousemove", function(e) {
            MouseUpdate(e)
            heartAudio.play() 
        } )
            
        document.body.addEventListener("mouseout", function(e) {
            heartAudio.pause()
        } )

        document.getElementById('game-button').addEventListener('mouseenter', function(e) {
            GameSpace.style = "background-color: red;"
            heartAudio.loop = false
            heartAudio.pause()
        } )

    } else {

        // Logic for touchscreen devices
        document.body.addEventListener("touchstart", function(e) {  
            e.preventDefault()
            heartAudio.play()
            TouchUpdate(e.touches[0])     
        } )
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault()
            TouchUpdate(e.touches[0])
        } )
        document.body.addEventListener("touchend", function(e) { 
            e.preventDefault()
            heartAudio.pause()   
        } )

        document.getElementById('game-button').addEventListener('touchmove', function(e) {
            GameSpace.style = "background-color: red;"
            heartAudio.loop = false
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
    
    // TODO calc distance % to button area including screen space and adjust audio
    let zones = document.body.clientWidth / 8
    if ( distance < (zones / 2) ) {
        NormalizeAudio(1)
        console.log("audio 1")
    } 
    else if ( distance < (zones * 2) ) {
        NormalizeAudio(0.6)
        console.log("audio .6")
    } 
    else if ( distance < (zones * 3) ) {
        NormalizeAudio(0.4)
        console.log("audio .4")
    }
    else if ( distance < (zones * 4) ) {
        NormalizeAudio(0.2)
    } 
    else {
        NormalizeAudio(0.1)
    }
}

function TouchUpdate(t){
    // calculate the distance between the mouse or finger to the button on screen
    let deltaX = Math.abs(parseInt(t.clientX) - buttonX)
    let deltaY = Math.abs(parseInt(t.clientY) - buttonY)
    let distance = Math.floor(Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2)))
    
    // TODO Make different audio files with volume change for apple devices
    let zones = document.body.clientWidth / 8
    if ( distance < (zones / 1.5) ) {
        NormalizeAudio(1)
        console.log("audio 1")
        GameSpace.style = "background-color: blue;"
    } 
    else if ( distance < (zones * 2) ) {
        NormalizeAudio(0.5)
        console.log("audio .6")
        GameSpace.style = "background-color: green;"
    } 
    else if ( distance < (zones * 3) ) {
        NormalizeAudio(0.3)
        console.log("audio .4")
        GameSpace.style = "background-color: purple;"
    }
    else if ( distance < (zones * 4) ) {
        NormalizeAudio(0.2)
    } 
    else {
        NormalizeAudio(0.1)
    }
}

function NormalizeAudio(vol = 0.1){
    heartAudio.volume = vol
    heartAudio.playbackRate = 1.2
}