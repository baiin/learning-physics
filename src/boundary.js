class Boundary {
    constructor(x, y, w, h, a) {
        let options = {
            friction: 0.3,
            restitution: 0.5,
            isStatic: true,
            angle: a
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
        fill(255, 0, 0);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
