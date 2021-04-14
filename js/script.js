import Player from '/game1backup/js/player.js';
import { Tower, handleTowers } from '/game1backup/js/tower.js';
import { handleCollisions } from '/game1backup/js/collisions.js';
import { init } from '/game1backup/js/start.js';

let canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const sprite = new Image();
sprite.src = 'img/animsheet.png';
const logo = new Image();
logo.src = 'img/logo.png';
const pubLogo = new Image();
pubLogo.src = 'img/505-logo.png';

let mouseDown = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;
let level = 0;
let gameStatus = 'start';
let highScore = localStorage.getItem('birdyScore');
if (!highScore) {
    highScore = 0;
}



const player = new Player();
let towers = [];


const background1 = new Image();
const background2 = new Image();

background1.src = 'img/bg1.jpg';
background2.src = 'img/bg2.jpg';


const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function start() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.vy = 0;
    player.y = 200;
    console.log(player);
    mouseDown = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;
    gameSpeed = 2;
    level = 0;
    towers = [];
    gameStatus = 'running';
    highScore = localStorage.getItem('birdyScore');
    animate();
}

function handleBackground(speed) {
    if (BG.x1 <= -BG.width + (gameSpeed + level)) {
        BG.x1 = BG.x2 + (BG.width - speed);
    } else {
        BG.x1 -= (speed - 1);
    }
    if (BG.x2 <= -BG.width + (gameSpeed + level)) {
        BG.x2 = BG.x1 + BG.width;
    } else {
        BG.x2 -= (speed - 1);
    }
    ctx.drawImage(background1, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background2, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    if (gameStatus == 'running') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleBackground(gameSpeed + level);
        handleTowers(canvas, towers, gameSpeed, level, ctx);
        player.update(canvas, mouseDown, angle, frame);
        player.draw(ctx, sprite);
        ctx.strokeRect(0, 0, canvas.width, 100);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, 100);
        ctx.fillStyle = 'red';
        ctx.font = 'bold 20px "Kiwi Maru"';
        ctx.textAlign = "left";
        ctx.fillText('Score: ' + score, 10, 40);
        ctx.fillStyle = 'black';
        ctx.fillText('Best: ' + highScore, 10, 70);
        ctx.drawImage(logo, 0, 0, 177, 147, canvas.width / 2 - 177 / 4, 50 - 147 / 4, 177 / 2, 147 / 2);
        ctx.drawImage(pubLogo, 0, 0, 4000, 464, canvas.width - 4000 / 30 - 10, canvas.height - 464 / 30 - 10, 4000 / 30, 464 / 30);
        if (handleCollisions(player, towers, canvas, ctx)) {
            gameStatus = 'gameover';
        }
        requestAnimationFrame(animate);
        angle += 0.1;
        frame++;
        if (frame % 1000 == 0) {
            level++;
        }
        score = Math.floor(frame / 10);
    }
    if (gameStatus == 'paused') {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px "Kiwi Maru"';
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }
    if (gameStatus == 'start') {
        init(ctx, canvas, sprite);
    }
    if (gameStatus == 'gameover') {
        if (score > highScore) {
            localStorage.setItem('birdyScore', score);
        }

        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fill();

        ctx.font = '30px "Kiwi Maru"';
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("YOU CRASHED!", canvas.width / 2, canvas.height / 2);
        ctx.fillText("Click to restart", canvas.width / 2, canvas.height / 2 + 40);
    }
}

animate();

window.addEventListener('mousedown', function (e) {
    mouseDown = true;
    if (gameStatus == 'gameover' || gameStatus == 'start') {
        start();
    }
})
window.addEventListener('mouseup', function (e) {
    mouseDown = false;
    player.frameX = 0;
})

window.addEventListener('keydown', function (e) {
    switch (e.code) {


        case ('KeyP'):
            if (gameStatus == 'gameover') {
                return;
            }
            if (gameStatus == 'running') {
                gameStatus = 'paused';
            } else {
                gameStatus = 'running';
                animate();

            }
            break;
    }

})
