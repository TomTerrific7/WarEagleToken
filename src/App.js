import {useState} from 'react';
import {ethers} from 'ethers';
import Token from './artifacts/contracts/Token.sol/Token.json'
import logo from './logo.svg';
import './App.css';

const tokenAddress = "0x60aA90882FCf34E456CbABBce9Da0610CCCB0E49"

function App() {
  const [userAccount, setUserAccount] = useState('')
  const [amount, setAmount] = useState(0)

  async function requestAccount() {
   const [account] = await window.ethereum.request({ method: 'eth_requestAccounts'})
    
  }

  async function getBalance() {
    if(typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
    const balance = await contract.balanceOf(account);
    console.log("Balance: ", balance.toString());
    }

  }

  async function sendCoins() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} coins sent to ${userAccount}`);


  }
}


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder= "Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder= "Amount" />  
      </header>
    </div>
  );
}

export default App;
