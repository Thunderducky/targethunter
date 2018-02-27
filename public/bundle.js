/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// this is a precise version
var ALPHABET_ARRAY = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(',');

var randomLetters = function randomLetters(length) {
  var myString = "";
  while (length > 0) {
    myString += pickOne(ALPHABET_ARRAY);
    length--;
  }
  return myString;
};

var pickOne = function pickOne(fromArray) {
  var index = Math.floor(Math.random() * fromArray.length);
  return fromArray[index];
};

var removeFromArray = function removeFromArray(item, arr) {
  var index = arr.indexOf(item);
  arr.splice(index, 1);
};

var lerpFloat = function lerpFloat(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
};
var lerpPoint = function lerpPoint(p0, p1, t) {
  return {
    x: lerpFloat(p0.x, p1.x, t),
    y: lerpFloat(p0.y, p1.y, t)
  };
};
var distance = function distance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};
// internal - adds only if that thing exists
var spottySum = function spottySum(a, b) {
  return b ? a + b : a;
};
var fpsCounter = {
  samples: new Array(100),
  index: 0,
  update: function update(gameTime) {
    this.index = (this.index + 1) % this.samples.length;
    this.samples[this.index] = gameTime.elapsed;
  },
  fps: function fps() {
    var avgTime = this.samples.reduce(spottySum, 0) / 100;
    return Math.round(1000 / avgTime);
  }
};

exports.lerpFloat = lerpFloat;
exports.lerpPoint = lerpPoint;
exports.distance = distance;
exports.fpsCounter = fpsCounter;
exports.randomLetters = randomLetters;
exports.removeFromArray = removeFromArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State() {
    var onUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (gameTime) {};
    var onDraw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (gameTime) {};
    var onEnter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (gameTime) {};
    var onExit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (gameTime) {};

    _classCallCheck(this, State);

    this.manager = null;
    this.onUpdate = onUpdate;
    this.onDraw = onDraw;
    this.onEnter = onEnter;
    this.onExit = onExit;
  }

  _createClass(State, [{
    key: "update",
    value: function update(gameTime) {
      this.onUpdate(gameTime);
    }
  }, {
    key: "draw",
    value: function draw(gameTime) {
      this.onDraw(gameTime);
    }
  }]);

  return State;
}();

var StateManager = function () {
  function StateManager(systems) {
    _classCallCheck(this, StateManager);

    this.current = new State();
    this.current.manager = this;
    this.next = null;

    // What systems
    this.systems = systems;
  }

  _createClass(StateManager, [{
    key: "setNext",
    value: function setNext(state) {
      this.next = state;
      this.next.manager = this;
    }
  }, {
    key: "update",
    value: function update(gameTime) {
      if (this.next) {
        this.current.onExit();
        this.current = this.next;
        this.current.onEnter();
        this.next = null;
      }
      this.current.update(gameTime);
    }
  }, {
    key: "draw",
    value: function draw(gameTime) {
      this.current.draw(gameTime);
    }
  }]);

  return StateManager;
}();

