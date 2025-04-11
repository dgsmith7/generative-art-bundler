import * as p5 from "p5";

const sketch = (p) => {
  let x = 0;
  let y = 0;
  let spacing = 25;
  let lc;
  p.setup = () => {
    p.createCanvas(600, 600);
    lc = p.color(
      p.int(baconRand.rand() * 255),
      p.int(baconRand.rand() * 255),
      p.int(baconRand.rand() * 255)
    );
    p.background(
      p.int(baconRand.rand() * 255),
      p.int(baconRand.rand() * 255),
      p.int(baconRand.rand() * 255)
    );
  };

  p.draw = () => {
    p.stroke(lc);
    if (baconRand.rand() < 0.5) {
      p.line(x, y, x + spacing, y + spacing);
    } else {
      p.line(x, y + spacing, x + spacing, y);
    }
    x += spacing;
    if (x > p.width) {
      x = 0;
      y += spacing;
      if (y > p.height) {
        p.noLoop();
      }
    }
  };
};

new p5(sketch);
