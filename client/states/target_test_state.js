import { State } from "../engine/state"
import { TargetManager, Target } from "../entities/target"
import { distance, fpsCounter } from "../utils"

import { Node, depthFirstTreeTraverser } from "../engine/graph"
const traverser = depthFirstTreeTraverser;

const $ = (q) => document.querySelector(q);
const targetManager = new TargetManager();

function entered(){
  const world = this.manager.systems.world;
  const root = this.manager.systems.sceneGraph.root;
  world.targets = [];

  const timer = this.manager.systems.timerManager.addTimer(() => {
    const t = targetManager.spawnNewTarget();
    const node = new Node(t.draw, root);
    t.sceneNode = node;
    root.children.push(node);
    world.targets.push(t);
  }, 1000, true);

  world.score = 0;
  // const t = new Target({x:40,y:70},30);


  targetManager.onhit = (target) => {
    console.log("test");
    world.score += 100;
    target.sceneNode.remove();
  };
  targetManager.onmiss = (target) => {
    console.log("miss!");
    world.score -= 50;
    target.sceneNode.remove();
  }
}

function update(gameTime){
  const world = this.manager.systems.world;
  const input = this.manager.systems.inputManager;

  input.clicks.forEach((clickPoint) => targetManager.processClickPoint(clickPoint));
  targetManager.update(gameTime);
}

function draw(gameTime){
  const world = this.manager.systems.world;

  $("#score").innerText = world.score;
  fpsCounter.update(gameTime);
  $("#FPS").innerHTML = fpsCounter.fps();
}

const TargetTestState = new State(
  update,
  draw,
  entered
);

export { TargetTestState }
