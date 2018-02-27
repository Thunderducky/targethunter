// register the input, and then clear it
// out once it's been processed;
const calculateMousePosition = (e) => {
  // Relative canvas pieces
  const rect = e.target.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    time: window.performance.now()
  };
}

class InputManager {
  constructor(target){
    this.target = target;
    this.target.onclick = (e) => {
      this.clicks.push(calculateMousePosition(e));
    };

    this.clicks = [];
  }
  clear(){
    this.clicks.length = 0;
  }
}

export {InputManager}
