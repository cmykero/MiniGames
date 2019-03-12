var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var screenWidth = 800;
var screenHeight = 750;
canvas.width = screenWidth;
canvas.height = screenHeight;
 
var unload=false;

var appleGameImg = new Image();
    appleGameImg.src = 'Assets/appleGame/appleGame.png'

var buttons = [];

var appleGame = {
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
    name: 'apple game',
    interaction: function(){
        loadAppleGame();
        buttons.pop(appleGame);
    }
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
    buttons.push(appleGame);
    homeScreen();
}

function homeScreen(){
    // Draws the gradient background
    var grd = c.createLinearGradient(0, screenHeight/2, 0, 0);
    grd.addColorStop(0, "#7295b6");
    grd.addColorStop(1, "#953232");
    c.fillStyle = grd;
    c.fillRect(0, 0, screenWidth, screenHeight);

    //first row 
    c.drawImage(appleGameImg, 50,250)
    c.fillStyle ="grey"
    c.fillRect(300,250, 200,200)
    c.fillStyle ="grey"
    c.fillRect(550,250, 200,200)
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
            if(button.type = 'game'){
                button.interaction();
            }
        }
    }
};

//randomizer
function randomizer(min,max){ // min and max included
    return Math.floor(Math.random()*(max-min+1)+min);
}