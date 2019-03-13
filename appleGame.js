var randomX  = randomizer(5,screenWidth-80);
var appleFalling = 0;

var apple = new Image(),
    hearts = new Image(),
    gameOverSplashScreen = new Image(),
    objects = [];

hearts.src = 'Assets/heart.png'
apple.src = 'Assets/apple game/Red Apple.png';

var fallingSpeed = 3,
    spawnRate = 1500,
    lastSpawn,
    log,
    timeCaught;


function loadAppleGame(){

    window.addEventListener('keydown', keyTracker, true);
    window.addEventListener('keyup', keyTracker, true);
    window.addEventListener('click', clickHandler, true);

    agGameStart();
}

function agGameStart(){
    if(unload){unload=false};
    countDown = 3;
    lastSpawn = Date.now();
    Player.Lives = 3;
    Player.Speed = 3;
    score = 0;
    newHighScore = false;
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
    drawAgBackground();

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
    drawAgBackground();
    //Call game functions
    appleSpawner();
    playerTracker();
    //Draw player
    c.drawImage(Player.Image,Player.Position, screenHeight-55);
    displayGui('apple game');
    displayCatch();
    requestAnimationFrame(engine);
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
            randomObject.src = 'Assets/apple game/Red Apple.png';
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


//Draws background
function drawAgBackground(){
    var grd = c.createLinearGradient(0, screenHeight/2, 0, 0);
    grd.addColorStop(0, "green");
    grd.addColorStop(1, "blue");
    c.fillStyle = grd;
    c.fillRect(0, 0, screenWidth, screenHeight);
}