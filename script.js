const btns = document.querySelectorAll('.btn')
const scoreDisplay = document.querySelector('.score span')
const highScoreDisplay = document.querySelector('.highscore span')

const greenSound  = './audio/beep_green.ogg'
const redSound    = './audio/beep_red.ogg'
const blueSound   = './audio/beep_blue.ogg'
const yellowSound = './audio/beep_yellow.ogg'
const gameOverSound = './audio/gameover.ogg'

class ButtonColor {
  constructor(color, sound) {
    this.color = document.querySelector(`#${color}`);
    this.colorCode = this.color.id[0] // get first letter only ('g', 'r', 'y', 'b')
    this.sound = new Audio(sound);
  }

  playSound() {
    this.sound.load();
    this.sound.play();
  }

  flashBtn() {
    this.playSound()
    this.color.classList.add("active")
    setTimeout(() => {
      this.color.classList.remove('active')
    }, 300);
  }
}

class ScoringSystem {
  constructor() {
    this.score = 0;
  }

  addScore() {
    this.score += 1;
    this.updateScore();
  }

  updateScore() {
    scoreDisplay.textContent = this.score
  }
}

class Game extends ScoringSystem{
  constructor(listOfButtons) {
    super();
    this.buttons = listOfButtons;
    this.choices = ['g', 'r', 'y', 'b'];
    this.sequence = [];

    // Settings
    this.playerIndex = 0;
    this.playerClicked = "";
    this.speed = 750; // milliseconds
    this.waitingForInput = false;
    this.initEventListener();

    // Game Things
    this.isGameOver = false;
    this.gameOverAudio = new Audio(gameOverSound);
  }

  initEventListener() {
    /* Initialize button event listener*/
    // Declared globally
    btns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (this.waitingForInput && !this.isGameOver) {
          if (this.playerIndex >= this.sequence.length-1) {
            this.waitingForInput = false;
          }
          this.playerTurn(index);
        }
      })
    })
  }

  /* Pattern and Sequence related functions*/
  get randomSeq() {
    let randomIndex = Math.floor(Math.random() * 4)
    return this.choices[randomIndex]
  }

  addToSequence() {
    this.sequence.push(this.randomSeq)
    console.log(this.sequence)
  }

  playSequence() {
    this.sequence.forEach((seq, index) => {
      this.flashPattern(index)
      setTimeout(() => {
        // allow the user to click on the buttons after the pattern
        this.waitingForInput = true;
      }, (this.speed * this.sequence.length) - 300);
    })
  }

  flashPattern(index) {
    let btn;
    this.waitingForInput = false;  // prevent user from disrupting the playSequence()
    setTimeout(() => {
      let i = this.sequence[index]

      switch(i) {
        case "g":
          btn = this.buttons[0]
          btn.flashBtn()
          break;
        case "r":
          btn = this.buttons[1]
          btn.flashBtn()
          break;
        case "y":
          btn = this.buttons[2]
          btn.flashBtn()
          break;
        case "b":
          btn = this.buttons[3]
          btn.flashBtn()
          break;
        default:
          return;
      }
    }, this.speed * index);
  }

  /* Player functions*/
  playerTurn(btnIndex) {
    this.playerClicked = this.buttons[btnIndex].colorCode 
    console.log(this.validateClick())

    if (this.validateClick()) {
      if (this.playerIndex === this.sequence.length-1) {
        // if user is correct on all indeces next round and add score
        this.addScore();
        setTimeout(() => {
          this.playRound()
        }, 1000);
      }

      this.buttons[btnIndex].flashBtn()
    }
    else if (this.validateClick() === false) {
      this.gameOver()
    }
    this.playerIndex += 1;
  }

  validateClick() {
    return this.playerClicked === this.sequence[this.playerIndex] ? true : false
  }
  
  gameOver() {
    this.gameOverAudio.load()
    this.gameOverAudio.play()
    this.isGameOver = true;

    btns.forEach(btn => {
      btn.classList.add('game-over')
    })
  }

  /* Game functions*/
  resetAll() {
    this.score = 0;
    this.updateScore();

    this.isGameOver = false;
    this.sequence = [];
    btns.forEach(btn => {
      btn.classList.remove('game-over')
    })
  }

  resetTurn() {
    this.playerClicked = "";
    this.playerIndex = 0;
  }

  playRound() {
    this.addToSequence()
    this.playSequence()
    // wait for player input 
    // logic about player input in EventListener()
    this.resetTurn();
  }

  playGame() {
    if (!this.isGameOver) {
      this.playRound()
    }
    else {
      this.resetAll()
      setTimeout(() => {
        this.playRound()
      }, 500);
    }
  }
}

const btnGreen  = new ButtonColor('green', greenSound);
const btnRed    = new ButtonColor('red', redSound);
const btnBlue   = new ButtonColor('blue', blueSound);
const btnYellow = new ButtonColor('yellow', yellowSound)

const objButtons = [btnGreen, btnRed, btnYellow, btnBlue];

const play = new Game(objButtons);

const demo = document.querySelector('.demo');
demo.onclick = () => {
  play.playGame()
}