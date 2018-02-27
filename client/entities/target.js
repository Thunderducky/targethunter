import { distance } from "../utils"

const NOOP = () => {};

// TODO: take out a bunch of the shape
// and vector commands and have them
// in their own files
// but they seem useful

// rh does not mutate the original

class Rectangle {
  constructor({x,y,width,height}){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get center(){
    return {
      x: this.x + this.width/2,
      y: this.y + this.height/2
    }
  }

  contains({x,y}){
    return (
      this.x <= x && x <= this.x + this.width &&
      this.y <= y && y <= this.y + this.height
    );
  }
}

// TODO: parameterize these
const targetMargin = 50;
const canvasWidth = 500;
const canvasHeight = 300;


const p = (x,y) => {return {x,y}}
const unitize = ({x,y}) => {
  const length = (x**2 + y**2)**(1/2);
  return {x:x/length, y:y/length};
}
// inclusive, should only use integers
function pickInRange(a, b){
  if(a == b){
    return a;
  }
  // guarantee that c is lower than d
  const c = a < b ? a : b;
  const d = a < b ? b: a;
  return Math.floor(Math.random() * (Math.abs(d-c) + 1)) + c;
}
// point will be nudged SLIGHTLY inside
function pickPoint(rect){
  const vertices = [
    p(rect.x, rect.y),
    p(rect.x + rect.width, rect.y),
    p(rect.x + rect.width, rect.y + rect.height),
    p(rect.x, rect.y + rect.height)
  ];

  const index = Math.floor(Math.random()*4);
  const indexPlus = (index + 1) % vertices.length;

  const p1 = vertices[index];
  const p2 = vertices[indexPlus];

  return p(pickInRange(p1.x, p2.x), pickInRange(p1.y, p2.y));
}

class Target {
  constructor({x,y}, radius, {x:vx, y:vy} = {x:0, y:0}){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.hit = false;
    this.alive = true;

    this.sceneNode = null;
    // let's bind draw
    this.draw = this.draw.bind(this);
  }
  get center() {
    return {x: this.x, y: this.y};
  }

  update(gameTime){
    this.x += this.vx * gameTime.elapsed / 1000;
    this.y += this.vy * gameTime.elapsed / 1000;
  }

  draw(renderer, gameTime){
    renderer.drawCircle(this.center, this.radius, "red");
    renderer.drawCircle(this.center, this.radius*0.66, "white");
    renderer.drawCircle(this.center, this.radius*0.33, "red");
  }

  contains(point){
    return distance(this, point) < this.radius;
  }
}

// BUG: we are removing the wrong target when it crosses boundaries
class TargetManager {
  constructor(){
    // hardcoded
    this.bounds = new Rectangle({
      x:-targetMargin,
      y:-targetMargin,
      width: canvasWidth + 2 * targetMargin,
      height:canvasHeight + 2 * targetMargin
    });
    this.targets = [];
    this.onhit = NOOP; // (target) => {}
    this.onmiss = NOOP; // (target) => {}

    // this is used to pick a random spot to move the target towards
    this._inner = new Rectangle({
      x:targetMargin,
      y:targetMargin,
      width: canvasWidth - 2 * targetMargin,
      height:canvasHeight - 2 * targetMargin
    });
  }
  // DEBUG
  _DEBUG_AddTarget(t){
    this.targets.push(t);
  }
  spawnNewTarget(){
    const speed = 12;
    const origin = pickPoint(this.bounds);
    const destination = pickPoint(this._inner);
    const move = unitize({
      x:destination.x - origin.x,
      y:destination.y - origin.y
    })
    move.x *= speed;
    move.y *= speed;
    const target = new Target(origin, 30, move);
    this.targets.push(target)
    return target;
  }
  processDeadTarget(target){
    console.log("test");
    target.hit
      ? this.onhit(target)
      : this.onmiss(target);
  }

  update(gameTime){
    // move targets
    this.targets.forEach(
      t => {
        t.update(gameTime);
        // we are out of bounds and should mark ourselves dead
        if(!this.bounds.contains(t.center)){
          console.log("out");
          t.alive = false;
        }
      }
    );

    const deadTargets = this.targets.filter(t => !t.alive);
    this.targets = this.targets.filter(t => t.alive);
    if(deadTargets.length > 0)
    console.log(deadTargets);
    deadTargets.forEach(t => this.processDeadTarget(t));
  }
  //
  processClickPoint(point){
    const hits = this.targets.filter(t => t.contains(point));
    hits.forEach(t => {
      t.hit = true;
      t.alive = false;
    });
  }
}

export { Target, TargetManager }
