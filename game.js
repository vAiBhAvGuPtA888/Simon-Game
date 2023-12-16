var gamePattern = []
var userClickedPattern = []
var buttoncolors = ["red","blue","green","yellow"]
var level = 0;
var started = false;
$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length)
        {
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}

    else
    {
    playSound("wrong");
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    },200);
    $("h1").text("Game over , Press Any key to restart")
    startOver();
    }
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttoncolors[randomNumber]
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}
function playSound(name){
    var audi = new Audio("sounds/"+name+".mp3");
    audi.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

function startOver()
{
level = 0;
gamePattern = []
started = false;
}

