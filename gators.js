'use strict'
// 1行目に記載している 'use strict' は削除しないでください

/* let num = document.getElementById("input-number").value; */
let button = document.getElementById("send-button");

let blueBox = document.getElementsByClassName("box-blue-class")[0];

/* button押下時に呼び出し */
function sendButtonPushed(){
    /* ここでnum数を更新 */
    let num = document.getElementById("input-number").value;
    /* blueBoxにappend */
    blueBox.innerHTML = "";
    for (let i = 0; i < num; i++){
        blueBox.innerHTML += "🐊";
    }
    
}
button.addEventListener("click", sendButtonPushed);