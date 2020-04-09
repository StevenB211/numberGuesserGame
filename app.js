/*
  GAME FUNCTIONS
  - Player must guess a number between a min and a max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify player of the correct answer if lose
  - Let player choose to play again
*/

//Game Values
let min, max, winningNum;
let guessesLeft = 3;

//Initialize Game Values
const gameValuesInit = () =>{
  while(min === max || min > max || (max - min) < 6){
    min = Math.floor(Math.random() * 20 + 1);
    max = Math.floor(Math.random() * 20 + 1);
  };
  winningNum = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(winningNum);
}

gameValuesInit();


//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      guesses = document.querySelector('#guesses-left'),
      message = document.querySelector('.message');

//Assign min and max in the UI
minNum.textContent = min;
maxNum.textContent = max;

//Initialize Guesses Left
guesses.textContent = guessesLeft;

//SetMessage
const setMessage = (msg, color) =>{
  message.textContent = msg;
  message.style.color = color;
};

const reload = (e) =>{
  if(e.target.className === 'play-again button-primary'){
    window.location.reload();
  }
}

const playAgain = () => {
  guessBtn.value = 'Play again';
  guessBtn.disabled = false;
  game.addEventListener('mousedown', reload);
}


const gameState = (endGame, color, numOfGuesses, text) =>{
  guessBtn.disabled = endGame;
  guesses.textContent = numOfGuesses;
  guessInput.disabled = endGame; //Disable input
  guessInput.style.borderColor = color; //Change border color
  setMessage(text, color);
  if(endGame){playAgain();}
};

const submitGuess = () =>{
  let guess = parseInt(guessInput.value);
  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');  
  }else{
    //Check if winning number
    if(guess === winningNum){
      gameState(true, 'green', guessesLeft, `YOU WIN! ${winningNum} is correct!!!`);
    }else{
      //Wrong Number
      guessesLeft -= 1;
      if(guessesLeft > 0){
        gameState(false, 'red', guessesLeft, `${guess} isn't the correct number! Please try again.`);
      }else{
        gameState(true, 'red', guessesLeft, `You lose... The correct number is ${winningNum}. Better luck next time!`);
      }
    }
  }
};

// Enter press key event
const enterNumber = (event) => {
  if(event.which === 13){
    submitGuess();
  }
};

//EVENT LISTENERS
guessBtn.addEventListener('click',submitGuess); // Click the submit button to input number
guessInput.addEventListener('keypress', enterNumber); // Press 'Enter' key to input number

