'use strict';

// selectors
const oneBtn = document.getElementById("one");
const twoBtn = document.getElementById("two");
const threeBtn = document.getElementById("three");
const fourBtn = document.getElementById("four");
const fiveBtn = document.getElementById("five");
const sixBtn = document.getElementById("six");
const sevenBtn = document.getElementById("seven");
const eightBtn = document.getElementById("eight");
const nineBtn = document.getElementById("nine");
const zeroBtn = document.getElementById("zero");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const multiplyBtn = document.getElementById("multiply");
const divideBtn = document.getElementById("divide");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const answerBtn = document.getElementById("answer");

// event listeners
oneBtn.addEventListener("click", numFunc);
twoBtn.addEventListener("click", numFunc);
threeBtn.addEventListener("click", numFunc);
fourBtn.addEventListener("click", numFunc);
fiveBtn.addEventListener("click", numFunc);
sixBtn.addEventListener("click", numFunc);
sevenBtn.addEventListener("click", numFunc);
eightBtn.addEventListener("click", numFunc);
nineBtn.addEventListener("click", numFunc);
zeroBtn.addEventListener("click", numFunc);
plusBtn.addEventListener("click", numFunc);
minusBtn.addEventListener("click", numFunc);
multiplyBtn.addEventListener("click", numFunc);
divideBtn.addEventListener("click", numFunc);
clearBtn.addEventListener("click", clearFunc);
equalsBtn.addEventListener("click", numFunc);

//global variables
let rhs = 0;
let lhs = 0;
let waitingForLhs = false;
let curOp = null;

// functions
function numFunc(event) {
    const eTarget = event.target;
    const eVal = event.target.value;
    const ansVal = answer.innerText;
    if(ansVal.slice(-1) == "+" || ansVal.slice(-1) == "-" || ansVal.slice(-1) == "*" || ansVal.slice(-1) == "/"){
        answer.innerText = eVal;
        return;
    }
    console.log(eVal);
    if(eTarget.classList.contains("operator")){
        curOp = eVal;
        operatorFunc(event, eVal, answer.innerText)
    }
    if(eVal == "="){
        console.log("equals btn");
        return;
    }
    answer.innerText == "0" ? answer.innerText = eVal : answer.innerText += eVal;
}

function operatorFunc(event, curNum) {
    let inputNum = parseFloat(curNum);
    // curOp = event.target.value;
    if(!waitingForLhs){
        rhs = inputNum;
    }else{
        switch(curOp){
            case ("+"): 
                rhs += inputNum;
                break;
            case ("-"): 
                rhs -= inputNum;
                break;
            case ("*"): 
                rhs *= inputNum;
                break;
            case ("/"): 
                rhs /= inputNum;
                break;
        }
        answer.innerText = rhs;
    }

    console.log("display value: " + answer.innerText);
    console.log("rhs: " + rhs);
    console.log("operator: " + curOp);
    console.log("lhs: " + lhs);
    waitingForLhs = true;
    return rhs;
}

function clearFunc() {
    answer.innerText = "0";
    rhs = 0;
    curOp = null;
    waitingForLhs = false;
}

function equalsFunc(event) {
    if(waitingForLhs){
        answer.innerText = rhs;
    }else{
        operatorFunc(event, answer.innerText);
    }
}