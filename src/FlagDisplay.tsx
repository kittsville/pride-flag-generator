import React from "react";
import "./FlagDisplay.css";
import "./MaterialDesignRules.css";
import {Link} from "react-router-dom";
import { Bar } from "./models/Bar";
import { ColorTools } from "./models/ColorTools";
import {  FlagModel } from "./models/FlagModel";
import { FlagState } from "./FlagState";
import { Shape } from "./models/Shape";
import Flag from "@mui/icons-material/Flag";
import Shuffle from "@mui/icons-material/Shuffle";
import ContentCopy from "@mui/icons-material/ContentCopy";
import InsertPhoto from "@mui/icons-material/InsertPhoto";


class FlagDisplay extends React.Component<Record<string, unknown>, FlagState, Record<string, unknown>> {
  
  constructor(props : Record<string, unknown>)
  {
    super(props);
    this.state = { currentFlag: null };
    this.createTwoColorPastel = this.createTwoColorPastel.bind(this);
    this.createThreeColorPastel = this.createThreeColorPastel.bind(this);
    this.createSymmetricalPastel = this.createSymmetricalPastel.bind(this);
    this.renderFlag = this.renderFlag.bind(this); 
    this.getLink = this.getLink.bind(this);
    this.downloadFlag = this.downloadFlag.bind(this);
    this.createOriginalPrideFlag = this.createOriginalPrideFlag.bind(this);
    this.createModernPrideFlag = this.createModernPrideFlag.bind(this);
    this.createProgressFlag = this.createProgressFlag.bind(this);
    this.createDemiFlag = this.createDemiFlag.bind(this);
    this.createBiFlag = this.createBiFlag.bind(this);
    this.createIntersexFlag = this.createIntersexFlag.bind(this);
  }

  componentDidMount()
  {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const compactString = params.get("flag");
    if (compactString != null)
    {
      const flag = FlagModel.fromCompactString(compactString);
      this.setState({ currentFlag: flag });
      this.renderFlag(flag);
    }
  }

  getLink()
  {
    if (this.state.currentFlag != null)
    {
      const paragraph = document.getElementById("warning-label") as HTMLParagraphElement;
      paragraph.innerText = "";
      const linkToFlag = `${window.location.protocol}//${window.location.host}?flag=${this.state.currentFlag.toCompactString()}`;
      console.log(linkToFlag);
      navigator.clipboard.writeText(linkToFlag);
    }
    else 
    {
      const paragraph = document.getElementById("warning-label") as HTMLParagraphElement;
      paragraph.innerText = "No flag is being rendered";
    }
  }

  downloadFlag()
  {
    const downloadLink = document.getElementById("download") as HTMLAnchorElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (downloadLink != null && canvas != null)
    {
      downloadLink.href = canvas.toDataURL();
      downloadLink.click();
    }
    
  }

