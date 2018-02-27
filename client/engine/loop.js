/// NOTE: Loop handles onUpdate and onDraw
// Calculate times
const clock = (
  lastClock = {
    now: window.performance.now(),
    elapsed: 0
  }) => {
  const now = window.performance.now();
  return {
    now,
    elapsed: now - lastClock.now
  }
};

class Loop {
  constructor(
    onUpdate = gameTime => {},
    onDraw = gameTime => {}
  ){
    this.onUpdate = onUpdate;
    this.onDraw = onDraw;
    this._lastClock = null;
    this._started = false;
    this._runId = 0;
  }
  start(){
    if(this._started){
      // can't start without stopping -Sun Tzu -Micahel Scott
      return;
    }
    this._started = true;
    this._lastClock = clock();
    const loop = () => {
      const gameTime = clock(this._lastClock);
      this.onUpdate(gameTime);
      this.onDraw(gameTime);
      this._lastClock = gameTime;
      this._runId = window.requestAnimationFrame(loop);
    }
    loop();
  }
  stop(){
    if(!this._started){
      // can't stop before you start
      return;
    }
    this._started = false;
    window.cancelAnimationFrame(this._runId);
  }
}

export {Loop};
