var words = ["homer", "marge", "bart", "maggie", "lisa"];
var random = Math.floor(Math.random() * (words.length));
var randomWord = "";
var lives = 6;
var winCounter = 0;
var guesses = [];
var indexChecker = [];

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
    } else if (lives === 0) {
        $('#loseModal').modal('show');
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
        $("#guessed").append(userGuess + " ");
        $("#lives").text("You have " + lives + " lives");
    }
}
// ***RESET GAME***
function resetGame() {
    resetText()
    generateRandomWord();
    addSpaces(randomWord);
    lives = 6;
    $("#lives").text("You have " + lives + " lives");
    winCounter = 0;
    guesses = [];
    $("#guessed").text('Your guesses:');
    indexChecker = [];
}

function applyClickHandlers() {
    $('button').click(function() {
        resetGame();
    });
}
// ***RESET TEXT***
function resetText() {
    $('#letterAmount').text("");

}

$(document).ready(function() {
    applyClickHandlers()
    generateRandomWord();
    addSpaces(randomWord); //ADDING UNDERSCORES
    $("#lives").text("You have " + lives + " lives"); // ***STARTING LIVES***

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
