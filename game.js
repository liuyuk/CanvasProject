var canvas;
var ctx;

var startingScore = 0;
var score;
var notover = false;

var bugWidth = 10;
var bugLength = 40;
var bugSpeed = 0;
var buggers = [];
setInterval(addBug, 3000);

var appleWidth = 40;
var appleLength = 40;

var countdown = 0;

var apple = new Image();
apple.src = '/assets/apple.png';

function addBug() {

    var bugger = {
        width: bugWidth,
        length: bugLength,
        speed: generateSpeed(),
        x: 400 * Math.random(),
        y: 0,
        dead: false
    };
    
    buggers.push(bugger);
}

var food = {
    width: appleWidth,
    length: appleLength,
    x: 200,
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
    
    document.addEventListener('mousedown', function (event) {

    var mousePosition = getMousePos(canvas, event);
    var mouseX = mousePosition.x;
    var mouseY = mousePosition.y;
        
    var p;
        
    for (p = 0; p < buggers.length; p += 1){
        
        var bugger = buggers[p];
        if (mouseInBug(mouseX, mouseY, bugger.x, bugger.y, bugger.width, bugger.length)) {
            bugger.dead = true;
            buggers.splice(p, 1);
        }
    }
                        
    }, false);
    
    if (notover === false) {
        requestAnimation();
    }
}

function requestAnimation() {
    
    if (notover === false) {
        requestAnimationFrame(requestAnimation);
    }
    
    var j;
    
    for (j = 0; j < buggers.length; j += 1) {
        if (detectCollision(buggers[j], food)) {
            notover = true;
        }
    }

    draw();
}

function mouseInBug(mx, my, bx, by, bw, bl) {
    var dx = mx - bx;
    var dy = my - by;
    
    return (dx * dx + dy * dy <= bw * bl);
}

function getMousePos(canvas, evt) {
    var r = canvas.getBoundingClientRect();
    
    return {
        x: evt.clientX - r.left,
        y: evt.clientY - r.top
    };
}

function detectCollision(a, b) {
    return (b.y < a.y);
}

function draw() {
    var k;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (k = 0; k < buggers.length; k += 1) {
        
        var bugger = buggers[k];

        if (bugger.dead === false) {

            ctx.beginPath();
            ctx.ellipse(bugger.x, bugger.y, bugger.width / 4, bugger.length / 4, 0, 0, Math.PI * 2);
            ctx.closePath();

            ctx.lineWidth = 4;
            if (bugger.speed === 60) {
                ctx.fillStyle = "Orange";
            }
            if (bugger.speed === 75) {
                ctx.fillStyle = "Red";
            }
            if (bugger.speed === 150) {
                ctx.fillStyle = "Black";
            }
            ctx.stroke();
            ctx.fill();

            if (bugger.x < food.x) {
                bugger.x += (food.x + food.length - bugger.x) / ((food.y - bugger.y) / (bugger.speed * 0.06));
            }
            if (bugger.x > food.x) {
                bugger.x -= (bugger.x - (food.x + food.length)) / ((food.y - bugger.y) / (bugger.speed * 0.06));
            }
            bugger.y += bugger.speed * 0.06;

        }
        
    }
    
    ctx.drawImage(apple, food.x, food.y, 40, 40);
    
}

window.onload = init;
