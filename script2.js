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
// const displayOp = document.getElementById("displayOp");

// event listeners
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
// equalsBtn.addEventListener("click", setEquation);
equalsBtn.addEventListener("click", queueOperation);
inputNum.addEventListener("keyup", validInput);

let displayValue = "0";
let displayOperator = "?";
let lhs = null;
let rhs = null;
let prevOp = null;
let nextOp = null;

function updateDisplay(input){
    const display = document.getElementById("inputNum");
    display.value = input;
};

function appendNum(event){
    const eVal = event.target.defaultValue;
    if(displayValue == "0"){
        displayValue = "";
    }
    displayValue += eVal;
    updateDisplay(displayValue);
};

function appendDot(){
    if(displayValue.indexOf(".") < 0){
        displayValue += ".";
        updateDisplay(displayValue);
    }
};

function queueOperation(event){
    const eVal = event.target.defaultValue;
    let op = null;
    switch(eVal){
        case ("+"):
            op = "+";
            break;
        case ("-"):
            op = "-";
            break;
        case ("*"):
            op = "*";
            break;
        case ("/"):
            op = "/";
            break;
        case ("="):
            op = "=";
            break;
        default:
            break;
    }
    if(op == "=" && nextOp == null){
        return;
    }
    if(op != null){
        if(rhs == null){
            rhs = displayValue;
        }else{

            lhs = rhs;
            rhs = displayValue;
        }
        if(nextOp == null){
            nextOp = op;
        }else if(op == "="){
            prevOp = nextOp;
            nextOp = null;
        }else{
            prevOp = nextOp;
            nextOp = op;
        }
        displayValue = 0;
        console.log(lhs + "---" + rhs + "---" + prevOp);
    }
    calculate();
};
function clearFunc(){
    displayValue = "0"
    updateDisplay(displayValue);
    lhs = null;
    rhs = null;
    prevOp = null;
    nextOp = null;
};
function calculate(){
    console.log("calculate")
    if(lhs != null && rhs != null && prevOp != null){
        let val = 0;
        switch(prevOp){
            case ("+"):
                val = parseFloat(lhs) + parseFloat(rhs);
                break;
            case ("-"):
                val = parseFloat(lhs) - parseFloat(rhs);
                break;
            case ("*"):
                val = parseFloat(lhs) * parseFloat(rhs);
                break;
            case ("/"):
                val = parseFloat(lhs) / parseFloat(rhs);
            default:
                break;
        }
        console.log(val);
        rhs = val;
        updateDisplay(val);
    }
};

function isTyping(event){
    console.log(event);
    if(event.keyCode == 8){
        displayValue = displayValue.substring(0, displayValue.length -1);
    }
    const acceptableKeys = "+-*/=";
    if(!isNaN(event.key)){
        if(displayValue == "0"){
            displayValue = "";
        }
        displayValue += event.key;
        updateDisplay(displayValue);
    }else if(event.key == "."){
        if(displayValue.indexOf(".") < 0){
            displayValue += event.key;
        }
        updateDisplay(displayValue);
    }else if(acceptableKeys.indexOf(event.key) >= 0 || event.keyCode == 13){
        let op = null;
        if(event.keyCode == 13){
            op = "=";
        }else{
            switch(event.key){
                case ("+"):
                    op = "+";
                    break;
                case ("-"):
                    op = "-";
                    break;
                case ("*"):
                    op = "*";
                    break;
                case ("/"):
                    op = "/";
                    break;
                case ("="):
                    op = "=";
                    break;
                case ("Enter"):
                    op = "=";
                    break;
                default:
                    break;
            }
        }
        if(op == "=" && nextOp == null){
            return;
        }
        if(op != null){
            if(rhs == null){
                rhs = displayValue;
            }else{

                lhs = rhs;
                rhs = displayValue;
            }
            if(nextOp == null){
                nextOp = op;
            }else if(op == "="){
                prevOp = nextOp;
                nextOp = null;
            }else{
                prevOp = nextOp;
                nextOp = op;
            }
            displayValue = 0;
            console.log(lhs + "---" + rhs + "---" + prevOp);
        }
        calculate();
    }else{
        updateDisplay(displayValue);
    }
};
function validInput(){};
