const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0;
let interval;
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0;
const restart = document.querySelector('#restart')
const scoreCounter = document.querySelector('.score-counter')
const end = document.querySelector('.end')
const lasth1 = document.querySelector('#lasth1')



startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})


timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn'))  {
   time = parseInt(event.target.getAttribute('data-time'))
   screens[1].classList.add('up')
   startGame()
  }
})

restart.addEventListener('click', (event) => {
    score = 0;
    event.preventDefault()
    screens[1].classList.remove('up');
    timeEl.parentNode.classList.remove('hide')
    restart.classList.add('hide');
    lasth1.classList.add('hide');
  })




board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()

    }
})

function startGame() {
    interval =  setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
    
}

function decreaseTime() {
    if (time === 0) {
        clearInterval(interval);
        finishGame()
    } else {
    let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
}
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    scoreCounter.innerHTML = `${score}`
    restart.classList.remove('hide');
    lasth1.classList.remove('hide');
    timeEl.parentNode.classList.add('hide')
    let circle = document.querySelector('.circle')
    circle.style.background = '';
    circle.classList.remove('circle');
    circle.style.boxShadow ='';
    

    
}

function createRandomCircle(){
    let circle = document.createElement('div')
    
    const {width, height} = board.getBoundingClientRect()
    const size = getRandomNumber(width*height/20000,width*height/50000)
    const x = getRandomNumber(0,width - size);
    const y = getRandomNumber(0,height - size);
    circle.classList.add('circle')
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    let RandomColor = 'rgb(' + colorValue() + ',' + colorValue() + ',' +    colorValue() + ')';
    const color = RandomColor;
    circle.style.background = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

    board.append(circle)
}

function getRandomNumber(min,max) {
   return Math.round(Math.random()* (max-min) + min)
}

function colorValue() {
    return Math.floor(Math.random() * 256);
  }