exports.State = State;
exports.StateManager = StateManager;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(canvas) {
    _classCallCheck(this, Renderer);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    // So we can treat it like a rectangle
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  _createClass(Renderer, [{
    key: "drawCircle",
    value: function drawCircle(_ref, radius) {
      var x = _ref.x,
          y = _ref.y;
      var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "red";

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Renderer;
}();

exports.Renderer = Renderer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depthFirstTreeTraverser = exports.Graph = exports.Node = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOOP = function NOOP() {};

function generateGraph(maxDepth, probabilityOfChildren) {
  var maxChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  // should be a number between [0,1)
  var poc = probabilityOfChildren;
  var root = new SceneNode();
  var generateLayer = function generateLayer(node, currentDepth) {
    if (currentDepth > maxDepth) {
      return;
    }
    var childCount = 0;
    while (childCount < maxChildren && Math.random() <= probabilityOfChildren) {
      console.log("test");
      var newChildNode = new SceneNode((0, _utils.randomLetters)(6), node);
      generateLayer(newChildNode, currentDepth + 1);
      node.children.push(newChildNode);
    }
  };
  generateLayer(root, 0);
  return root;
}

function depthFirstTreeTraverser(root) {
  var fnBefore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOOP;
  var fnAfter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOOP;

  var dftt = function dftt(node, depth, cbBefore, cbAfter) {
    cbBefore(node, depth);
    node.children.forEach(function (item) {
      dftt(item, depth + 1, cbBefore, cbAfter);
    });
    cbAfter(node, depth);
  };
  dftt(root, 0, fnBefore, fnAfter);
}

var Node = function () {
  function Node(data) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Node);

    this.data = data;
    this.parent = parent;
    this.children = [];
  }

  // TODO: optimize


  _createClass(Node, [{
    key: "remove",
    value: function remove() {
      (0, _utils.removeFromArray)(this, this.parent.children);
    }
  }]);

  return Node;
}();

;

var Graph = function Graph() {
  _classCallCheck(this, Graph);

  this.root = new Node();
};

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

exports.Node = Node;
exports.Graph = Graph;
exports.depthFirstTreeTraverser = depthFirstTreeTraverser;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TargetManager = exports.Target = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOOP = function NOOP() {};

// TODO: take out a bunch of the shape
// and vector commands and have them
// in their own files
// but they seem useful

// rh does not mutate the original

var Rectangle = function () {
  function Rectangle(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Rectangle);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  _createClass(Rectangle, [{
    key: "contains",
    value: function contains(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }
  }, {
    key: "center",
    get: function get() {
      return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      };
    }
  }]);

  return Rectangle;
}();

// TODO: parameterize these


var targetMargin = 50;
var canvasWidth = 500;
var canvasHeight = 300;

var p = function p(x, y) {
  return { x: x, y: y };
};
var unitize = function unitize(_ref3) {
  var x = _ref3.x,
      y = _ref3.y;

  var length = (x ** 2 + y ** 2) ** (1 / 2);
  return { x: x / length, y: y / length };
};
// inclusive, should only use integers
function pickInRange(a, b) {
  if (a == b) {
    return a;
  }
  // guarantee that c is lower than d
  var c = a < b ? a : b;
  var d = a < b ? b : a;
  return Math.floor(Math.random() * (Math.abs(d - c) + 1)) + c;
}
// point will be nudged SLIGHTLY inside
function pickPoint(rect) {
  var vertices = [p(rect.x, rect.y), p(rect.x + rect.width, rect.y), p(rect.x + rect.width, rect.y + rect.height), p(rect.x, rect.y + rect.height)];

  var index = Math.floor(Math.random() * 4);
  var indexPlus = (index + 1) % vertices.length;

  var p1 = vertices[index];
  var p2 = vertices[indexPlus];

  return p(pickInRange(p1.x, p2.x), pickInRange(p1.y, p2.y));
}

var Target = function () {
  function Target(_ref4, radius) {
    var x = _ref4.x,
        y = _ref4.y;

    var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { x: 0, y: 0 },
        vx = _ref5.x,
        vy = _ref5.y;

    _classCallCheck(this, Target);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.hit = false;
    this.alive = true;

    this.sceneNode = null;
    // let's bind draw
    this.draw = this.draw.bind(this);
  }

  _createClass(Target, [{
    key: "update",
    value: function update(gameTime) {
      this.x += this.vx * gameTime.elapsed / 1000;
      this.y += this.vy * gameTime.elapsed / 1000;
    }
  }, {
    key: "draw",
    value: function draw(renderer, gameTime) {
      renderer.drawCircle(this.center, this.radius, "red");
      renderer.drawCircle(this.center, this.radius * 0.66, "white");
      renderer.drawCircle(this.center, this.radius * 0.33, "red");
    }
  }, {
    key: "contains",
    value: function contains(point) {
      return (0, _utils.distance)(this, point) < this.radius;
    }
  }, {
    key: "center",
    get: function get() {
      return { x: this.x, y: this.y };
    }
  }]);

  return Target;
}();

// BUG: we are removing the wrong target when it crosses boundaries


var TargetManager = function () {
  function TargetManager() {
    _classCallCheck(this, TargetManager);

    // hardcoded
    this.bounds = new Rectangle({
      x: -targetMargin,
      y: -targetMargin,
      width: canvasWidth + 2 * targetMargin,
      height: canvasHeight + 2 * targetMargin
    });
    this.targets = [];
    this.onhit = NOOP; // (target) => {}
    this.onmiss = NOOP; // (target) => {}

    // this is used to pick a random spot to move the target towards
    this._inner = new Rectangle({
      x: targetMargin,
      y: targetMargin,
      width: canvasWidth - 2 * targetMargin,
      height: canvasHeight - 2 * targetMargin
    });
  }
  // DEBUG


  _createClass(TargetManager, [{
    key: "_DEBUG_AddTarget",
    value: function _DEBUG_AddTarget(t) {
      this.targets.push(t);
    }
  }, {
    key: "spawnNewTarget",
    value: function spawnNewTarget() {
      var speed = 100;
      var origin = pickPoint(this.bounds);
      var destination = pickPoint(this._inner);
      var move = unitize({
        x: destination.x - origin.x,
        y: destination.y - origin.y
      });
      move.x *= speed;
      move.y *= speed;
      var target = new Target(origin, 30, move);
      this.targets.push(target);
      return target;
    }
  }, {
    key: "processDeadTarget",
    value: function processDeadTarget(target) {
      console.log("test");
      target.hit ? this.onhit(target) : this.onmiss(target);
    }
  }, {
    key: "update",
    value: function update(gameTime) {
      var _this = this;

      // move targets
      this.targets.forEach(function (t) {
        t.update(gameTime);
        // we are out of bounds and should mark ourselves dead
        if (!_this.bounds.contains(t.center)) {
          console.log("out");
          t.alive = false;
        }
      });

      var deadTargets = this.targets.filter(function (t) {
        return !t.alive;
      });
      this.targets = this.targets.filter(function (t) {
        return t.alive;
      });
      if (deadTargets.length > 0) console.log(deadTargets);
      deadTargets.forEach(function (t) {
        return _this.processDeadTarget(t);
      });
    }
    //

  }, {
    key: "processClickPoint",
    value: function processClickPoint(point) {
      var hits = this.targets.filter(function (t) {
        return t.contains(point);
      });
      hits.forEach(function (t) {
        t.hit = true;
        t.alive = false;
      });
    }
  }]);

  return TargetManager;
}();

exports.Target = Target;
exports.TargetManager = TargetManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(6);

var _target_test_state = __webpack_require__(11);

//import { TestTimerState } from "./states/test_timer_state"
(0, _app.run)(_target_test_state.TargetTestState);

// import { test } from "./test"
// test();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _renderer = __webpack_require__(2);

var _engine = __webpack_require__(7);

var _utils = __webpack_require__(0);

var _state = __webpack_require__(1);

var _target = __webpack_require__(4);

// small functions to grab elements
function run(firstState) {
  var $ = function $(q) {
    return document.querySelector(q);
  };
  var $a = function $a(q) {
    return document.querySelectorAll(q);
  };

  var canvas = $("#gameCanvas");
  var engine = new _engine.Engine(canvas);

  engine.systems.stateManager.setNext(firstState);
  engine.start();
}
exports.run = run;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Engine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = __webpack_require__(8);

var _renderer = __webpack_require__(2);

var _state = __webpack_require__(1);

var _timer = __webpack_require__(9);

var _loop = __webpack_require__(10);

var _graph = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var traverser = _graph.depthFirstTreeTraverser;

var Engine = function () {
  function Engine(canvasTarget) {
    _classCallCheck(this, Engine);

    this.systems = {
      stateManager: null, // we will fill this in afterwards
      inputManager: new _input.InputManager(canvasTarget),
      timerManager: new _timer.TimerManager(),

      renderer: new _renderer.Renderer(canvasTarget),
      sceneGraph: new _graph.Graph(),
      world: {}
    };

    this.systems.stateManager = new _state.StateManager(this.systems);
    var stateManager = this.systems.stateManager;
    var inputManager = this.systems.inputManager;
    var timerManager = this.systems.timerManager;
    var renderer = this.systems.renderer;
    var graph = this.systems.sceneGraph;
    this._loop = new _loop.Loop(function (gameTime) {
      timerManager.update(gameTime);
      stateManager.update(gameTime);
      inputManager.clear();
    }, function (gameTime) {
      // shouldn't be used much?
      stateManager.draw(gameTime);

      renderer.clear();
      traverser(graph.root, function (node) {
        if (!node.data) return;
        node.data(renderer, gameTime);
      });
    });
  }

  _createClass(Engine, [{
    key: "start",
    value: function start() {
      this._loop.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      this._loop.stop();
    }
  }]);

  return Engine;
}();

exports.Engine = Engine;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// register the input, and then clear it
// out once it's been processed;
var calculateMousePosition = function calculateMousePosition(e) {
  // Relative canvas pieces
  var rect = e.target.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    time: window.performance.now()
  };
};

