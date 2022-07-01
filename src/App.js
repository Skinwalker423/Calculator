import './styles.css';

const calculatorInputs = ['AC','DEL', '÷', 1,2,3,'*',4,5,6,'+',7,8,9,'-','.',0,'=']

function App() {
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">122+</div>
        <div className="current-operand">4</div>
      </div>
      {calculatorInputs.map((input) => {
        return (
          <button className={input === 'AC' || input === '=' ? 'span-two' : ''}>{input}</button>
        )
      })}
    </div>
  );
}

export default App;

