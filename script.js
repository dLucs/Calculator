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
  if (type == "number") {
    if (displayValue == "0") {
      currentOperand.textContent = keyValue;
    } else if (previousKeyType == "operator") {
      currentOperand.textContent = keyValue;
    } else {
      currentOperand.textContent = displayValue + keyValue;
    }
  }

  //operator key rule
  if (type == "operator") {
    //leave operator selected, and reset after new operator chosen
    const currentActiveOperator = calculator.querySelector(
      '[data-state="selected"]'
    );
    if (currentActiveOperator) {
      currentActiveOperator.dataset.state = "";
    }

    key.dataset.state = "selected";

    //save first value and operator
    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
    calculator.dataset.symbol = keyValue;
  }

  if (type == "equals") {
    const firstNumber = parseInt(calculator.dataset.firstNumber);
    const operator = calculator.dataset.operator;
    const secondNumber = parseInt(displayValue);
    const symbol = calculator.dataset.symbol;

    let result = "";

    if (operator == "add") {
      result = firstNumber + secondNumber;
    }

    if (operator == "subtract") {
      result = firstNumber - secondNumber;
    }

    if (operator == "multiply") {
      result = firstNumber * secondNumber;
    }

    if (operator == "divide") {
      result = firstNumber / secondNumber;
    }
    //results on the display
    currentOperand.textContent = result;
    previousOperand.textContent =
      firstNumber + " " + symbol + " " + secondNumber;
  }
  //reset previous keytype to in order to concatenate more than 1 number. this is a general rule instead of having to place it for "number", and "operator"
  calculator.dataset.previousKeyType = type;
});
