var randomX  = randomizer(5,screenWidth-80);
var appleFalling = 0;

var apple = new Image(),
    hearts = new Image(),
    gameOverSplashScreen = new Image(),
    objects = [];

hearts.src = 'Assets/heart.png'
apple.src = 'Assets/appleGame/Red Apple.png';
gameOverSplashScreen.src = 'Assets/appleGame/gameOverSplashScreen.png';


var fallingSpeed = 3,
    spawnRate = 1500,
    lastSpawn,
    log,
    timeCaught,
    score = 0,
    countDown,
    endGameResponse = false,
    endGame = false,
    playAgain = false;


function loadAppleGame(){
    if(unload){unload=false}
    Player.Image.src = 'Assets/appleGame/basket.png';

    window.addEventListener('keydown', keyTracker, true);
    window.addEventListener('keyup', keyTracker, true);
    window.addEventListener('click', clickHandler, true);

    agGameStart();
}

function agGameStart(){
    lastSpawn = Date.now();
    Player.Lives = 3;
    Player.Speed = 3;
    countDown = 3;
    gameCountDownScreen();
    let gameCountDown = setInterval(function(){
        countDown--;

        if(countDown===0){
            clearInterval(gameCountDown)
            loadBackButton();
            engine();
        }
    }, 1000)
}

function gameCountDownScreen(){
    if(countDown===0){return;}
    //Draws the gradient background
    c.clearRect(0,0,screenWidth,screenHeight);
    drawBackground();

    if(countDown === 3){
        c.drawImage(apple,screenWidth/2 -200,screenHeight/2,100,100);
        c.drawImage(apple,screenWidth/2 -50,screenHeight/2,100,100);
        c.drawImage(apple,screenWidth/2 +100,screenHeight/2,100,100);
    }
    if(countDown === 2){
        c.drawImage(apple,screenWidth/2 -100,screenHeight/2,100,100);
        c.drawImage(apple,screenWidth/2 +50,screenHeight/2,100,100);
    }
    if(countDown === 1){
        c.drawImage(apple,screenWidth/2 -50,screenHeight/2,100,100);
    }

    c.fillStyle = 'black';
    c.font = '25px Arial';
    c.textAlign='center';
    c.textBaseline='middle';
    c.fillText(`A to move left and D to move right`,screenWidth/2,screenHeight/2+125);
    c.fillText(`Max lives = 4, catching hearts with full lives will give you +3 points.`,screenWidth/2,screenHeight/2+175);

    requestAnimationFrame(gameCountDownScreen);
}


function engine(){
    c.clearRect(0,0,screenWidth,screenHeight);
    if(unload===true){return;}
    //Draws the gradient background
    drawBackground();
    //Call game functions
    appleSpawner();
    playerTracker();
    displayGui();
    displayCatch();
    requestAnimationFrame(engine);
}

function playerTracker(){
    if(Player.Keys['68']){   //right
        if(Player.Position+Player.Speed+Player.Dimensions[0] >= screenWidth){
            Player.Position = screenWidth - Player.Dimensions[0];
        }else{
            Player.Position += Player.Speed;
        }
    }
    if(Player.Keys['65']){   //left
        if(Player.Position-Player.Speed <= 2){
            Player.Position = 0;
        }else{
            Player.Position -= Player.Speed;
        }
    }
    c.drawImage(Player.Image,Player.Position, screenHeight-55)
}

function spawnRandomObject(){
    var randomObject;

    if(Math.random() < .15){
        objectName = 'heart';
    } else {
        objectName = 'apple';
    }
    randomX = randomizer(5,screenWidth-80);

    newObject = function(){
        if(objectName === 'apple'){
            randomObject = new Image();
            randomObject.src = 'Assets/appleGame/Red Apple.png';
        } else if(objectName === 'heart'){
            randomObject = new Image();
            randomObject.src = 'Assets/heart.png';
        }
        objects.push([objectName, randomObject, randomX, 0]);
    }
    newObject();
    return randomObject;
}

function appleSpawner(){
    var time = Date.now();
    if(time > (lastSpawn + spawnRate)){
        lastSpawn = time;
        spawnRandomObject();
    }

    for(i=0; i<objects.length;i++){
        
        var object = objects[i];
        objectName = object[0];
        objectImg = object[1];
        object[3] += fallingSpeed;
        objectX = object[2];
        objectY = object[3];

        if(objectY < screenHeight){
            c.drawImage(objectImg, objectX,objectY, 50, 50);

        } else if(objectY > screenHeight){

            if(objectName === 'heart'){
                object.pop(object);
            } else if(objectName === 'apple'){
                object.pop(object);
                Player.Lives--;
            }

            if(Player.Lives === 0){
                unload = true;
                gameOver();
            }
        }

        if(objectY > screenHeight-75 && objectY < screenHeight -70){
            if(Player.Position > objectX -30 && Player.Position < objectX + 20){
                timeCaught = Date.now();
                if(objectName === 'heart'){
                    if(Player.Lives < 4){
                        Player.Lives++;
                        log = "+1 Life!";
                    } else{
                        score+=3;
                        log = "+3 Points!";
                    }
                    object.pop(object);
                } else if(objectName === 'apple'){
                    score++;
                    object.pop(object);
                    log = "+1 Point";
                }
            } 
        }
    }
}

