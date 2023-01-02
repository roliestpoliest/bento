'use strict';
//global variables
let displayValue = "null";
let displayOperator = "";
let rhs = null;
let lhs = null;
let prevOp = null;
let nextOp = null;
let inputList = "";
let isShuffle = false;
let counter = 0;

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
const displayOp = document.getElementById("displayOp");

// event listeners
document.addEventListener("keydown", validInput);
oneBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
twoBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
threeBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
fourBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
fiveBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
sixBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
sevenBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
eightBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
nineBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
zeroBtn.addEventListener("click", (e) => appendNum(e.target.defaultValue));
plusBtn.addEventListener("click", (e) => {queueOperation(e.target.defaultValue)});
minusBtn.addEventListener("click", (e) => {queueOperation(e.target.defaultValue)});
multiplyBtn.addEventListener("click", (e) => {queueOperation(e.target.defaultValue)});
divideBtn.addEventListener("click", (e) => {queueOperation(e.target.defaultValue)});
equalsBtn.addEventListener("click", (e) => {queueOperation(e.target.defaultValue)});
decimalBtn.addEventListener("click", appendDot);
clearBtn.addEventListener("click", clearFunc);
displayOp.addEventListener("click", function(){
    counter++;
    if (counter % 3 == 0){
        isShuffle = true
        displayOp.style.backgroundColor = "#4f518c";
        displayOp.style.color = "white";
    }else{
        isShuffle = false;
        displayOp.style.backgroundColor = "#e4d9ff";
        displayOp.style.color = "#495069";
    }
    console.log(counter + " " + isShuffle);
});

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

    // console.log(keycode);
    if(acceptableKeys.includes(keycode)){
        // console.log(String.fromCharCode(keycode));
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
    displayOp.innerText = op;
};

function appendNum(value){
    if(displayValue == "null") displayValue = "";
    
    inputList += value;
    displayValue += value;
    updateDisplay(displayValue);
    if(isShuffle) shuffleNumbers();
};

function appendDot() {
    if(!displayValue.includes('.')){
        displayValue == "null" ? displayValue = "0." : displayValue += ".";
        inputList += ".";
        updateDisplay(displayValue);
    }
};

function queueOperation(value) {
    let op = null;
    switch(value){
        case ("+"): op = "+"; break;
        case ("-"): op = "-"; break;
        case ("*"): op = "*"; break;
        case ("/"): op = "/"; break;
        case ("="): op = "="; break;
        default: break;
    }
    if(isShuffle) shuffleOperators();
    displayOperator = op;
    updateDisplayOperator(displayOperator);
    
    if(inputList.slice(-1) == "+" || inputList.slice(-1) == "-" || inputList.slice(-1) == "*" || inputList.slice(-1) == "/")
        nextOp == null ? prevOp = null : nextOp = null; 
    inputList += value;
    displayValue == "null" ? rhs = null : 
        lhs == null ? lhs = displayValue : rhs = displayValue;
    prevOp == null ? prevOp = op : nextOp = op;
    if(lhs != null && prevOp != null && rhs != null) calculate();

    displayValue = "null";
    calculate();
};

function calculate(){
    if(lhs != null && rhs != null && prevOp != null){
        let solution = 0;
        switch(prevOp){
            case ("+"): solution = parseFloat(lhs) + parseFloat(rhs); break;
            case ("-"): solution = parseFloat(lhs) - parseFloat(rhs); break;
            case ("*"): solution = parseFloat(lhs) * parseFloat(rhs); break;
            case ("/"): solution = parseFloat(lhs) / parseFloat(rhs); break;
            default: break;
        }
        lhs = solution;
        rhs = null;
        prevOp = nextOp;
        nextOp = null;
        if(prevOp == "=") prevOp = null;
        displayValue = "null";
        updateDisplay(solution);
    }
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
    
    oneBtn.value = "1";
    twoBtn.value = "2";
    threeBtn.value = "3";
    fourBtn.value = "4";
    fiveBtn.value = "5";
    sixBtn.value = "6";
    sevenBtn.value = "7";
    eightBtn.value = "8";
    nineBtn.value = "9";
    zeroBtn.value = "0";
    plusBtn.value = "+";
    minusBtn.value = "-";
    multiplyBtn.value = "*";
    divideBtn.value = "/";
    equalsBtn.value = "=";

    isShuffle = false;
    displayOp.style.backgroundColor = "#e4d9ff";
    displayOp.style.color = "#495069";

};

function shuffle(array) {
    var m = array.length, t, i;

    while(m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function shuffleNumbers(){
    const nums = shuffle(["1","2","3","4","5","6","7","8","9","0"]);
    console.log(nums);
    oneBtn.value = nums[1];
    twoBtn.value = nums[2];
    threeBtn.value = nums[3];
    fourBtn.value = nums[4];
    fiveBtn.value = nums[5];
    sixBtn.value = nums[6];
    sevenBtn.value = nums[7];
    eightBtn.value = nums[8];
    nineBtn.value = nums[9];
    zeroBtn.value = nums[0];
};

function shuffleOperators(){
    const ops = shuffle(["+","-","*","/","="]);
    console.log(ops);
    plusBtn.value = ops[0];
    minusBtn.value = ops[1];
    multiplyBtn.value = ops[2];
    divideBtn.value = ops[3];
    equalsBtn.value = ops[4];
}

function toggleShuffle(){
    counter = counter + 1;
    console.log(counter + " " + isShuffle);
    if(counter % 3 == 0) isShuffle ? isShuffle = false : isShuffle = true;
}