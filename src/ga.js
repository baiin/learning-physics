let gens = 0;

function nextGen() {
    calculateFitness();

    for (let i = 0; i < total; ++i) {
        bodies[i] = selectPlayer();
    }

    let sum = 0;
    let len = savedBodies.length;
    for (let i = 0; i < total; ++i) {
        sum += savedBodies[i].score;
        savedBodies[i].dispose();
    }

    ++gens;

    let avg = parseFloat(sum / len).toFixed(2);
    console.log(`gen ${gens} - ${avg}`);
    savedBodies = [];
}

function selectPlayer() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedBodies[index].fitness;
        index++;
    }
    index--;
    let body = savedBodies[index];
    let child = new Box(body.brain);
    child.mutate();

    return child;
}

function calculateFitness() {
    let sum = 0;

    for (let body of savedBodies) {
        sum += body.score;
    }

    for (let body of savedBodies) {
        body.fitness = body.score / sum;
    }
}
