class Circle {
    constructor(x, y, radius) {
        let options = {
            friction: 0.3,
            restitution: 0.5
        };

        this.r = random(1, 255);
        this.g = random(1, 255);
        this.b = random(1, 255);

        this.radius = radius;
        this.body = Bodies.circle(x, y, radius, options);
        World.add(world, this.body);
    }

    isOffScreen() {
        let pos = this.body.position;
        if (pos.x <= 0 || pos.x >= width) {
            return true;
        }

        if (pos.y <= 0 || pos.y >= height) {
            return true;
        }

        return false;
    }

    removeFromWorld() {
        World.remove(world, this.body);
    }

    show() {
        let pos = this.body.position;
        let ang = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(ang);
        strokeWeight(1);
        stroke(255);
        fill(this.r, this.g, this.b);
        ellipse(0, 0, this.radius * 2);
        pop();
    }
}
