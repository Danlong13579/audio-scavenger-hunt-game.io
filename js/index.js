// Devices
let platform = navigator.platform

// Elements
let GameSpace = document.getElementsByTagName('body')[0]
let darkModeSwitch = document.getElementById('dark-mode')
let startButton = document.getElementById('start')
let gameButton = document.createElement('button')

let winScreen = document.createElement('div')

// Hidden button class setup
gameButton.className = "game-button"
let buttonX = Math.floor(Math.random() * (document.body.clientWidth - 32))
let buttonY = Math.floor(Math.random() * (document.body.clientHeight - 32))
gameButton.style.top = buttonY + "px"
gameButton.style.left = buttonX + "px"
gameButton.id = "game-button"

// Audio Setup
let heartAudio = document.querySelector('audio')
heartAudio.loop = true

// Apple Audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(heartAudio);
let gainNode = audioCtx.createGain();

source.connect(gainNode);
gainNode.connect(audioCtx.destination);
source.loop = true;

// Game Start Button and Game Loop
startButton.addEventListener('click', function(e) {
    console.log("Game Started")

    // Remove game-root from the screen and setup
    document.getElementById('game-root').style = "display: none;"
    document.body.appendChild(gameButton)


    // Check Platform for devices
    if (platform === 'Win32' || platform === 'Win16' || platform === 'MacIntel' || platform === 'Linux x86_64' || platform === '') {
        //Logic for the web
        audioCtx.resume()

        document.body.addEventListener('mouseenter', () => {
            heartAudio.play()
        } )

        document.body.addEventListener('mousemove', (e) => {
            heartAudio.play()
            MouseUpdate(e)
        } )
            
        document.body.addEventListener("mouseout", () => {
            heartAudio.pause()
        } )

        //TODO End Game
        document.getElementById('game-button').addEventListener('mouseenter', function(e) {
            heartAudio = null
            document.body.removeChild(gameButton)
            document.body.appendChild(winScreen)

            GameSpace.style = 'background-color: #ffffff;'
            winScreen.className += 'fade-in '
            winScreen.className += 'win-screen'
        } )

    } else {
        // Logic for touchscreen devices
        document.body.addEventListener("touchstart", function(e) {  
            e.preventDefault()
            audioCtx.resume()
            heartAudio.play()
        }, { passive: false } )
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault()
            heartAudio.play()
            TouchUpdate(e.touches[0])

        }, { passive: false } )
        document.body.addEventListener("touchend", function(e) { 
            e.preventDefault() 
            heartAudio.pause()
        }, { passive: false } )
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

function PlayMusic() {
    heartAudio.play()
}

function PauseMusic() {
    heartAudio.pause()
}

function MouseUpdate(e){

    // calculate the distance between the mouse or finger to the button on screen
    let deltaX = Math.abs(e.clientX - buttonX)
    let deltaY = Math.abs(e.clientY - buttonY)
    let distance = Math.floor(Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2)))
    
    // TODO calc distance % to button area including screen space and adjust audio
    let zones = document.body.clientWidth / 8
    if ( distance < (zones / 2) ) {
        gainNode.gain.value = 1
        console.log("audio 1")
    } 
    else if ( distance < (zones * 2) ) {
        gainNode.gain.value = 0.4
        console.log("audio .6")
    } 
    else if ( distance < (zones * 3) ) {
        gainNode.gain.value = 0.2
        console.log("audio .4")
    }
    else if ( distance < (zones * 4) ) {
        gainNode.gain.value = 0.1
    } 
    else {
        gainNode.gain.value = 0.1
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
       gainNode.gain.value = 1.0
    } 
    else if ( distance < (zones * 2) ) {
       gainNode.gain.value = 0.8
    } 
    else if ( distance < (zones * 3) ) {
       gainNode.gain.value = 0.6
    }
    else if ( distance < (zones * 4) ) {
       gainNode.gain.value = 0.4
    } 
    else {
       gainNode.gain.value = 0.2
    }

    if (distance <= 55) {
        heartAudio.pause()
        heartAudio = null
        audioCtx.suspend()
        document.body.removeChild(gameButton)
        document.body.appendChild(winScreen)

        GameSpace.style = 'background-color: #ffffff;'
        winScreen.className += 'fade-in '
        winScreen.className += 'win-screen'
    } 
}