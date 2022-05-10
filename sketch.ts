var colorInc = 0.4;  
var sat = 100; 
var brt = 100; 
var alph = 10;
var numbPart = 300;
var partStroke = 0.2; 
var angMult = 50;
var angTurn = 10; 
var zOffInc = 0.0003; 
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var hu = 0;
var p = 1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,400, 100, 0, 0);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < numbPart; i++) {
    particles[i] = new Particle();
  }
  background(51);
}

function draw() {
  if (p>0){
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)*angMult+angTurn;  
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;

    zoff += zOffInc;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  hu +=colorInc; if (hu >359){hu=0}
}
}
function mousePressed(){
  p=p*-1;
}

function keyTyped() {
  if (key === "s") {
    save("myCanvas.jpg");
  }
}
