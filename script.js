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


let voidOperator = false;

inputNum.focus();
//global variables
let displayValue = "null";
let displayOperator = "?";
let rhs = null;
let lhs = null;
let prevOp = null;
let nextOp = null;
let inputList = "";
// let prevKeyType = inputList.slice(-1);

// functions
function validInput(event) {}

function updateDisplay(input){
    const display = document.getElementById("inputNum");
    display.value = input;
}

function updateDisplayOperator(op){
    const displayOp = document.getElementById("displayOp");
    displayOp.innerText = op;
}

function clearFunc() {
    displayValue = "null";
    displayOperator = "?";
    updateDisplay("");
    updateDisplayOperator("");
    inputList = "";
    rhs = null;
    lhs = null;
    prevOp = null;
    nextOp = null;
}

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
}

function appendDot(event) {
    if(!displayValue.includes('.')){
        displayValue += ".";
        inputList += event.target.defaultValue;
        console.log("list: " + inputList);
        updateDisplay(displayValue);
    }
    console.log("displayValue: " + displayValue);
    console.log("append dot: " + lhs + " " + prevOp + " " + rhs + " " + nextOp);
}

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
    if(lhs != null && prevOp != null && rhs != null){
        calculate();
    }

    displayValue = "null";

    // if(op == "=" && nextOp == null){
    //     return;
    // }

    // if(){}

    // if(op != null){
    //     if(rhs == null){
    //         rhs = displayValue;
    //     }else{
    //         lhs = rhs;
    //         rhs = displayValue;
    //     }
    //     if(nextOp == null){
    //         nextOp = op;
    //     }else if(op == "="){
    //         prevOp = nextOp;
    //         nextOp = null;
    //     }else{
    //         prevOp = nextOp
    //         nextOp = op;
    //     }
    //     displayValue = 0;
        
        
    // }
    calculate();
}

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

function isTyping(event){}
     

// function appendNum(event){
//     const eTarget = event.target;
//     const eVal = event.target.value;
//     console.log(eVal);
//     console.log("3333333333");
//     if(voidOperator == true){
//         inputNum.value = "";
//         voidOperator = false;
//         console.log("4444");
//     }
//     if(inputNum.value.slice(-1) == "+" || inputNum.value.slice(-1) == "-" || inputNum.value.slice(-1) == "*"){
//         inputNum.value = eVal;
//         console.log("append: " + event.target.value + ", new number: " + inputNum.value);
//         return;
//     }
//     if(inputNum.value == "" && eVal == "."){
//         inputNum.value = "0.";
//         console.log("append: " + event.target.value + ", new number: " + inputNum.value);
//         return;
//     }
//     inputNum.value == "0" ? inputNum.value = eVal : inputNum.value += eVal;
//     console.log("append: " + event.target.value + ", new number: " + inputNum.value);
//     console.log("equation: " + rhs + " " + prevOp + " " + lhs);
// }

// function selectOperator(event){
//     const eVal = event.target.value;
//     inputNum.value += eVal;
//     console.log(inputNum.value);
//     rhs == null ? rhs = parseFloat(inputNum.value) : lhs = parseFloat(inputNum.value);
//     if(eVal == "="){
//         voidOperator = true;
//     }else{
//         voidOperator = false;
//     }
//     prevOp == null ? prevOp = eVal : nextOp = eVal;
//     console.log("calculate: " + rhs + " " + prevOp + " " + lhs);
//     if(lhs != null){
//         calculate(event);
//     }
// }


// function validInput(event){
//     // if (event.defaultPrevented) {
//     //     return;
//     // }
//     // var ele = document.getElementById("inputNum");
//     // var currentvalue = ele.value;
//     // if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 190 || event.keyCode <= 67) { 
//     //     // 0-9 only
//     //     console.log(event.keyCode);
//     //     currentvalue += keyCode;
//     // }else{
//     //     return false;
//     // }
// }

// // function numFunc(event){
// //     const eTarget = event.target;
// //     const eVal = event.target.value;
// //     if(inputNum.value.slice(-1) == "+" || inputNum.value.slice(-1) == "-" || inputNum.value.slice(-1) == "*"){
// //         inputNum.value = eVal;
// //         return;
// //     }

