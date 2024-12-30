let turn = 0;
let canClick = true;
let currentPlayer = 1;

const scores = {
    player1: 0,
    player2: 0,
}

const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

const clicked = (event) => {
    if (canClick) {
        canClick = false;
        turn++;
        const item = event.target;
        item.classList.add(images[item.id]);
        if (turn % 2 === 0) {   
            const same = Array.from(items).filter((i) => i.classList.contains(images[item.id]))
            if (same.length === 2) {
                canClick = true;
                same.forEach((correct) => {
                    correct.classList.add('correct')
                    correct.removeEventListener('click',clicked)
                })
                updateScore()
                if (scores.player1 + scores.player2 === 6) {
                    showWinner();
                }
            } else {
                updateActivePlayer()
                setTimeout(hideAllImages, 1000);
            }
        }
        else {
            canClick = true;
        }
    }
}

const showAllImages = () => {
        Array.from(items).forEach((item, i) => {
        item.addEventListener('click', clicked);
        item.classList.add(images[i]);
        i++;
    })
} 

const hideAllImages = () => {
    canClick = true;
    Array.from(items).forEach((item, i) => {
        item.addEventListener('click', clicked);
        if (item.classList.contains('correct') === false) {
            item.classList.remove(images[i]);
        }
        i++;
    })
}

const updateScore = () => {
     const player1Score = document.getElementById('player1-score');
     const player2Score = document.getElementById('player2-score');

     if (currentPlayer === 1) {
        scores.player1++
        player1Score.textContent = scores.player1; 
    } else {
        scores.player2++
        player2Score.textContent = scores.player2;
    }
}

const updateActivePlayer = () => {
    currentPlayer = currentPlayer === 1 ? 2: 1;  
    if (currentPlayer === 1) {
        document.getElementById('player1-scoreboard').classList.add('active');
        document.getElementById('player2-scoreboard').classList.remove('active');
    } else {
        document.getElementById('player2-scoreboard').classList.add('active');
        document.getElementById('player1-scoreboard').classList.remove('active');
    }
}

const showWinner = () => {
    const winnerPane = document.getElementById('winner-pane');
    const winnerMessage = document.getElementById('winner-message');
    const winner = scores.player1 > scores.player2 ? 1 : 2;
    if (scores.player1 === scores.player2) {
        winnerMessage.textContent = 'Game was a draw!'  
    } else if (winner === 1) {
        winnerMessage.textContent = localStorage.getItem("player1Name") ? `${localStorage.getItem("player1Name")} is the winner!` : 'Player 1 is the winner';
    } else {
        winnerMessage.textContent = localStorage.getItem("player2Name") ? `${localStorage.getItem("player2Name")} is the winner!` : 'Player 2 is the winner';
    }
     winnerPane.classList.add('show');
} 

const newGame = () => {
    window.location.reload()
}

const updateContent = () => {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    localStorage.setItem("player1Name", player1.textContent.trim());
    localStorage.setItem("player2Name", player2.textContent.trim());

}

document.getElementById('winner-pane').addEventListener('click', newGame);
const items = document.getElementsByClassName("grid-item");
const images = getShuffledArr([
    'elephant', 'elephant', 
    'lion', 'lion', 
    'toad', 'toad', 
    'penguin', 'penguin', 
    'monkey', 'monkey', 
    'tiger','tiger'
])

Array.from(items).forEach((item) => {
    item.addEventListener('click', clicked);
})

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
localStorage.getItem("player1Name") ? player1.innerHTML = localStorage.getItem("player1Name") : 'Player 1'
localStorage.getItem("player2Name") ? player2.innerHTML = localStorage.getItem("player2Name") : 'Player 2'

window.peek = () => {
    showAllImages();
    setTimeout(hideAllImages, 1000);
}