var InputManager = function () {
  function InputManager(target) {
    var _this = this;

    _classCallCheck(this, InputManager);

    this.target = target;
    this.target.onclick = function (e) {
      _this.clicks.push(calculateMousePosition(e));
    };

    this.clicks = [];
  }

  _createClass(InputManager, [{
    key: "clear",
    value: function clear() {
      this.clicks.length = 0;
    }
  }]);

  return InputManager;
}();

exports.InputManager = InputManager;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerManager = exports.Timer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer(fn, time) {
    var repeating = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var _manager = arguments[3];

    _classCallCheck(this, Timer);

    this.fn = fn;
    this.period = time;
    this.timeLeft = time;
    this.repeating = repeating;
    this.done = false;
    this._manager = _manager;
  }

  _createClass(Timer, [{
    key: "update",
    value: function update(gameTime) {
      this.timeLeft -= gameTime.elapsed;
      if (this.timeLeft < 0 && !this.done) {
        this.timeLeft = this.period;
        if (!this.repeating) {
          this.done = true;
        }
        // funciton has final say
        this.fn(gameTime, this);
      }
    }
    // We can remove ourselves early if we must,
    // however it will not resolve

  }, {
    key: "cancel",
    value: function cancel() {
      (0, _utils.removeFromArray)(this, this._manager.timers);
    }
  }]);

  return Timer;
}();

