let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "#E0FFFF";
    context.fillRect(32, 32, 20*box, 20*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function geraCor(opacidade = 1) {
    let g = Math.random(200, 255) * (255 - 200) + 200;   
    return `rgba(${100}, ${g}, ${100}, ${opacidade})`;
 }

function criarCobrinha () {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = geraCor();
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood () {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function fimJogo() {
    clearInterval(jogo);
    if(!alert('Game over :/\n pressione "space" ou "enter" para começar de novo : )')){window.location.reload();}
}

function iniciarJogo() {    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    

    for(i = 4; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            fimJogo();
        }
    }

    if (snake[0].x < 8 || snake[0].y < 8) {
        fimJogo();
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
        pontuou();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let pontos = document.getElementById('pontuacao');
function pontuou() {
    pontos.innerHTML = 'Pontuação: \n' + (snake.length);
}

let jogo = setInterval(iniciarJogo, 120);

