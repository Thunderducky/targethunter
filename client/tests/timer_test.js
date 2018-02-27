import { Loop } from "../engine/loop"
import { Timer, TimerManager } from "../engine/timer"
// TODO: Decide if timers repeat themselves or we'll
// break out step sizes in the loop, which
// at some level sets the minimum time for our repeating
// events

// Remake these as promises?

const logTest = (gameTime) => console.log(gameTime, "qxc");
const logTest2 = (gameTime) => console.log(gameTime, "qxc2");

function timerTest(){
  const tm = new TimerManager();
  tm.addTimer(logTest, 500, true);
  tm.addTimer(logTest2, 400, true);
  const loop = new Loop();
  loop.onUpdate = (gameTime) => {
    tm.update(gameTime);
  }
  loop.start();
}

export { timerTest }
