let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let message = document.querySelector('#message');
let chooseX = document.querySelector('#chooseX');
let chooseO = document.querySelector('#chooseO');

let player = null;
let gameOver = false;
let gameStarted = false;



// PLAYER CHOICE

chooseX.addEventListener('click', () => {

    if (gameStarted) return;

    player = 'X';

    chooseX.style.backgroundColor = '#A7ACD9';
    chooseO.style.backgroundColor = '';

    message.textContent = 'Player X starts!';
});



chooseO.addEventListener('click', () => {

    if (gameStarted) return;

    player = 'O';

    chooseO.style.backgroundColor = '#A7ACD9';
    chooseX.style.backgroundColor = '';

    message.textContent = 'Player O starts!';
});



// WIN PATTERNS

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];



// BOX CLICK

boxes.forEach(box => {

    box.addEventListener('click', () => {

        if (gameOver) return;

        if (player === null) {
            message.textContent = 'Please Choose X or O To Start The Game!';
            return;
        }

        if (box.textContent !== '') return;

        gameStarted = true;

        chooseX.disabled = true;
        chooseO.disabled = true;

        // remove start message
        message.textContent = '';

        box.textContent = player;

        if (checkWin()) {

            message.textContent = `Player ${player} Wins!`;
            message.classList.add("winner");

            gameOver = true;

            confetti({
                particleCount: 120,
                spread: 90,
                origin: { y: 0.6 }
            });

            return;
        }

        // DRAW CHECK
        if ([...boxes].every(box => box.textContent !== '')) {

            message.textContent = "It's a Draw!";
            gameOver = true;
            return;
        }

        // SWITCH PLAYER
        player = player === 'X' ? 'O' : 'X';
    });

});



// RESET

reset.addEventListener('click', resetGame);



function checkWin() {

    return winPatterns.some(pattern => {

        return pattern.every(index => {
            return boxes[index].textContent === player;
        });

    });
}



function resetGame() {

    boxes.forEach(box => {
        box.textContent = '';
    });

    player = null;
    gameStarted = false;
    gameOver = false;

    chooseX.disabled = false;
    chooseO.disabled = false;

    chooseX.style.backgroundColor = '';
    chooseO.style.backgroundColor = '';

    message.classList.remove("winner");
    message.textContent = '';
}
