const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let speed = 7;

let cellCount = 20;
let cellSize = canvas.width / cellCount
let xHeadSnake = Math.floor(Math.random() * cellSize);
let yHeadSnake = Math.floor(Math.random() * cellSize);

let xDirection = 0;
let yDirection = 0;

drawGame()
function drawGame() {
    clearScreen();
    moveSnake();
    draSnake();

    setTimeout(drawGame, 1000 / speed)
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function draSnake() {
    ctx.fillStyle = 'orange'
    ctx.fillRect(xHeadSnake * cellCount, yHeadSnake * cellCount, cellSize, cellSize)
}

function moveSnake() {
    xHeadSnake = xHeadSnake + xDirection;
    yHeadSnake = yHeadSnake + yDirection;
}

document.body.addEventListener('keydown', keyDown)

function keyDown(event) {
    if (event.keyCode == 37 && xDirection != 1) {
        yDirection = 0;
        xDirection = -1;
    }

    if (event.keyCode == 38 && yDirection != 1) {
        yDirection = -1;
        xDirection = 0;
    }

    if (event.keyCode == 39 && xDirection != -1) {
        yDirection = 0;
        xDirection = 1;
    }

    if (event.keyCode == 40 && yDirection != -1) {
        yDirection = 1;
        xDirection = 0;
    }
}