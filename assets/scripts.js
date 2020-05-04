const colorToHex = color => Number('0x' + color.substring(1));
const hexToColor = hex => {
  const c = Number(Math.floor(hex)).toString(16);
  return '#' + ("000000".substr( 0, 6 - c.length ) + c.toUpperCase());
}

class Bar {
  constructor(fillStyle) {
    this.fillStyle = fillStyle;
  }

  static gradient(firstStyle, lastStyle, numberOfBars) {
    const firstStyleHex = colorToHex(firstStyle);
    const lastStyleHex = colorToHex(lastStyle);
    const colorDelta = (lastStyleHex - firstStyleHex) / (numberOfBars - 1);

    console.log(hexToColor(firstStyleHex));

    return Array.from({length: numberOfBars}, (_, i) => {
      const color = hexToColor(firstStyleHex + (colorDelta * i));
      return new Bar(color);
    });
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
    ctx.fillStyle = bar.fillStyle;

    const x1 = 0;
    const x2 = canvas.width;
    const y1 = barHeight * i;
    const y2 = y1 + barHeight;

    console.log(`Filling bar with ${bar.fillStyle} at ${x1}, ${y1}, ${x2}, ${y2}`);

    ctx.fillRect(x1, y1, x2, y2);
  });
}

const bars =
  Bar.gradient('#a8e2b0', '#edc8ea', 6);
const flag = new Flag(bars);
render(flag);

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
