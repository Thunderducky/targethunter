import {randomLetters, removeFromArray } from "../utils"

const NOOP = () => {};

function generateGraph(maxDepth, probabilityOfChildren, maxChildren = 2){
  // should be a number between [0,1)
  const poc = probabilityOfChildren;
  const root = new SceneNode();
  const generateLayer = (node, currentDepth) => {
    if(currentDepth > maxDepth){
      return;
    }
    let childCount = 0;
    while(childCount < maxChildren && Math.random() <= probabilityOfChildren){
      console.log("test");
      const newChildNode = new SceneNode(randomLetters(6), node);
      generateLayer(newChildNode, currentDepth + 1);
      node.children.push(newChildNode);
    }
  }
  generateLayer(root, 0);
  return root;
}

function depthFirstTreeTraverser(root, fnBefore = NOOP, fnAfter = NOOP) {
  const dftt = (node, depth, cbBefore, cbAfter) => {
    cbBefore(node, depth);
    node.children.forEach((item) => {
      dftt(item, depth + 1, cbBefore, cbAfter)
    });
    cbAfter(node, depth);
  }
  dftt(root, 0, fnBefore, fnAfter);
}

class Node {
  constructor(data, parent = null){
    this.data = data;
    this.parent = parent;
    this.children = [];
  }

  // TODO: optimize
  remove(){
    removeFromArray(this, this.parent.children);
  }
};

class Graph {
  constructor(){
    this.root = new Node();
  }
}

// const root = generateGraph(3, 0.5);
// console.log(root);
//
// depthFirstTreeTraverser(root,
//   (node, depth) => {
//     console.log(depth, node.data)
//   },
//   (node, depth) => {
//     console.log(depth, node.data)
//   }
// );

export {Node, Graph, depthFirstTreeTraverser}
