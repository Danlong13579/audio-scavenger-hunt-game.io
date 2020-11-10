// Devices
let platform = navigator.platform
let gameStart = false

// Elements
let GameSpace = document.getElementsByTagName('body')[0]
let darkModeSwitch = document.getElementById('dark-mode')
let startButton = document.getElementById('start')

// Audio Setup
let heartAudio = document.getElementById('game-audio')
heartAudio.loop = true;

// Game Start Button and Game Loop
startButton.addEventListener('click', function(e) {
    console.log("Game Started")
    document.getElementById('game-root').style = "display: none;"

    if (platform === 'iPad' || platform === 'iPod' || platform === 'iPhone' || platform === 'Android') {
        document.body.addEventListener("touchstart", function(e) {  
            mouseUpdate(e)
            heartAudio.play()     
        })
        document.body.addEventListener("touchend", function(e) { 
            heartAudio.pause()   
        })
    } else {
        document.body.addEventListener("mousemove", function(e) {
            mouseUpdate(e)
            heartAudio.play()
        })
            
        document.body.addEventListener("mouseout", function(e) {
            heartAudio.pause()
        })
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
function touchEnd(e){
    e.preventDefault()
    document.getElementById("mouseCords").innerHTML = "touch end"
}

function mouseUpdate(e){
    let x = e.clientX
    let y = e.clientY
    let cords = `Cords X = ${x} and Y = ${y}`
    console.log(cords)
}

function playAudio(audio){
    audio.play()
}

function NormalizeAudio(rate = 1.0, vol = 0.2){
    heartAudio.playbackRate = rate
    heartAudio.volume = vol
}