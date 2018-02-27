class State {
  constructor(
    onUpdate = gameTime => {},
    onDraw = gameTime => {},
    onEnter = gameTime => {},
    onExit = gameTime => {}
  ){
    this.manager = null;
    this.onUpdate = onUpdate;
    this.onDraw = onDraw;
    this.onEnter = onEnter;
    this.onExit = onExit;
  }
  update(gameTime){
    this.onUpdate(gameTime);
  }
  draw(gameTime){
    this.onDraw(gameTime);
  }
}

class StateManager {
  constructor(systems){
    this.current = new State();
    this.current.manager = this;
    this.next = null;

    // What systems
    this.systems = systems;
  }

  setNext(state){
    this.next = state;
    this.next.manager = this;
  }

  update(gameTime){
    if(this.next){
      this.current.onExit();
      this.current = this.next;
      this.current.onEnter();
      this.next = null;
    }
    this.current.update(gameTime);
  }
  draw(gameTime){
    this.current.draw(gameTime);
  }
}

export {State, StateManager}
