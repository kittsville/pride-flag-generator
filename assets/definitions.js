class ColorDelta {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  multiply(number) {
    return new ColorDelta(
      this.red * number,
      this.green * number,
      this.blue * number
    );
  }

  applyTo(color) {
    const rgbColor = color.toRgbObject();

    return colr.fromRgb(
      Math.max(0, Math.min(255, rgbColor.r + this.red)),
      Math.max(0, Math.min(255, rgbColor.g + this.green)),
      Math.max(0, Math.min(255, rgbColor.b + this.blue))
    );
  }
}

class ColorTools {
  static log(color) {
    console.log('%c                       ', `background: ${color.toHex()}`);
  }

  static gradient(firstColor, secondColor, numberOfParts) {
    if (numberOfParts < 2) {
      throw `Gradients require at least two parts, [${numberOfParts}] given'`
    }

    const firstColorRgb = firstColor.toRgbObject();
    const secondColorRgb = secondColor.toRgbObject();

    const colorDelta = new ColorDelta(
      (secondColorRgb.r - firstColorRgb.r) / (numberOfParts - 1),
      (secondColorRgb.g - firstColorRgb.g) / (numberOfParts - 1),
      (secondColorRgb.b - firstColorRgb.b) / (numberOfParts - 1)
    );

    return Array.from({length: numberOfParts}, (_, i) => colorDelta.multiply(i).applyTo(firstColor));
  }

  static twoPartGradient(firstColor, secondColor, thirdColor, numberOfParts) {
    const firstGradient = ColorTools.gradient(firstColor, secondColor, numberOfParts);
    const secondGradient = ColorTools.gradient(secondColor, thirdColor, numberOfParts);

    return firstGradient.concat(secondGradient.slice(1));
  }
}

class Bar {
  constructor(color) {
    this.color = color;
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
  constructor(bars) {
    this.bars = bars;
  }
}
