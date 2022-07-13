//import logo from './logo.svg';
import './App.css';
import './components/Form.js'
import MyForm from './components/Form.js';
import "./flow/config";

function App() {
  return (
    <div className="App">
      {MyForm()}
    </div>
  );
}

export default App;
