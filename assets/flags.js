document.getElementById('progress-pride').addEventListener('click', () => {
  const bars = [
    new Bar(colr.fromHex("#E40303")),
    new Bar(colr.fromHex("#FF8C00")),
    new Bar(colr.fromHex("#FFED00")),
    new Bar(colr.fromHex("#008026")),
    new Bar(colr.fromHex("#004DFF")),
    new Bar(colr.fromHex("#750787"))
  ];
  const arrows = [
    new Shape(colr.fromHex("#000")),
    new Shape(colr.fromHex("#784F17")),
    new Shape(colr.fromHex("#5BCEFA")),
    new Shape(colr.fromHex("#F5A9B8")),
    new Shape(colr.fromHex("#FFF"))

  ];
  const flag = new Flag(bars, arrows);
  render(flag);
});
