var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern=[];
var level=0;
var started=false;

//step-7 on keypress at first time call nextSequence() and set level to 0 from h1 -title("press a key to start")
 $(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started=true;
 }
 });

 //step-4 onclick buttons sore userChosenColour id = green, red, blue etc
  $("btn").on("click", function(){
    var userChosenColour = $(this).attr(id);
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
  animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
   
  });

  //step-8 create checkAnswer(currentLevel)
 function checkAnswer(currentLevel){
    if(gamePattern(currentLevel) === userClickedPattern(currentLevel)){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
        
        
    }else{
        //step-9 play wrong sound and change text to gameover and adding game over clss properties from styles.css
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
 }


//step 1 create nextSequence() func
function nextSequence(){
    level++;
    $("#level-title").text("Level "+ level);
    //step-2 generate random number assign to randomChosenColour
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
//step-3 APPLY animation and play sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

  
  //step -5 create playSound() and call it in nextSequence for evry time seQuence starts and also when button
 function playSound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
 }
 
 //step-6 create animatePress() function 
 function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
     }, 100);
 }

 //step-10 create startOver()
 function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
 }