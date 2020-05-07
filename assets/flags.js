document.getElementById('progress-pride').addEventListener('click', () => {
  const bars = [
    new Bar(colr.fromHex("#D60706")),
    new Bar(colr.fromHex("#EE9D00")),
    new Bar(colr.fromHex("#E3FF00")),
    new Bar(colr.fromHex("#06C000")),
    new Bar(colr.fromHex("#001B98")),
    new Bar(colr.fromHex("#76008A"))
  ]
  const arrows = [
    new Shape(colr.fromHex("#000100")),
    new Shape(colr.fromHex("#603814")),
    new Shape(colr.fromHex("#75D8ED")),
    new Shape(colr.fromHex("#FFAFC9")),
    new Shape(colr.fromHex("#FCFAF6"))

  ];
  const flag = new Flag(bars, arrows);
  render(flag);
});
