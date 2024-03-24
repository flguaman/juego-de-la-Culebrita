// Obtener el lienzo del juego
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Definir el tamaño de una celda en el juego
const cellSize = 50;

// Definir el ancho y alto del lienzo en base al tamaño de las celdas
const canvasWidth = Math.floor(canvas.width / cellSize);
const canvasHeight = Math.floor(canvas.height / cellSize);

// Definir la culebrita
let snake = {
    body: [
        { x: 5, y: 5 }, // Cabeza de la culebrita
        { x: 4, y: 5 }, // Primer segmento del cuerpo
        { x: 3, y: 5 }  // Segundo segmento del cuerpo
    ],
    direction: "right",
    speed: 6   // Velocidad inicial de la culebrita
};

// Definir la comida
let food = {
    x: getRandomPosition(canvasWidth),
    y: getRandomPosition(canvasHeight)
};

// Función para obtener una posición aleatoria dentro del lienzo del juego
function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

// Función para dibujar una celda en el lienzo
function drawCell(x, y) {
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

// Función para dibujar el juego en el lienzo
function drawGame() {
    // Limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la culebrita
    ctx.fillStyle = "rgb(0, 78, 0)"; // Color verde
    snake.body.forEach(segment => {
        drawCell(segment.x, segment.y);
    });

    // Dibujar la comida
    ctx.fillStyle = "rgb( 85, 0, 0)"; // Color rojo
    drawCell(food.x, food.y);
}

// Función para actualizar la culebrita en el juego
function updateGame() {
    // Mover la culebrita en función de la dirección
    const head = { x: snake.body[0].x, y: snake.body[0].y };

    if (snake.direction === "up") {
        head.y -= 1;
    } else if (snake.direction === "down") {
        head.y += 1;
    } else if (snake.direction === "left") {
        head.x -= 1;
    } else if (snake.direction === "right") {
        head.x += 1;
    }

    // Reajustar la posición de la cabeza si pasa los límites del lienzo
    if (head.x < 0) {
        head.x = canvasWidth - 1;
    } else if (head.x >= canvasWidth) {
        head.x = 0;
    } else if (head.y < 0) {
        head.y = canvasHeight - 1;
    } else if (head.y >= canvasHeight) {
        head.y = 0;
    }

    // Agregar la nueva cabeza a la culebrita
    snake.body.unshift(head);

    // Eliminar la última cola de la culebrita si no ha comido
    if (!snake.ateFood) {
        snake.body.pop();
    } else {
        // Generar una nueva posición para la comida
        food.x = getRandomPosition(canvasWidth);
        food.y = getRandomPosition(canvasHeight);
        snake.ateFood = false;
        snake.speed += 0.5; // Aumentar la velocidad de la culebrita después de comer una comida
    }

    // Dibujar el juego actualizado
    drawGame();

    // Detectar colisiones
    if (isCollision(head, snake.body.slice(1))) {
        gameOver();
        return;
    }

    if (isCollision(head, [food])) {
        snake.ateFood = true;
    }
}

// Función para verificar si hay colisiones entre una cabeza y un conjunto de segmentos
function isCollision(head, body) {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

// Función para mostrar el mensaje de juego terminado
function gameOver() {
    // Puedes personalizar este código para mostrar una ventana emergente o un mensaje en la página
    alert("¡Juego terminado!");
}

// Evento de teclado para controlar la dirección de la culebrita
document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && snake.direction !== "down") {
        snake.direction = "up";
    } else if (event.key === "ArrowDown" && snake.direction !== "up") {
        snake.direction = "down";
    } else if (event.key === "ArrowLeft" && snake.direction !== "right") {
        snake.direction = "left";
    } else if (event.key === "ArrowRight" && snake.direction !== "left") {
        snake.direction = "right";
    }
});

// Bucle principal del juego
function gameLoop() {
    updateGame();
    setTimeout(gameLoop, 1000 / snake.speed); // Ajustar la velocidad del juego según la velocidad de la culebrita
}

// Iniciar el juego
gameLoop();