// //     if(inputNum.value == "" && eVal == "."){
// //         if(inputNum.value.includes(".")){
// //             return;
// //         }
// //         inputNum.value = "0.";
// //         return;
// //     }
// //     // if((rhs == null && eTarget.classList.contains("operator")) || (rhs == null && eVal == "=")){
// //         //     inputNum.value = "";
// //         //     // document.getElementById("inputNum")[0].placeholder = "-1";
// //         //     return;   
// //         // }
// //     if(eTarget.classList.contains("operator")){
// //         console.log("classList.contains: " + eVal);
// //         // nextOp = eVal;
// //         // console.log("rhs: " + inputNum.value);
// //         // rhs = inputNum.value
// //         if(rhs != null && prevOp != null && lhs != null){
// //             calculate();
// //         }
// //         if(!operatorFunc(event)){
// //             return;
// //         }
// //     }
// //     inputNum.value == "0" ? inputNum.value = eVal : inputNum.value += eVal;
// //     // console.log("op func, rhs: " + rhs + " op: " + nextOp + " lhs: " + lhs);

// // }

// // function operatorFunc(event){
// //     const eVal = event.target.value;
// //     console.log(lhs + " " + rhs);
// //     rhs == null ? rhs = parseFloat(inputNum.value) : lhs = parseFloat(inputNum.value);
// //     // if(rhs == null){
// //     //     rhs = parseFloat(inputNum.value);
// //     //     console.log("1111111-" + rhs);
// //     // }else{
// //     //     lhs = parseFloat(inputNum.value);
// //     //     console.log("22222222 -" + lhs);
// //     // }
// //     prevOp == null ? (prevOp = eVal) : (nextOp = eVal);
// //     console.log("op func, rhs: " + rhs + ", op: " + prevOp + ", lhs: " + lhs + " -> next op: " + nextOp);

// //     // if(isNaN(parseFloat(inputNum.value))){
// //     //     console.log("is NaN");
// //     //     inputNum.value = "";
// //     //     rhs = null;
// //     //     return false;
// //     // }
// //     if(rhs != null && lhs != null && prevOp != null){
// //         calculate(event);
// //     }
// //     return true;
// // }

// function setEquation(event){
//     if(inputNum.value.slice(-1) == "+" || inputNum.value.slice(-1) == "-" || inputNum.value.slice(-1) == "*"){
//         inputNum.value = rhs;
//         prevOp = null;
//         nextOp = null;
//         return;
//     }
//     if(prevOp == null){
//         return;
//     }
//     lhs = parseFloat(inputNum.value);
//     console.log("calculate: " + rhs + " " + prevOp + " " + lhs);
//     calculate(event);
// }

// function calculate(event){
//     let solution = 0;
    
//     console.log(prevOp);
//     console.log(nextOp);
//     switch(prevOp){
//         case ("+"): 
//             solution = rhs + lhs;
//             break;
//         case ("-"): 
//             solution = rhs - lhs;
//             break;
//         case ("*"): 
//             solution = rhs * lhs;
//             break;
//         case ("/"): 
//             solution = rhs / lhs;
//             break;
//         default:
//             break;
//     }
//     console.log("calculate: " + rhs + " " + prevOp + " " + lhs + " = " + solution);
//     inputNum.value = solution;
//     rhs = solution
//     lhs = null;
//     prevOp = nextOp;
//     nextOp = null;
    
//     console.log(prevOp);
//     console.log(nextOp);
        
//     console.log("after calculate: " + rhs + " " + prevOp + " " + lhs);
// }




// function numFunc(event) {
//     const eTarget = event.target;
//     const eVal = event.target.value;
//     const ansVal = inputNum.value;
//     if(ansVal.slice(-1) == "+" || ansVal.slice(-1) == "-" || ansVal.slice(-1) == "*" || ansVal.slice(-1) == "/"){
//         inputNum.value = eVal;
//         return;
//     }
//     console.log(eVal);
//     if(eTarget.classList.contains("operator")){
//         nextOp = eVal;
//         operatorFunc(event, eVal, inputNum.value)
//     }
//     if(eVal == "="){
//         console.log("equals btn");
//         return;
//     }
//     inputNum.value == "0" ? inputNum.value = eVal : inputNum.value += eVal;
// }

// function operatorFunc(event, curNum) {
//     let inputNum = parseFloat(curNum);
//     // nextOp = event.target.value;
//     if(!waitingForLhs){
//         rhs = inputNum;
//     }else{
//         switch(nextOp){
//             case ("+"): 
//                 rhs += inputNum;
//                 break;
//             case ("-"): 
//                 rhs -= inputNum;
//                 break;
//             case ("*"): 
//                 rhs *= inputNum;
//                 break;
//             case ("/"): 
//                 rhs /= inputNum;
//                 break;
//         }
//         inputNum.value = rhs;
//     }

//     console.log("display value: " + inputNum.value);
//     console.log("rhs: " + rhs);
//     console.log("operator: " + nextOp);
//     console.log("lhs: " + lhs);
//     waitingForLhs = true;
//     return rhs;
// }


// function equalsFunc(event) {
//     if(waitingForLhs){
//         inputNum.value = rhs;
//     }else{
//         operatorFunc(event, inputNum.value);
//     }
// }


