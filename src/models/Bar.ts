import { Shape } from "./Shape";
import { ColorTools } from "./ColorTools";

class Bar extends Shape {
  height: number;
  constructor(color : string, height : number) {
    super(color);
    this.height = height === undefined ? 1 : height;
  }

  toCompactString() {
    return this.height === 1 ? this.color : `${this.color}-${this.height}`;
  }

  static fromCompactString(string : string) {
    const barParts = string.split("-");
    if (barParts.length === 2) {
      const color = barParts[0];
      const height = parseInt(barParts[1]);

      return new Bar(color, height);
    } else {
      return new Bar(string, 1);
    }
    //Unused Code return new Bar(...string.split('-'));
  }

  static gradient(firstColor : string, secondColor : string, numberOfBars : number) {
    return ColorTools.gradient(firstColor, secondColor, numberOfBars)
      .map(color => new Bar(color,1));
  }

  static twoPartGradient(firstColor : string, secondColor : string, thirdColor : string, numberOfBars : number) {
    return ColorTools.twoPartGradient(firstColor, secondColor, thirdColor, numberOfBars)
      .map(color => new Bar(color, 1));
  }
}
export { Bar };