//elementos que vamos tratar
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//o contructor serve para inicializar o objecto padrao.Especificamos as diferenças no constructor
class Calculator{
    constructor(previousOperationText, currentOperationText){
        //Propriedade objecto-impressos na tela
this.previousOperationText = previousOperationText;
this.currentOperationText = currentOperationText;
 //propriedade impresso no momento.
this.currentOperation = "";
    }

//primeira açao na calculadora colocar os digitos

addDigit(digit) {
    console.log(digit);
    // Check if number already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
this.currentOperation = digit;
this.updateScreen();
}

//Process all calculate operations
processOperation(operation){
    //check if the current value is empty
    if ( this.currentOperationText.innerText === "" && operation !== "C") {
        //Change operation
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
    }
    
    
    //get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

switch(operation){
    //8 argumentos que vai enviar
    case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
    case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
    case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
    case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
    case "DEL":
        this.processDelOperator();
        break;
    case "CE":
        this.processClearCurrentOperator();
        break;
    case "C":
        this.processClearOperator();
        break;
    case "=":
        this.processEqualOperator();
        break;
        
        default:
            return;
        }
}
//change values of the caculator screen
updateScreen(operationValue = null, operation = null, current = null, previous = null) 
{
    if(operationValue === null){
        //append number to current value
        this.currentOperationText.innerText += this.currentOperation;
    }else {
//check if value is zero, if it is jut add current value
if(previous === 0){
    operationValue = current;
}
// add current value  to previous
this.previousOperationText.innerText = `${operationValue} ${operation}`;
this.currentOperationText.innerText = "";
        }
    }

// Change math operation
changeOperation(operation) {

    const mathOperations = ["+", "-", "*", "/"]

    if (!mathOperations.includes(operation)) {
        return;
    }
    this.previousOperationText.innerText = 
    this.previousOperationText.innerText.slice(0, -1) + operation;

}
// Delete the last digit
processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Clear current operation
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Clear all operations
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Process an operation
  processEqualOperator() {
    const operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}
const calc = new Calculator(previousOperationText, currentOperationText);

//para a calculadora funcionar.
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

       if (+ value >= 0 || value === ".") {
        calc.addDigit(value);
       }
       else {
        calc.processOperation(value);
       }
    });
});