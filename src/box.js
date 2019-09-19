class Box {
    constructor(brain) {
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(9, 12, 4);
        }

        this.score = 0;
        this.fitness = 0;

        let options = {
            friction: 1,
            restitution: 0,
            angle: 0
        };

        this.r = random(1, 255);
        this.g = random(1, 255);
        this.b = random(1, 255);

        this.size = 50;

        this.x = random(60, 70);
        this.y = 320;

        this.leftLeg = Bodies.rectangle(this.x, this.y + 30, 10, 40, options);
        this.rightLeg = Bodies.rectangle(this.x + 10, this.y + 30, 10, 40, options);

        options.isStatic = false;
        this.body = Bodies.rectangle(this.x, this.y, this.size, this.size, options);
        World.add(world, [this.body, this.leftLeg, this.rightLeg]);

        let leftConstraint = Constraint.create({
            bodyA: this.body,
            bodyB: this.leftLeg,
            pointA: {
                x: -10,
                y: 20
            },
            pointB: {
                x: 5,
                y: -20
            },
            length: 5,
            stiffness: 1
        });

        let rightConstraint = Constraint.create({
            bodyA: this.body,
            bodyB: this.rightLeg,
            pointA: {
                x: 20,
                y: 20
            },
            pointB: {
                x: 5,
                y: -20
            },
            length: 5,
            stiffness: 1
        });

        World.add(world, leftConstraint);
        World.add(world, rightConstraint);
    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    think() {
        let inputone = [];
        inputone[0] = this.body.position.x / width;
        inputone[1] = this.body.position.y / height;
        inputone[2] = this.body.angle;
        inputone[3] = this.rightLeg.position.x / width;
        inputone[4] = this.rightLeg.position.y / height;
        inputone[5] = this.rightLeg.angle;
        inputone[6] = this.leftLeg.position.x / width;
        inputone[7] = this.leftLeg.position.y / height;
        inputone[8] = this.leftLeg.angle;

        let output = this.brain.predict(inputone);

        let high = output[0];
        let highIndex = 0;

        for (let i = 1; i < output.length; ++i) {
            if (output[i] > high) {
                high = output[i];
                highIndex = i;
            }
        }

        this.move(highIndex);
    }

    update() {
        this.score += this.body.position.x - this.x;
    }

    isDead() {
        if (Math.abs(this.body.angle) > 1) {
            return true;
        }
        return false;
    }

    removeFromWorld() {
        World.remove(world, [this.body, this.leftLeg, this.rightLeg]);
    }

    move(code) {
        if (code === 0) {
            this.rightLeg.angle += 0.25;
        }

        if (code === 1) {
            this.rightLeg.angle -= 0.25;
        }

        if (code === 2) {
            this.leftLeg.angle += 0.25;
        }

        if (code === 3) {
            this.leftLeg.angle -= 0.25;
        }
    }

    show() {
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        strokeWeight(1);
        stroke(255);
        rectMode(CENTER);
        fill(this.r, this.g, this.b);
        rect(0, 0, this.size, this.size);
        pop();

        push();
        translate(this.leftLeg.position.x, this.leftLeg.position.y);
        rotate(this.leftLeg.angle);
        strokeWeight(1);
        rectMode(CENTER);
        stroke(255);
        fill(this.r, this.g, this.b);
        rect(0, 0, 10, 40);
        pop();

        push();
        translate(this.rightLeg.position.x, this.rightLeg.position.y);
        rotate(this.rightLeg.angle);
        strokeWeight(1);
        rectMode(CENTER);
        stroke(255);
        fill(this.r, this.g, this.b);
        rect(0, 0, 10, 40);
        pop();
    }
}
