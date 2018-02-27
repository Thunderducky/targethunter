import { InputManager } from "./input"
import { Renderer } from "./renderer"
import { StateManager } from "./state"
import { TimerManager } from "./timer"

import { Loop } from "./loop"
import { Graph, depthFirstTreeTraverser } from "./graph"
const traverser = depthFirstTreeTraverser;

class Engine {
  constructor(canvasTarget){
    this.systems = {
      stateManager: null, // we will fill this in afterwards
      inputManager: new InputManager(canvasTarget),
      timerManager: new TimerManager(),

      renderer: new Renderer(canvasTarget),
      sceneGraph: new Graph(),
      world: {}
    };

    this.systems.stateManager = new StateManager(this.systems);
    const stateManager = this.systems.stateManager;
    const inputManager = this.systems.inputManager;
    const timerManager = this.systems.timerManager;
    const renderer = this.systems.renderer;
    const graph = this.systems.sceneGraph;
    this._loop = new Loop(
      gameTime => {
        timerManager.update(gameTime);
        stateManager.update(gameTime)
        inputManager.clear();
      },
      gameTime => {
        // shouldn't be used much?
        stateManager.draw(gameTime)

        renderer.clear();
        traverser(graph.root, (node) => {
          if(!node.data) return;
          node.data(renderer, gameTime);
        });
      }
    );
  }
  start(){
    this._loop.start();
  }
  stop(){
    this._loop.stop();
  }
}

export { Engine };
