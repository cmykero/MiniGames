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
    c.fillStyle= '#bb5858';
    c.ellipse(screenWidth/2, 40, 40,40,0,0,360);
    c.closePath();
    c.fill()

    // draw counter number
    c.fillStyle = 'black';
    c.font='30px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(score, screenWidth/2, 40);

    c.fillText(`High Score: ${saveData.highScores[currentGame]}`, screenWidth-100, 20);
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