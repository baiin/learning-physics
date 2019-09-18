let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;
let Body = Matter.Body;

let engine;
let world;
let boxes = [];
let ground;

function mouseDragged() {
  boxes.push(new Box(mouseX, mouseY, 20, 20));
}

function mousePressed() {
  let vector = { x: mouseX, y: mouseY };
  let force = { x: 0.05, y: -0.08 };
  Body.applyForce(tester.body, vector, force);
}

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  tester = new Box(100, 100, 20, 100);
  ground = Bodies.rectangle(200, height, width - 40, 20, { isStatic: true });
  World.add(world, [tester, ground]);

  console.log(ground);
}

function draw() {
  background(51);

  for (let i = 0; i < boxes.length; ++i) {
    boxes[i].show();
  }

  tester.show();

  stroke(255);
  fill(170);
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width - 40, 20);
}
