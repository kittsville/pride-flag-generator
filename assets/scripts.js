const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = 1080;
var currentFlag;

function renderFlag(flag) {
  console.log("Flag data:")
  console.log(JSON.stringify(flag));

  currentFlag = flag;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (canvas.width !== canvasWidth) {
    canvas.width  = canvasWidth;
  }

  const canvasHeight = (canvasWidth / Math.max(...flag.ratio)) * Math.min(...flag.ratio);
  if (canvas.height !== canvasHeight) {
    canvas.height = canvasHeight;
  }

  const barHeight = canvas.height / flag.bars.map(bar => bar.height).reduce((a, b) => a + b);

  flag.bars.reduce((i, bar) => {
    ctx.fillStyle = bar.color;

    const x1 = 0;
    const x2 = canvas.width;
    const y1 = barHeight * i;
    const y2 = y1 + (barHeight * bar.height);

    ctx.fillRect(x1, y1, x2, y2);

    return i + bar.height;
  }, 0);

  const arrowWidth = Math.sqrt((barHeight / 2) ** 2 + (barHeight / 2) ** 2);
  const arrowStart = (flag.arrows.length - 1) * (-arrowWidth / 2);

  flag.arrows.forEach((arrow, i) => {
    ctx.fillStyle = arrow.color;

    const arrowOffset = arrowStart + (arrowWidth * (flag.arrows.length - 1 - i));

    const x1 = 0;
    const y1 = -arrowOffset;

    const x2 = arrowOffset + (canvas.height / 2)
    const y2 = canvas.height / 2;

    const x3 = 0;
    const y3 = canvas.height - (arrowOffset * -1);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
  });

}

document.getElementById('three-color-pastel').addEventListener('click', () => {
  const bars = Bar.twoPartGradient(
    ...ColorTools.randomPastels(3),
    3
  );
  const flag = new Flag([3,5], bars);
  renderFlag(flag);
});

document.getElementById('two-color-pastel').addEventListener('click', () => {
  const bars = Bar.gradient(
    ...ColorTools.randomPastels(2),
    5
  );
  const flag = new Flag([3,5], bars);
  renderFlag(flag);
});

document.getElementById('symetrical-color-pastel').addEventListener('click', () => {
  const colors = ColorTools.randomPastels(2);

  const outerColor = colors[0]
  const innerColor = Math.random() >= .8 ? '#FFF' : colors[1];

  const bars = Bar.twoPartGradient(
    outerColor,
    innerColor,
    outerColor,
    3
  );
  const flag = new Flag([3,5], bars);
  renderFlag(flag);
});

document.getElementById('link-to-flag').addEventListener('click', () => {
  const linkToFlag = `${window.location.protocol}//${window.location.host}?flag=${currentFlag.toCompactString()}`;
  navigator.clipboard.writeText(linkToFlag);
});

const searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('flag')) {
  renderFlag(Flag.fromCompactString(searchParams.get('flag')));
} else {
  document.getElementById('two-color-pastel').click();
}

document.getElementById('download-flag').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'pride-flag.png';
  link.href = canvas.toDataURL();
  link.click();
});

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
