import { removeFromArray } from "../utils"

class Timer {
  constructor(fn, time, repeating = false, _manager){
    this.fn = fn;
    this.period = time;
    this.timeLeft = time;
    this.repeating = repeating;
    this.done = false;
    this._manager = _manager;
  }
  update(gameTime){
    this.timeLeft -= gameTime.elapsed;
    if(this.timeLeft < 0 && !this.done){
      this.timeLeft = this.period;
      if(!this.repeating){
        this.done = true;
      }
      // funciton has final say
      this.fn(gameTime, this);
    }
  }
  // We can remove ourselves early if we must,
  // however it will not resolve
  cancel(){
    removeFromArray(this, this._manager.timers);
  }
}
class TimerManager {
  // Keep track of and remove unnecessary timers
  constructor(){
    this.timers = [];
  }
  addTimer(fn, time, repeating = false){
    const t = new Timer(fn, time, repeating, this);
    this.timers.push(t);
    return t;
  }
  update(gameTime){
    this.timers.forEach(t => t.update(gameTime));
    this.timers = this.timers.filter(t => !t.done);
  }

}

export { Timer, TimerManager }
