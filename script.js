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
const decimalBtn = document.getElementById("decimal");
const answerBtn = document.getElementById("answer");
const inputNum = document.getElementById("inputNum");
const showOp = document.getElementById("displayOp");

// event listeners
document.addEventListener("keydown", validInput);
oneBtn.addEventListener("click", appendNum);
twoBtn.addEventListener("click", appendNum);
threeBtn.addEventListener("click", appendNum);
fourBtn.addEventListener("click", appendNum);
fiveBtn.addEventListener("click", appendNum);
sixBtn.addEventListener("click", appendNum);
sevenBtn.addEventListener("click", appendNum);
eightBtn.addEventListener("click", appendNum);
nineBtn.addEventListener("click", appendNum);
zeroBtn.addEventListener("click", appendNum);
plusBtn.addEventListener("click", queueOperation);
minusBtn.addEventListener("click", queueOperation);
multiplyBtn.addEventListener("click", queueOperation);
divideBtn.addEventListener("click", queueOperation);
decimalBtn.addEventListener("click", appendDot);
clearBtn.addEventListener("click", clearFunc);
equalsBtn.addEventListener("click", queueOperation);
// inputNum.addEventListener("keyup", validInput);


// let voidOperator = false;

inputNum.focus();
//global variables
let displayValue = "null";
let displayOperator = "";
let rhs = null;
let lhs = null;
let prevOp = null;
let nextOp = null;
let inputList = "";

// functions
function validInputHelper(event){
    if(event.keyCode == 191){
        event.preventDefault();
        validInput(event)
    }
}

function validInput(event) {
    const keycode = event.keyCode;
    const acceptableKeys = [48,49,50,51,52,53,54,55,56,61,173,56,191,67,190];
    const numberKeys = [48,49,50,51,52,53,54,55,56];
    const symbolKeys = [61,173,56,191];
    const clearKey = 67;
    const decimalKey = 190;

    // prevents firefox's quick find
    if(event.keyCode == 191){
        event.preventDefault();
    }

    console.log(keycode);
    if(acceptableKeys.includes(keycode)){
        console.log(String.fromCharCode(keycode));
        // if(numberKeys.includes(keycode)){
        //     // appendNum(event);
        // }
    }
}

function updateDisplay(input){
    const display = document.getElementById("inputNum");
    display.value = input;
};

function updateDisplayOperator(op){
    const displayOp = document.getElementById("displayOp");
    displayOp.innerText = op;
};

function clearFunc() {
    displayValue = "null";
    displayOperator = "";
    inputList = "";
    rhs = null;
    lhs = null;
    prevOp = null;
    nextOp = null;
    updateDisplay("");
    updateDisplayOperator("");
};

function appendNum(event){
    if(displayValue == "null"){
        displayValue = "";
    }
    inputList += event.target.defaultValue;
    console.log("list: " + inputList);
    displayValue += event.target.defaultValue;
    updateDisplay(displayValue);
    console.log("displayValue: " + displayValue);
    console.log("append num: " + lhs + " " + prevOp + "---" + rhs + "---" + nextOp);
};

function appendDot(event) {
    if(!displayValue.includes('.')){
        displayValue == "null" ? displayValue = "0." : displayValue += ".";
        inputList += event.target.defaultValue;
        console.log("list: " + inputList);
        updateDisplay(displayValue);
    }
    console.log("displayValue: " + displayValue);
    console.log("append dot: " + lhs + " " + prevOp + " " + rhs + " " + nextOp);
};

function queueOperation(event) {
    const eVal = event.target.defaultValue;  
    let op = null;
    
    switch(eVal){
        case ("+"): 
            op = "+"
            break;
        case ("-"): 
            op = "-"
            break;
        case ("*"): 
            op = "*"
            break;
        case ("/"): 
            op = "/"
            break;
        case ("="):
            op = "=";
            break;
        default:
            break;
    }
    displayOperator = op;
    updateDisplayOperator(displayOperator);
    
    if(inputList.slice(-1) == "+" || inputList.slice(-1) == "-" || inputList.slice(-1) == "*" || inputList.slice(-1) == "/"){
        console.log("change signs");
        nextOp == null ? prevOp = null : nextOp = null;
    }
    inputList += event.target.defaultValue;
    console.log("list: " + inputList);

    displayValue == "null" ? rhs = null : 
        lhs == null ? lhs = displayValue : rhs = displayValue;
    prevOp == null ? prevOp = op : nextOp = op;

    console.log("q: " + lhs + " " + prevOp + " " + rhs + " " + nextOp);
    if(lhs != null && prevOp != null && rhs != null){
        calculate();
    }

    displayValue = "null";
    calculate();
};

function calculate(){
    if(lhs != null && rhs != null && prevOp != null){
        let solution = 0;
        switch(prevOp){
            case ("+"):
                solution = parseFloat(lhs) + parseFloat(rhs);
                break;
            case ("-"):
                solution = parseFloat(lhs) - parseFloat(rhs);
                break;
            case ("*"):
                solution = parseFloat(lhs) * parseFloat(rhs);
                break;
            case ("/"):
                solution = parseFloat(lhs) / parseFloat(rhs);
            default:
                break;
        }
        console.log("solution: " + solution);
        lhs = solution;
        rhs = null;
        prevOp = nextOp;
        nextOp = null;
        if(prevOp == "="){
            prevOp = null;
        }
        displayValue = "null";
        updateDisplay(solution);
        console.log("calc: " + lhs + " " + prevOp + " " + rhs + " " + nextOp);
    }
};