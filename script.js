const calculator = document.querySelector(".calculator-grid");
const keys = calculator.querySelector(".calculator-keys");

const previousOperand = calculator.querySelector(".previous-operand");
const currentOperand = calculator.querySelector(".current-operand");
const output = calculator.querySelector(".output");

keys.addEventListener("click", (event) => {
  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = currentOperand.textContent;
  const type = key.dataset.type;
  const previousKeyType = calculator.dataset.previousKeyType;

  // number key rule
  if (type === "number") {
    if (previousKeyType === "equals") {
      currentOperand.textContent = keyValue;
      previousOperand.textContent = "0";
      delete calculator.dataset.firstNumber;
      delete calculator.dataset.operator;
      calculator.querySelector('[data-state="selected"]').dataset.state = "";
    }

    if (displayValue === "0") {
      currentOperand.textContent = keyValue;
    } else if (previousKeyType === "operator") {
      currentOperand.textContent = keyValue;
    } else {
      currentOperand.textContent = displayValue + keyValue;
    }
  }

  // dot key rule
  if (type === "dot") {
    if (currentOperand.textContent.includes(".")) {
      return;
    } else if (previousKeyType === "operator") {
      currentOperand.textContent = "0" + keyValue;
    } else {
      currentOperand.textContent = displayValue + keyValue;
    }
  }

  //operator key rule
  if (type === "operator") {
    //leave operator selected, and reset after new operator chosen
    const currentActiveOperator = calculator.querySelector(
      '[data-state="selected"]'
    );
    if (currentActiveOperator) {
      currentActiveOperator.dataset.state = "";
    }
    const firstNumber = parseFloat(calculator.dataset.firstNumber);
    const operator = calculator.dataset.operator;
    const secondNumber = parseFloat(displayValue);
    const symbol = calculator.dataset.symbol;

    if (previousKeyType === "equals") {
      calculator.dataset.firstNumber = displayValue;
    } else if (firstNumber && operator && previousKeyType !== "operator") {
      const calc = calculate(firstNumber, operator, secondNumber);
      currentOperand.textContent = calc;

      calculator.dataset.firstNumber = calc;

      previousOperand.textContent =
        firstNumber + " " + symbol + " " + secondNumber;
    } else {
      calculator.dataset.firstNumber = displayValue;
    }

    key.dataset.state = "selected";
    calculator.dataset.previousKeyType = "operator";

    //save first value and operator
    calculator.dataset.operator = key.dataset.key;
    calculator.dataset.symbol = keyValue;
  }

  if (type === "equals") {
    const firstNumber = parseFloat(calculator.dataset.firstNumber);
    const operator = calculator.dataset.operator;
    const secondNumber = parseFloat(displayValue);
    const symbol = calculator.dataset.symbol;

    if (currentOperand.textContent === "") {
      currentOperand.textContent = "0";
    } else if (currentOperand.textContent === "0") {
      return;
    } else if (!calculator.dataset.operator) {
      return;
    }
    //results on the display
    currentOperand.textContent = calculate(firstNumber, operator, secondNumber);
    previousOperand.textContent =
      firstNumber + " " + symbol + " " + secondNumber;
    calculator.querySelector('[data-state="selected"]').dataset.state = "";
  }
  // calculations
  function calculate(firstNumber, operator, secondNumber) {
    let result = "";
    if (operator === "add") result = firstNumber + secondNumber;
    if (operator === "subtract") result = firstNumber - secondNumber;
    if (operator === "multiply") result = firstNumber * secondNumber;
    if (operator === "divide") result = firstNumber / secondNumber;

    return Math.round((result + Number.EPSILON) * 100) / 100;
  }

  //Reset calculator
  if (type === "all-clear") {
    currentOperand.textContent = "0";
    previousOperand.textContent = "0";
    delete calculator.dataset.firstNumber;
    delete calculator.dataset.operator;
    calculator.querySelector('[data-state="selected"]').dataset.state = "";
  }

  //delete last key
  if (type === "delete") {
    if (previousKeyType === "equals") {
      return;
    }
    if (calculator.dataset.previousKeyType === "operator") {
      delete calculator.dataset.operator;
      calculator.querySelector('[data-state="selected"]').dataset.state = "";
    } else if (currentOperand.textContent === "") {
      currentOperand.textContent = "0";
    } else if (currentOperand.textContent === "0") {
      return;
    } else {
      currentOperand.textContent = currentOperand.textContent.slice(0, -1);
    }
  }
  //reset previous keytype to in order to concatenate more than 1 number. this is a general rule instead of having to place it for "number", and "operator"
  calculator.dataset.previousKeyType = type;
});
