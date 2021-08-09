import {useState} from 'react';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/WarEagleCoin.json'
import logo from './logo.svg';
import './App.css';

const tokenAddress = "0xDEaD2a837Df9ee2030c4D3593F6e9b66c3F15e30"

function App() {
  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState(0)

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'})
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    const balance = await contract.balanceOf(account);
    console.log("Balance: ", balance.toString());


  }

  async function getBalance() {
    if(typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts'})
    }

  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
