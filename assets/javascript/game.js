var words = ["homer", "marge", "bart", "maggie", "lisa"];
var random = [Math.floor(Math.random() * (words.length - 1))];
var randomWord = words[random];
var lives = 5;




$(document).ready(function() {

    for (var i = 0; i < randomWord.length; i++) {
        $("<span>").text("_ ").appendTo("#letterAmount");
    }

    $("#answer").append(randomWord).hide();



    $('#guessSubmit').click(function() {
        var userGuess = $("#inputBox").val();
        console.log(userGuess);
        $("#guessed").append(userGuess + " ");
        $("#inputBox").val("");


    });



});
