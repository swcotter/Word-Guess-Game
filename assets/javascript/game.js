var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

var neighborhoods = ["magnolia","queenanne","ballard","belltown","sandpoint","wallingford","madisonpark", "beaconhill", "rainiervalley", "sewardpark", "georgetown", "delridge"]

var gameStarted = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var lettersGuessed;
var numWins = 0;
var numLosses = 0;
var getNewWord;
var wordPlace; //place in neighborhoods array
var correctGuesses;
var wordAsArr = [];
var dashesArray = [];

function initialize() {
    gameStarted = true;
    lettersGuessed = [];
    correctGuesses = 0;
    wordPlace = Math.floor(Math.random() * 12);
    currentWord = neighborhoods [wordPlace];  //string
    guessesLeft = 13 //longer words get less guesses
    wordAsDashes = makeIntoDashes(currentWord); //string of dashes
    wordAsArr = currentWord.split(''); //array with letters
    dashesArray = wordAsDashes.split(''); //array with dashes
    document.getElementById("currentWord").innerHTML = wordAsDashes;
    document.getElementById("lettersGuessed").innerHTML = "--";
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

// Make each word into underscores, like hangman
function makeIntoDashes(word) {
    var dashes = "";
    for (i = 0; i < word.length - 1; i++) {
        dashes += "_";
    }
    dashes += "_";
    return dashes;
}

// Main function that controls what to do with each keystroke
function playGame(letter) {
    var letter = letter.toLowerCase();

    //Checks if key is a letter
    if (alphabet.indexOf(letter) > -1) {
        if (wordAsArr.indexOf(letter) > -1){
            correctGuesses++;
            displayLetter(letter);
        }
        else {
            if (lettersGuessed.indexOf(letter) > -1) {
                return;
            }
            else {
                guessesLeft--;
                document.getElementById("guessesLeft").innerHTML = guessesLeft;
                lettersGuessed.push(letter);
                document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(' ');
                if (guessesLeft == 0) {
                    alert("Sorry! The right answer is " + currentWord);
                    initialize();
                    numLosses++;
                    document.getElementById("losses").innerHTML = numLosses;
                }
            }
        }
    }
}

//Displays letter if it's in the selected word
function displayLetter(letter) {
    //for each character in wordAsDashes, if it matches cuurentWord
    for (i = 0; i < currentWord.length; i++) {
        if (letter == wordAsArr[i]) {
            dashesArray[i * 2] = letter;
            console.log(dashesArray);
        }
    }
    document.getElementById("currentWord").innerHTML = dashesArray.join("");
    checkForWin();
}

// Checks for win by looking for "_"
function checkForWin() {
    if (dashesArray.indexOf("_") === -1) {
        alert("Congrats! You got the correct answer " + currentWord);
        numWins++;
        document.getElementById("wins").innerHTML = numWins;
        initialize();
    }
}

document.onkeyup = function (event) {
    if (!gameStarted) {
        document.getElementById("letsPlay").innerHTML = "";
        initialize();
        document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
        console.log(currentWord);
        gameStarted = true;
    }
    else {
        playGame(event.key);
    }
}