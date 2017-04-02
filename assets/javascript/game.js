var words = ["homer", "marge", "bart", "maggie", "lisa"];
var random = Math.floor(Math.random() * (words.length));
var randomWord = "";
// var lives;
// var winCounter;
// var guesses;
// var indexChecker;
var gamesWon = 0;
var donutBite = 0;


// ***PICKS A RANDOM WORD FROM ARRAY***
function generateRandomWord() {
    randomWord = words[Math.floor(Math.random() * (words.length))];
}
// ***ADD UNDERSCORES BASED ON WORD LENGTH***
function addSpaces(randomWord) {
    for (var i = 0; i < randomWord.length; i++) {
        $("<span class='letters'>").text("_ ").appendTo("#letterAmount");
    }
}
// ***CHECKS FOR MATCH AND PUSHES INDEX INTO AN ARRAY***
function guessMatch(userGuess) {
    for (k = 0; k < randomWord.length; k++) {
        if (randomWord[k] == userGuess) {
            indexChecker.push(k);
            winCounter++
        }
    }
}
// ***CHECK FOR WIN OR LOSE***
function winOrLose(winCounter, lives) {
    if (winCounter == randomWord.length) {
        $('.theWord').text(randomWord.toUpperCase());
        $('#winModal').modal('show');
        gamesWon++;
        $('#smart')[0].play();
        newGame();
    } else if (lives === 0) {
        $('#doh')[0].play();
        $('#loseModal').modal('show');
        newGame();
    }
}
// ***CHANGES UNDERSCORES TO GUESSED LETTERS***
function appearLetters(indexChecker, userGuess) {
    if (indexChecker.length > 0) {
        for (j = 0; j < indexChecker.length; j++) {
            $($('.letters')[indexChecker[j]]).text(userGuess);
        }
    } else {
        lives--;
        donutBite++;
        reduceBar(lives * 20 + "%");
        reduceDonut(donutBite * (-175))
        $("#guessed").append(userGuess + " ");
        $("#lives").text(lives);
    }
}
// ***TRACKING WINS***
function winTracker() {
    $("#gamesWon").text(gamesWon);
}

// ***RESET GAME***
function newGame() {
    resetText();
    generateRandomWord();
    addSpaces(randomWord);
    winTracker();
}
// ***COMMENTING HERE TO MATCH EVERYTHING ELSE***
function applyClickHandlers() {
    $('.reset').click(function() {
        newGame();
    });
}
// ***RESET TEXT***
function resetText() {
    lives = 5;
    winCounter = 0;
    guesses = [];
    indexChecker = [];
    donutBite = 0;
    $("#lives").text(lives);
    $('#letterAmount').text("");
    $("#guessed").text('Your guesses:');
    $(".active").animate({ width: '100%' }, 500);
    $("#donut").css("background-position", "0, 0");
}

function reduceBar(percent) {
    $(".active").animate({ width: percent }, 0);
}

function reduceDonut(lives) {
    $("#donut").css("background-position", lives+"px");
}

$(document).ready(function() {
    applyClickHandlers()
    newGame();


    // ***ON KEY PRESS***
    $(document).keypress(function(event) {

        var userGuess = event.key.toLowerCase();
        if (userGuess.match(/[a-z]/i) && (guesses.indexOf(userGuess) == -1)) { // ***CHECK IF INPUT IS A LETTER AND NOT A DUPLICATE***
            guesses.push(userGuess);
            guessMatch(userGuess);
            appearLetters(indexChecker, userGuess);
        }
        winOrLose(winCounter, lives);
        indexChecker = [];
    });
});


//TO DO LIST
//RESET TEXT - RESET GUESSES AND LIVES
// RE WRITE APPEARS LETTER FUNCTION
// ADD PROGRESS BAR
// ADD WIN COUNT
