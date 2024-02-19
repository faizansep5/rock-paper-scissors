const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorsBtn = document.querySelector('.scissors')
const resetScoreBtn = document.querySelector('.reset-score')
const autoPlayBtn = document.querySelector('.auto-play-btn')



const pickComputerMove = () => {
  const randomNumber = Math.random();
  let computerMove = '';

  //Find the computer's move
  if(randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }else if(randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
  return computerMove;
}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let isAutoPlaying = false;
let intervalId;

const autoPlay = () => {

  if(!isAutoPlaying){
      intervalId = setInterval(function () {
      const playermove = pickComputerMove();
      playGame(playermove);
    }, 1000)
    isAutoPlaying = true;
    autoPlayBtn.innerText = 'Stop Playing'
  }
    else{
      clearInterval(intervalId);
      isAutoPlaying = false;
      autoPlayBtn.innerText = 'Auto Play'
    }
  
};

const playGame = (playermove) => {
  const computerMove =  pickComputerMove();
  let result = ''

  if(playermove === 'rock'){
    
    if(computerMove === 'rock'){
    result = 'Tie'
  }else if(computerMove === 'paper'){
    result = 'You lose'
  }else if(computerMove === 'scissors'){
    result = 'You win'
  }
  }
  
  else if(playermove === 'paper'){

  if(computerMove === 'paper'){
    result = 'Tie'
  }else if(computerMove === 'scissors'){
    result = 'You lose'
  }else if(computerMove === 'rock'){
    result = 'You win'
  }
  }
  
  else if(playermove === 'scissors'){

  if(computerMove === 'scissors'){
    result = 'Tie'
  }else if(computerMove === 'rock'){
    result = 'You lose'
  }else if(computerMove === 'paper'){
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

  if(confirm('Are you sure you want to reset the score?')){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
  }
})

autoPlayBtn.addEventListener('click', ()=>{
  autoPlay();
})

document.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors')
  }
})

window.addEventListener('DOMContentLoaded', () =>{
  updateScore();
})