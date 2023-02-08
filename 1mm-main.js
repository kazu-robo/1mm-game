'use strict'
// 1行目に記載している 'use strict' は削除しないでください

/* let num = document.getElementById("input-number").value; */
let kickButton = document.getElementById("kick");
let startButton = document.getElementById("start");

let isKicked = false;
let isPlaying = false;
let isPoped = false;
let isWaiting = false;

let tryNum = 0;
let scoreTotal = 0;

let ballShade = document.getElementById("ball-shade");
let ball = document.getElementById("ball");
let impact = document.getElementById("impact");
let gameOver = document.getElementById("game-over");
let printName = document.getElementById("print-name");

let count3 = document.getElementById("count3");
let count2 = document.getElementById("count2");
let count1 = document.getElementById("count1");

let difficulty = "0";
let playerName = "";

let randomCourse = 0;
let curveLoop = 0;
let x_speed = 0;

let ballPos = {
    x: 300,
    y: 0,
}
const online_x = 4;

function pxToMm(px) {
    let mm = px * 44 / 7;
    mm = Math.floor(mm * 10) / 10;
    return mm;
}

function hide(part) {
    part.style.visibility = "hidden";
}

function pop(part) {
    part.style.visibility = "visible";
}

function countDown() {
    pop(count3);
    setTimeout(hide.bind(null, count3), 1000);
    setTimeout(pop.bind(null, count2), 1001);
    setTimeout(hide.bind(null, count2), 2000);
    setTimeout(pop.bind(null, count1), 2001);
    setTimeout(hide.bind(null, count1), 3000);
}

// let blueBox = document.getElementsByClassName("box-blue-class")[0];

function total() {
    // total
    if (scoreTotal < 10) {
        document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal * 10) / 10 + "mm";
        printName.innerHTML = "合計スコア: " + Math.floor(scoreTotal * 10) / 10 + "mm!<br>ブラボー！！";
        pop(printName);
    }
    else if (scoreTotal < 1000) {
        document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal) / 10 + "cm";
        printName.innerHTML = "合計スコア: " + Math.floor(scoreTotal) / 10 + "cm!<br>まずまずプレーヤー！";
        pop(printName);
    }
    else {
        document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal / 10) / 100 + "m";
        printName.innerHTML = "合計スコア: " + Math.floor(scoreTotal / 10) / 100 + "m...<br>練習して！"
        pop(printName);
    }

}

