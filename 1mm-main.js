'use strict'
// 1行目に記載している 'use strict' は削除しないでください

/* let num = document.getElementById("input-number").value; */
let kickButton = document.getElementById("kick");
let startButton = document.getElementById("start");

let isKicked = false;
let isPlaying = false;
let isPoped = false;

let tryNum = 0;

let ballShade = document.getElementById("ball-shade");
let ball = document.getElementById("ball");

let difficulty = "0";
let name = "";

let ballPos = {
    x: 300,
    y: 0,
}

// let blueBox = document.getElementsByClassName("box-blue-class")[0];

/* button押下時に呼び出し */
function kickButtonPushed(){
    console.log("hoge");
    isKicked = true;
    // ballShade.style.top = ball.style.top;
    // ballShade.style.left = ball.style.left;

    ballShade.style.left = ballPos.x + "px";
    ballShade.style.top = ballPos.y + "px";
    ballShade.style.visibility = "visible";
}
kickButton.addEventListener("click", kickButtonPushed);

function ballAnimation(){
    if (!isKicked) {
        ballPos.x -= 5;
        ballPos.y += 5;
        ball.style.left = ballPos.x + "px";
        ball.style.top =  ballPos.y + "px";
    }
    else if (ballPos.x < 300) {
        ballPos.x += 5;
        ballPos.y -= 5;
        ball.style.left = ballPos.x + "px";
        ball.style.top =  ballPos.y + "px";
    }
    else {
        ballShade.style.visibility = "hidden";
        // timeout countdown
        isKicked = false;
        if (tryNum < 5) {
            ballStarts();
        }
        return;
    }
    requestAnimationFrame(ballAnimation);
}

function ballStarts() {
    console.log(tryNum);
    tryNum++;
    ballPos.x = 300;
    ballPos.y = 0;
    ball.style.left = ballPos.x + "px";
    ball.style.top =  ballPos.y + "px";
    requestAnimationFrame(ballAnimation);
    //ポップアップ

}

/* button押下時に呼び出し */
function startButtonPushed(){
    /* ここでnum数を更新 */
    if (isPlaying) {
        return;
    }
    tryNum = 0;
    isPlaying = true;
    difficulty = document.getElementById("difficulty").value;
    name = document.getElementById("input-name").value;
    // console.log(difficulty);
    // for (let i = 0; i < 5; i++) { // 5回分の施行
    ballStarts(); //async関数にしたりして while文で特定状況まで処理止めるとか
        
    // }
    isPlaying = false;
}
startButton.addEventListener("click", startButtonPushed);



// tmp
document.body.getElementsByClassName("table-class")[0].rows[0].cells[1].innerHTML = "hoge";