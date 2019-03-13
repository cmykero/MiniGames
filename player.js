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
        'ball dropper': 0
    }
}

var storedData = (JSON.parse(localStorage.getItem('cmykmgSaveData')));

if(!storedData){
    saveGameData();
} else{
    saveData = storedData;
}

function saveGameData(score){
    if(score){
        if(score > saveData.highScores[currentGame]){
            saveData.highScores[currentGame] = score;
        }
    }


    storeData = JSON.stringify(saveData)
    localStorage.setItem('cmykmgSaveData', storeData);
}