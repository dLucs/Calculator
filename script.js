const calculator = document.querySelector(".calculator-grid");
const keys = calculator.querySelector(".calculator-keys");

// const previousOperand = document.querySelector('.previous-operand')
const currentOperand = calculator.querySelector(".current-operand");
const output = calculator.querySelector(".output");

keys.addEventListener("click", (event) => {
  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = currentOperand.textContent;
  const type = key.dataset.type;

  // number key rule
  if (type == "number")
    if (displayValue == "0") {
      currentOperand.textContent = keyValue;
    } else {
      currentOperand.textContent = displayValue + keyValue;
    }

  //operator key rule
  if (type == "operator") {
    console.log(key);

    calculator.dataset.previousKeyType = "operator";
  }
});

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (operator, a, b) {};
