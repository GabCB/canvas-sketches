const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;
    //context.strokeStyle = 'white'; // color of stroke is set 'black' as default

    const w = width * 0.10; //10% of the total width of the canvas
    const h = height * 0.10; //10% of the total height of the canvas
    const gap = width * 0.03; //3% of the total width of the canvas
    const ix = width * 0.17; //17% of the total width of the canvas
    const iy = height * 0.17; //17% of the total height of the canvas
    const off = width * 0.02 // offset for smaller rectangle 2% of total width of the canvas
    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) { 
      x = ix + (w + gap)* i;
      y = iy + (h + gap)* j;

      context.beginPath();
      context.rect(x, y, w, h);
      context.stroke();
      
      if (Math.random () > 0.5) {
      context.beginPath();
      context.rect(x + off / 2, y + off / 2, w - off, h - off);
      context.stroke();
        }
      } 
    } 

  };
};

canvasSketch(sketch, settings);
