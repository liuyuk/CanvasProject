var canvas;
var ctx;

var startingScore = 0;
var score;
var over = 0;

var bugWidth = 10;
var bugLength = 40;
var bugSpeed = 0;
var buggers = [];
setInterval(addBug, 1000 + Math.random() * 2000);

var appleWidth = 40;
var appleLength = 40;

var countdown = 0;

var apple = new Image();
apple.src = 'assets/apple.png';

var score = 0;

var timer = 0;
setInterval(updateTimer, 1000);

function addBug() {
    
    bugSpeed = generateSpeed();

    var bugger = {
        width: bugWidth,
        length: bugLength,
        speed: bugSpeed,
        x: 400 * Math.random(),
        y: 40,
        score: generateScore(bugSpeed),
        dead: false
    };
    
    buggers.push(bugger);
}

var food = {
    width: appleWidth,
    length: appleLength,
    x: 200,
    y: 600
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

function generateScore(speed) {
    var temp = 0;
    if (speed === 60 || speed === 80){
        temp = 1
    } 
    
    if (speed === 75 || speed === 100){
        temp = 3
    }
    if (speed === 150 || speed === 200){
        temp = 5
    }
    
    return temp;
}

function updateTimer() {
    timer += 1   
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
            score += bugger.score;
            buggers.splice(p, 1);
        }
    }
        
    if (over === 1 | over === 2) {
        location.reload();
    }
                        
    }, false);
    
    if (over === 0) {
        requestAnimation();
    }
    
}

function requestAnimation() {
    
    if (over === 0) {
        requestAnimationFrame(requestAnimation);
    }
    
    var j;
    
    for (j = 0; j < buggers.length; j += 1) {
        if (detectCollision(buggers[j], food)) {
            over = 1;
        }
    }

    draw();
    
    if (over === 1) {
        ctx.font = "50px Times New Roman";
        ctx.fillStyle = "black";
        ctx.fillText("GAME OVER", 60, 350);
    }
    
    if (timer === 15) {
        ctx.font = "50px Times New Roman";
        ctx.fillStyle = "black";
        ctx.fillText("YOU WIN", 100, 350);
        
        over = 2;
    }
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
    
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(400, 30);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.closePath;
    
    for (k = 0; k < buggers.length; k += 1) {
        
        var bugger = buggers[k];

        if (bugger.dead === false) {

            ctx.beginPath();
            ctx.ellipse(bugger.x, bugger.y, bugger.width / 4, bugger.length / 4, 0, 0, Math.PI * 2);
            ctx.closePath();

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
    
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 300, 20);
    
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText("Timer: " + timer, 50, 20);
    
}

window.onload = init;
