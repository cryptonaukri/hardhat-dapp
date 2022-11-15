import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

import Counter from './artifacts/contracts/Counter.sol/Counter.json';

const counterAddress='0x5FbDB2315678afecb367f032d93F642f64180aa3';

// const provider = new ethers.providers.JsonRpcProvider(); // without metamask
const provider = new ethers.providers.Web3Provider(window.ethereum); // with metamask
const signer = provider.getSigner();
const contract = new ethers.Contract(counterAddress, Counter.abi, signer);

function App() {

    const [count,setCount] = useState(0);
    const [counter,setCounter] = useState(0);
    const [owner,setOwner] = useState(null);

    // const setCountHandler = async()=>{
    //     if(typeof window.ethereum !== "undefined"){
    //         const provider = new ethers.providers.Web3Provider(window.ethereum);
        
    //         // MetaMask requires requesting permission to connect users accounts
    //         await provider.send("eth_requestAccounts", []);
    //         const signer = provider.getSigner();
    //         const contract = new ethers.Contract(counterAddress, Counter.abi, signer);
    //             const result = await contract.setCount(count);
    //             result.wait();  
        
    //         console.log(result);
    //     }else{
    //         console.log("Metamask not connected!...")
    //     }
    // }

    const setCountHandler = async()=>{       
        
                const result = await contract.setCount(count);
                result.wait();  
        
            console.log(result);
           
           await contract.on('Logs', (_owner, _count)=>{
            let info={ "owner":_owner, "count":parseInt(_count)}
            console.log(info);
            });

            // await contract.on('InsufficientCount', (_add, _msg)=>{
            //     let info={ "owner":_add, "msg":_msg}
            //     console.log(info);
            //     });

            // console.log("event log",tx);
       
    }
   
    const getCountHandler = async () =>{       
       
        const result = await contract.count();
            
            setCounter(parseInt(result));  
            console.log(`Current Count is ${parseInt(result)}`)
            const tx = await contract.owner();
            setOwner(tx);
            console.log("Owner address",tx);                   
    }

    const getEventLogs = async () =>{
        const block = await provider.getBlockNumber();
        console.log(owner)

        const logs = await contract.filters.Logs(owner);
        // const logs = await contract.queryFilter('Logs',1,block);
        console.log(logs);
       
        // await contract.on('Logs', (_owner, _count)=>{
        //     let info={ "owner":_owner, "count":parseInt(_count)}
        //     console.log(info);
        // });
    }
 
  return (
    <div className="App">
      <h1>Counter Dapp</h1>
      <div style={{padding:"20px"}} >
        <input type='number' placeholder='Enter Counter Value' onChange={(event)=> setCount(event.target.value) } />
        <button onClick={setCountHandler}>Set Counter value</button>
      </div>
      <br/>
      <div>
        <button onClick={getCountHandler}>get Counter</button>
        <p>this is counter value form smart contract {counter} </p>
      </div>
      <button onClick={getEventLogs} >get Logs</button>
    </div>
  );
}

export default App;
