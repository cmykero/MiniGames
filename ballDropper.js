//Declare Arrays
var balls = []; // Logs every click location.

//Declare variables
var initialClick = false, // Wait for input
    clickCounter = 0,
    fallSpeed = 20,
    gravity = .18,
    timeStamp = null,
    lastMouseX = null,
    lastMouseY = null,
    gameCountDownTimer;

// window.addEventListener('click', clickHandler, true);

var nextRandomColor = getRandomColor();
var gameTut1 = new Image();
gameTut1.src = 'Assets/ball dropper/gameTut1.png';
var gameTut2 = new Image();
gameTut2.src = 'Assets/ball dropper/gameTut2.png';

var startBtn = {
    points: [{
        x: screenWidth/3,
        y: screenHeight - screenHeight/4
    },{
        x: screenWidth - screenWidth/3,
        y: screenHeight - screenHeight/4
    },{
        x: screenWidth - screenWidth/3,
        y: screenHeight - 100
    },{
        x: screenWidth/3,
        y: screenHeight - 100
    }],
    color: 'blue',
    interaction: function(){ 
        unload = false;
        initialClick = true;
        buttons.pop(startBtn);
    }
}

function trackMouse(e){
    if(timeStamp === null){
        timeStamp = Date.now();
        lastMouseX = e.clientX;
        lastMouseY = e.clientY
    }

    var now = Date.now();

    timeStamp = now;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
}

function makesomethinghappen(e){ 
    var mouseX = parseInt(e.clientX);
    var mouseY = parseInt(e.clientY);
    if(mouseY > screenHeight/2){
        return;
    }

    var randomColor = getRandomColor();
    
    clickCounter++
    balls.push([mouseX, mouseY, 0, nextRandomColor, true]);
    nextRandomColor = randomColor;
}
function loadBallDropper(){
    balls = [];
    unload = false;
    initialClick = false;
    timeStamp = null;
    score = 0;
    buttons.push(startBtn);
    gameStartLoop();
}

function gameStartLoop(){
    if(endGame === true){endGame = false};
    if(initialClick === true){return countDownTimer();}//Start main loop.
    renderBackground();
    c.fillStyle = '#d76a75';
    c.fillRect(screenWidth/3, screenHeight - screenHeight/4, screenWidth*.33, screenHeight*.25-100);
    
    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(`Start Game`, screenWidth*.5, screenHeight*.81)
    c.fillRect(20,screenHeight/2-1,screenWidth-40,2)

    c.drawImage(gameTut1,screenWidth/2-225,screenHeight/2-100,200,200);
    c.drawImage(gameTut2,screenWidth/2+25,screenHeight/2-100,200,200);

    requestAnimationFrame(gameStartLoop);
}

function countDownTimer(){
    var countDown = 3;
    renderBackground();
    let countDownInterval = setInterval(function(){
        if(countDown === 3){
            c.fillStyle = 'red'
            c.beginPath();
            c.arc(screenWidth/2, screenHeight/2,50,0,Math.PI*2);
            c.closePath();
            c.fill();   
        }
        if(countDown === 2){
            c.fillStyle = 'yellow'
            c.beginPath();
            c.arc(screenWidth/2, screenHeight/2,50,0,Math.PI*2);
            c.closePath();
            c.fill();   
        }
        if(countDown === 1){
            c.fillStyle = 'green'
            c.beginPath();
            c.arc(screenWidth/2, screenHeight/2,50,0,Math.PI*2);
            c.closePath();
            c.fill();   
        }
        if(countDown === 0){
            clearInterval(countDownInterval);
            gameCountDownTimer = 30;
            window.addEventListener('click', makesomethinghappen, true);
            window.addEventListener('mousemove', trackMouse, true);
            buttons.push(backBtn);
            gameTimer();
            mainLoop();
        }
        countDown--
    }, 1000)
}



function gameTimer(){
    let timer = setInterval(function(){
        if(unload === true){
            // balls = [];
            return clearInterval(timer)};
        gameCountDownTimer--;
        if(gameCountDownTimer === 0){
            oldHighScore = saveData.highScores['ball dropper'];
            window.removeEventListener('click', makesomethinghappen, true);
            window.addEventListener('click', clickHandler, true);  
            endGame = true;
            clearInterval(timer);
        }
    },1000)
}

