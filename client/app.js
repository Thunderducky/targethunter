import { Renderer }  from "./engine/renderer"
import { Engine } from "./engine"
import { distance, fpsCounter } from "./utils"
import { State, StateManager } from "./engine/state"
import { Target } from "./entities/target"

// small functions to grab elements
function run(firstState){
  const $ = (q) => document.querySelector(q);
  const $a = (q) => document.querySelectorAll(q);

  const canvas = $("#gameCanvas");
  const engine = new Engine(canvas);

  engine.systems.stateManager.setNext(firstState);
  engine.start();
}
export { run };
