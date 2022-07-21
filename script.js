const btns = document.querySelectorAll('.btn')

const greenSound = './audio/beep_green.ogg'
const redSound = './audio/beep_red.ogg'
const blueSound = './audio/beep_blue.ogg'
const yellowSound = './audio/beep_yellow.ogg'

class ButtonColor {
  constructor(color, sound) {
    this.color = color;
    this.sound = sound;
  }

  playSound() {
    new Audio(this.sound).play();
  }
}

const btnGreen = new ButtonColor('green', greenSound);
const btnRed   = new ButtonColor('red', redSound);
const btnBlue  = new ButtonColor('blue', blueSound);
const btnYellow= new ButtonColor('yellow', yellowSound)

const objButtons = [btnGreen, btnBlue, btnRed, btnYellow];

btns.forEach((button, index) => {
  button.addEventListener('click', () => {
    objButtons[index].playSound();
  })
})