function mainLoop(){
    if(unload === true){return balls=[]};
    if(endGame === true){
        gameOver();
        window.removeEventListener('click', makesomethinghappen);
    }
    renderBackground();
    renderGame(); //Draws the background and clears simultaneously.
    displayGui();
    if(balls){
        for(var i = 0; i<balls.length;i++){
            c.fillStyle = 'black'

            var newClick = balls[i];
            var newClickVspeed = newClick[2];
            
            if(newClickVspeed < fallSpeed){
                balls[i][2] += gravity;
            }
            balls[i][1] += newClickVspeed;
            
            if(balls[i][1] < screenHeight){
                balls[i][4] = true;
                c.fillStyle = balls[i][3];
                c.beginPath();
                c.arc(balls[i][0], balls[i][1], screenWidth/screenHeight *20,0,Math.PI*2);
                c.closePath();
                c.fill();
            }

            if(balls[i][1] >= screenHeight-15 && balls[i][1] <= screenHeight){
                if(balls[i][3] === 'red'){
                    if(balls[i][0] < screenWidth*.25){
                        score++;
                    }
                }else if(balls[i][3]=== 'blue'){
                    if(balls[i][0] > screenWidth*.25 && balls[i][0] < screenWidth*.5){
                        score++;
                    }
                }else if(balls[i][3] === 'yellow'){
                    if(balls[i][0] > screenWidth*.5 && balls[i][0] < screenWidth*.75){
                        score++;
                        // alert('yellow')
                    }
                }else if(balls[i][3] === 'green'){
                    if(balls[i][0] > screenWidth*.75){
                        score++;
                    }
                } else {
                    alert('miss')
                    score--;
                }
            }
        }
    }
    requestAnimationFrame(mainLoop);
}

function endGameScreen(){
    if(unload === true){return};
    renderBackground();

    for(i in balls){
        balls.pop(i);
    }

    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';

    if(oldHighScore < score){
        c.fillText(`New High Score: ${score}!!`, screenWidth/2, 100)
    } else{

        c.fillText(`Game Over!`, screenWidth/2, 100)
        c.fillText(`Score: ${score}`, screenWidth/2, 130)
        c.fillText(`High Score: ${oldHighScore}`, screenWidth/2, 160)
        c.fillRect(20,screenHeight/2-1,screenWidth-40,2)
    }



    requestAnimationFrame(endGameScreen);
}

function getRandomColor(){
    var randomColor = randomizer(0,3);
    switch(randomColor){
        case 0:
            randomColor = 'red';
            break;
        case 1:
            randomColor = 'blue';
            break;
        case 2:
            randomColor = 'yellow';
            break;
        case 3:
            randomColor = 'green';
            break;
    }
    return randomColor;
}

function renderGame(){
    c.fillStyle = 'black';
    c.font = '30px Arial';
    c.fillRect(20,screenHeight/2-1,screenWidth-40,2);

    c.fillText(`Time Left: ${gameCountDownTimer}`, 100, 100);

    c.fillStyle = 'red';
    c.fillRect(0,screenHeight-50, screenWidth/4,50);
    c.fillStyle = 'blue';
    c.fillRect(screenWidth/4,screenHeight-50, screenWidth/4,50);
    c.fillStyle = 'yellow';
    c.fillRect(screenWidth/2,screenHeight-50, screenWidth/4,50);
    c.fillStyle = 'green';
    c.fillRect(screenWidth-screenWidth/4,screenHeight-50, screenWidth/4,50);

    c.fillStyle = nextRandomColor;
    c.beginPath();
    c.arc(lastMouseX+40, lastMouseY-20, 10,0,Math.PI*2);
    c.closePath();
    c.fill();
}

function renderBackground(){
    c.clearRect(0,0,screenWidth, screenHeight);
    c.fillStyle = '#397ba7';
    c.fillRect(0,0,screenWidth, screenHeight);
}