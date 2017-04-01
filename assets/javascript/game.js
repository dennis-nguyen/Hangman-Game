var words = ["homer", "marge", "bart", "maggie", "lisa"];
var random = Math.floor(Math.random() * (words.length));
var randomWord = "";
// var lives;
// var winCounter;
// var guesses;
// var indexChecker;
var gamesWon = 0;


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
        $('#winModal').modal('show');
        gamesWon++;
        newGame();
    } else if (lives === 0) {
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
        reduceBar(lives*20 + "%");
        $("#guessed").append(userGuess + " ");
        $("#lives").text(lives);
    }
}
// ***TRACKING WINS***
function winTracker () {
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
    $("#lives").text(lives);
    $('#letterAmount').text("");
    $("#guessed").text('Your guesses:');
    $(".progress").animate({width:'100%'}, 500);
}

function reduceBar(percent) {
        $(".progress").animate({width:percent}, 500);
}

$(document).ready(function() {
    applyClickHandlers()
    newGame();

    // ***ON KEY PRESS***
    $(document).keypress(function(event) {

        var userGuess = event.key.toLowerCase();
        if (userGuess.match(/[a-z]/i) && (guesses.indexOf(userGuess) == -1)) { // ***CHECK IF INPUT IS A LETTER***
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
