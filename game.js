var canvas;
var ctx;

var startingScore = 0;
var score;
var notover;

var bugWidth = 10;
var bugLength = 40;
var bugSpeed = 60;

var appleWidth = 40;
var appleLength = 40;

var apple = new Image();
apple.src = '/assets/apple.png';

var x = 150;
var y = 0;
var dx = 2;
var dy = 4;

var bugger = {
    width: bugWidth,
    length: bugLength,
    speed: bugSpeed
};

var food = {
    width: appleWidth,
    length: appleLength
};

function init() {
    canvas = document.getElementById("myCanvas")
    ctx = canvas.getContext("2d");
    return setInterval(draw, 40);
}

function setBug(bugger) {
    "use strict";
    bugger.x = Math.random() * (ctx.width - bugWidth);
    bugger.y = ctx.height - bugLength;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    y += dy;
    
    ctx.drawImage(apple, 150, 500, food.width, food.length);
}

init();