let difficulty = document.getElementById("difficulty");
let content = "";
let box = document.querySelector(".box");
let bombs = [];
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let counter = 0;
const bombsNum = 16;
let score = document.getElementsByClassName("score");

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
        bombs = checkDuplicate(bombs);
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
        bombs = checkDuplicate(bombs);
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
        bombs = checkDuplicate(bombs);
    }
    box.innerHTML = content;
}

function click(square) {
    for (let i = 0; i < square.length; i++) {
        square[i].addEventListener("click", function () {
            square[i].classList.add("safe");
            let safe = document.getElementsByClassName("safe");
            counter = safe.length;
            console.log(counter);
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
                    score[0].innerHTML = `Score: ${counter - 1}`;
                }
                if (i + 1 != bombs[j] && counter == square.length - bombsNum) {
                    win.classList.add("active");
                    score[1].innerHTML = `Score: ${counter - 1}`;
                }
            }
        })
    }
}

function random(max, min) {
    let randNum = Math.floor(Math.random() * (max - min + 1) + min);
    return randNum;
}

function checkDuplicate(value){
    for (let i = 0; i < bombsNum; i++) {
        for (let j = i + 1; j < bombsNum; j++) {

            if (value[i] == value[j]) {
                do {
                    value[i] = random(100, 1);
                }
                while (value[i] == value[j]);
                i = 0;
            }
        }
    }
    console.log(value);
    return bombs;
}

document.getElementById("btn").addEventListener("click", function () {
    counter = 0;
    getSquares(difficulty.value);
    let square = document.getElementsByClassName("square");
    click(square);
})


