let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;
let Constraint = Matter.Constraint;

let engine;
let world;
let boundaries = [];

let total = 1;
let bodies = [];
let savedBodies = [];

let slider;
let reset;

function setup() {
    createCanvas(800, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    boundaries.push(new Boundary(width / 2, 400, width, 20, 0));
    frameRate(30);
    slider = createSlider(1, 10, 1);

    reset = createButton('reset');
    reset.mousePressed(resetEnv);

    for (let i = 0; i < total; ++i) {
        bodies.push(new Box());
    }
}

function resetEnv() {
    savedBodies = bodies;
    bodies = [];
    nextGen();
}

function draw() {
    for (let n = 0; n < slider.value(); ++n) {
        for (let index = 0; index < bodies.length; index++) {
            bodies[index].update();
            bodies[index].think();

            if (bodies[index].isDead() || bodies[index].score < 0) {
                bodies[index].removeFromWorld();
                savedBodies.push(bodies.splice(index, 1)[0]);
                --index;
            }
        }
        if (bodies.length === 0) {
            nextGen();
        }
    }

    background(51);

    bodies.forEach(body => {
        body.show();
    });

    boundaries.forEach(boundary => {
        boundary.show();
    });
}
