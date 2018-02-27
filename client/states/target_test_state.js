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

  // const t = new Target({x:40,y:70},30);
  const t = targetManager.spawnNewTarget();
  const t1 = targetManager.spawnNewTarget();
  const t2 = targetManager.spawnNewTarget();

  world.targets = [t,t1,t2];

  world.targets.forEach((target) => {
    const node = new Node(undefined, root);
    target.sceneNode = node;
    node.data = target.draw;
    root.children.push(node);
  });
  world.score = 0;

  targetManager.onhit = (target) => {
    console.log("test");
    world.score += 100;
    target.sceneNode.remove();
  };
  targetManager.onmiss = (target) => {
    console.log("miss!");
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
