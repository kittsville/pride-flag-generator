class Color {
  constructor(arg1, arg2, arg3) {
    if (arg2 === undefined && arg3 === undefined) {
      const hex = arg1;
      const colorParts = hex.substring(1).match(/.{2}/g)

      this.red = this.hexPartToColor(colorParts[0]);
      this.green = this.hexPartToColor(colorParts[1]);
      this.blue = this.hexPartToColor(colorParts[2]);
    } else {
      this.red = arg1;
      this.green = arg2;
      this.blue = arg3;
    }
  }

  hexPartToColor(part) {
    return Number('0x' + part);
  }

  colorToHexPart(color) {
    const normalisedColor = Math.max(0, Math.min(255, Math.floor(color)));
    const c = Number(normalisedColor).toString(16);
    return "00".substr( 0, 2 - c.length ) + c.toUpperCase();
  }

  toString(){
    const redHex = this.colorToHexPart(this.red);
    const greenHex = this.colorToHexPart(this.green);
    const blueHex = this.colorToHexPart(this.blue);

    return `#${redHex}${greenHex}${blueHex}`;
  }

  add(color) {
    return new Color(
      this.red + color.red,
      this.green + color.green,
      this.blue + color.blue
    );
  }

  multiply(number) {
    return new Color(
      this.red * number,
      this.green * number,
      this.blue * number
    );
  }

  log() {
    console.log('%c                       ', `background: ${this.toString()}`);
  }

  static gradient(firstColor, secondColor, numberOfParts) {
    if (numberOfParts < 2) {
      throw `Gradients require at least two parts, [${numberOfParts}] given'`
    }

    const colorDelta = new Color(
      (secondColor.red - firstColor.red) / (numberOfParts - 1),
      (secondColor.green - firstColor.green) / (numberOfParts - 1),
      (secondColor.blue - firstColor.blue) / (numberOfParts - 1)
    );

    return Array.from({length: numberOfParts}, (_, i) => firstColor.add(colorDelta.multiply(i)));
  }

  static twoPartGradient(firstColor, secondColor, thirdColor, numberOfParts) {
    const firstGradient = Color.gradient(firstColor, secondColor, numberOfParts);
    const secondGradient = Color.gradient(secondColor, thirdColor, numberOfParts);

    return firstGradient.concat(secondGradient.slice(1));
  }
}

class Bar {
  constructor(color) {
    this.color = color;
  }

  static gradient(firstColor, secondColor, numberOfBars) {
    return Color.gradient(firstColor, secondColor, numberOfBars)
            .map(color => new Bar(color));
  }

  static twoPartGradient(firstColor, secondColor, thirdColor, numberOfBars) {
    return Color.twoPartGradient(firstColor, secondColor, thirdColor, numberOfBars)
            .map(color => new Bar(color));
  }
}

class Flag {
  constructor(bars) {
    this.bars = bars;
  }
}
