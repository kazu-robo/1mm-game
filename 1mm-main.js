'use strict'
// 1行目に記載している 'use strict' は削除しないでください

/* let num = document.getElementById("input-number").value; */
let kickButton = document.getElementById("kick");
let startButton = document.getElementById("start");

let isKicked = false;
let isPlaying = false;
let isPoped = false;

let tryNum = 0;
let scoreTotal = 0;

let ballShade = document.getElementById("ball-shade");
let ball = document.getElementById("ball");

let difficulty = "0";
let playerName = "";

let randomCourse = 0;
let curveLoop = 0;

let ballPos = {
    x: 300,
    y: 0,
}
const online_x = 4;

function pxToMm(px){
    let mm = px * 44 / 7;
    mm = Math.floor(mm * 10) / 10;
    return mm;
}

// let blueBox = document.getElementsByClassName("box-blue-class")[0];

/* button押下時に呼び出し */
function kickButtonPushed(){
    if (isPlaying && !isKicked){
        isKicked = true;

        let kick_pos_x  = ballPos.x;
        ballShade.style.left = kick_pos_x + "px";
        ballShade.style.top = ballPos.y + "px";
        ballShade.style.visibility = "visible";

        scoreTotal += pxToMm(kick_pos_x - online_x);

        // ちょい待ちからの
        if (kick_pos_x >= 3.7 && kick_pos_x <= 5){
            document.body.getElementsByClassName("table-class")[0].rows[tryNum-1].cells[1].innerHTML = "1mm";
            scoreTotal -= pxToMm(kick_pos_x - online_x);
            scoreTotal += 1;
        }
        else if (pxToMm(kick_pos_x - online_x) > 0){
            if (pxToMm(kick_pos_x - online_x) < 10){
                document.body.getElementsByClassName("table-class")[0].rows[tryNum-1].cells[1].innerHTML = Math.floor(pxToMm(kick_pos_x - online_x) * 10)/10 + "mm";
            }
            else if (pxToMm(kick_pos_x - online_x) < 1000){
                document.body.getElementsByClassName("table-class")[0].rows[tryNum-1].cells[1].innerHTML = Math.floor(pxToMm(kick_pos_x - online_x))/10 + "cm";
            }
            else{
                document.body.getElementsByClassName("table-class")[0].rows[tryNum-1].cells[1].innerHTML = Math.floor(pxToMm(kick_pos_x - online_x)/10)/100 + "m";
            }
        }
        else {
            document.body.getElementsByClassName("table-class")[0].rows[tryNum-1].cells[1].innerHTML = "Game Over";
            document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = "Game Over";
            tryNum = 6;
        }
        
        // total
        if (tryNum === 5) {
            if (scoreTotal < 10){
                document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal * 10)/10 + "mm";
            }
            else if (scoreTotal < 1000){
                document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal)/10 + "cm";
            }
            else{
                document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = Math.floor(scoreTotal/10)/100 + "m";
            }
        }
    }
}
kickButton.addEventListener("click", kickButtonPushed);

function ballAnimation(){
    if (!isKicked) {
        // パス軌道
        if (difficulty === "1"){ // easy
            ballPos.x -= 3;
            ballPos.y += 3;
        }
        else if (difficulty === "2"){ //medium
            if (tryNum < 4) {
                ballPos.x -= 5;
                ballPos.y += 5;
            }
            else if (tryNum === 4){
                ballPos.x -= 7;
                ballPos.y += 1;
            }
            else {
                ballPos.x -= 6;
                ballPos.y += 3;
            }
        }
        else if (difficulty === "3"){ //difficult
            if (tryNum < 4) {
                ballPos.x -= 9;
                ballPos.y += 9;
            }
            else if (tryNum === 4){
                ballPos.x -= 10;
                ballPos.y += 2;
            }
            else {
                ballPos.x -= 8;
                ballPos.y += 5;
            }
        }
        else if (difficulty === "4"){ //super
            if (randomCourse === 1) {
                ballPos.x -= 9;
                ballPos.y += 9;
            }
            else if (randomCourse === 2) {
                ballPos.x -= 10;
                ballPos.y += 2;
            }
            else if (randomCourse === 3) {
                ballPos.x -= 8;
                ballPos.y += 5;
            }
            else if (randomCourse === 4) {
                ballPos.x -= 4;
                ballPos.y += 2;
            }
            else if (randomCourse === 5) {
                ballPos.x -= 9 - (curveLoop * 0.1);
                ballPos.y += 5 + (curveLoop * 0.1);
            }
            else if (randomCourse === 6) {
                ballPos.x -= 12 - (curveLoop * 0.18);
                ballPos.y += 6 + (curveLoop * 0.18);
            }
            else if (randomCourse === 7) {
                ballPos.x -= 9 + (curveLoop * 0.1);
                ballPos.y += 9 - (curveLoop * 0.1);
            }
            else if (randomCourse === 8) {
                ballPos.x -= 6 + (curveLoop * 0.18);
                ballPos.y += 12 - (curveLoop * 0.18);
            }
            else {
                console.log("[bug] random is not 1-8. random : " + random);
            }
            curveLoop++;
        }
        ball.style.left = ballPos.x + "px";
        ball.style.top =  ballPos.y + "px";
        
        // not kicked
        if (ballPos.x < -100 || ballPos.y > 350) {
            isKicked = true;
            ballPos.x = 300;
            ballPos.y = 0;
            ball.style.left = ballPos.x + "px";
            ball.style.top =  ballPos.y + "px";
            
            document.body.getElementsByClassName("table-class")[0].rows[tryNum-1].cells[1].innerHTML = "Game Over";
            document.body.getElementsByClassName("table-class")[0].rows[5].cells[1].innerHTML = "Game Over";
            tryNum = 6;
        }
    }
    else if (ballPos.y > 0) { //after kicked
        if (difficulty === "1" || difficulty === "2"){
            ballPos.x += 3;
            ballPos.y -= 8;
        }
        else if (difficulty === "3" || difficulty === "4"){
            ballPos.x += 5;
            ballPos.y -= 10;
        }
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
        else {
            ballPos.x = 300;
            ballPos.y = 0;
            ball.style.left = ballPos.x + "px";
            ball.style.top =  ballPos.y + "px";
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
    ball.style.top =  ballPos.y + "px";
    randomCourse = Math.floor(Math.random() * 8) + 1;
    curveLoop = 0;
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
    scoreTotal = 0;
    isPlaying = true;
    difficulty = document.getElementById("difficulty").value;
    playerName = document.getElementById("input-name").value;
    for (let i = 0; i < 6; i++) {
        document.body.getElementsByClassName("table-class")[0].rows[i].cells[1].innerHTML = "";
    }
    
    // console.log(difficulty);
    // for (let i = 0; i < 5; i++) { // 5回分の施行
    ballStarts(); //async関数にしたりして while文で特定状況まで処理止めるとか
        
    // }
}
startButton.addEventListener("click", startButtonPushed);



// tmp
