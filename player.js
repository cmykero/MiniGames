var Player = {
    Counter: 0,
    Speed: 0,
    Dimensions: [64,30],
    Position: 400,
    Image: new Image,
    Keys: [],
    Lives: 0,
}

var saveData = {
    highScores:{
        'Apple Game': 0,
    }
}

var storedData = (JSON.parse(localStorage.getItem('cmykmgSaveData')));

if(!storedData){
    saveData();
} else{
    saveData = storedData;
}

function saveGameData(){
    storeData = JSON.stringify(saveData)
    localStorage.setItem('cmykmgSaveData', storeData);
}