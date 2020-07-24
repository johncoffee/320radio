import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { sendDAI } from '../metamask-connection/metamask.js'
import { connect as mmConnect } from '../metamask-connection/metamask.js'
import { getAccount } from '../metamask-connection/metamask.js'
import { getChainId } from '../metamask-connection/metamask.js'
import { init as mmInit } from '../metamask-connection/metamask.js'

mmInit()

async function handleClick() {
  // TODO handle no internet, or Metamask will freak out
  if (getAccount()) {
    sendDAI()
  }
  else {
    await mmConnect()
  }
  render()
}

const tpl = ({amount, account, chain}) => {
  return html`
<p>
    <button class="button primary" style="vertical-align: unset" type="button" @click=${handleClick}>TIP</button>
    <span class="media__title">
    ${account ? `Connected ${shortAddress(account)} (${chain})` : `MetaMask not connected`}
    </span>&nbsp;
</p>
<p>  
</p>
    
  `
}

function shortAddress (address) {
  // 0x8a19672ff50fe5d34af3f0c022b5fc46f555387b
  return `${address.substr(0,6)}...${address.substr(-4,4)}`
}

setInterval(render,1000)

function getChain(currentChainId) {
  const names = {
    '0x1': '', // dont add a name to the main ethereum main net
    '0x01': "",
    '0x2a': "Kovan",
    '42': "Kovan",
  }

  return names[currentChainId] || currentChainId
}

export function render() {
  const state = {
    account: getAccount(),
    chain: getChain(getChainId()),
  }
  litRender(tpl(state), document.querySelector('.tip-component'))
}

export function connect() {
  render()
}