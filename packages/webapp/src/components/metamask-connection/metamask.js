import { tipAddress } from '../../settings.js'
import { tipDAIAmount } from '../../settings.js'
import { daiKovan } from '../../settings.js'
import { tipEtherAmount } from '../../settings.js'

const ethereum = window.ethereum
let currentChainId = null
let currentAccount = null

let asyncMethodAlias = 'request'

// Running on the page, in the browser
// This API will go live in early 2020
// It will be the only API available after a 6-week deprecation period

function mmRequestShim(rpc) {
  return new Promise((resolve, reject) => {
    ethereum.send(rpc, (err, result) => {
      console.log(err, result)
      if (err) {
        reject(reject)
        return
      }

      resolve(result)
    })
  })
}

export function init () {
  if (!ethereum) {
    return console.warn('no metamask')
  }

  // settings
  ethereum.autoRefreshOnNetworkChange = false

  // test for newest API
  if (typeof ethereum.request !== "function") {
    console.log('shimming meta mask')
    ethereum.request = mmRequestShim
  }

  /*********************************************************/
  /* Handle chain (network) and chainChanged, per EIP 1193 */
  /*********************************************************/

  ethereum.request({method: 'eth_chainId' })
    .then(handleChainChanged)
    .catch(err => console.error(err)) // This should never happen
  ethereum.on('chainChanged', handleChainChanged)

  /**********************************************************/
  /* Handle user accounts and accountsChanged, per EIP 1193 */
  /**********************************************************/

  ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch(err => {
      // In the future, maybe in 2020, this will return a 4100 error if
      // the user has yet to connect
      if (err.code === 4100) { // EIP 1193 unauthorized error
        console.log('Please connect to MetaMask.')
      } else {
        console.error(err)
      }
    })


// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
  ethereum.on('accountsChanged', handleAccountsChanged)
}

function handleChainChanged (res) {
  const chainId = (res && res.result) ? res.result : res // shimming fix
  if (currentChainId !== chainId) {

    currentChainId = chainId

    console.debug('new chainId',currentChainId)
  }
}


// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged (res) {
  const accounts = Array.isArray(res) ? res : res.result // shimming fix
  console.log(res, accounts)
  console.assert(Array.isArray(accounts), "expected Array from metamask", accounts)
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.warn('Please connect properly to MetaMask.')

  } else if (accounts[0] && accounts[0] !== currentAccount) {

    currentAccount = accounts[0]
    console.log(accounts)
    console.debug('new account',currentAccount)

  }
}

/***********************************/
/* Handle connecting, per EIP 1102 */
/***********************************/

// You should only attempt to connect in response to user interaction,
// such as a button click. Otherwise, you're popup-spamming the user
// like it's 1999.
// If you can't retrieve the user's account(s), you should encourage the user
// to initiate a connection attempt.
// document.getElementById('connectButton', connect)

export function getAccount() {
  return currentAccount
}

export function getChainId() {
  return currentChainId
}

export function connect () {
  return ethereum.request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch(err => {
      if (err.code === 4001) { // EIP 1193 userRejectedRequest error
        console.log('Please connect to MetaMask.')
      } else {
        console.error(err)
      }
    })
}

export function sendDAI() {
  const web3 = new Web3()
  const { toWei } = web3.utils
  const data = web3.eth.abi.encodeFunctionCall({
    "constant": false,
    "inputs": [
      {
        "name": "_dst",
        "type": "address"
      },
      {
        "name": "_wad",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, [
    tipAddress,
    toWei(tipDAIAmount,'ether'), // dai has have also 18 decimals
  ])

  const params = {
    method: 'eth_sendTransaction',
    params: [
      {
        from: currentAccount,
        to: daiKovan,
        gas: '100000',
        data,
      },
    ],
  }

  return ethereum.request(params)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

export function sendEth () {
  const { toHex, toWei } = new Web3().utils

  return ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: tipAddress,
          value: toHex(toWei(tipEtherAmount,'ether')),
        },
      ],
    })
    .then((result) => {
      // The result varies by by RPC method.
      // For example, this method will return a transaction hash hexadecimal string on success.
      console.log(result)
    })
    .catch((error) => {
      // If the request fails, the Promise will reject with an error.
      console.log(error)
    });
}


