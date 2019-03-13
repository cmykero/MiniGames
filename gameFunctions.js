var countDown,
    endGameResponse = false,
    endGame = false,
    playAgain = false,
    keyLogger = [];

function gameOver(){
    unload = true;
    objects = [];
    if(score>saveData.highScores[currentGame]){
        oldHighScore = saveData.highScores[currentGame];
        newHighScore = true;
        saveGameData(currentGame, score);
    }
    gameOverSplashScreen.src = `Assets/${currentGame}/endScreen.png`
    buttons.pop(backBtn);
    loadGameOverButtons();
    gameOverScreen();
}

function gameOverScreen(){
    if(endGameResponse === true){
        endGameResponse=false;
        if(playAgain === true){
            playAgain = false;
            return gameLauncher();
        } else if(endGame === true){
            endGame = false;
            return unloadCurrentGame();
        }
    }

    drawBackground();
    c.drawImage(gameOverSplashScreen, screenWidth/2-250,screenHeight/2-250, 500,500);
    
    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.textAlign='center';
    c.textBaseline='middle';

    if(newHighScore === true){
        c.fillText(`New High Score: ${score}!!`,screenWidth/2,screenHeight/2-25);
        c.fillText(`Old High Score: ${oldHighScore}`,screenWidth/2,screenHeight/2+25);
    }else{
        c.fillText(`Score: ${score}`,screenWidth/2,screenHeight/2-25);
        c.fillText(`High Score: ${saveData.highScores[currentGame]}`,screenWidth/2,screenHeight/2+25);
    }

    c.font = '18px Arial';
    c.fillText('Main Menu',295,535);
    c.fillText('Play Again',505,535);

    requestAnimationFrame(gameOverScreen);
}


function unloadCurrentGame(){
    unload = true;  // this turns off the request animation frame
    currentGame = null;
    c.clearRect(0,0,screenWidth,screenHeight);
    window.removeEventListener('keydown', keyTracker, true);
    window.removeEventListener('keyup', keyTracker, true);

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

function display(button){
    define(button);
    c.fillStyle = button.color;
    c.fill();
    c.stroke();
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

function playerTracker(){
    if(keyLogger['68']){   //right
        if(Player.Position+Player.Speed+Player.Dimensions[0] >= screenWidth){
            Player.Position = screenWidth - Player.Dimensions[0];
        }else{
            Player.Position += Player.Speed;
        }
    }
    if(keyLogger['65']){   //left
        if(Player.Position-Player.Speed <= 2){
            Player.Position = 0;
        }else{
            Player.Position -= Player.Speed;
        }
    }
    
    if(currentGame === 'space shooter' && keyLogger['32']){
        var bulletSpawnPoint = Player.Position;
        shootBullet(bulletSpawnPoint);
    }
}

function keyTracker(e){
    event.preventDefault(); 
    if(e.type === 'keydown'){
        keyLogger[e.keyCode] = true;
        
    } else if(e.type === 'keyup'){
        keyLogger[e.keyCode] = false;
    } 

}

//Draws background
function drawBackground(){
    var grd = c.createLinearGradient(0, screenHeight/2, 0, 0);
    grd.addColorStop(0, "#7295b6");
    grd.addColorStop(1, "#953232");
    c.fillStyle = grd;
    c.fillRect(0, 0, screenWidth, screenHeight);
}