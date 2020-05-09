document.getElementById('original-pride').addEventListener('click', () => {
  const bars = [
    new Bar("#ff69b4"),
    new Bar("f00"),
    new Bar("#ff8e00"),
    new Bar("#ff0"),
    new Bar("#008e00"),
    new Bar("#00c0c0"),
    new Bar("#400098"),
    new Bar("#8e008e")
  ];
  render(new Flag([3,2], bars));
});

document.getElementById('pride').addEventListener('click', () => {
  const bars = [
    new Bar("#E40303"),
    new Bar("#FF8C00"),
    new Bar("#FFED00"),
    new Bar("#008026"),
    new Bar("#004DFF"),
    new Bar("#750787")
  ];
  render(new Flag([3,5], bars));
});

document.getElementById('progress-pride').addEventListener('click', () => {
  const bars = [
    new Bar("#E40303"),
    new Bar("#FF8C00"),
    new Bar("#FFED00"),
    new Bar("#008026"),
    new Bar("#004DFF"),
    new Bar("#750787")
  ];
  const arrows = [
    new Shape("#000"),
    new Shape("#784F17"),
    new Shape("#5BCEFA"),
    new Shape("#F5A9B8"),
    new Shape("#FFF")

  ];
  render(new Flag([3,5], bars, arrows));
});

document.getElementById('demi-pride').addEventListener('click', () => {
  const bars = [
    new Bar("#FFF", 3),
    new Bar("#6E0070", 1),
    new Bar("#D2D2D2", 3)
  ];
  const arrows = [
    new Shape("#000")

  ];
  render(new Flag([3,5], bars, arrows));
});

document.getElementById('bi-pride').addEventListener('click', () => {
  const bars = [
    new Bar("#0038a8", 2),
    new Bar("#9b4f96", 1),
    new Bar("#d60270", 2)
  ];
  render(new Flag([3,5], bars));
});
