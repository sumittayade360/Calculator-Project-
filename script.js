const userInput = document.querySelector(".user-input");
const resetKey = document.querySelector(".reset-key");
const answerKey = document.querySelector(".answer-key");
const deleteKey = document.querySelector(".delete-key");
const keys = document.querySelectorAll(".key");

let lastKeyIsOperator = false;
let decimalAdded = false;

const keyClickHandler = (event) => {
  const value = event.target.innerText;
  
  if (value === "." && decimalAdded) return;

  if (userInput.value.length === 0) {
    if ("x/%".includes(value)) return; // Disallow '*' and '%' as the first character
  }

  if ("+-x/".includes(value)) {
    if (lastKeyIsOperator) {
      userInput.value = userInput.value.slice(0, -1) + value;
      return;
    }
    lastKeyIsOperator = true;
    decimalAdded = false;
  } else {
    lastKeyIsOperator = false;
    if (value === ".") decimalAdded = true;
  }

  userInput.value += value;
  userInput.scrollLeft = userInput.scrollWidth;
};

const resetHandler = () => {
  userInput.value = "";
};

const deleteHandler = () => {
  userInput.value = userInput.value.slice(0, -1);
};

const expressionHandler = (expression) => {
  return eval(expression.replace(/x/g, "*"));
};

const answerHandler = () => {
  userInput.value = expressionHandler(userInput.value);
};

keys.forEach(key => key.addEventListener("click", keyClickHandler));
resetKey.addEventListener("click", resetHandler);
deleteKey.addEventListener("click", deleteHandler);
answerKey.addEventListener("click", answerHandler);
