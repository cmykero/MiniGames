var bullets = [];

function loadSpaceShooter(){
    
    window.addEventListener('keydown', keyTracker, true);
    window.addEventListener('keyup', keyTracker, true);
    window.addEventListener('click', clickHandler, true);

    ssGameStart();
}

function ssGameStart(){
    if(unload === true){unload=false}
    countDown = 3;
    ssCountDownScreen();
    let gameCountDown = setInterval(function(){
        countDown--;
        if(countDown===0){
            Player.Speed = 4;
            buttons.push(backBtn);
            clearInterval(gameCountDown);
            ssEngine();
        }
    },1000)
}

function ssCountDownScreen(){
    if(countDown===0){return;}
    //Draws the gradient background
    c.clearRect(0,0,screenWidth,screenHeight);

    
    c.fillStyle = 'black';
    c.font = '25px Arial';
    c.textAlign='center';
    c.textBaseline='middle';
    c.fillText(countDown,screenWidth/2,screenHeight/2+125);

    requestAnimationFrame(ssCountDownScreen);
}

function ssEngine(){
    if(unload === true){return;}
    c.clearRect(0,0,screenWidth,screenHeight);
    displayGui('space shooter');

    playerTracker();
    c.drawImage(Player.Image,Player.Position, screenHeight-100,100,100);
    requestAnimationFrame(ssEngine);
}

function bulletSpawner(){
    bullets.push()
}


function shootBullet(bulletSpawnPoint){
    
    console.log(bulletSpawnPoint)
}
