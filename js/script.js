let difficulty = document.getElementById("difficulty");
let content = "";
let box = document.querySelector(".box");
let bombs = [];
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let counter = 0;
const bombsNum = 16;

function getSquares(value) {
    if (value == "easy") {
        content = "";
        for (let i = 1; i <= 100; i++) {
            content +=
                `
            <div class="square easy">${i}</div>
            `
        }
        for (let i = 0; i < bombsNum; i++) {
            bombs[i] = random(100, 1);
        }
        console.log(bombs);
    }
    if (difficulty.value == "hard") {
        content = "";
        for (let i = 1; i <= 81; i++) {
            content +=
                `
            <div class="square hard">${i}</div>
            `
        }
        for (let i = 0; i < bombsNum; i++) {
            bombs[i] = random(81, 1);
        }
        console.log(bombs);
    }
    if (difficulty.value == "extreme") {
        content = "";
        for (let i = 1; i <= 49; i++) {
            content +=
                `
            <div class="square extreme">${i}</div>
            `
        }
        for (let i = 0; i < bombsNum; i++) {
            bombs[i] = random(49, 1);
        }
        console.log(bombs);
    }
    box.innerHTML = content;
}

function click(square) {
    for (let i = 0; i < square.length; i++) {
        square[i].addEventListener("click", function () {
            square[i].classList.add("safe");
            counter++;
            for (let j = 0; j < bombs.length; j++) {
                if (i + 1 == bombs[j]) {
                    square[i].classList.remove("safe");
                    for (let k = 0; k < square.length; k++) {
                        for (let l = 0; l < bombs.length; l++) {
                            if (k + 1 == bombs[l]) {
                                square[k].classList.add("bomb");
                            }
                        }
                    }
                    lose.classList.add("active");
                }
                if (i + 1 != bombs[j] && counter >= square.length - bombsNum) {
                    win.classList.add("active");
                }
            }
        })
    }
}

function random(max, min) {
    let randNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randNum;
}

document.getElementById("btn").addEventListener("click", function () {
    getSquares(difficulty.value);
    let square = document.getElementsByClassName("square");
    click(square);
})


