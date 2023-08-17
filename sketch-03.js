const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: false//change to true to animate
};

/*const animate = () => {
  console.log('domestika');
  requestAnimationFrame(animate);
};
animate();*/ //Reference function to animate like the one from canva-sketch


const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

     //to draw lines
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) { //j=i+1 to start at 1
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue; //if distance is bigger then ignore the rest of the code inside the loop

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1) //when distance is 0, line with is 12, when distance is 200, line with is 1

        //to draw lines
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor (x, y) {
    this.x = x; //this means that we are referring to the scope of this class
    this.y = y;
    }

    getDistance(v) {//to draw lines between the agents that are close to each other
      const dx = this.x -v.x;
      const dy = this.y -v.y;
      return Math.sqrt(dx * dx + dy * dy); //Pythagorean Theorem
    }
}

class Agent {
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1)); //to make the dots move
    this.radius = random.range(4, 12);
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  update() { //to add the velocity to the position
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    //context.fillStyle = 'purple';
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
