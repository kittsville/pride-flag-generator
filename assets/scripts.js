class Bar {
  constructor(fillStyle) {
    this.fillStyle = fillStyle;
  }
}

class Flag {
  constructor(bars) {
    this.bars = bars;
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function render(flag) {
  const barHeight = canvas.height / flag.bars.length;

  flag.bars.forEach((bar, i) => {
    console.log(bar);
    ctx.fillStyle = bar.fillStyle;

    const x1 = 0;
    const x2 = canvas.width;
    const y1 = barHeight * i;
    const y2 = y1 + barHeight;

    console.log(`Filling bar with ${bar.fillStyle} at ${x1}, ${y1}, ${x2}, ${y2}`);

    ctx.fillRect(x1, y1, x2, y2);
  });
}

const bars = [
  new Bar('blue'),
  new Bar('green'),
  new Bar('purple'),
  new Bar('grey')
];
const flag = new Flag(bars);
render(flag);

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
