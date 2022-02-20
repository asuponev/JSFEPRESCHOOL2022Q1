const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreValue = document.querySelector('.score-value');
const recordsSpan = document.querySelector('.records-switch');
const recordsOpen = document.querySelector('.records');

let speed = 1;

let score = 0;

let recordsList = {};
let countGame = 0;

let cellCount = 20;
let cellSize = canvas.width / cellCount;

let snake = [];
snake[0] = {
    x: Math.floor(Math.random() * cellCount),
    y: Math.floor(Math.random() * cellCount)
};

let xHeadSnake = snake[0].x;
let yHeadSnake = snake[0].y;

const sound = new Audio('./assets/audio/bite.mp3');
sound.volume = 0.1;

let xFood = Math.floor(Math.random() * cellCount);
let yFood = Math.floor(Math.random() * cellCount);

let xDirection = 0;
let yDirection = 0;

let gameOver = false;

let xDirectionPrev = 0;
let yDirectionPrev = 0;

drawGame();
function drawGame() {
    // fix bag
    if (xDirectionPrev === 1 && xDirection === -1) xDirection = xDirectionPrev;
    if (xDirectionPrev === -1 && xDirection === 1) xDirection = xDirectionPrev;
    if (yDirectionPrev === 1 && yDirection === -1) yDirection = yDirectionPrev;
    if (yDirectionPrev === -1 && yDirection === 1) yDirection = yDirectionPrev;
    xDirectionPrev = xDirection;
    yDirectionPrev = yDirection;

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER!', canvas.width / 8.5, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('for return click on the snake', canvas.width / 4.75, canvas.height / 1.75);
        document.body.removeEventListener('keydown', keyDown);
        return
    };
    
    clearScreen();   
    drawFood();
    drawSnake();
    moveSnake();
    drawSpeed();
    changeSpeed();
    setTimeout(drawGame, 200 / speed);
}

function clearScreen() {
    ctx.fillStyle = 'black';;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

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

    if (xHeadSnake < 0 || xHeadSnake >= cellSize || yHeadSnake < 0 || yHeadSnake >= cellSize) {
        gameOver = true;
        countGame++;
        localStorage.setItem('countGame', countGame);
        recordsList[countGame] = score;
        localStorage.setItem('recordsList', JSON.stringify(recordsList));
    };

    let newHead = {
        x: xHeadSnake,
        y: yHeadSnake
    };

    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            gameOver = true;
            countGame++;
            localStorage.setItem('countGame', countGame);
            recordsList[countGame] = score;
            localStorage.setItem('recordsList', JSON.stringify(recordsList));
            break;
        };
    };

    snake.unshift(newHead);
};

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(xFood * cellCount, yFood * cellCount, cellSize, cellSize);
};

function moveSnake() {
    xHeadSnake += xDirection;
    yHeadSnake += yDirection;
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
    if (score > 40) {
        speed = 6;
    };
    if (score > 50) {
        speed = 7;
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

function getLocalStorage() {
    if (localStorage.getItem('recordsList')) {
        recordsList = JSON.parse(localStorage.getItem('recordsList'));
        countGame = localStorage.getItem('countGame');
        const keys = Object.keys(recordsList);
        keys.forEach(key => {
            console.log('key:', key);
            console.log('value:', recordsList[key]);
            const recordSpan = `<span>Game: ${key}, score: ${recordsList[key]}<span>`;
            recordsOpen.insertAdjacentHTML('afterbegin', recordSpan);
        });
    };
};

getLocalStorage();