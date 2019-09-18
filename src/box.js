class Box {
  constructor(x, y, w, h) {
    let options = {
      friction: 0.5,
      restitution: 0.8
    };
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let ang = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(ang);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
