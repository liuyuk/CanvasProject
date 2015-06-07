var canvas;
var ctx;

var startingScore = 0;
var score;
var notover = true;

var bugWidth = 10;
var bugLength = 40;
var bugSpeed = generateSpeed();

var appleWidth = 40;
var appleLength = 40;

var apple = new Image();
apple.src = '/assets/apple.png';

var bugger = {
    width: bugWidth,
    length: bugLength,
    speed: bugSpeed,
    x: 400 * Math.random(),
    y: 0
};

var food = {
    width: appleWidth,
    length: appleLength,
    x: 150,
    y: 500
};

function generateSpeed() {
    var temp = Math.floor(Math.random() * 9 + 1);
    var ans = 0;
    if (temp <= 4) {
        ans = 60;
    }
    if (temp > 4 && temp <= 7) {
        ans = 75;
    }
    if (temp > 7) {
        ans = 150;
    }
    
    return ans;
}

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    requestAnimation();
}

function requestAnimation() {
    if (notover === true) {
        requestAnimationFrame(requestAnimation);
    }
    
    draw();
}

//function setBug(bugger) {
//    bugger.x = Math.random() * (ctx.width - bugWidth);
//    bugger.y = ctx.height - bugLength;
//}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.ellipse(bugger.x, bugger.y, bugger.width / 4, bugger.length / 4, 0, 0, Math.PI * 2);
    ctx.closePath();
    
    ctx.lineWidth = 4;
    ctx.strokeStyle = "Black";
    if (bugger.speed === 60) {
        ctx.fillStyle = "Orange";
    }
    if (bugger.speed === 75) {
        ctx.fillStyle = "Red";
    }
    if (bugger.speed === 150) {
        ctx.fillStyle = "Black"
    }
    ctx.stroke();
    ctx.fill();
    
    if (bugger.x < food.x) {
        bugger.x += (food.x + food.length - bugger.x) / ((food.y - bugger.y) / (bugger.speed * 0.06));
    }
    else if (bugger.x > food.x) {
        bugger.x -= (bugger.x - (food.x + food.length)) / ((food.y - bugger.y) / (bugger.speed * 0.06));
    }
    bugger.y += bugger.speed * 0.06;
    
    ctx.drawImage(apple, food.x, food.y, 40, 40);
}

init();