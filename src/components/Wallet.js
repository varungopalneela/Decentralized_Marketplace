import React, { useState, useEffect } from 'react';

function Wallet() {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [accountDisplay, setAccountDisplay] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    checkMetaMask();
    window.ethereum.on('accountsChanged', accountSetter);

    return () => {
      window.ethereum.removeListener('accountsChanged', accountSetter);
    };
  }, []);

  const checkMetaMask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountSetter(result);
        })
        .catch((error) => {
          setErrorMessage('Error connecting to MetaMask: ' + error.message);
        });
    } else {
      setErrorMessage('INSTALL METAMASK');
    }
  };

  const accountSetter = (result) => {
    setDefaultAccount(result[0]);
    window.ethereum
      .request({ method: 'eth_getBalance', params: [result[0].toString(), 'latest'] })
      .then((balance) => {
        const weiValue = parseInt(balance, 16); 
      // Convert wei to Ether (1 ETH = 10^18 wei)
        let ethValue = weiValue / Math.pow(10, 18);       
          // Display the result
        console.log(`Value in ETH: ${ethValue}`)
        setAccountDisplay((ethValue)+" ETH");
      })
      .catch((error) => {
        setErrorMessage('Error fetching balance: ' + error.message);
      });
  };

  return (
    <div className='mt-5 border border-danger p-3'>
      {defaultAccount==null ? <h1>Connecting to your MetaMask... Please Wait!</h1> : <h1 className='text-success'>Metamask account details</h1> }
      <div  className="text-light accountDisplay">
        <h3><span className='text-danger'> Address:</span> {defaultAccount}</h3>
      </div>
      <div className="text-light accountBalance">
        <h3><span className='text-danger'> Balance:</span> {accountDisplay}</h3>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default Wallet;
