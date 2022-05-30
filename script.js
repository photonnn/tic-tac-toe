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

    const boxes = [...document.querySelectorAll(".box")];
    for (let em of boxes) {
        if (!em.classList.contains("taken")) {
            em.addEventListener('click', () => {
                em.classList.add("taken");
                em.innerHTML = "X";
                makeMove(player, +em.id-1)
                console.log(gameboard.array);
            });
        }
    }

})();
