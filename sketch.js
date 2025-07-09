const points = [];
var numPoints = 500;
var speed;
let density;

var colors = ["#bf616a", "#a3be8c", "#ebcb8b", "#88c0d0", "#d08770", "#5e81ac"];

let isLoop, save;
let p5Canvas;

function setup() {
  p5Canvas = createCanvas(800, 800);
  p5Canvas.parent("sketch-holder");
  frameRate(60);
  background("#000000");
  angleMode(DEGREES);

  setupUI();

  isLoop = true;
  isRecording = false;
  save = false;
  freshFrame = true;

  initSketch();
  //noLoop();
}

function draw() {
  for (i = 0; i < path.length; i++) {
    if (path[i].checked) {
      var path_type = path[i].value;
    }
  }

  if (path_type == "particle") {
    background("#000000");
  }

  numOfParticles();

  for (i = 0; i < display.length; i++) {
    if (display[i].checked) {
      var display_type = display[i].value;
    }
  }

  for (let point of points) {
    point.show();
    point.update();
  }
}

function initSketch() {
  const bgColor = $("#bgColor").val();
  const bg = color(bgColor);
  background(bg);

  $("#bgColor")
    .off("input")
    .on("input", function () {
      const newColor = $(this).val();
      const c = color(newColor);
      background(c);
    });

  clearCanvas();

  for (let i = 0; i < numParticles.value(); i++) {
    const x = random(width);
    const y = random(height);
    const c = coloringMethod(x, y);
    points.push(new Particle(x, y, c));
  }

  loop();
}

function radioHandler(src) {
  initSketch();
}

function getColorMethod() {
  for (let i = 0; i < coloring.length; i++) {
    if (coloring[i].checked) {
      var coloring_value = coloring[i].value;
    }
  }

  return coloring_value;
}

function coloringMethod(x, y) {
  var coloring_value = getColorMethod();
  if (coloring_value == "randomColor") {
    return colors[int(random(colors.length))];
  } else if (coloring_value == "angleColor") {
    var angle =
      noise(x / noiseScale.value(), y / noiseScale.value()) *
      noiseStrength.value();
    var i = int((angle / (TWO_PI / 4)) % colors.length);
    i = constrain(i, 0, colors.length - 1);
    return colors[i];
  } else if ((coloring_value = "gridColor")) {
    i = int((x / (width / colors.length + 1)) % colors.length);
    i = constrain(i, 0, colors.length - 1);
    return colors[i];
  } else {
    return colors[int(random(colors.length))];
  }
}