  renderFlag(flag: FlagModel)
  {
    this.setState({ currentFlag: flag });
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const ctx = canvas.getContext("2d");
    const canvasWidth = 1080;
    if (ctx != null)
    {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    

      if (canvas.width !== canvasWidth) {
        canvas.width = canvasWidth;
      }

      const canvasHeight = (canvasWidth / Math.max(...flag.ratio)) * Math.min(...flag.ratio);
      if (canvas.height !== canvasHeight) {
        canvas.height = canvasHeight;
      }

    
      const barHeight = canvas.height / flag.bars.map(bar => bar.height).reduce((a, b) => a + b);

      flag.bars.reduce((i, bar) => {
        ctx.fillStyle = bar.color;

        const x1 = 0;
        const x2 = canvas.width;
        const y1 = Math.floor(barHeight * i);
        const y2 = Math.ceil(y1 + (barHeight * bar.height));

        ctx.fillRect(x1, y1, x2, y2);

        return i + bar.height;
      }, 0);

      const arrowWidth = Math.sqrt((barHeight / 2) ** 2 + (barHeight / 2) ** 2);
      const arrowStart = (flag.arrows.length - 1) * (-arrowWidth / 2);

      flag.arrows.forEach((arrow, i) => {
        ctx.fillStyle = arrow.color;

        const arrowOffset = arrowStart + (arrowWidth * (flag.arrows.length - 1 - i));

        const x1 = 0;
        const y1 = -arrowOffset;

        const x2 = arrowOffset + (canvas.height / 2);
        const y2 = canvas.height / 2;

        const x3 = 0;
        const y3 = canvas.height - (arrowOffset * -1);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fill();
      });

      const circleRadius = canvas.width / 7.35;
      const additionalRadius = canvas.width / 18;

      flag.circles.forEach((circle, i) => {
        ctx.fillStyle = circle.color;

        const inverseI = flag.circles.length - 1 - i;

        const x = canvas.width / 2;
        const y = canvas.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, circleRadius + (additionalRadius * inverseI), 0, 2 * Math.PI, false);
        ctx.fill();
      });
    }
  }

  createSymmetricalPastel()
  {
    const colors = ColorTools.randomPastels(2);

    const outerColor = colors[0];
    const innerColor = Math.random() >= .8 ? "#FFF" : colors[1];

    const bars = Bar.twoPartGradient(
      outerColor,
      innerColor,
      outerColor,
      3
    );
    const flag = new FlagModel([3,5], bars,[],[]);
    this.renderFlag(flag);
  }

  createTwoColorPastel()
  {
    const colors = ColorTools.randomPastels(2);

    const bars = Bar.gradient(
      colors[0],colors[1],
      5
    );
    const flag = new FlagModel([3,5], bars,[],[]);
    this.renderFlag(flag);
  }

  createThreeColorPastel()
  {
    const colors = ColorTools.randomPastels(3);
    const bars = Bar.twoPartGradient(
      colors[0],colors[1],colors[2],
      3
    );
    const flag = new FlagModel([3,5], bars,[],[]);
    this.renderFlag(flag);
  }


  createOriginalPrideFlag()
  {
    const bars = [
      new Bar("#ff69b4",1),
      new Bar("#f00",1),
      new Bar("#ff8e00",1),
      new Bar("#ff0",1),
      new Bar("#008e00",1),
      new Bar("#00c0c0",1),
      new Bar("#400098",1),
      new Bar("#8e008e",1)
    ];
    this.renderFlag(new FlagModel([3,2], bars,[],[]));
  }

  createModernPrideFlag()
  {
    const bars = [
      new Bar("#E40303",1),
      new Bar("#FF8C00",1),
      new Bar("#FFED00",1),
      new Bar("#008026",1),
      new Bar("#004DFF",1),
      new Bar("#750787",1)
    ];
    this.renderFlag(new FlagModel([3,5], bars,[],[]));
  }

  createProgressFlag()
  {
    const bars = [
      new Bar("#E40303",1),
      new Bar("#FF8C00",1),
      new Bar("#FFED00",1),
      new Bar("#008026",1),
      new Bar("#004DFF",1),
      new Bar("#750787",1)
    ];
    const arrows = [
      new Shape("#000"),
      new Shape("#784F17"),
      new Shape("#5BCEFA"),
      new Shape("#F5A9B8"),
      new Shape("#FFF")

    ];
    this.renderFlag(new FlagModel([3,5], bars, arrows,[]));
  }

  createDemiFlag()
  {
    const bars = [
      new Bar("#FFF", 3),
      new Bar("#6E0070", 1),
      new Bar("#D2D2D2", 3)
    ];
    const arrows = [
      new Shape("#000")

    ];
    this.renderFlag(new FlagModel([3,5], bars, arrows,[]));
  }

  createBiFlag()
  {
    const bars = [
      new Bar("#0038a8", 2),
      new Bar("#9b4f96", 1),
      new Bar("#d60270", 2)
    ];
    this.renderFlag(new FlagModel([3,5], bars,[],[]));
  }

  createIntersexFlag()
  {
    const bars = [
      new Bar("#FFD800",1)
    ];
    const circles = [
      new Shape("#7902aa"),
      new Shape("#FFD800")
    ];
    this.renderFlag(new FlagModel([3,2], bars, [], circles));
  }

  render() {
    return (
      <div>
        <h1 className="mdc-typography mdc-typography--headline1">Pride Flag Generator</h1>
        <div id="buttons">
          <button id="two-color-pastel" onClick={this.createTwoColorPastel} className="mdc-button mdc-button--raised" type="button">
            <div className="mdc-button__ripple" aria-hidden="true"></div>
            <Shuffle></Shuffle>
            <span className="mdc-button__label">Two Color Pastel</span>
          </button>
          &nbsp;
          <button id="three-color-pastel" onClick={this.createThreeColorPastel} className="mdc-button mdc-button--raised" type="button">
            <div className="mdc-button__ripple" aria-hidden="true"></div>
            <Shuffle></Shuffle>
            <span className="mdc-button__label">Three Color Pastel</span>
          </button>
          &nbsp;
          <button id="symmetrical-color-pastel" onClick={this.createSymmetricalPastel} className="mdc-button mdc-button--raised" type="button">
            <div className="mdc-button__ripple" aria-hidden="true"></div>
            <Shuffle></Shuffle>
            <span className="mdc-button__label">Symmetrical Pastel</span>
          </button>
        </div>
        <canvas id='canvas'></canvas>
        <a id="download" download="pride-flag.png"></a>
        <div id="sharing">
          <p id="warning-label" className="redText"></p>
          <button id="link-to-flag" onClick={this.getLink} className="mdc-button mdc-button--raised" type="button">
            <div className="mdc-button__ripple" aria-hidden="true"></div>
            <ContentCopy></ContentCopy>
            <span className="mdc-button__label">Copy Flag URL</span>
          </button>
          &nbsp;
          <button id="download-flag" onClick={this.downloadFlag} className="mdc-button mdc-button--raised" type="button">
            <div className="mdc-button__ripple" aria-hidden="true"></div>
            <InsertPhoto></InsertPhoto>
            <span className="mdc-button__label">Download PNG</span>
          </button>
        </div>
       
        <h2>Supported Flags</h2>
        <p>By no means a complete list. Just the ones I used to test specific features.</p>
        <button id="original-pride" onClick={this.createOriginalPrideFlag} className="mdc-button mdc-button--raised" type="button">
          <div className="mdc-button__ripple" aria-hidden="true"></div>
          <Flag></Flag>
          <span className="mdc-button__label">Original Rainbow (1978)</span>
        </button>
        &nbsp;
        <button id="pride" onClick={this.createModernPrideFlag} className="mdc-button mdc-button--raised" type="button">
          <div className="mdc-button__ripple" aria-hidden="true"></div>
          <Flag></Flag>
          <span className="mdc-button__label">Classic Rainbow</span>
        </button>
        &nbsp;
        <button id="progress-pride" onClick={this.createProgressFlag} className="mdc-button mdc-button--raised" type="button">
          <div className="mdc-button__ripple" aria-hidden="true"></div>
          <Flag></Flag>
          <span className="mdc-button__label">Progress</span>
        </button>
        &nbsp;
        <button id="demi-pride" onClick={this.createDemiFlag} className="mdc-button mdc-button--raised" type="button">
          <div className="mdc-button__ripple" aria-hidden="true"></div>
          <Flag></Flag>
          <span className="mdc-button__label">Demisexual</span>
        </button>
        &nbsp;
        <button id="bi-pride" onClick={this.createBiFlag} className="mdc-button mdc-button--raised" type="button">
          <div className="mdc-button__ripple" aria-hidden="true"></div>
          <Flag></Flag>
          <span className="mdc-button__label">Bisexual</span>
        </button>
        &nbsp;
        <button id="intersex-pride" onClick={this.createIntersexFlag} className="mdc-button mdc-button--raised" type="button">
          <div className="mdc-button__ripple" aria-hidden="true"></div>
          <Flag></Flag>
          <span className="mdc-button__label">Intersex</span>
        </button>
        <footer>
          <Link to="privacy">Privacy Policy</Link>
          <a href="https://github.com/kittsville/pride-flag-generator">Report a Bug</a>
        </footer>
      </div>
    );
  }

}

export default FlagDisplay;
