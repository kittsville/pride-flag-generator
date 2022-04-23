import { Bar } from "./Bar";
import { Shape } from "./Shape";
import { Buffer } from "buffer";

class FlagModel {
  ratio: number[];
  bars: Bar[];
  arrows: Shape[];
  circles: Shape[];

  static getVersion() {
    return "2";
  }
  constructor(ratio : number[], bars : Bar[] , arrows : Shape[], circles : Shape[]) {
    this.ratio = ratio;
    this.bars = bars === undefined ? [] : bars;
    this.arrows = arrows === undefined ? [] : arrows;
    this.circles = circles === undefined ? [] : circles;
  }

  toCompactString() {
    const stringifiedBars = this.bars.map(bar => bar.toCompactString()).join(",");
    const flagParts = [
      FlagModel.getVersion(),
      ...this.ratio,
      stringifiedBars,
      Shape.arrayToCompactString(this.arrows),
      Shape.arrayToCompactString(this.circles)
    ];

    const stringifiedFlag = flagParts.join(":");
    return Buffer.from(stringifiedFlag).toString("base64");
  }

  static fromCompactString(string : string) {
    const stringifiedFlagParts = Buffer.from(string, "base64").toString().split(":");

    const givenFlagVersion = stringifiedFlagParts[0];
    const expectedFlagVersion = FlagModel.getVersion();

    if (givenFlagVersion !== expectedFlagVersion) {
      throw `Can't decode flag of version ${givenFlagVersion} with decoder of version ${expectedFlagVersion}`;
    }

    const stringifiedBars = stringifiedFlagParts[3].split(",");
    const bars = stringifiedBars.map(Bar.fromCompactString);
    const arrows = Shape.arrayFromCompactString(stringifiedFlagParts[4]);
    const circles = Shape.arrayFromCompactString(stringifiedFlagParts[5]);
    const ratio = [parseInt(stringifiedFlagParts[1]), parseInt(stringifiedFlagParts[2])];

    return new FlagModel(ratio, bars, arrows, circles);
  }
}

export { FlagModel };