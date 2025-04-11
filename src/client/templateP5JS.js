import * as p5 from "p5";

const sketch = (p) => {
  // insert your p5js code inside this function.
  // Ensure any and all p5js commands are preceded by 'p.'
  // Code directly from Processing will not work, it must be first ported to p5js.

  let x = 0;
  let y = 0;
  let spacing = 25;
  let lc;

  // notice 'p.' preceding all p5js commands
  // notice use of arrow functions for p5js functions
  // notice use of baconRand.rand() instead of random() or Math.random()
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

// create a new p5 instance and pass in the sketch function
new p5(sketch);

// Below is the original code from Processing pde file for comparison with above:
/*

float x = 0;
float y = 0;
float spacing = 25;
color lc = color(random(255), random(255), random(255));

void setup() {
  size(600, 600);
  background(random(255), random(255), random(255));
}

void draw() {
  stroke(lc);
  if (random(1) < 0.5) {
    line(x, y, x + spacing, y + spacing);
  } else {
    line(x, y + spacing, x + spacing, y);
  }
  x = x + spacing;
  if (x > width) {
    x = 0; 
    y = y + spacing;
    if (y > height) {
      noLoop();
    }
  }
}

*/