function displayCatch(){
    var time = Date.now()
    if(timeCaught+500 > time){
        c.fillStyle = 'grey';
        c.fillRect(Player.Position-5, screenHeight-100,75,35);

        c.font = '17px Arial';
        c.fillStyle = 'black';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(log, Player.Position+35, screenHeight-80)
    }
}

function keyTracker(e){
    event.preventDefault(); 

    if(e.type === 'keydown'){
        Player.Keys[e.keyCode] = true;
    } else if(e.type === 'keyup'){
        Player.Keys[e.keyCode] = false;
    } 
}

//Draws background
function drawBackground(){ 
    var grd = c.createLinearGradient(0, screenHeight/2, 0, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(1, "blue");
    c.fillStyle = grd;
    c.fillRect(0, 0, screenWidth, screenHeight);
}

//GUI
function displayGui(){
    // Draw top bar
    c.fillStyle='grey';
    c.fillRect(0,0,screenWidth,40);
    //backButton
    c.fillStyle = '#bb5858'
    c.fillRect(0,0,120,40);
    c.fillStyle = 'black';
    c.font='30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('Back', 60, 20);


    //Player Lives
    if(Player.Lives === 4){
        c.drawImage(hearts, 10,50);
        c.drawImage(hearts, 45,50);
        c.drawImage(hearts, 80,50);
        c.drawImage(hearts, 115,50);
    }
    if(Player.Lives === 3){
        c.drawImage(hearts, 10,50);
        c.drawImage(hearts, 45,50);
        c.drawImage(hearts, 80,50);
    }
    if(Player.Lives === 2){
        c.drawImage(hearts, 10,50);
        c.drawImage(hearts, 45,50);
    }
    if(Player.Lives === 1){
        c.drawImage(hearts, 10,50);
    }

    //draw the player counter box
    c.beginPath();
    c.fillStyle= '#bb5858' //------------------------------------------------------------------
    c.ellipse(screenWidth/2, 40, 40,40,0,0,360);
    c.closePath();
    c.fill()

    // draw counter number
    c.fillStyle = 'black';
    c.font='30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(score, screenWidth/2, 40);

    c.fillText(`High Score: ${saveData.highScores["Apple Game"]}`, screenWidth-100, 20);
}


function agSaveGame(){
    if(score > saveData.highScores["Apple Game"]){
        saveData.highScores["Apple Game"] = score;
    }
    saveGameData();
}

function gameOver(){
    //ADD THE END GAME SCREEN
    for(i in objects){
        objects.pop(i);
    }
    buttons.pop(backBtn);
    loadGameOverButtons();
    gameOverScreen();
}

function gameOverScreen(){
    if(endGameResponse === true){
        if(playAgain === true){
            loadAppleGame();
            playAgain = false;
        } else if(endGame === true){
            unloadAppleGame();
            endGame = false;
        }
        endGameResponse=false;
        return;
    }

    drawBackground();
    c.drawImage(gameOverSplashScreen, screenWidth/2-250,screenHeight/2-250, 500,500);
    requestAnimationFrame(gameOverScreen);

    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.textAlign='center';
    c.textBaseline='middle';
    c.fillText(`Score: ${score}`,screenWidth/2,screenHeight/2-25);
    c.fillText(`High Score: ${saveData.highScores["Apple Game"]}`,screenWidth/2,screenHeight/2+25);

    c.font = '18px Arial';
    c.fillText('Main Menu',295,535);
    c.fillText('Play Again',505,535);
}


function unloadAppleGame(){
    unload = true;  // this turns off the request animation frame
    agSaveGame();

    c.clearRect(0,0,screenWidth,screenHeight);
    window.removeEventListener('keydown', keyTracker, true);
    window.removeEventListener('keyup', keyTracker, true);

    if(buttons['gameOverBackBtn']){
        buttons.pop(gameOverBackBtn);
    }
    score = 0;
    launchHomeScreen();
    
}

function loadBackButton(){   
    buttons.push(backBtn);
}

function loadGameOverButtons(){
    buttons.push(gameOverBackBtn);
    buttons.push(playAgainBtn);
}

var gameOverBackBtn = {
    points: [{
        x: 215,
        y: 510,
    },{
        x: 375,
        y: 510
    },{
        x: 375,
        y: 560
    },{
        x: 215,
        y: 560
    }],
    name: 'ag gameover main menu btn',
    interaction: function(){
        buttons.pop(playAgainBtn);
        buttons.pop(gameOverBackBtn);
        endGameResponse = true
        endGame = true;
    }
}

var playAgainBtn = {
    points: [{
        x: 425,
        y: 500,
    },{
        x: 585,
        y: 500
    },{
        x: 585,
        y: 550
    },{
        x: 425,
        y: 550
    }],
    name: 'ag gameover play again btn',
    interaction: function(){
        buttons.pop(playAgainBtn);
        buttons.pop(gameOverBackBtn);
        endGameResponse = true
        playAgain = true;
    }
}

var backBtn = {
    points: [{
        x: 0,
        y: 0,
    },{
        x: 200,
        y: 0
    },{
        x: 200,
        y: 40
    },{
        x: 0,
        y: 40
    }],
    name: 'back',
    interaction: function(){
        gameOver();
    }
}