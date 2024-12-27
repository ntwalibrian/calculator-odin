function add(a, b) {
    return a + b;
  }
  
function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
    return "Error: Division by zero";
    }
    return a / b;
}

function modulus (a,b) {
    return a % b;
}
  


let firstNumber = "";
let secondNumber = "";
let onScreen = "";
let operator = "";
let answer = null;


function operate(operator, a, b) {
    switch (operator) {
      case "+":
        return add(a, b);
      case "-":
        return subtract(a, b);
      case "x":
        return multiply(a, b);
      case "/":
        return divide(a, b);
      case "%":
        return modulus(a,b);
      default:
        return "Invalid operator";
    }
}


//event listner on all numbers

const numbers = document.querySelectorAll('.digits')
const inputScreen = document.getElementById('user-input')

for (let number of numbers){
    number.addEventListener("click", () => {
        if (!operator) {
           firstNumber += number.value 
           onScreen += number.value
           inputScreen.textContent = onScreen
        } else {
            secondNumber += number.value
            onScreen += number.value
            inputScreen.textContent = onScreen
        }
        console.log(`firstnumber: ${firstNumber}, secondnumer: ${secondNumber}`)
    })
}

const operators = document.querySelectorAll('.operators') 

for (let oper of operators){
    oper.addEventListener("click", () => {
        if (firstNumber && secondNumber && operator) {
            answer = operate(operator,Number(firstNumber),Number(secondNumber))
            firstNumber = answer
            secondNumber = ""
            operator = oper.value
            onScreen = `${firstNumber} ${operator} `;
            inputScreen.textContent = onScreen
            resultScreen.textContent = answer
        } else if (firstNumber && operator) {
            operator = oper.value;
            onScreen = `${firstNumber} ${operator} `;
            inputScreen.textContent = onScreen;
        } else if (!operator) {
            console.log('oper clicked')
            operator = oper.value
            onScreen += ` ${oper.value} `
            inputScreen.textContent = onScreen
        }  
    })
}

const equals =  document.getElementById('equals')
const resultScreen = document.getElementById('results')

equals.addEventListener('click', () => {
    
    if (firstNumber && secondNumber && operator) {
        answer = operate(operator,Number(firstNumber),Number(secondNumber))
        resultScreen.textContent = answer
    } else {
        resultScreen.textContent = 'error?'
    }
})

const allClear =  document.getElementById("allclear") 

allClear.addEventListener('click', () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    answer = null;
    onScreen = "";
    inputScreen.textContent = "0";
    resultScreen.textContent = "\u00A0"
    console.log("Calculator reset");
})

const dot =  document.getElementById('decimal')

dot.addEventListener('click', () => {
    if (!operator) {
        // Add "0." to the first number if empty or just add the dot if not already present
        if (firstNumber === "") {
            firstNumber = "0.";
            onScreen = "0.";
        } else if (!firstNumber.includes(".")) {
            firstNumber += ".";
            onScreen += ".";
        }
        inputScreen.textContent = onScreen;
    } else {
        // Add "0." to the second number if empty or just add the dot if not already present
        if (secondNumber === "") {
            secondNumber = "0.";
            onScreen += "0.";
        } else if (!secondNumber.includes(".")) {
            secondNumber += ".";
            onScreen += ".";
        }
        inputScreen.textContent = onScreen;
    }
})

const clear = document.getElementById("clear")

clear.addEventListener('click', () => {
    if (!operator) {
        // Remove the last character from the first number
        firstNumber = firstNumber.slice(0, -1);
        onScreen = firstNumber;
    } else if (secondNumber) {
        // Remove the last character from the second number
        secondNumber = secondNumber.slice(0, -1);
        onScreen = `${firstNumber} ${operator} ${secondNumber}`;
    } else if (operator) {
        // If no second number, remove the operator
        operator = "";
        onScreen = firstNumber;
    }

    inputScreen.textContent = onScreen || "0";
})