var TimerManager = function () {
  // Keep track of and remove unnecessary timers
  function TimerManager() {
    _classCallCheck(this, TimerManager);

    this.timers = [];
  }

  _createClass(TimerManager, [{
    key: "addTimer",
    value: function addTimer(fn, time) {
      var repeating = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var t = new Timer(fn, time, repeating, this);
      this.timers.push(t);
      return t;
    }
  }, {
    key: "update",
    value: function update(gameTime) {
      this.timers.forEach(function (t) {
        return t.update(gameTime);
      });
      this.timers = this.timers.filter(function (t) {
        return !t.done;
      });
    }
  }]);

  return TimerManager;
}();

exports.Timer = Timer;
exports.TimerManager = TimerManager;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/// NOTE: Loop handles onUpdate and onDraw
// Calculate times
var clock = function clock() {
  var lastClock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    now: window.performance.now(),
    elapsed: 0
  };

  var now = window.performance.now();
  return {
    now: now,
    elapsed: now - lastClock.now
  };
};

var Loop = function () {
  function Loop() {
    var onUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (gameTime) {};
    var onDraw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (gameTime) {};

    _classCallCheck(this, Loop);

    this.onUpdate = onUpdate;
    this.onDraw = onDraw;
    this._lastClock = null;
    this._started = false;
    this._runId = 0;
  }

  _createClass(Loop, [{
    key: "start",
    value: function start() {
      var _this = this;

      if (this._started) {
        // can't start without stopping -Sun Tzu -Micahel Scott
        return;
      }
      this._started = true;
      this._lastClock = clock();
      var loop = function loop() {
        var gameTime = clock(_this._lastClock);
        _this.onUpdate(gameTime);
        _this.onDraw(gameTime);
        _this._lastClock = gameTime;
        _this._runId = window.requestAnimationFrame(loop);
      };
      loop();
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this._started) {
        // can't stop before you start
        return;
      }
      this._started = false;
      window.cancelAnimationFrame(this._runId);
    }
  }]);

  return Loop;
}();

exports.Loop = Loop;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TargetTestState = undefined;

var _state = __webpack_require__(1);

var _target = __webpack_require__(4);

var _utils = __webpack_require__(0);

var _graph = __webpack_require__(3);

var traverser = _graph.depthFirstTreeTraverser;

var $ = function $(q) {
  return document.querySelector(q);
};
var targetManager = new _target.TargetManager();

function entered() {
  var world = this.manager.systems.world;
  var root = this.manager.systems.sceneGraph.root;
  world.targets = [];

  var timer = this.manager.systems.timerManager.addTimer(function () {
    var t = targetManager.spawnNewTarget();
    var node = new _graph.Node(t.draw, root);
    t.sceneNode = node;
    root.children.push(node);
    world.targets.push(t);
  }, 1000, true);

  world.score = 0;
  // const t = new Target({x:40,y:70},30);


  targetManager.onhit = function (target) {
    console.log("test");
    world.score += 100;
    target.sceneNode.remove();
  };
  targetManager.onmiss = function (target) {
    console.log("miss!");
    world.score -= 50;
    target.sceneNode.remove();
  };
}

function update(gameTime) {
  var world = this.manager.systems.world;
  var input = this.manager.systems.inputManager;

  input.clicks.forEach(function (clickPoint) {
    return targetManager.processClickPoint(clickPoint);
  });
  targetManager.update(gameTime);
}

function draw(gameTime) {
  var world = this.manager.systems.world;

  $("#score").innerText = world.score;
  _utils.fpsCounter.update(gameTime);
  $("#FPS").innerHTML = _utils.fpsCounter.fps();
}

var TargetTestState = new _state.State(update, draw, entered);

exports.TargetTestState = TargetTestState;

/***/ })
/******/ ]);