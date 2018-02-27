class Renderer {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    // So we can treat it like a rectangle
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  drawCircle({x,y}, radius, color="red"){
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2*Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  clear(){
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}

export { Renderer }
