function init(){
    tryCount=0; 
    randomNum=0;
    generateRandomFunction();
}
function generateRandomFunction(){         // function to get a random number
    var temp=(Math.random()*100)+1;
    randomNum=Math.floor(temp);  
}
function onCheckValue_Click(){                // function to check the entred value
    tryCount+=1; 
    if(tryCount==10){
        switchGuessbtnAbility(true);
        displayMessage("Game Over , Reset to Replay"); 
        return;
    }
    var userValue=document.getElementById("GuessedNo").value;
    if(userValue>randomNum){
        displayMessage("Your Guessed Number Is Big, Try A Smaller Number");
    }
    else if (userValue<randomNum){
        displayMessage("Your Guessed Number Is Small, Try A Bigger Number");
    }
    else{
        displayMessage("Good Choice , You Win");
        switchGuessbtnAbility(true);
    } 
}
function onRestartGame_Click(){                     // function to reset the game
    tryCount=0;
    generateRandomFunction();
    displayMessage("");
    switchGuessbtnAbility(false);
}
function displayMessage(text){                        // function to display guide message for user
    messageEl = document.getElementById('messageEl'); 
    messageEl.innerHTML=text;
}
function switchGuessbtnAbility(task){                     //function to control the guess btn
    GuessBtn=document.getElementById("GuessBtn");  
    GuessBtn.disabled =task;
}
document.onreadystatechange = function (){
    if (document.readyState == "complete"){ 
       init();
    }
} 
