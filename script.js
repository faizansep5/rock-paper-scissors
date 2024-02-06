const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorsBtn = document.querySelector('.scissors')
const resetScoreBtn = document.querySelector('.reset-score')

const pickComputerMove = () => {
  const randomNumber = Math.random();
  let computerMove = '';

  //Find the computer's move
  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  }else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissors';
  }
  return computerMove;
}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

const playGame = (playermove) => {
  const computerMove =  pickComputerMove();
  let result = ''

  if(playermove === 'rock'){
    
    if(computerMove === 'Rock'){
    result = 'Tie'
  }else if(computerMove === 'Paper'){
    result = 'You lose'
  }else if(computerMove === 'Scissors'){
    result = 'You win'
  }
  }
  
  else if(playermove === 'paper'){

  if(computerMove === 'Paper'){
    result = 'Tie'
  }else if(computerMove === 'Scissors'){
    result = 'You lose'
  }else if(computerMove === 'Rock'){
    result = 'You win'
  }
  }
  
  else if(playermove === 'scissors'){

  if(computerMove === 'Scissors'){
    result = 'Tie'
  }else if(computerMove === 'Rock'){
    result = 'You lose'
  }else if(computerMove === 'Paper'){
    result = 'You win'
  }
  }

  if(result === 'You win'){
    score.wins += 1;
  }else if(result === 'You lose'){
    score.losses += 1;
  }else if(result === 'Tie'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score))
  
  document.querySelector('.result-show').innerHTML = result;
  document.querySelector('.move-show').innerHTML = `You 
  <img src="/images/${playermove}-emoji.png">
  <img src="/images/${computerMove}-emoji.png">
  Computer`;

  updateScore();
}

const updateScore = () =>{
  document.querySelector('.score-show').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

rockBtn.addEventListener('click',()=>{
  playGame('rock');
})

paperBtn.addEventListener('click',()=>{
  playGame('paper');
})

scissorsBtn.addEventListener('click',()=>{
  playGame('scissors')
})

resetScoreBtn.addEventListener('click', ()=>{
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
})

addEventListener('DOMContentLoaded', () =>{
  updateScore();
})