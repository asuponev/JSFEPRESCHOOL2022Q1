const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = './assets/img/ground.png'

const food = new Image()
food.src = './assets/img/food.png'

let box = 32

let score = 0

let foodCoordinate = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 1)) * box,
}

let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

function drawGame() {
    ctx.drawImage(ground, 0, 0)

    ctx.drawImage(food, foodCoordinate.x, foodCoordinate.y)
}

let game = setInterval(drawGame, 100)