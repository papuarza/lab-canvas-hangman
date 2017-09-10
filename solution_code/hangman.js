var hangman;

function Hangman() {
  this.words      = ["IRONHACK", "NODEJS", "JAVASCRIPT", "METEOR", "ANGULAR", "BARCELONA", "MADRID", "MIAMI", "HTML"];
  this.secretWord = "";
  this.letters    = [];
  this.guessedLetter = "";
  this.errorsLeft = 10;
  this.secretWord = this._getWord();
  // this.hangmanCanvas = new HangmanCanvas(this.secretWord);
}

Hangman.prototype._getWord = function () {
  var random = Math.floor(Math.random() * this.words.length);
  return this.words[random];
};

Hangman.prototype._checkIfLetter = function(keyCode) {
  return keyCode > 64 && keyCode < 91 ? true : false;
};

Hangman.prototype._checkClickedLetters = function(key) {
  return this.letters.indexOf(key.toUpperCase()) == -1 ? true : false;
};

Hangman.prototype._addCorrectLetter = function(i){
  //this.hangmanCanvas._writeCorrectLetter(i);
  this.guessedLetter += this.secretWord[i].toUpperCase();
  if (this._checkWinner()) {  console.log("winner"); }
  // if (this._checkWinner()) {  this.hangmanCanvas._winner(); }
};

Hangman.prototype._addWrongLetter = function (letter){
  // this.hangmanCanvas._writeWrongLetter(letter, this.errorsLeft);
  this.errorsLeft--;
  if (this._checkGameOver()) { console.log("looser"); }
  // if (this._checkGameOver()) { this.hangmanCanvas._gameOver(); }
};

Hangman.prototype._checkGameOver = function() {
  return this.errorsLeft === 0 ? true : false;
};

Hangman.prototype._checkWinner = function() {
  return this.guessedLetter.length === this.secretWord.length ? true : false;
};

document.getElementById("start-game-button").onclick = function(){
  hangman = new Hangman();
};

function getPos(key) {
  return hangman.secretWord.toUpperCase().indexOf(key);
}

document.onkeydown = function(e) {
  if(hangman._checkIfLetter(e.keyCode) && hangman._checkClickedLetters(e.key)){
    var key = e.key.toUpperCase();
    hangman.letters.push(key);
    var indexes = [];
    pos = getPos(key);
    if (pos === -1) {
      hangman._addWrongLetter(key);
    } else {
      indexes.push(getPos(key));

      while (pos !== -1) {
        indexes.push(hangman.secretWord.toUpperCase().indexOf(key, pos+1));
        pos = hangman.secretWord.toUpperCase().indexOf(key, pos + 1);
      }
      for(i=0;i<indexes.length-1;i++){
        hangman._addCorrectLetter(indexes[i]);
      }
    }
  }
};
