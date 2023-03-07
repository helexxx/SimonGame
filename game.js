var userClickedPattern =[];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var game_started = false;

$(document).keypress(function(event) {
    if(game_started === false) {
        nextSequence();
        game_started = true;
        $("#level-title").text("Level "+ level);  
    } 
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    game_started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern =[];
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("succes");
    } 
    else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if(userClickedPattern.length === gamePattern.length && game_started === true) {
        setTimeout(function () {
            nextSequence();
            userClickedPattern = [];
        }, 1000)
    }
}

function nextSequence() {
    
    level++;
    
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate({opacity: '0.1'},100);
    $("#" + randomChosenColour).animate({opacity: '1'},100);
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");

    setTimeout(function () {
        $("#"+ currentColour).removeClass("pressed");
    }, 100)

}

