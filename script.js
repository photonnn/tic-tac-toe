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

    function generateAiMove() {
        while (true) {
            let n = Math.floor(Math.random() * (10 - 1)) + 1;
            for (let em of boxes) {
                if (+em.id === n && em.textContent == "") {
                    return n;
                }
            }
        }
    }

    function render(id) {
        for (let em of boxes) {
            if (em.id == id) {
                em.textContent = "O";
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

    function newRound() {
        for (let em of boxes) {
            em.classList.remove("taken");
            em.textContent = "";
            em.addEventListener('click', play);
        }

        try {
            document.querySelector("p").remove();
            document.querySelector("button").remove();
        } catch (err) {
            // when newRound() is first ran, p and button have not been
            // created yet, leave it like this untill decision for design is
            // made!
        }
            
        gameboard.array = ["", "", "", "", "", "", "", "", ""]
    }

    function renderScore(obj) {
        obj.score++;
        const scoreCounter = document.querySelector(`#${obj.id}`);
        console.log(scoreCounter);
        scoreCounter.textContent = obj.score;
    }

    function play() {
        if (!this.classList.contains("taken")) { // PLAYER MOVE
            this.classList.add("taken");
            this.textContent = "X";
            makeMove(player, +this.id - 1);
            if (checkForThree()) {
                gameOver("PLAYER WON");
                renderScore(player);
                return;
            }

            if (isThereSpaceLeft()) { // AI MOVE
                let aiMoveIndex = generateAiMove();
                makeMove(AI, aiMoveIndex - 1);
                render(aiMoveIndex);
                if (checkForThree()) {
                    gameOver("AI WON");
                    renderScore(AI);
                    return;
                }
            } else {
                gameOver("DRAW");
                return;
            }
        }
    }


    const boxes = [...document.querySelectorAll(".box")];
    newRound();

})();

