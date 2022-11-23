// querySelectorAll
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");

//querySelector
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

/* TODO: Add Keyboard Functionality and make this calculator scientific */

let currentOperand = "",
  previousOperand = "",
  operation;

/*
 * clear()             -> Clears the input
 * delete()            -> deletes the currentOperand's last charachter
 * appendNumber()      -> add whatever is sent as input (lookout for '.')
 * chooseOperation()   -> updates the operation and sets the current operand. If the operand is same as the previous on then we compute the value
 * compute()           -> computes the value based on the operation
 * getDisplayNumber()  -> returns the number to be displayed
 * updateDisplay()     -> will use the getDisplayNumber() function and update the DOM
 */

function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

function deleteChar() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(newOperation) {
  if (currentOperand === "") return;
  if (previousOperand !== "") {
    compute();
  }
  operation = newOperation;
  previousOperand = currentOperand;
  currentOperand = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandTextElement.innerText = "";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  deleteChar();
  updateDisplay();
});
