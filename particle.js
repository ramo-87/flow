class Particle {
  constructor(x, y, baseColor) {
    this.x = x;
    this.y = y;
    this.size = random(1, 2 * sizeSlider.value());
    this.speed = random(-speedSlider.value(), speedSlider.value());
    this.len = 128;

    let r = red(baseColor);
    let g = green(baseColor);
    let b = blue(baseColor);

    let alpha = random(50, 100);

    this.color = color(r, g, b, alpha);
  }

  updateStatic() {
    var theta =
      noise(this.x / noiseScale.value(), this.y / noiseScale.value()) *
      noiseStrength.value();
    this.x += cos(theta) * this.speed;
    this.y += sin(theta) * this.speed;
    vertex(this.x, this.y);
  }

  displayStatic() {
    noFill();
    strokeWeight(this.size);
    stroke(this.color);
    beginShape();
    for (let i = 0; i < this.len * speedSlider.value(); i++) {
      var theta =
        noise(this.x / noiseScale.value(), this.y / noiseScale.value()) *
        noiseStrength.value();
      this.x += cos(theta) * this.speed;
      this.y += sin(theta) * this.speed;
      vertex(this.x, this.y);
    }
    endShape();
  }

  show() {
    strokeWeight(this.size);
    stroke(this.color);
    point(this.x, this.y);
  }

  update() {
    var theta =
      noise(this.x / noiseScale.value(), this.y / noiseScale.value()) *
      noiseStrength.value();
    this.x += cos(theta) * this.speed;
    this.y += sin(theta) * this.speed;
  }
}
