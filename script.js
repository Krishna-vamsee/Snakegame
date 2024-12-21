const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{x: 160, y: 160}];
let direction = 'RIGHT';
let food = {x: 100, y: 100};
let score = 0;

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop();
    }
    drawGame();
}
// move snake 
function moveSnake() {
    const head = {...snake[0]};

    if (direction === 'RIGHT') head.x += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;

    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return {x, y};
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake as circles
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen'; // Head and body differentiation
        ctx.beginPath();
        ctx.arc(part.x + gridSize / 2, part.y + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw food as a circle
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw score
    document.getElementById("score").textContent = "Score: " + score;
}

function resetGame() {
    snake = [{x: 160, y: 160}];
    direction = 'RIGHT';
    food = {x: 100, y: 100};
    score = 0;
    gameLoop();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

gameLoop();
setInterval(gameLoop, 200); // Game speed
