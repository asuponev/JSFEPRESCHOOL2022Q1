const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreValue = document.querySelector('.score-value')
const recordsSpan = document.querySelector('.records-switch')
const recordsOpen = document.querySelector('.records')

let speed = 1;

let score = 0;

let cellCount = 20;
let cellSize = canvas.width / cellCount

let snake = []
snake[0] = {
    x: Math.floor(Math.random() * cellCount),
    y: Math.floor(Math.random() * cellCount)
}

let xHeadSnake = snake[0].x;
let yHeadSnake = snake[0].y;

const sound = new Audio('./assets/audio/bite.mp3');
sound.volume = 0.1;


let xFood = Math.floor(Math.random() * cellCount);
let yFood = Math.floor(Math.random() * cellCount);

let xDirection = 0;
let yDirection = 0;

let gameOver = false;

drawGame()
function drawGame() {
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial'
        ctx.fillText('GAME OVER!', canvas.width / 8.5, canvas.height / 2)
        return
    }
    
    clearScreen();   
    drawFood();
    drawSnake();
    moveSnake();
    drawSpeed();
    changeSpeed();
    setTimeout(drawGame, 200 / speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x * cellCount, snake[i].y * cellCount, cellSize, cellSize);
    };

    if (xFood == xHeadSnake && yFood == yHeadSnake) {
        score++;
        scoreValue.innerHTML = `Score: ${score}`
        sound.play();
        xFood = Math.floor(Math.random() * cellCount);
        yFood = Math.floor(Math.random() * cellCount);
    } else {
        snake.pop();
    };

    let newHead = {
        x: xHeadSnake,
        y: yHeadSnake
    };

    checkSelfIntersection(newHead, snake);

    snake.unshift(newHead);
}

function drawFood() {
    ctx.fillStyle = 'red'
    ctx.fillRect(xFood * cellCount, yFood * cellCount, cellSize, cellSize)
}

function moveSnake() {
    xHeadSnake += xDirection;
    yHeadSnake += yDirection;
}

function checkSelfIntersection(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            gameOver = true;
            break;
        };
    };
};

function drawSpeed() {
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText(`Speed ${speed}`, canvas.width - 50, 16);
};

function changeSpeed() {
    if (score > 2) {
        speed = 2;
    };
    if (score > 10) {
        speed = 3;
    };
    if (score > 20) {
        speed = 4;
    };
    if (score > 30) {
        speed = 5;
    };
};

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    if (event.keyCode == 37 && xDirection != 1) {
        yDirection = 0;
        xDirection = -1;
    };

    if (event.keyCode == 38 && yDirection != 1) {
        yDirection = -1;
        xDirection = 0;
    };

    if (event.keyCode == 39 && xDirection != -1) {
        yDirection = 0;
        xDirection = 1;
    };

    if (event.keyCode == 40 && yDirection != -1) {
        yDirection = 1;
        xDirection = 0;
    };
};


let isOpen = false;

recordsSpan.addEventListener('click', () => {
    if (!isOpen) {
        recordsOpen.classList.add('open');
        recordsSpan.innerText = 'records->';
        isOpen = true;
    } else {
        recordsOpen.classList.remove('open');
        recordsSpan.innerText = '<-records';
        isOpen = false;
    };
});