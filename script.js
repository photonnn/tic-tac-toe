const AIModule = (() => {
    let array = [];
    let AI = {};


    const RandomMove = () => {
        // this is only temporary solution
        const boxes = [...document.querySelectorAll(".box")];
        while (true) {
            let n = Math.floor(Math.random() * (10 - 1)) + 1;
            for (let em of boxes) {
                if (+em.id === n && em.textContent == "") {
                    return n;
                }
            }
        }
    }

    const generateMove = (arr, obj) => {
        array = arr;
        AI = obj;

        return RandomMove();
    }
    return { generateMove };
})();

(() => {
    const gameboard = {
        array: ["", "", "", "", "", "", "", "", ""],
    }

    const player = {
        score: 0,
        symbol: 'X',
        id: "player",
    }

    const AI = {
        score: 0,
        symbol: 'O',
        id: "AI",
    }

    function makeMove(obj, index) {
        gameboard.array[index] = obj.symbol;
    }

    function render(id) {
        for (let em of boxes) {
            if (em.id == id) {
                em.textContent = AI.symbol;
                em.classList.add("taken");
            }
        }
    }

    function isThereSpaceLeft() {
        for (let i = 0; i < gameboard.array.length; i++) {
            if (gameboard.array[i] == "") {
                return true;
            }
        }
        return false;
    }

    function checkForThree() {
        // VERTICAL CHECK
        for (let i = 0; i <= 2; i++) {
            if (gameboard.array[i] != "" && gameboard.array[i] ===
                gameboard.array[i + 3] && gameboard.array[i + 6] ===
                gameboard.array[i]) {
                return 1;
            }
        }

        // HORIZONTAL CHECK
        for (let i = 0; i < 9; i += 3) {
            if (gameboard.array[i] != "" && gameboard.array[i] ===
                gameboard.array[i + 1] && gameboard.array[i] ===
                gameboard.array[i + 2]) {
                return 1;
            }
        }

        // DIAGONAL CHECK 
        if (gameboard.array[0] != "" && gameboard.array[0] ===
            gameboard.array[4] && gameboard.array[0] === gameboard.array[8]) {
            return 1;
        } else if (gameboard.array[2] != "" && gameboard.array[2] ===
            gameboard.array[4] && gameboard.array[2] === gameboard.array[6]) {
            return 1;
        }
        return 0;
    }

    function gameOver(str) {
        const p = document.createElement("p");
        p.textContent = str;

        const game = document.querySelector(".game");

        const playAgain = document.createElement("button");
        playAgain.textContent = "Play Again";
        playAgain.addEventListener('click', newRound);
        game.appendChild(playAgain);
        game.appendChild(p);

        for (let em of boxes) {
            em.removeEventListener('click', play);
        }
    }

    function clearBoxes() {
        for (let em of boxes) {
            em.classList.remove("taken");
            em.textContent = "";
            em.addEventListener('click', play);
        }
    }

    function getSymbol() {
        const X = document.querySelector(".X");
        const O = document.querySelector(".O");
        X.addEventListener('click', () => {
            AI.symbol = "O";
            player.symbol = "X";
            hideCover();
        })
        O.addEventListener('click', () => {
            AI.symbol = "X";
            player.symbol = "O";
            hideCover();
            aiTurn();
        })
    }

    function hideCover() {
        const div = document.querySelector(".choice");
        const cover = document.querySelector(".cover");
        div.style.visibility = "hidden";
        cover.style.display = "none";
    }

    function makeCover() {
        const div = document.querySelector(".choice");
        div.style.visibility = "initial";
        const cover = document.querySelector(".cover");
        cover.style.display = "block";
    }

    function newRound() {
        try {
            document.querySelector("p").remove();
            document.querySelector("button").remove();
        } catch (err) {
            // when newRound() is first ran, p and button have not been
            // created yet, leave it like this untill decision for design is
            // made!
        }

        gameboard.array = ["", "", "", "", "", "", "", "", ""]
        clearBoxes();
        makeCover();
    }

    function renderScore(obj) {
        obj.score++;
        const scoreCounter = document.querySelector(`#${obj.id}`);
        scoreCounter.textContent = obj.score;
    }

    function playerTurn(that) {
        that.classList.add("taken");
        that.textContent = player.symbol;
        makeMove(player, +that.id - 1);
        if (checkForThree()) {
            gameOver(`YOU won!`);
            renderScore(player);
            return "R";
        }

        return checkForDraw();
    }

    function checkForDraw() {
        if (!isThereSpaceLeft()) {
            gameOver("DRAW");
            return "R";
        }
    }

    function aiTurn() {
        if (isThereSpaceLeft()) {
            let aiMoveIndex = AIModule.generateMove();
            makeMove(AI, aiMoveIndex - 1);
            render(aiMoveIndex);
            if (checkForThree()) {
                gameOver(`AI won!`);
                renderScore(AI);
                return "R";
            }
        }
        return checkForDraw();
    }

    function play() {
        let that = this;
        if (!this.classList.contains("taken")) {
            if (playerTurn(that) !== "R") // to prevent AI from making move
                aiTurn();
        }
    }


    const boxes = [...document.querySelectorAll(".box")];
    getSymbol();
    newRound();

})();





/*
const generateAiMove = () => {
    while (true) {
        let n = Math.floor(Math.random() * (10 - 1)) + 1;
        for (let em of boxes) {
            if (+em.id === n && em.textContent == "") {
                return n;
            }
        }
    }
} */