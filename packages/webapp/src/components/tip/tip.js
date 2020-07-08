import { html, render as litRender } from '../../../node_modules/lit-html/lit-html.js'
import { sendTip } from '../metamask-connection/metamask.js'
import { connect } from '../metamask-connection/metamask.js'
import { getAccount } from '../metamask-connection/metamask.js'
import { getChain } from '../metamask-connection/metamask.js'
import { init as mmInit } from '../metamask-connection/metamask.js'

mmInit()

async function handleClick() {
  if (getAccount()) {
    sendTip()
  }
  else {
    await connect()
  }
  render()
}

const tpl = ({amount, account, chain}) => {
  return html`
<p>
    <button class="button primary" type="button" @click=${handleClick}>TIP ${amount}</button>
</p>
<p><span class="media__title">
    ${account ? `Connected ${account} (${chain})` : `MetaMask not connected`}
    </span>&nbsp;  
</p>
    
  `
}

setInterval(render,1000)

export function render() {
  const state = {
    amount: '€1',
    account: getAccount(),
    chain: getChain(),
  }
  litRender(tpl(state), document.querySelector('.tip-component'))
}