const btns = document.querySelectorAll('.btn') // green, red, yellow, blue

const greenSound = './audio/beep_green.ogg'
const redSound = './audio/beep_red.ogg'
const blueSound = './audio/beep_blue.ogg'
const yellowSound = './audio/beep_yellow.ogg'

class ButtonColor {
  constructor(color, sound) {
    this.color = document.querySelector(`#${color}`);
    this.sound = new Audio(sound);
  }

  playSound() {
    this.sound.load();
    this.sound.play();
  }

  flashBtn() {
    this.playSound()
    this.color.classList.add("active")
    this.removeActive();
  }

  removeActive() {
    setTimeout(() => {
      this.color.classList.remove('active')
    }, 300);
  }
}

class Game {
  constructor(listOfButtons) {
    this.buttons = listOfButtons;
    this.choices = ['g', 'r', 'y', 'b']
    this.sequence = ['g', 'r', 'r', 'b', 'y']
  }

  get nextSequence() {
    return Math.floor(Math.random() * 4)
  }

  playSequence() {
    this.sequence.forEach((seq, index) => {
      this.flashPattern(index)
    })
  }

  flashPattern(index) {
    let btn;
    setTimeout(() => {
      let i = this.sequence[index]

      switch(i) {
        case "g":
          console.log("green");
          btn = this.buttons[0]
          btn.flashBtn()
          break;
        case "r":
          console.log("red")
          btn = this.buttons[1]
          btn.flashBtn()
          break;
        case "y":
          console.log("yellow")
          btn = this.buttons[2]
          btn.flashBtn()
          break;
        case "b":
          console.log("blue")
          btn = this.buttons[3]
          btn.flashBtn()
          break;
        default:
          return;
      }
      // buttons[index].color.click();
    }, 1000 * index);
  }

  playGame() {
    this.playSequence()
  }
}

const btnGreen  = new ButtonColor('green', greenSound);
const btnRed    = new ButtonColor('red', redSound);
const btnBlue   = new ButtonColor('blue', blueSound);
const btnYellow = new ButtonColor('yellow', yellowSound)

const objButtons = [btnGreen, btnRed, btnYellow, btnBlue];

const play = new Game(objButtons);
// play.playGame()

btns.forEach((button, index) => {
  button.addEventListener('click', () => {
    // console.clear();
    objButtons[index].playSound();
  })
})

const head = document.querySelector('header');
head.onclick = () => {
  play.playGame()
}