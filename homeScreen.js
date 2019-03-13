var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var screenWidth = 800;
var screenHeight = 750;
canvas.width = screenWidth;
canvas.height = screenHeight;

var unload=false,
    offloadHS = false,
    score = 0,
    currentGame,
    newHighScore = false,
    oldHighScore;

var appleGameImg = new Image();
    appleGameImg.src = 'Assets/apple game/appleGame.png'
var spaceShooterImg = new Image();
    spaceShooterImg.src = 'Assets/space shooter/spaceShooterImg.png';

var buttons = [];
var games = [];

var appleGame = {
    name: 'apple game',
    points: [{
        x: 50,
        y: 250,
    },{
        x: 250,
        y: 250
    },{
        x: 250,
        y: 500
    },{
        x: 50,
        y: 500
    }],
    interaction: function(){
        currentGame = 'apple game';
        Player.Image.src = 'Assets/apple game/basket.png';
        gameLauncher();
    },
    launcher: function(){
        loadAppleGame();
    },
    unloader: function(){
        unloadAppleGame();
    }
}

var spaceShooter = {
    name: 'space shooter',
    points: [{
        x: 300,
        y: 250,
    },{
        x: 500,
        y: 250
    },{
        x: 500,
        y: 500
    },{
        x: 300,
        y: 500
    }],
    interaction: function(){
        currentGame = 'space shooter';
        Player.Image.src = 'Assets/space shooter/spaceship.png';
        alert('Coming Soon!!')
        // gameLauncher();    
    },
    launcher: function(){
        loadSpaceShooter();
    },
    unloader: function(){
        unloadSpaceShooter();
    }
}

var ballDropper = {
    name: 'ball dropper',
    points: [{
        x: 550,
        y: 250,
    },{
        x: 750,
        y: 250
    },{
        x: 750,
        y: 500
    },{
        x: 550,
        y: 500
    }],
    interaction: function(){
        currentGame = 'ball dropper';
        gameLauncher();    
    },
    launcher: function(){
        loadBallDropper();
    },
    unloader: function(){
        unloadBallDropper();
    }
}

games.push(appleGame);
games.push(ballDropper);
games.push(spaceShooter);

function offloadHomeScreen(){
//offload main menu buttons

    buttons.pop(appleGame);
    buttons.pop(spaceShooter);
    buttons.pop(ballDropper);
    offloadHS = true;
}

window.onload = function(){
    window.addEventListener('click', clickHandler, true);
    launchHomeScreen();
}

function define(button) {
    var points = button.points;
    c.beginPath();
    c.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        c.lineTo(points[i].x, points[i].y);
    }
}

function launchHomeScreen(){
    if(offloadHS === true){offloadHS = false};
    //Add homescreen buttons
    buttons.push(appleGame);
    buttons.push(spaceShooter);
    buttons.push(ballDropper);
    homeScreen();
}

function homeScreen(){
    c.clearRect(0,0,screenWidth, screenHeight);
    if(offloadHS === true){return;}
    // Draws the gradient background
    var grd = c.createLinearGradient(0, screenHeight/2, 0, 0);
    grd.addColorStop(0, "#7295b6");
    grd.addColorStop(1, "#953232");
    c.fillStyle = grd;
    c.fillRect(0, 0, screenWidth, screenHeight);

    //first row 
    //Apple Game
    c.drawImage(appleGameImg, 50,250);
    //Space Shooter
    c.drawImage(spaceShooterImg, 300,250, 200,200);
    c.fillStyle = 'rgba(255, 255, 255, 0.52)';
    c.fillRect(325, 370, 150, 50);
    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('Coming', screenWidth/2, 385);
    c.fillText('soon!', screenWidth/2, 410);
    //Ball Dropper
    c.drawImage(gameTut1, 550,250, 200,200);

    // c.fillStyle ="grey"
    // c.fillRect(550,250, 200,200)
    //second row
    c.fillStyle ="grey"
    c.fillRect(50,500, 200, 200)
    c.fillStyle ="grey"
    c.fillRect(300,500, 200,200)
    c.fillStyle ="grey"
    c.fillRect(550,500, 200,200)

    requestAnimationFrame(homeScreen);
}

function clickHandler(e){
    e.preventDefault();

    // get the mouse position
    var mouseX = parseInt(e.clientX);
    var mouseY = parseInt(e.clientY);

    // iterate each shape in the shapes array
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        // define the current shape
        define(button);
        // test if the mouse is in the current shape
        if (c.isPointInPath(mouseX, mouseY)) {
            // if inside, display the shape's message
            // alert(button.message);
            button.interaction();
        }
    }
};

//randomizer
function randomizer(min,max){ // min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}

function gameLauncher(){
    for(i in games){
        if(games[i].name === currentGame){
            offloadHomeScreen();
            games[i].launcher();
        }
    }
}