const $ = (q) => document.querySelector(q);
const $a = (q) => document.querySelectorAll(q);

const canvas = $("#gameCanvas");
const ctx = canvas.getContext("2d");

// this is a precise version
const lerpFloat = (v0,v1,t) => {
  return (1-t)*v0 + t*v1;
};
const lerpPoint = (p0, p1, t) => {
  return {
    x: lerpFloat(p0.x, p1.x, t),
    y: lerpFloat(p0.y, p1.y, t)
  }
};

// might need variation and joining in the future
const {width:canvasW, height:canvasH} = canvas;

// convenience shortcut function
const clearCanvas = () => {
  ctx.clearRect(0,0,canvasW, canvasH);
}

const drawCircle = ({x:centerX,y:centerY}, radius = 70, color="red") => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

const drawTarget = (center, radius = 70) => {
  drawCircle(center, radius, "red");
  drawCircle(center, radius*0.66, "white");
  drawCircle(center, radius*0.33, "red");
};

const distance = (p1, p2) => {
  return Math.sqrt(
    (p2.x - p1.x)**2 +
    (p2.y - p1.y)**2
  );
}

class Target {
  constructor({x,y},radius){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
  }

  update(t){
    this.x += this.vx * t;
    this.y += this.vy * t;
  }
  draw(){
    drawTarget(this, this.radius);
  }
  contains(p){
    // let's figure out length
    return distance(p, this) < this.radius;
  }
}



// Let's move and do a very small linear movement first
// Then let's check for clicks
// Let's attach a linear path of movement


const t = new Target({x:40,y:70},30);
const t1 = new Target({x:110,y:70},30);
const t2 = new Target({x:180,y:70},30);

  // t.vx = 1.5;
  //
  // t1.vx = 1;
  // t1.vy = 0.5;
  //
  // t2.vx = 0.5;
  // t2.vy = -0.1;

// Physics movement, as opposed to planned movement

const world = {
  targets : [t,t1,t2]
}

const getMousePosition = (e) => {
  // Relative canvas pieces
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
let score = 0;
const updateScore = () => {
  $("#score").innerText = score;
}
const testClicks = (e) => {
  const clickPoint = getMousePosition(e);
  // register clicks instead
  world.targets.forEach(t => {
    if(t.contains(clickPoint)){
      console.log("Hit!");
      score += 100;
      updateScore();
    }
  })
}

canvas.onclick = testClicks;

clearCanvas();
const update = () => {
  // move the targets
  // test picks, and eliminate them
  world.targets.forEach(t => {
    t.update(0.1);
  });
  // eliminate any that are outside the "killBox"
}
const draw = () => {
  clearCanvas();
  world.targets.forEach(t => t.draw());
}

setInterval(()=>{
  update();
  draw();
}, 10)



// let's get the canvas