/* button押下時に呼び出し */
function kickButtonPushed() {
    if (isPlaying && !isKicked && !isWaiting) {
        isKicked = true;

        let kick_pos_x = ballPos.x;
        ballShade.style.left = kick_pos_x + "px";
        ballShade.style.top = ballPos.y + "px";
        ballShade.style.visibility = "visible";

        impact.style.left = (kick_pos_x - 40) + "px";
        impact.style.top = (ballPos.y + 20) + "px";
        impact.style.visibility = "visible";
        setTimeout(hide.bind(null, impact), 100);

        scoreTotal += pxToMm(kick_pos_x - online_x);

        // ちょい待ちからの
        // if (kick_pos_x >= 3.7 && kick_pos_x <= 5) {
        if (kick_pos_x - online_x >= 0 && kick_pos_x - online_x <= x_speed) {
            document.body.getElementsByClassName("table-class")[0].rows[tryNum - 1].cells[1].innerHTML = "1mm";
            scoreTotal -= pxToMm(kick_pos_x - online_x);
            scoreTotal += 1;
            printName.innerHTML = playerName + "の1mm" + "！";
            pop(printName);
            setTimeout(hide.bind(null, printName), 1000);
        }
        else if (pxToMm(kick_pos_x - online_x) > 0) {
            if (pxToMm(kick_pos_x - online_x) < 10) {
                document.body.getElementsByClassName("table-class")[0].rows[tryNum - 1].cells[1].innerHTML = Math.floor(pxToMm(kick_pos_x - online_x) * 10) / 10 + "mm";
                printName.innerHTML = playerName + "の" + Math.floor(pxToMm(kick_pos_x - online_x) * 10) / 10 + "mm" + "！";
                pop(printName);
                setTimeout(hide.bind(null, printName), 1000);
            }
            else if (pxToMm(kick_pos_x - online_x) < 1000) {
                document.body.getElementsByClassName("table-class")[0].rows[tryNum - 1].cells[1].innerHTML = Math.floor(pxToMm(kick_pos_x - online_x)) / 10 + "cm";
                printName.innerHTML = playerName + "の" + Math.floor(pxToMm(kick_pos_x - online_x)) / 10 + "cm" + "！";
                pop(printName);
                setTimeout(hide.bind(null, printName), 1000);
            }
            else {
                document.body.getElementsByClassName("table-class")[0].rows[tryNum - 1].cells[1].innerHTML = Math.floor(pxToMm(kick_pos_x - online_x) / 10) / 100 + "m";
                printName.innerHTML = playerName + "の" + Math.floor(pxToMm(kick_pos_x - online_x) / 10) / 100 + "m" + "！";
                pop(printName);
                setTimeout(hide.bind(null, printName), 1000);
            }
        }
        else {
            document.body.getElementsByClassName("table-class")[0].rows[tryNum - 1].cells[1].innerHTML = "Game Over";
            document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = "Game Over";
            pop(gameOver);
            tryNum = 6;
        }
        if (tryNum === 5) {
            setTimeout(total, 1000);
        }
        // // total
        // if (tryNum === 5) {
        //     if (scoreTotal < 10){
        //         document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal * 10)/10 + "mm";
        //         printName.innerHTML = "合計スコア: " + Math.floor(scoreTotal * 10)/10 + "mm ! ブラボー！！";
        //         pop(printName);
        //     }
        //     else if (scoreTotal < 1000){
        //         document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal)/10 + "cm";
        //         printName.innerHTML = "合計スコア: " + Math.floor(scoreTotal)/10 + "cm! まずまずのプレーヤー！";
        //         pop(printName);
        //     }
        //     else{
        //         document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal/10)/100 + "m";
        //         printName.innerHTML = "合計スコア: " + Math.floor(scoreTotal/10)/100 + "m... 練習して！"
        //         pop(printName);
        //     }
        // }
    }
}
kickButton.addEventListener("click", kickButtonPushed);

