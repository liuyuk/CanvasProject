var ctx = document.getElementById("myCanvas").getContext("2d");

var startingScore = 0;
var score;
var notover;

var bugWidth = 10;
var bugLength = 40;
var bugSpeed = 60;

var bugger = {
    width: bugWidth,
    length: bugLength,
    speed: bugSpeed
};

function setBug(bugger) {
    "use strict";
    bugger.x = Math.random() * (ctx.width - bugWidth);
    bugger.y = ctx.height - bugLength;
}