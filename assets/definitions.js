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

  toCompactString() {
    return this.color;
  }

  static fromCompactString(string) {
    return new Shape(string);
  }
}

class Bar extends Shape {
  constructor(color, height) {
    super(color);
    this.height = height === undefined ? 1 : height;
  }

  toCompactString() {
    return this.height === 1 ? this.color : `${this.color}-${this.height}`;
  }

  static fromCompactString(string) {
    const barParts = string.split('-');
    if (barParts.length === 2) {
      const color = barParts[0];
      const height = parseInt(barParts[1]);

      return new Bar(color, height);
    } else {
      return new Bar(string);
    }
    return new Bar(...string.split('-'));
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
  static getVersion() {
    return "1";
  }
  constructor(ratio, bars, arrows) {
    this.ratio = ratio;
    this.bars = bars === undefined ? [] : bars;
    this.arrows = arrows === undefined ? [] : arrows;
  }

  toCompactString() {
    const stringifiedBars = this.bars.map(bar => bar.toCompactString()).join(',');
    let flagParts = [Flag.getVersion(), ...this.ratio, stringifiedBars];

    if (this.arrows.length > 0) {
      const stringifiedArrows = this.arrows.map(arrow => arrow.toCompactString()).join(',');
      flagParts.push(stringifiedArrows);
    }

    const stringifiedFlag = flagParts.join(':');
    return btoa(stringifiedFlag);
  }

  static fromCompactString(string) {
    const stringifiedFlagParts = atob(string).split(':');
    const givenFlagVersion = stringifiedFlagParts[0];
    const expectedFlagVersion = Flag.getVersion();

    if (givenFlagVersion !== expectedFlagVersion) {
      throw `Can't decode flag of version ${givenFlagVersion} with decoder of version ${expectedFlagVersion}`;
    }

    const stringifiedBars = stringifiedFlagParts[3].split(',');
    const bars = stringifiedBars.map(Bar.fromCompactString);

    let arrows = [];
    if (stringifiedFlagParts.length >= 5) {
      const stringifiedArrows = stringifiedFlagParts[4].split(',');
      arrows = stringifiedArrows.map(Shape.fromCompactString);
    }

    const ratio = [stringifiedFlagParts[1], stringifiedFlagParts[2]];

    return new Flag(ratio, bars, arrows);
  }
}
