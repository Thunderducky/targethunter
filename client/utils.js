// this is a precise version
const ALPHABET_ARRAY = ("a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z").split(',');

const randomLetters = (length) => {
  let myString = "";
  while(length > 0){
    myString += pickOne(ALPHABET_ARRAY);
    length--;
  }
  return myString;
}

const pickOne = (fromArray) => {
  const index = Math.floor(Math.random() * fromArray.length);
  return fromArray[index];
}

const removeFromArray = (item, arr) => {
  const index = arr.indexOf(item);
  arr.splice(index, 1);
}

const lerpFloat = (v0,v1,t) => {
  return (1-t)*v0 + t*v1;
};
const lerpPoint = (p0, p1, t) => {
  return {
    x: lerpFloat(p0.x, p1.x, t),
    y: lerpFloat(p0.y, p1.y, t)
  }
};
const distance = (p1, p2) => {
  return Math.sqrt(
    (p2.x - p1.x)**2 +
    (p2.y - p1.y)**2
  );
};
// internal - adds only if that thing exists
const spottySum = (a,b) => {
  return b ? a + b: a;
}
const fpsCounter = {
  samples: new Array(100),
  index: 0,
  update: function(gameTime){
    this.index = (this.index + 1) % this.samples.length;
    this.samples[this.index] = gameTime.elapsed;
  },
  fps:function(){
    const avgTime = this.samples.reduce(spottySum, 0)/100;
    return Math.round(1000/avgTime);
  }
};

export {
  lerpFloat,
  lerpPoint,
  distance,
  fpsCounter,
  randomLetters,
  removeFromArray
}
