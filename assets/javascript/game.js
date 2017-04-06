var words = ["homer simpson", "marge simpson", "bart simpson", "maggie simpson", "lisa simpson", "thrillhouse", "millhouse", "chillhouse", "crazy cat lady", "chief wiggum", "ralph wiggum", "fat tony", "sexy flanders", "krusty", "otto mann", "apu", "radioactive man", "itchy", "scratchy", "reverend lovejoy", "disco stu", "spider pig", "fallout boy", "springfield"];
var randomWord = "";
var lives;
var winCounter;
var guesses;
var indexChecker;
var gamesWon = 0;
var donutBite = 0;

// ***PICKS A RANDOM WORD FROM ARRAY***
function generateRandomWord() {
    randomWord = words[Math.floor(Math.random() * (words.length))];
}
// ***ADD UNDERSCORES BASED ON WORD LENGTH***
function addSpaces(randomWord) {
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] != " ") {
            $("<span class='letters'>").text("_ ").appendTo("#chalk");
        } else {
            $("<span class='letters'>").html('&nbsp&nbsp&nbsp;').appendTo("#chalk");
            winCounter++;
        }
    }
}
// ***CHECKS FOR MATCH AND PUSHES INDEX INTO AN ARRAY***
function guessMatch(userGuess) {
    for (k = 0; k < randomWord.length; k++) {
        if (randomWord[k] == userGuess) {
            indexChecker.push(k);
            winCounter++;
        }
    }
}
// ***CHANGES UNDERSCORES TO GUESSED LETTERS***
function appearLetters(indexChecker, userGuess) {
    var donutParam = (donutBite * (-172))
    if (indexChecker.length > 0) {
        for (j = 0; j < indexChecker.length; j++) {
            $($('.letters')[indexChecker[j]]).text(userGuess.toUpperCase());
        }
    } else {
        lives--;
        donutBite++;
        reduceDonut(donutParam);
        $("#guessed").append(" " + userGuess.toUpperCase());
        $("#lives").text(lives);
    }
}
// ***CHECK FOR WIN OR LOSE CONDITION***
function winOrLose(winCounter, lives) {
    if (winCounter == randomWord.length) {
        $('.theWord').text(randomWord.toUpperCase());
        $('#winModal').modal('show');
        gamesWon++;
        $('#smart')[0].play();
        newGame();
    } else if (lives === 0) {
        $('.theWord').text(randomWord.toUpperCase());
        $('#doh')[0].play();
        $('#loseModal').modal('show');
        newGame();
    }
}
// ***TRACKING TOTAL WINS***
function winTracker() {
    $("#gamesWon").text(gamesWon);
}

// ***STARTS NEW GAME***
function newGame() {
    resetText();
    generateRandomWord();
    addSpaces(randomWord);
    winTracker();
}
// ***RESET TEXT***
function resetText() {
    lives = 7;
    winCounter = 0;
    guesses = [];
    indexChecker = [];
    donutBite = 1;
    $("#lives").text(lives);
    $('#chalk').text("");
    $("#guessed").text('Your guesses:');
    $("#donut").css("background-position", "0, 0");
}
// ***COMMENTING HERE TO MATCH EVERYTHING ELSE***
function applyClickHandlers() {
    $('.reset').click(function() {
        newGame();
    });
}
// ***MOVES SPRITE IMAGE FOR DONUT BITES***
function reduceDonut(lives) {
    $("#donut").css("background-position", lives + "px");
}
// ***CHECKS IF KEYPRESS IS A LETTER ON CHROME AND STUPID FIREFOX(OTHER METHODS ON FIREFOX REGISTERED FUNCTION KEYS)***
function checkLetter(event) {
    var userGuess = event.key.toLowerCase();
    if ($("#loseModal").css("display") !== "block" && $("#winModal").css("display") !== "block") {
        if ((event.which >= 65 && event.which <= 90) || ((event.which >= 97 && event.which <= 122)) && (guesses.indexOf(userGuess) == -1)) { 
            guesses.push(userGuess);
            guessMatch(userGuess);
            appearLetters(indexChecker, userGuess);
        }
        winOrLose(winCounter, lives);
        indexChecker = [];
    }
}
$(document).ready(function() {
    applyClickHandlers();
    newGame();
    // ***ON KEY PRESS***
    $(document).keypress(function(event) {
        checkLetter(event);
    });
});