function ballAnimation() {
    if (!isKicked) {
        // パス軌道
        if (difficulty === "1") { // easy
            ballPos.x -= 3;
            ballPos.y += 3;
            x_speed = 3;
        }
        else if (difficulty === "2") { //medium
            if (tryNum < 4) {
                ballPos.x -= 5;
                ballPos.y += 5;
                x_speed = 5;
            }
            else if (tryNum === 4) {
                ballPos.x -= 7;
                ballPos.y += 1;
                x_speed = 7;
            }
            else {
                ballPos.x -= 6;
                ballPos.y += 3;
                x_speed = 6;
            }
        }
        else if (difficulty === "3") { //difficult
            if (tryNum < 4) {
                ballPos.x -= 9;
                ballPos.y += 9;
                x_speed = 9;
            }
            else if (tryNum === 4) {
                ballPos.x -= 10;
                ballPos.y += 2;
                x_speed = 10;
            }
            else {
                ballPos.x -= 8;
                ballPos.y += 5;
                x_speed = 8;
            }
        }
        else if (difficulty === "4") { //super
            if (randomCourse === 1) {
                ballPos.x -= 9;
                ballPos.y += 9;
                x_speed = 9;
            }
            else if (randomCourse === 2) {
                ballPos.x -= 10;
                ballPos.y += 2;
                x_speed = 10;
            }
            else if (randomCourse === 3) {
                ballPos.x -= 8;
                ballPos.y += 5;
                x_speed = 8;
            }
            else if (randomCourse === 4) {
                ballPos.x -= 4;
                ballPos.y += 2;
                x_speed = 4;
            }
            else if (randomCourse === 5) {
                ballPos.x -= 9 - (curveLoop * 0.1);
                ballPos.y += 5 + (curveLoop * 0.1);
                x_speed = 9 - ((curveLoop + 1) * 0.1);
            }
            else if (randomCourse === 6) {
                ballPos.x -= 12 - (curveLoop * 0.18);
                ballPos.y += 6 + (curveLoop * 0.18);
                x_speed = 12 - ((curveLoop + 1) * 0.18);
            }
            else if (randomCourse === 7) {
                ballPos.x -= 9 + (curveLoop * 0.1);
                ballPos.y += 9 - (curveLoop * 0.1);
                x_speed = 9 + ((curveLoop + 1) * 0.1);
            }
            else if (randomCourse === 8) {
                ballPos.x -= 6 + (curveLoop * 0.18);
                ballPos.y += 12 - (curveLoop * 0.18);
                x_speed = 6 + ((curveLoop + 1) * 0.18);
            }
            else {
                console.log("[bug] random is not 1-8. random : " + random);
            }
            curveLoop++;
        }
        ball.style.left = ballPos.x + "px";
        ball.style.top = ballPos.y + "px";
        // console.log(pxToMm(ballPos.x - online_x));

        // not kicked
        if (ballPos.x < -100 || ballPos.y > 350) {
            isKicked = true;
            ballPos.x = 300;
            ballPos.y = 0;
            ball.style.left = ballPos.x + "px";
            ball.style.top = ballPos.y + "px";

            document.body.getElementsByClassName("table-class")[0].rows[tryNum - 1].cells[1].innerHTML = "Game Over";
            document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = "Game Over";
            pop(gameOver);
            tryNum = 6;
        }
    }
    else if (ballPos.y > 0) { //after kicked
        if (difficulty === "1" || difficulty === "2") {
            ballPos.x += 3;
            ballPos.y -= 8;
        }
        else if (difficulty === "3" || difficulty === "4") {
            ballPos.x += 5;
            ballPos.y -= 10;
        }
        ball.style.left = ballPos.x + "px";
        ball.style.top = ballPos.y + "px";
    }
    else {
        ballShade.style.visibility = "hidden";
        // timeout countdown
        isKicked = false;
        if (tryNum < 5) {
            ballStarts();
        }
        else {
            ballPos.x = 300;
            ballPos.y = 0;
            ball.style.left = ballPos.x + "px";
            ball.style.top = ballPos.y + "px";
            isPlaying = false;
        }
        return;
    }
    requestAnimationFrame(ballAnimation);
}

function ballStarts() {
    // console.log(tryNum);
    tryNum++;
    ballPos.x = 300;
    ballPos.y = 0;
    ball.style.left = ballPos.x + "px";
    ball.style.top = ballPos.y + "px";
    randomCourse = Math.floor(Math.random() * 8) + 1;
    curveLoop = 0;
    requestAnimationFrame(ballAnimation);
    //ポップアップ

}

function notWaiting() {
    isWaiting = false;
}

/* button押下時に呼び出し */
function startButtonPushed() {
    /* ここでnum数を更新 */
    if (isPlaying) {
        return;
    }
    isWaiting = true;
    tryNum = 0;
    scoreTotal = 0;
    hide(gameOver);
    hide(printName);
    isPlaying = true;
    difficulty = document.getElementById("difficulty").value;
    playerName = document.getElementById("input-name").value;
    for (let i = 0; i < 6; i++) {
        document.body.getElementsByClassName("table-class")[0].rows[i].cells[1].innerHTML = "";
    }
    countDown();
    setTimeout(notWaiting, 3000);
    // console.log(difficulty);
    // for (let i = 0; i < 5; i++) { // 5回分の施行
    setTimeout(ballStarts, 3001);
    // ballStarts(); //async関数にしたりして while文で特定状況まで処理止めるとか

    // }
}
startButton.addEventListener("click", startButtonPushed);



// tmp
