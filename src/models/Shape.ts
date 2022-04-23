class Shape
{
  color = "";
  constructor(color : string) {
    this.color = color;
  }

  toCompactString() {
    return this.color;
  }

  static fromCompactString(string : string) {
    return new Shape(string);
  }

  static arrayToCompactString(array : Shape[]) {
    return array.length > 0 ? array.map(shape => shape.toCompactString()).join(",") : "";
  }

  static arrayFromCompactString(string : string) {
    return string === "" ? [] : string.split(",").map(Shape.fromCompactString);
  }
}

export {Shape};