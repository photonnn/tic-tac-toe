(() => {
    const gameboard = {
        array: [],
    }

    const player = {
        score: 0,
        symbol: 'X',
    }

    const AI = {
        score: 0,
        symbol: 'O',
    }

    function makeMove(obj, index) {
        gameboard.array[index] = obj.symbol;
    }

    makeMove(player, 0);
    makeMove(AI, 1);
    makeMove(player, 3);
    makeMove(AI, 4);
    makeMove(player, 6);

    console.log(gameboard.array);

    const boxes = [...document.querySelectorAll(".box")];
    for (let em of boxes) {
        if (!em.classList.contains("taken")) {
            em.addEventListener('click', () => {
                em.classList.add("taken");
                em.innerHTML = "X";
            });
        }
    }

})();
