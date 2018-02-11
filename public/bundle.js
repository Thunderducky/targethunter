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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = function $(q) {
  return document.querySelector(q);
};
var $a = function $a(q) {
  return document.querySelectorAll(q);
};

var canvas = $("#gameCanvas");
var ctx = canvas.getContext("2d");

// this is a precise version
var lerpFloat = function lerpFloat(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
};
var lerpPoint = function lerpPoint(p0, p1, t) {
  return {
    x: lerpFloat(p0.x, p1.x, t),
    y: lerpFloat(p0.y, p1.y, t)
  };
};

// might need variation and joining in the future
var canvasW = canvas.width,
    canvasH = canvas.height;

// convenience shortcut function

var clearCanvas = function clearCanvas() {
  ctx.clearRect(0, 0, canvasW, canvasH);
};

var drawCircle = function drawCircle(_ref) {
  var centerX = _ref.x,
      centerY = _ref.y;
  var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 70;
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "red";

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

var drawTarget = function drawTarget(center) {
  var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 70;

  drawCircle(center, radius, "red");
  drawCircle(center, radius * 0.66, "white");
  drawCircle(center, radius * 0.33, "red");
};

var distance = function distance(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

var Target = function () {
  function Target(_ref2, radius) {
    var x = _ref2.x,
        y = _ref2.y;

    _classCallCheck(this, Target);

    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
  }

  _createClass(Target, [{
    key: "update",
    value: function update(t) {
      this.x += this.vx * t;
      this.y += this.vy * t;
    }
  }, {
    key: "draw",
    value: function draw() {
      drawTarget(this, this.radius);
    }
  }, {
    key: "contains",
    value: function contains(p) {
      // let's figure out length
      return distance(p, this) < this.radius;
    }
  }]);

  return Target;
}();

// Let's move and do a very small linear movement first
// Then let's check for clicks
// Let's attach a linear path of movement


var t = new Target({ x: 40, y: 70 }, 30);
var t1 = new Target({ x: 110, y: 70 }, 30);
var t2 = new Target({ x: 180, y: 70 }, 30);

// t.vx = 1.5;
//
// t1.vx = 1;
// t1.vy = 0.5;
//
// t2.vx = 0.5;
// t2.vy = -0.1;

// Physics movement, as opposed to planned movement

var world = {
  targets: [t, t1, t2]
};

var getMousePosition = function getMousePosition(e) {
  // Relative canvas pieces
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};
var score = 0;
var updateScore = function updateScore() {
  $("#score").innerText = score;
};
var testClicks = function testClicks(e) {
  var clickPoint = getMousePosition(e);
  // register clicks instead
  world.targets.forEach(function (t) {
    if (t.contains(clickPoint)) {
      console.log("Hit!");
      score += 100;
      updateScore();
    }
  });
};

canvas.onclick = testClicks;

clearCanvas();
var update = function update() {
  // move the targets
  // test picks, and eliminate them
  world.targets.forEach(function (t) {
    t.update(0.1);
  });
  // eliminate any that are outside the "killBox"
};
var draw = function draw() {
  clearCanvas();
  world.targets.forEach(function (t) {
    return t.draw();
  });
};

setInterval(function () {
  update();
  draw();
}, 10);

// let's get the canvas

/***/ })
/******/ ]);