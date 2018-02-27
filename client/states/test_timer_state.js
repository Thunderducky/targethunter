import { State } from "../engine/state"

function entered(){
  console.log("Entered Start");
  const tm = this.manager.systems.timerManager;
  const t1 = tm.addTimer(() => {
    console.log("test");
  }, 500, true)
}

function update(gameTime){
  const tm = this.manager.systems.timerManager;
  tm.update(gameTime);
}

function draw(gameTime){

}

const TestTimerState = new State(
  update,
  draw,
  entered
);

export { TestTimerState }
