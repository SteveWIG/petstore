//import logo from './logo.svg';
import './App.css';
import './components/Form.js'
import MyForm from './components/Form.js';
import "./flow/config";
import {useEffect, useState} from 'react'
import * as fcl from "@onflow/fcl";
import QueryForm from './components/QueryForm';

function App() {
  const [user, setUser] = useState();

  useEffect(()=>{
    fcl.currentUser().subscribe(setUser)
  },[])

  return (
    <div className="App">
      <h1>User's Address: {user?.addr}</h1>
      <button onClick={()=>fcl.authenticate()}>Connect Wallet</button>
      <button onClick={()=>fcl.unauthenticate()}>Disconnect Wallet</button>
      <table>
        <tbody>
          <tr>
            <td className='Vertical-align'>{MyForm()}</td>
            <td className='Vertical-align'>{QueryForm()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
