var Player = {
    Counter: 0,
    Speed: 0,
    Dimensions: [64,30],
    Position: 400,
    Image: new Image,
    Lives: 0,
}

var saveData = {
    highScores:{
        'apple game': 0,
        'space shooter': 0,
        'ball dropper': 0,
    }
}

var storedData = (JSON.parse(localStorage.getItem('cmykmgSaveData')));

if(!storedData){
    saveGameData();
} else{
    for(game in saveData.highScores){
        if(saveData.highScores.hasOwnProperty(game)&&!storedData.highScores[game]){
            storedData.highScores[game] = saveData.highScores[game];
        }
    }
    saveData = storedData;
    saveGameData();
}

function saveGameData(score){
    if(score){
        if(score > saveData.highScores[currentGame]){
            console.log(currentGame)
            saveData.highScores[currentGame] = score;
        }
    }


    storedData = JSON.stringify(saveData)
    localStorage.setItem('cmykmgSaveData', storedData);
}