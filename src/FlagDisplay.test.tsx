import React from "react";
import { render } from "./testUtils";
import { cleanup, fireEvent, screen, queryByAttribute } from "@testing-library/react";
import { FlagModel } from "./models/FlagModel";
import { Bar } from "./models/Bar";
import { ColorTools } from "./models/ColorTools";
import FlagDisplay from "./FlagDisplay";
import { textTransform } from "@mui/system";

afterEach(cleanup);

const getById = queryByAttribute.bind(null, "id");

Object.assign(navigator, {
  clipboard: {
    writeText: (text : string) => {console.log(text);},
  },
});

// returns true if every pixel's uint32 representation is 0 (or "blank")
function isCanvasBlank(canvas : HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (context != null)
  {
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
    return !pixelBuffer.some(color => color !== 0);
  }
  return false; 
}


test("Can create a compact string to represent a flag", () => {
  const colors = ColorTools.randomPastels(2);

  const bars = Bar.gradient(
    colors[0],colors[1],
    5
  );
  const flag = new FlagModel([3, 5], bars, [], []);
  const compactString = flag.toCompactString(); 
  expect(typeof compactString).toBe("string");
});

test("Can decode a compact string back to a flag", () => {
  const colors = ColorTools.randomPastels(2);

  const bars = Bar.gradient(
    colors[0],colors[1],
    5
  );
  const flag = new FlagModel([3, 5], bars, [], []);
  const compactString = flag.toCompactString(); 
  const restoredFlag = FlagModel.fromCompactString(compactString);
  expect(restoredFlag).toEqual(flag);
});



test("App proceeds to render the title ", function ()
{
  const dom = render(<FlagDisplay />, {});
  const textResult = dom.queryByText("Pride Flag Generator");
  expect(textResult).toBeDefined();
  const canvas = getById(dom.container, "canvas");
  expect(canvas).toBeDefined();
});

test("App proceeds to render the canvas ", function ()
{
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas");
  expect(canvas).toBeDefined();
});

test("When given an flag in the url parameters , it renders to the canvas", function ()
{
  const location = {
    ...window.location,
    search: "?flag=MjozOjU6I2IwYThmMCwjYjJiYWUwLCNiMWNjY2YsI2FlZGViZSwjYThmMGFjOjo=",
  };
  Object.defineProperty(window, "location", {
    writable: true,
    value: location,
  });
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  expect(isCanvasBlank(canvas)).toBe(false);
});

test("When the copy flag button is clicked, the clipboard should get data", async function ()
{
  const location = {
    ...window.location,
    search: "?flag=MjozOjU6I2IwYThmMCwjYjJiYWUwLCNiMWNjY2YsI2FlZGViZSwjYThmMGFjOjo=",
  };
  Object.defineProperty(window, "location",{
    writable: true,
    value: location,
  });
  const spy = jest.spyOn(navigator.clipboard, "writeText");
  const dom = render(<FlagDisplay />, {});
  const clipBoardButton = getById(dom.container, "link-to-flag") as HTMLButtonElement;
  clipBoardButton.click();
  expect(spy).toHaveBeenCalledWith("http://localhost?flag=MjozOjU6I2IwYThmMCwjYjJiYWUwLCNiMWNjY2YsI2FlZGViZSwjYThmMGFjOjo=");
});

test("When the two-color pastel button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const twoColorPastel = getById(dom.container, "two-color-pastel") as HTMLButtonElement;
  twoColorPastel.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the three-color pastel button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const threeColorPastel = getById(dom.container, "three-color-pastel") as HTMLButtonElement;
  threeColorPastel.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the symmetrical pastel button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const symmetricalColorPastel = getById(dom.container, "symmetrical-color-pastel") as HTMLButtonElement;
  symmetricalColorPastel.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the original flag button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const originalPride = getById(dom.container, "original-pride") as HTMLButtonElement;
  originalPride.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the pride flag button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const pride = getById(dom.container, "pride") as HTMLButtonElement;
  pride.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the progress flag button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const pride = getById(dom.container, "progress-pride") as HTMLButtonElement;
  pride.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the demi flag button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const demi = getById(dom.container, "demi-pride") as HTMLButtonElement;
  demi.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the bi flag button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const bi = getById(dom.container, "bi-pride") as HTMLButtonElement;
  bi.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 

test("When the intersex flag button is clicked, the canvas should get filled ", function () {
  const dom = render(<FlagDisplay />, {});
  const canvas = getById(dom.container, "canvas") as HTMLCanvasElement;
  const intersex = getById(dom.container, "intersex-pride") as HTMLButtonElement;
  intersex.click(); 
  expect(isCanvasBlank(canvas)).toBe(false);
}); 