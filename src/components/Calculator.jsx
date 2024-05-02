import {useState} from "react"
import "./CalculatorStyles.css"

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0") //armazena valor atual mostrado na calculadora
  const [pendingOperation, setPendingOperation] = useState(null) //armazena operação pendente que seja realizada quando o botão de '=' for clicado
  const [pendingValue, setPendingValue] = useState(null) //armazena valor que foi digitado antes de clicar em um botão de operação
  const [completeOperation, setCompleteOperation] = useState("") //armazena a operação completa que foi realizada até o momento

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] //números que aparecem na calculadora
  const operations = ["+", "-", "*", "/"] //operações que aparecem na calculadora

  //função que é chamada quando um número é clicado
  const handleClick = (val) => {
    setCurrentValue((prevValue) => {
      if (prevValue === "0") {
        return val
      } else {
        return prevValue + val
      }
    })
    setCompleteOperation((prevOperation) => prevOperation + val)
  }

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + "" + operation)
    setPendingOperation(operation)
    setPendingValue(currentValue)
    setCurrentValue("0")
  }

  const handleClear = () => {
    setCurrentValue("0")
    setPendingValue(null)
    setPendingOperation(null)
    setCompleteOperation("")
  }

  const handleCalculate = () => {
    if (!pendingOperation || !pendingValue) {
      return
    }

    const num1 = parseFloat(pendingValue)
    const num2 = parseFloat(currentValue)

    let result

    switch (pendingOperation) {
      case "+":
        result = num1 + num2
        break
      case "-":
        result = num1 - num2
        break
      case "*":
        result = num1 * num2
        break
      case "/":
        if (num2 === 0) {
          result = "Error"
          break
        }
        result = num1 / num2
        break
      default:
        break
    }

    setCompleteOperation(
      pendingValue +
        " " +
        pendingOperation +
        " " +
        currentValue +
        " = " +
        result
    )
    setCurrentValue(result.toString())
    setPendingValue(null)
    setPendingOperation(null)
  }

  return (
    <div className="calculator-container">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        {keypadNumbers.map((num) => (
          <button onClick={() => handleClick(num)} key={num}>
            {num}
          </button>
        ))}
        {operations.map((operation) => (
          <button onClick={() => handleOperation(operation)} key={operation}>
            {operation}
          </button>
        ))}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  )
}

export default Calculator
