document.getElementById('original-pride').addEventListener('click', () => {
  const bars = [
    new Bar(colr.fromHex("#ff69b4")),
    new Bar(colr.fromHex("f00")),
    new Bar(colr.fromHex("#ff8e00")),
    new Bar(colr.fromHex("#ff0")),
    new Bar(colr.fromHex("#008e00")),
    new Bar(colr.fromHex("#00c0c0")),
    new Bar(colr.fromHex("#400098")),
    new Bar(colr.fromHex("#8e008e"))
  ];
  render(new Flag(bars));
});

document.getElementById('pride').addEventListener('click', () => {
  const bars = [
    new Bar(colr.fromHex("#E40303")),
    new Bar(colr.fromHex("#FF8C00")),
    new Bar(colr.fromHex("#FFED00")),
    new Bar(colr.fromHex("#008026")),
    new Bar(colr.fromHex("#004DFF")),
    new Bar(colr.fromHex("#750787"))
  ];
  render(new Flag(bars));
});

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
  render(new Flag(bars, arrows));
});

document.getElementById('demi-pride').addEventListener('click', () => {
  const bars = [
    new Bar(colr.fromHex("#FFF"), 3),
    new Bar(colr.fromHex("#6E0070"), 1),
    new Bar(colr.fromHex("#D2D2D2"), 3)
  ];
  const arrows = [
    new Shape(colr.fromHex("#000"))

  ];
  render(new Flag(bars, arrows));
});
