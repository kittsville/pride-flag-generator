class ColorTools {
  static log(color) {
    console.log('%c                       ', `background: ${color}`);
  }

  static gradient(firstColor, secondColor, numberOfParts) {
    if (numberOfParts < 2) {
      throw `Gradients require at least two parts, [${numberOfParts}] given'`
    }

    const scale = chroma.scale([firstColor, secondColor]).mode('lab');
    const step = 1 / (numberOfParts - 1);

    return Array.from({length: numberOfParts}, (_, i) => scale(step * i).hex());
  }

  static twoPartGradient(firstColor, secondColor, thirdColor, numberOfParts) {
    const firstGradient = ColorTools.gradient(firstColor, secondColor, numberOfParts);
    const secondGradient = ColorTools.gradient(secondColor, thirdColor, numberOfParts);

    return firstGradient.concat(secondGradient.slice(1));
  }

  static randomHue() {
    return 360 * Math.random();
  }

  static hueDistance(hue1, hue2) {
    return Math.min(Math.abs(hue1 - hue2), (Math.min(hue1, hue2) + 360) - Math.max(hue1, hue2))
  }

  static randomPastels(number) {
    let pastels = [];
    let attempts = 0;
    const limit = number * 50;
    const separation = 70;

    do {
      attempts++;

      const hue = ColorTools.randomHue();

      if (!pastels.some(el => ColorTools.hueDistance(hue, el) <= separation)) {
        pastels.push(hue);
      }
    } while (pastels.length < number && attempts <= limit)

    if (attempts >= limit) {
      console.log(`Gave up generating distinctive colours after ${attempts} attempts`);
    }

    return pastels.map(hue => `hsl(${hue},70%,80%)`);
  }
}

class Shape {
  constructor(color) {
    this.color = color;
  }
}

class Bar extends Shape {
  constructor(color, height) {
    super(color);
    this.height = height === undefined ? 1 : height;
  }

  static gradient(firstColor, secondColor, numberOfBars) {
    return ColorTools.gradient(firstColor, secondColor, numberOfBars)
            .map(color => new Bar(color));
  }

  static twoPartGradient(firstColor, secondColor, thirdColor, numberOfBars) {
    return ColorTools.twoPartGradient(firstColor, secondColor, thirdColor, numberOfBars)
            .map(color => new Bar(color));
  }
}

class Flag {
  constructor(ratio, bars, arrows) {
    this.ratio = ratio;
    this.bars = bars === undefined ? [] : bars;
    this.arrows = arrows === undefined ? [] : arrows;
  }
}
