const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function render(flag) {
  const barHeight = canvas.height / flag.bars.length;

  flag.bars.forEach((bar, i) => {
    ctx.fillStyle = bar.color.toHex();

    const x1 = 0;
    const x2 = canvas.width;
    const y1 = barHeight * i;
    const y2 = y1 + barHeight;

    console.log(`Filling bar with ${ctx.fillStyle} at ${x1}, ${y1}, ${x2}, ${y2}`);

    ctx.fillRect(x1, y1, x2, y2);
  });
}

document.getElementById('three-color-pastel').addEventListener('click', () => {
  const bars = Bar.twoPartGradient(
    ...ColorTools.RandomPastels(3),
    3
  );
  const flag = new Flag(bars);
  render(flag);
});

document.getElementById('two-color-pastel').addEventListener('click', () => {
  const bars = Bar.gradient(
    ...ColorTools.RandomPastels(2),
    5
  );
  const flag = new Flag(bars);
  render(flag);
});

document.getElementById('symetrical-color-pastel').addEventListener('click', () => {
  const colors = ColorTools.RandomPastels(2);

  const outerColor = colors[0]
  const innerColor = Math.random() >= .8 ? colr.fromGrayscale(255) : colors[1];

  const bars = Bar.twoPartGradient(
    outerColor,
    innerColor,
    outerColor,
    3
  );
  const flag = new Flag(bars);
  render(flag);
});

document.getElementById('two-color-pastel').click();

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
