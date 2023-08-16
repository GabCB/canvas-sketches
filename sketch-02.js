const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

/*const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
}

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;

};*/ //Funciones creadas manualmente. Estas funciones están incluidas en la biblioteca de canvas-sketch-util

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle= 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    //const num = 12; //this const determines the numbers of dashes
    const num = 40;//to increase the number of slices
    const radius = width * 0.3;
    //const radius = width * 0.8; //to increease the radio and fill the canva
    let x, y;

   for (let i = 0; i < num; i++) {
    const slice = math.degToRad(360 / num);
    const angle = slice * i; // angle from 0 , 30, 60 ,90 , etc

    x = cx + radius * Math.sin(angle);
    //x = 0 + radius * Math.sin(angle);//to vary the starting point
    y = cy + radius * Math.cos(angle);
    //y = 0 + radius * Math.cos(angle);//to vary the starting point

    context.save();
    context.translate(x, y);
    context.rotate(-angle); // - to rotate the dash like in the hours in a clock
    //context.scale(1, 1); // the first value, changes the x and the second changes the y
    //context.scale(random.range(1, 3), 1); // the random.Range formula is to give a range of parameters
    context.scale(random.range(0.1, 2), random.range(0.2, 0.5)); //to vary wthe thicknes of the dashes

    context.beginPath();
    //context.rect(-w * 0.5,-h * 0.5, w, h);
    context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h); //to offset the dashes
    context.fill();
    context.restore();

    // code to draw the arcs
    context.save();
    context.translate(cx, cy);
    //context.translate(0, 0); //to move the arc at the beginning of canva
    context.rotate(-angle);

    //context.lineWidth = 20;
    context.lineWidth = random.range(5, 20); //to vary wthe thicknes of the arcs

    context.beginPath();
    //context.arc(0, 0, radius, 0, slice * 0.6); //to make the lines shorter, we change the ending angle to a value < 1
    //context.arc(0, 0, radius, slice * -0.3, slice * 0.3);
    //context.arc(0, 0, random.range(radius * 0.7, radius * 1.3), slice * -0.3, slice * 0.3);//to offset the arcs
    //context.arc(0, 0, radius * random.range(0.7, 1.3), slice * -0.3, slice * 0.3);//same formula as the one above
    //context.arc(0, 0, random.range(radius * 0.7, radius * 1.3), slice * random.range(0, - 0.5), slice * random.range(0, 0.5));//to add randomness to start and ending angles
    context.arc(0, 0, random.range(radius * 0.7, radius * 1.3), slice * random.range(1, -8), slice * random.range(1, 5));//to exagerate the arcs
    
    context.stroke();

    context.restore();

   }


    //context.translate(100, 400);

    //context.beginPath();
    //context.arc(0, 0, 50, 0, Math.PI * 2);
    //context.fill();

  };
};

canvasSketch(sketch, settings);
